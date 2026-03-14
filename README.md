
# 🎵 Vibe - AI-Powered Audio Translation Platform

Vibe is a modern web application that transcribes and translates audio files across multiple languages using cutting-edge AI technology. Upload your audio or video files, and let Vibe handle the transcription and translation in real-time.

## ✨ Features

- 🎤 **Audio Transcription** - Automatically transcribe audio and video files
- 🌍 **Multi-Language Translation** - Translate transcribed content to multiple languages
- ☁️ **Cloud Storage** - Seamless integration with Cloudinary for media management
- 🤖 **AI-Powered** - Powered by Groq's advanced language models
- 🎨 **Modern UI** - Beautiful, responsive interface built with React and Tailwind CSS
- 📤 **Drag & Drop Upload** - Easy file upload with drag-and-drop support
- ⚡ **Real-Time Processing** - Fast transcription and translation powered by AI

## ���️ Tech Stack

### Frontend
- **Next.js 15.2.1** - Full-stack React framework with App Router
- **React 19** - UI component library
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Radix UI** - Accessible component primitives
- **Lucide React** - Beautiful icon library

### Backend & APIs
- **Groq SDK** - Fast AI inference for transcription and translation
- **Cloudinary** - Cloud media management and CDN
- **Axios** - HTTP client for API requests
- **FFmpeg** - Video/audio processing

### Development Tools
- **ESLint** - Code quality and linting
- **TypeScript** - Type safety
- **PostCSS & Autoprefixer** - CSS processing

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ or Bun
- npm, yarn, pnpm, or bun package manager
- Cloudinary account (for media uploads)
- Groq API key (for AI transcription/translation)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/ShubhamSahu-2005/Vibe.git
   cd Vibe
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   # or
   bun install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=your_upload_preset
   GROQ_API_KEY=your_groq_api_key
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000) to see your application running.

## 📖 Usage

1. **Upload Audio/Video**
   - Click the upload area or drag-and-drop your media file
   - Supported formats: MP3, WAV, M4A, MP4, and more

2. **Select Languages**
   - Choose the input language (language of your audio)
   - Choose the output language (language you want the translation in)

3. **Process**
   - Click the "Translate" button
   - Wait for transcription and translation to complete

4. **View Results**
   - Original transcription will be displayed
   - Translated text will be shown below

## 📁 Project Structure

```
Vibe/
├── app/
│   ├── api/                 # API routes
│   ├── page.tsx            # Main page component
│   ├── layout.tsx          # Root layout
│   ├── globals.css         # Global styles
│   └── favicon.ico         # Favicon
├── components/             # Reusable React components
├── lib/                    # Utility functions
├── public/                 # Static assets
├── middleware.ts           # Next.js middleware
├── next.config.ts          # Next.js configuration
├── tsconfig.json          # TypeScript configuration
├── tailwind.config.js     # Tailwind CSS configuration
├── postcss.config.js      # PostCSS configuration
└── package.json           # Project dependencies
```

## 🔧 Configuration

### Cloudinary Setup
1. Sign up at [Cloudinary](https://cloudinary.com)
2. Get your Cloud Name and create an upload preset
3. Add to `.env.local`

### Groq Setup
1. Sign up at [Groq](https://groq.com)
2. Generate an API key
3. Add `GROQ_API_KEY` to `.env.local`

## 🎨 Customization

### Modify Styles
- Edit `tailwind.config.js` for Tailwind configuration
- Update `app/globals.css` for global styles

### Add More Languages
- Modify the language selection dropdowns in `app/page.tsx`
- Update the API endpoint to support additional languages

## 🔐 Security

- Environment variables are kept secure in `.env.local`
- Sensitive API keys are never exposed to the client
- Backend API calls handle authentication securely

## 📝 API Endpoints

### `/api/translate` (POST)
Transcribes and translates audio files.

**Request:**
```json
{
  "fileUrl": "https://cloudinary-url.com/audio.mp3",
  "inputLanguage": "en",
  "outputLanguage": "es"
}
```

**Response:**
```json
{
  "original": "Transcribed text in original language",
  "translated": "Translated text in target language"
}
```

## 🚀 Deployment

### Deploy on Vercel (Recommended)
The easiest way to deploy is using [Vercel](https://vercel.com):

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy with one click

### Deploy on Other Platforms
This is a standard Next.js application and can be deployed on:
- Netlify
- AWS Amplify
- Docker
- Traditional Node.js servers

```bash
npm run build
npm start
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the MIT License.

## 🙋 Support

For support, please create an issue in the [GitHub Issues](https://github.com/ShubhamSahu-2005/Vibe/issues) section.

## 📚 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com)
- [Groq Documentation](https://groq.com/docs)
- [Cloudinary Documentation](https://cloudinary.com/documentation)

## ⭐ Show Your Support

If you found this project helpful, please consider giving it a star! ⭐

---

**Made with ❤️ by [ShubhamSahu-2005](https://github.com/ShubhamSahu-2005)**
```

This README includes:
- ✅ Clear project description
- ✅ Features overview
- ✅ Complete tech stack details
- ✅ Step-by-step setup instructions
- ✅ Usage guide
- ✅ Project structure
- ✅ Configuration details
- ✅ API documentation
- ✅ Deployment instructions
- ✅ Contributing guidelines
- ✅ Support section

Feel free to customize it further based on your specific requirements!
