// 'use client'

// import React, { useState } from 'react'
// import axios from 'axios'
// import { useRouter } from 'next/navigation'
// import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
// import { Input } from "@/components/ui/input"
// import { Textarea } from "@/components/ui/textarea"
// import { Button } from "@/components/ui/button"
// import { Label } from "@/components/ui/label"
// import { Loader2 } from "lucide-react"
// import { FileUpload } from '@/components/ui/file-upload' 
// import { toast } from 'react-hot-toast' 

// function VideoUpload() {
//   const [file, setFile] = useState<File | null>(null)
//   const [title, setTitle] = useState("")
//   const [description, setDescription] = useState("")
//   const [isUploading, setIsUploading] = useState(false)

//   const router = useRouter()

//   const MAX_FILE_SIZE = 70 * 1024 * 1024

//   const handleFileUpload = (files: File[]) => {
//     if (files.length > 0) {
//       setFile(files[0])
//     }
//   }

//   const handleSubmit = async (e: React.FormEvent) => {  
//     e.preventDefault()

//     if (!file) {
//       toast.error("Please select a file to upload")
//       return
//     }

//     if (file.size > MAX_FILE_SIZE) {
//       toast.error("File size too large")
//       return
//     }

//     setIsUploading(true)
//     const formData = new FormData()
//     formData.append("file", file)
//     formData.append("title", title)
//     formData.append("description", description)
//     formData.append("originalSize", file.size.toString())

//     try {
//       const response = await axios.post("/api/video-upload", formData)
//       toast.success("Video is being processed in the background. You'll be notified when it's ready.")
//       router.push("/")
//     } catch (error) {
//       console.error('Upload video failed:', error)
//       toast.error("An error occurred while uploading the video. Please try again.")
//     } finally {
//       setIsUploading(false)
//     }
//   }

//   return (
//     <div className="container mx-auto p-2 max-w-3xl">
//       <h1 className="text-4xl font-bold  mb-6 bg-clip-text text-transparent text-center bg-gradient-to-b from-neutral-900 to-neutral-600 dark:from-neutral-300 dark:to-neutral-200">
//         Smaller Videos, Same Impact
//       </h1>

//       <Card className="w-full">
//         <CardHeader className="text-center">
//           <CardTitle className="text-2xl">Video Details</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <form onSubmit={handleSubmit} className="space-y-6">
//             <div className="space-y-2">
//               <Label htmlFor="title">Title</Label>
//               <Input
//                 id="title"
//                 type="text"
//                 value={title}
//                 onChange={(e) => setTitle(e.target.value)}
//                 required
//               />
//             </div>
//             <div className="space-y-2">
//               <Label htmlFor="description">Description</Label>
//               <Textarea
//                 id="description"
//                 value={description}
//                 onChange={(e) => setDescription(e.target.value)}
//                 rows={4}
//               />
//             </div>
//             <div className="space-y-2">
//               <Label htmlFor="video">Video File</Label>
//               <div className="w-full border border-dashed bg-white dark:bg-black border-neutral-200 dark:border-neutral-800 rounded-lg">
//                 <FileUpload onChange={handleFileUpload} />
//               </div>
//               {file && (
//                 <p className="text-sm text-muted-foreground">
//                   Selected file: {file.name}
//                 </p>
//               )}
//             </div>
//           </form>
//         </CardContent>
//         <CardFooter className="flex justify-center">
//           <Button
//             onClick={handleSubmit}
//             disabled={isUploading}
//             size="lg"
//             className="w-full max-w-xs"
//           >
//             {isUploading ? (
//               <>
//                 <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                 Uploading...
//               </>
//             ) : (
//               "Upload Video"
//             )}
//           </Button>
//         </CardFooter>
//       </Card>
//     </div>
//   )
// }

// export default VideoUpload\


'use client'

import React, { useState, useRef, useEffect } from 'react'
import axios from 'axios'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Download, AlertCircle } from "lucide-react"
import { FileUpload } from '@/components/ui/file-upload'
import { toast } from 'react-hot-toast'
import Link from 'next/link'
import { Progress } from "@/components/ui/progress"

export default function VideoUpload() {
  const [file, setFile] = useState<File | null>(null)
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [videoUrl, setVideoUrl] = useState<string | null>(null)
  const [previewError, setPreviewError] = useState<string | null>(null)
  const videoPreviewRef = useRef<HTMLDivElement>(null)

  const MAX_FILE_SIZE = 100 * 1024 * 1024 // 100MB

  const handleFileUpload = async (files: File[]) => {
    if (files.length > 0) {
      const selectedFile = files[0]
      setFile(selectedFile)

      if (selectedFile.size > MAX_FILE_SIZE) {
        toast.error("File size too large. Maximum size is 100MB.")
        return
      }

      const allowedTypes = ['video/mp4', 'video/quicktime', 'video/x-msvideo', 'video/x-ms-wmv']
      if (!allowedTypes.includes(selectedFile.type)) {
        toast.error("Invalid file type. Please upload a valid video file.")
        return
      }

      await handleSubmit(selectedFile)
    }
  }

  const handleSubmit = async (selectedFile: File) => {  
    setIsUploading(true)
    setUploadProgress(0)
    setPreviewError(null)
    const formData = new FormData()
    formData.append("file", selectedFile)
    formData.append("title", title || selectedFile.name)
    formData.append("description", description)
    formData.append("originalSize", selectedFile.size.toString())

    try {
      const response = await axios.post("/api/video-upload", formData, {
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total!)
          setUploadProgress(percentCompleted)
        }
      })
      toast.success("Video has been processed successfully.")
      setVideoUrl(response.data.url)
    } catch (error) {
      console.error('Upload video failed:', error)
      toast.error("An error occurred while uploading the video. Please try again.")
    } finally {
      setIsUploading(false)
      setUploadProgress(0)
    }
  }

  useEffect(() => {
    if (videoUrl && videoPreviewRef.current) {
      videoPreviewRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [videoUrl])

  const handleVideoError = () => {
    setPreviewError("Unable to preview this video. You can still download it.")
  }

  return (
    <div className="container mx-auto p-2 max-w-3xl">
      <h1 className="text-4xl font-bold mb-6 bg-clip-text text-transparent text-center bg-gradient-to-b from-neutral-900 to-neutral-600 dark:from-neutral-300 dark:to-neutral-200">
        Smaller Videos, Same Impact
      </h1>

      <Card className="w-full">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Video Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Title (Optional)</Label>
              <Input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description (Optional)</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="video">Video File</Label>
              <div className="w-full border border-dashed bg-white dark:bg-black border-neutral-200 dark:border-neutral-800 rounded-lg">
                <FileUpload onChange={handleFileUpload} />
              </div>
              {file && (
                <p className="text-sm text-muted-foreground">
                  Selected file: {file.name}
                </p>
              )}
            </div>
          </form>
        </CardContent>
        {isUploading && (
          <CardFooter className="flex flex-col items-center">
            <Progress value={uploadProgress} className="w-full mb-2" />
            <p className="text-sm text-muted-foreground">Uploading: {uploadProgress}%</p>
          </CardFooter>
        )}
      </Card>

      {videoUrl && (
        <div ref={videoPreviewRef}>
          <Card className="w-full mt-6">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Video Preview</CardTitle>
            </CardHeader>
            <CardContent>
              {previewError ? (
                <div className="flex items-center justify-center bg-neutral-100 dark:bg-neutral-800 rounded-lg p-4">
                  <AlertCircle className="w-6 h-6 text-yellow-500 mr-2" />
                  <p>{previewError}</p>
                </div>
              ) : (
                <video className="w-full rounded-lg" controls onError={handleVideoError}>
                  <source src={videoUrl} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              )}
              <div className="mt-4">
                <h3 className="text-lg font-semibold">{title || file?.name}</h3>
                <p className="text-sm text-muted-foreground">{description}</p>
              </div>
            </CardContent>
            <CardFooter className="flex justify-center">
              <Link href={videoUrl} download>
                <Button size="lg" className="w-full max-w-xs">
                  <Download className="mr-2 h-4 w-4" />
                  Download Video
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </div>
      )}
    </div>
  )
}