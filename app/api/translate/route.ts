import { NextRequest, NextResponse } from "next/server";
import cloudinary from "cloudinary";
import Groq from "groq-sdk";
import fs from "fs";
import path from "path";
import os from "os";

// ✅ Initialize Groq API Client
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

// ✅ Configure Cloudinary
cloudinary.v2.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req: NextRequest) {
  try {
    console.log("🔵 Received request...");
    const { fileUrl, inputLanguage, outputLanguage } = await req.json();

    if (!fileUrl) {
      console.error("❌ No file URL provided");
      return NextResponse.json({ error: "No file URL provided" }, { status: 400 });
    }

    console.log(`📥 Fetching file from Cloudinary: ${fileUrl}`);
    
    // ✅ Fetch audio file from Cloudinary
    const audioResponse = await fetch(fileUrl);
    if (!audioResponse.ok) {
      throw new Error(`Failed to fetch file. Status: ${audioResponse.status}`);
    }

    const audioBuffer = Buffer.from(await audioResponse.arrayBuffer());

    // ✅ Save file to temp directory
    const tempDir = os.tmpdir();
    const tempPath = path.join(tempDir, "uploaded.mp3");
    await fs.promises.writeFile(tempPath, audioBuffer);
    
    console.log(`✅ File saved at: ${tempPath}`);
    
    if (!fs.existsSync(tempPath)) {
      throw new Error("File was not saved successfully.");
    }

    // ✅ Transcribe using Whisper
    console.log("📝 Transcribing using Whisper...");
    const transcription = await groq.audio.transcriptions.create({
      file: fs.createReadStream(tempPath),
      model: "whisper-large-v3",
      language: inputLanguage,
      response_format: "verbose_json",
    });

    console.log("✅ Transcription complete.");
    let originalText = transcription.text.trim();

    // ✅ Ensure proper line breaks (like a poem/song)
    originalText = originalText.replace(/([.?!])\s*/g, "$1\n");

    // ✅ Translate while keeping line breaks
    console.log(`🌍 Translating to ${outputLanguage}...`);
    const translation = await groq.chat.completions.create({
      model: "mixtral-8x7b-32768",
      messages: [
        { role: "system", content: "You are a professional song lyric translator. Keep the lyrics structured properly with correct line breaks." },
        { role: "user", content: `Translate this song into ${outputLanguage}, maintaining its structure as lyrics with proper line breaks:\n\n${originalText}` },
      ],
    });

    console.log("✅ Translation complete.");

    // ✅ Cleanup temp file
    await fs.promises.unlink(tempPath);
    console.log("🗑️ Temp file deleted.");

    return NextResponse.json({
      original: originalText,
      translated: translation.choices[0]?.message?.content || "",
    });

  } catch (error: any) {
    console.error("❌ Translation failed:", error);

    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
