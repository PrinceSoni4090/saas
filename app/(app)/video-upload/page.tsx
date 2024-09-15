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

//     if (!file) return

//     if (file.size > MAX_FILE_SIZE) {
//       alert("File size too large")
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
//       alert("Video is being processed in the background. You'll be notified when it's ready.")
//       router.push("/")
//     } catch (error) {
//       console.error('Upload video failed:', error)
//       alert("An error occurred while uploading the video. Please try again.")
//     } finally {
//       setIsUploading(false)
//     }
//   }

//   return (
//     <div className="container mx-auto p-2 max-w-3xl">
//       <h1 className="text-4xl font-bold  mb-6 bg-clip-text text-transparent text-center bg-gradient-to-b from-neutral-900 to-neutral-600 dark:from-neutral-300 dark:to-neutral-200">
//       Smaller Videos, Same Impact
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

// export default VideoUpload

'use client'

import React, { useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Loader2 } from "lucide-react"
import { FileUpload } from '@/components/ui/file-upload' 
import { toast } from 'react-hot-toast' 

function VideoUpload() {
  const [file, setFile] = useState<File | null>(null)
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [isUploading, setIsUploading] = useState(false)

  const router = useRouter()

  const MAX_FILE_SIZE = 70 * 1024 * 1024

  const handleFileUpload = (files: File[]) => {
    if (files.length > 0) {
      setFile(files[0])
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {  
    e.preventDefault()

    if (!file) {
      toast.error("Please select a file to upload")
      return
    }

    if (file.size > MAX_FILE_SIZE) {
      toast.error("File size too large")
      return
    }

    setIsUploading(true)
    const formData = new FormData()
    formData.append("file", file)
    formData.append("title", title)
    formData.append("description", description)
    formData.append("originalSize", file.size.toString())

    try {
      const response = await axios.post("/api/video-upload", formData)
      toast.success("Video is being processed in the background. You'll be notified when it's ready.")
      router.push("/")
    } catch (error) {
      console.error('Upload video failed:', error)
      toast.error("An error occurred while uploading the video. Please try again.")
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div className="container mx-auto p-2 max-w-3xl">
      <h1 className="text-4xl font-bold  mb-6 bg-clip-text text-transparent text-center bg-gradient-to-b from-neutral-900 to-neutral-600 dark:from-neutral-300 dark:to-neutral-200">
        Smaller Videos, Same Impact
      </h1>

      <Card className="w-full">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Video Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
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
        <CardFooter className="flex justify-center">
          <Button
            onClick={handleSubmit}
            disabled={isUploading}
            size="lg"
            className="w-full max-w-xs"
          >
            {isUploading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Uploading...
              </>
            ) : (
              "Upload Video"
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

export default VideoUpload