// 'use client'

// import React, { useState, useEffect, useRef } from 'react'
// import { CldImage } from 'next-cloudinary'
// import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Button } from "@/components/ui/button"
// import { Label } from "@/components/ui/label"
// import { Progress } from "@/components/ui/progress"
// import { Loader2 } from "lucide-react"
// import { FileUpload } from '@/components/ui/file-upload'

// const socialFormats = {
//   "Instagram Square (1:1)": { width: 1080, height: 1080, aspectRatio: "1:1" },
//   "Instagram Portrait (4:5)": { width: 1080, height: 1350, aspectRatio: "4:5" },
//   "Twitter Post (16:9)": { width: 1200, height: 675, aspectRatio: "16:9" },
//   "Twitter Header (3:1)": { width: 1500, height: 500, aspectRatio: "3:1" },
//   "Facebook Cover (205:78)": { width: 820, height: 312, aspectRatio: "205:78" },
// }

// type SocialFormats = keyof typeof socialFormats

// export default function SocialShare() {
//   const [uploadedImage, setUploadedImage] = useState<string | null>(null)
//   const [selectedFormat, setSelectedFormat] = useState<SocialFormats>("Instagram Square (1:1)")
//   const [isUploading, setIsUploading] = useState(false)
//   const [isTransforming, setIsTransforming] = useState(false)
//   const imageRef = useRef<HTMLImageElement>(null)

//   useEffect(() => {
//     if (uploadedImage) {
//       setIsTransforming(true)
//     }
//   }, [selectedFormat, uploadedImage])

//   const handleFileUpload = async (files: File[]) => {
//     if (files.length === 0) return
//     setIsUploading(true)

//     const formData = new FormData()
//     formData.append("file", files[0])

//     try {
//       const response = await fetch("/api/image-upload", {
//         method: "POST",
//         body: formData
//       })

//       if (!response.ok) throw new Error("Failed to upload image")

//       const data = await response.json()
//       setUploadedImage(data.publicId)
//     } catch (error) {
//       console.log(error)
//       alert("Failed to upload image")
//     } finally {
//       setIsUploading(false)
//     }
//   }

//   const handleDownload = () => {
//     if (!imageRef.current) return

//     fetch(imageRef.current.src)
//       .then((response) => response.blob())
//       .then((blob) => {
//         const url = window.URL.createObjectURL(blob)
//         const link = document.createElement("a")
//         link.href = url
//         link.download = `${selectedFormat.replace(/\s+/g, "_").toLowerCase()}.png`
//         document.body.appendChild(link)
//         link.click()
//         document.body.removeChild(link)
//         window.URL.revokeObjectURL(url)
//       })
//   }

//   return (
//     <div className="container mx-auto p-8 max-w-6xl">
//       <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent text-center bg-gradient-to-b from-neutral-900 to-neutral-600 dark:from-neutral-300 dark:to-neutral-200">
//         Seamless Social Media Cropping
//       </h1>
//       <p className="pb-5 max-w-4xl mx-auto text-sm md:text-lg text-neutral-700 dark:text-neutral-400 text-center">
//         Upload, crop, and resize your images for any social media format with precision and ease
//       </p>

//       <Card className="w-full">
//         <CardHeader className="text-center">
//           <CardTitle className="text-2xl">Upload an Image</CardTitle>
//         </CardHeader>
//         <CardContent className="flex flex-col items-center space-y-6">
//           <div className="w-full max-w-md">
//             {/* <Label htmlFor="picture" className="text-lg mb-2 block text-center">Choose an image file</Label> */}
//             <div className="w-full max-w-4xl mx-auto min-h-96 border border-dashed bg-white dark:bg-black border-neutral-200 dark:border-neutral-800 rounded-lg">
//               <FileUpload onChange={handleFileUpload} />
//             </div>
//           </div>

//           {isUploading && (
//             <div className="w-full max-w-md">
//               <Progress value={33} className="w-full" />
//             </div>
//           )}

//           {uploadedImage && (
//             <div className="w-full max-w-md space-y-6">
//               <h2 className="text-2xl font-semibold text-center">Select Social Media Format</h2>
//               <Select
//                 value={selectedFormat}
//                 onValueChange={(value) => setSelectedFormat(value as SocialFormats)}
//               >
//                 <SelectTrigger className="w-full">
//                   <SelectValue placeholder="Select a format" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   {Object.keys(socialFormats).map((format) => (
//                     <SelectItem key={format} value={format}>
//                       {format}
//                     </SelectItem>
//                   ))}
//                 </SelectContent>
//               </Select>

//               <div className="relative">
//                 <h3 className="text-xl font-semibold mb-4 text-center">Preview:</h3>
//                 <div className="flex justify-center">
//                   {isTransforming && (
//                     <div className="absolute inset-0 flex items-center justify-center bg-background/50 z-10">
//                       <Loader2 className="h-12 w-12 animate-spin" />
//                     </div>
//                   )}
//                   <CldImage
//                     width={socialFormats[selectedFormat].width}
//                     height={socialFormats[selectedFormat].height}
//                     src={uploadedImage}
//                     sizes="100vw"
//                     alt="transformed image"
//                     crop="fill"
//                     aspectRatio={socialFormats[selectedFormat].aspectRatio}
//                     gravity="auto"
//                     ref={imageRef}
//                     onLoad={() => setIsTransforming(false)}
//                     className="max-w-full h-auto"
//                   />
//                 </div>
//               </div>
//             </div>
//           )}
//         </CardContent>
//         {uploadedImage && (
//           <CardFooter className="flex justify-center">
//             <Button onClick={handleDownload} size="lg" className="mt-4">
//               Download for {selectedFormat}
//             </Button>
//           </CardFooter>
//         )}
//       </Card>
//     </div>
//   )
// }


'use client'

import React, { useState, useEffect, useRef } from 'react'
import { CldImage } from 'next-cloudinary'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Loader2 } from "lucide-react"
import { FileUpload } from '@/components/ui/file-upload'

const socialFormats = {
  "Instagram Square (1:1)": { width: 1080, height: 1080, aspectRatio: "1:1" },
  "Instagram Portrait (4:5)": { width: 1080, height: 1350, aspectRatio: "4:5" },
  "Twitter Post (16:9)": { width: 1200, height: 675, aspectRatio: "16:9" },
  "Twitter Header (3:1)": { width: 1500, height: 500, aspectRatio: "3:1" },
  "Facebook Cover (205:78)": { width: 820, height: 312, aspectRatio: "205:78" },
}

type SocialFormats = keyof typeof socialFormats

export default function SocialShare() {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const [selectedFormat, setSelectedFormat] = useState<SocialFormats>("Instagram Square (1:1)")
  const [isUploading, setIsUploading] = useState(false)
  const [isTransforming, setIsTransforming] = useState(false)
  const imageRef = useRef<HTMLImageElement>(null)
  const previewRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (uploadedImage) {
      setIsTransforming(true)
    }
  }, [selectedFormat, uploadedImage])

  useEffect(() => {
    if (uploadedImage && previewRef.current) {
      previewRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [uploadedImage])

  const handleFileUpload = async (files: File[]) => {
    if (files.length === 0) return
    setIsUploading(true)

    const formData = new FormData()
    formData.append("file", files[0])

    try {
      const response = await fetch("/api/image-upload", {
        method: "POST",
        body: formData
      })

      if (!response.ok) throw new Error("Failed to upload image")

      const data = await response.json()
      setUploadedImage(data.publicId)
    } catch (error) {
      console.log(error)
      alert("Failed to upload image")
    } finally {
      setIsUploading(false)
    }
  }

  const handleDownload = () => {
    if (!imageRef.current) return

    fetch(imageRef.current.src)
      .then((response) => response.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(blob)
        const link = document.createElement("a")
        link.href = url
        link.download = `${selectedFormat.replace(/\s+/g, "_").toLowerCase()}.png`
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        window.URL.revokeObjectURL(url)
      })
  }

  return (
    <div className="container mx-auto p-8 max-w-6xl">
      <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent text-center bg-gradient-to-b from-neutral-900 to-neutral-600 dark:from-neutral-300 dark:to-neutral-200">
        Seamless Social Media Cropping
      </h1>
      <p className="pb-5 max-w-4xl mx-auto text-sm md:text-lg text-neutral-700 dark:text-neutral-400 text-center">
        Upload, crop, and resize your images for any social media format with precision and ease
      </p>

      <Card className="w-full">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Upload an Image</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center space-y-6">
          <div className="w-full max-w-md">
            <div className="w-full max-w-4xl mx-auto min-h-96 border border-dashed bg-white dark:bg-black border-neutral-200 dark:border-neutral-800 rounded-lg">
              <FileUpload onChange={handleFileUpload} />
            </div>
          </div>

          {isUploading && (
            <div className="w-full max-w-md">
              <Progress value={33} className="w-full" />
            </div>
          )}

          {uploadedImage && (
            <div ref={previewRef} className="w-full max-w-md space-y-6">
              <h2 className="text-2xl font-semibold text-center">Select Social Media Format</h2>
              <Select
                value={selectedFormat}
                onValueChange={(value) => setSelectedFormat(value as SocialFormats)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a format" />
                </SelectTrigger>
                <SelectContent>
                  {Object.keys(socialFormats).map((format) => (
                    <SelectItem key={format} value={format}>
                      {format}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <div className="relative">
                <h3 className="text-xl font-semibold mb-4 text-center">Preview:</h3>
                <div className="flex justify-center">
                  {isTransforming && (
                    <div className="absolute inset-0 flex items-center justify-center bg-background/50 z-10">
                      <Loader2 className="h-12 w-12 animate-spin" />
                    </div>
                  )}
                  <CldImage
                    width={socialFormats[selectedFormat].width}
                    height={socialFormats[selectedFormat].height}
                    src={uploadedImage}
                    sizes="100vw"
                    alt="transformed image"
                    crop="fill"
                    aspectRatio={socialFormats[selectedFormat].aspectRatio}
                    gravity="auto"
                    ref={imageRef}
                    onLoad={() => setIsTransforming(false)}
                    className="max-w-full h-auto"
                  />
                </div>
              </div>
            </div>
          )}
        </CardContent>
        {uploadedImage && (
          <CardFooter className="flex justify-center">
            <Button onClick={handleDownload} size="lg" className="mt-4">
              Download for {selectedFormat}
            </Button>
          </CardFooter>
        )}
      </Card>
    </div>
  )
}