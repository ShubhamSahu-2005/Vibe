"use client"

import type React from "react"

import { useState } from "react"
import { Upload, Music, Headphones, ArrowRight, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function Home() {
  const [file, setFile] = useState<File | null>(null)
  const [inputLanguage, setInputLanguage] = useState("en")
  const [outputLanguage, setOutputLanguage] = useState("es")
  const [result, setResult] = useState<{ original: string; translated: string } | null>(null)
  const [uploading, setUploading] = useState(false)
  const [processing, setProcessing] = useState(false)
  const [isDragOver, setIsDragOver] = useState(false)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.[0]) {
      setFile(event.target.files[0])
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }

  const handleDragLeave = () => {
    setIsDragOver(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
    if (e.dataTransfer.files?.[0]) {
      setFile(e.dataTransfer.files[0])
    }
  }

  const handleUpload = async () => {
    if (!file) return alert("Please upload a file")

    setUploading(true)
    setProcessing(false)
    setResult(null)

    const formData = new FormData()
    formData.append("file", file)
    formData.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "ml_default")
    formData.append("resource_type", "video") // Required for audio uploads

    try {
      // Step 1: Upload to Cloudinary
      const cloudinaryResponse = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/video/upload`,
        {
          method: "POST",
          body: formData,
        },
      )

      const cloudinaryData = await cloudinaryResponse.json()
      console.log("Cloudinary Response:", cloudinaryData)

      if (!cloudinaryData.secure_url) {
        throw new Error(`Cloudinary upload failed: ${cloudinaryData.error?.message || "Unknown error"}`)
      }

      setUploading(false)
      setProcessing(true)

      // Step 2: Send file URL to API for transcription & translation
      const response = await fetch("/api/translate", {
        method: "POST",
        body: JSON.stringify({
          fileUrl: cloudinaryData.secure_url,
          inputLanguage,
          outputLanguage,
        }),
        headers: { "Content-Type": "application/json" },
      })

      const data = await response.json()
      setProcessing(false)
      setResult(data)
    } catch (error: unknown) {
      console.error("Upload failed:", error)
      const errorMessage = error instanceof Error ? error.message : "Unknown error"
      alert(`Upload error: ${errorMessage}`)
      setUploading(false)
      setProcessing(false)
      setResult(null)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-500 via-purple-500 to-pink-500 p-6 flex flex-col items-center">
      <div className="w-full max-w-3xl">
        <h1 className="text-4xl font-bold text-white text-center mb-2 tracking-tight">🎵 Vibe Translator 🌍</h1>
        <p className="text-white/80 text-center mb-8">
          Transform your audio between languages while keeping the vibe intact
        </p>

        <Card className="p-6 backdrop-blur-md bg-white/10 border-none shadow-xl rounded-2xl">
          <div
            className={`border-2 border-dashed rounded-xl p-8 mb-6 text-center transition-all duration-200 ${
              isDragOver
                ? "border-white bg-white/20"
                : file
                  ? "border-green-300 bg-green-400/10"
                  : "border-white/40 hover:border-white/70"
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            {file ? (
              <div className="flex flex-col items-center gap-2">
                <Music className="h-10 w-10 text-white" />
                <p className="text-white font-medium">{file.name}</p>
                <p className="text-white/70 text-sm">{(file.size / (1024 * 1024)).toFixed(2)} MB</p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setFile(null)}
                  className="mt-2 bg-white/10 hover:bg-white/20 text-white border-white/30"
                >
                  Change file
                </Button>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-2">
                <Upload className="h-10 w-10 text-white/70" />
                <p className="text-white font-medium">Drop your audio file here</p>
                <div className="relative mt-4">
                  <Button variant="outline" className="bg-white/10 hover:bg-white/20 text-white border-white/30">
                    Browse Files
                  </Button>
                  <input
                    type="file"
                    accept="audio/*"
                    onChange={handleFileChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                </div>
              </div>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1">
              <label className="block text-white mb-2 text-sm">From</label>
              <Select value={inputLanguage} onValueChange={setInputLanguage}>
                <SelectTrigger className="bg-white/10 border-white/20 text-white">
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent className="bg-purple-900 border-purple-700 text-white">
                  <SelectItem value="en">English 🇺🇸</SelectItem>
                  <SelectItem value="es">Spanish 🇪🇸</SelectItem>
                  <SelectItem value="fr">French 🇫🇷</SelectItem>
                  <SelectItem value="de">German 🇩🇪</SelectItem>
                  <SelectItem value="zh">Chinese 🇨🇳</SelectItem>
                  <SelectItem value="ja">Japanese 🇯🇵</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-end justify-center mb-2">
              <ArrowRight className="text-white/70" />
            </div>

            <div className="flex-1">
              <label className="block text-white mb-2 text-sm">To</label>
              <Select value={outputLanguage} onValueChange={setOutputLanguage}>
                <SelectTrigger className="bg-white/10 border-white/20 text-white">
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent className="bg-purple-900 border-purple-700 text-white">
                  <SelectItem value="en">English 🇺🇸</SelectItem>
                  <SelectItem value="es">Spanish 🇪🇸</SelectItem>
                  <SelectItem value="fr">French 🇫🇷</SelectItem>
                  <SelectItem value="de">German 🇩🇪</SelectItem>
                  <SelectItem value="zh">Chinese 🇨🇳</SelectItem>
                  <SelectItem value="ja">Japanese 🇯🇵</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button
            onClick={handleUpload}
            disabled={!file || uploading || processing}
            className="w-full bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 text-white font-medium py-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            {uploading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Uploading...
              </>
            ) : processing ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <Headphones className="mr-2 h-5 w-5" />
                Transcribe & Translate
              </>
            )}
          </Button>
        </Card>

        {result && (
          <Card className="mt-8 p-6 backdrop-blur-md bg-white/10 border-none shadow-xl rounded-2xl overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-black/20 p-4 rounded-xl">
                <h3 className="font-bold text-white mb-3 flex items-center gap-2">
                  <Music className="h-4 w-4" /> Original Lyrics
                </h3>
                <div className="text-black whitespace-pre-wrap max-h-[400px] overflow-y-auto scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent pr-2">
                  {result.original}
                </div>
              </div>

              <div className="bg-black/20 p-4 rounded-xl">
                <h3 className="font-bold text-white mb-3 flex items-center gap-2">
                  <Headphones className="h-4 w-4" /> {getLanguageName(outputLanguage)} Translation
                </h3>
                <div className="text-black whitespace-pre-wrap max-h-[400px] overflow-y-auto scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent pr-2">
                  {result.translated}
                </div>
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  )
}

function getLanguageName(code: string): string {
  const languages: Record<string, string> = {
    en: "English",
    es: "Spanish",
    fr: "French",
    de: "German",
    zh: "Chinese",
    ja: "Japanese",
  }
  return languages[code] || code.toUpperCase()
}
