// "use client"
// import React, {useState, useEffect, useCallback} from 'react'
// import axios from 'axios'
// import VideoCard from '@/components/VideoCard'
// import { Video } from '@/types'

// function Home() { 
//   const [videos, setVideos] = useState<Video[]>([]) 
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState<string | null>(null)

//   const fetchVideos = useCallback (async () => {

//     try {
//     const response = await axios.get("/api/videos")

//     if(Array.isArray(response.data)) {
//      setVideos(response.data) 
//     } else {
//       throw new Error("Unexpected response format")
//     }
//     } catch (error) {
//       console.log(error)
//       setError("Failed to fetch videos")
//     }finally{
//       setLoading(false)
//     }
//   }, [])

//   useEffect (() => {
//     fetchVideos()
//   }, [fetchVideos])

//   const handleDownload = useCallback((url: string, title: string) => {

//         const link = document.createElement("a");
//         link.href = url;
//         link.setAttribute("download", `${title}.mp4`);
//         link.setAttribute("target", "_blank");
//         document.body.appendChild(link);
//         link.click();
//         document.body.removeChild(link);

//   }, [])

//   if (loading) {
//     return <div>Loading...</div>
//   }

//   return (
//     <div className="container mx-auto p-4">
//     <h1 className="text-2xl font-bold mb-4">Videos</h1>
//     {videos.length === 0 ? (
//       <div className="text-center text-lg text-gray-500">
//         No videos available
//       </div>
//     ) : (
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//         {
//           videos.map((video) => (
//               <VideoCard
//                   key={video.id}
//                   video={video}
//                   onDownload={handleDownload}

//               />
//           ))
//         }
//       </div>
//     )}
//   </div>
// );
// }

// export default Home

"use client"

import React, { useState, useEffect, useCallback } from 'react'
import VideoCard from '@/components/VideoCard'
import { Video } from '@/types'
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"


export default function Home() {
  const [videos, setVideos] = useState<Video[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchVideos = useCallback(async () => {
    try {
      const response = await fetch("/api/videos")
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data = await response.json()
      console.log("Fetched data:", data); // Add this line for debugging

      if (Array.isArray(data)) {
        setVideos(data)
      } else {
        throw new Error("Unexpected response format")
      }
    } catch (error) {
      console.error("Error fetching videos:", error)
      setError("Failed to fetch videos")
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchVideos()
  }, [fetchVideos])

  const handleDownload = useCallback((url: string, title: string) => {
    const link = document.createElement("a")
    link.href = url
    link.setAttribute("download", `${title}.mp4`)
    link.setAttribute("target", "_blank")
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <p className="text-red-500 mb-4">{error}</p>
        <Button onClick={fetchVideos}>Retry</Button>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py flex flex-col items-center gap-">
      <h1 className="flex items-center justify-center w-full flex-col px-4">
        <h2 className="bg-clip-text text-transparent text-center bg-gradient-to-b from-neutral-900 to-neutral-700 dark:from-neutral-600 dark:to-white md:text-4xl lg:text-7xl font-sans py-4 md:py-8 relative z-20 font-bold tracking-tight">
          Quick compress, perfect crop,  <br /> instant post
        </h2>
        </h1>
        <p className="pb-20 max-w-4xl mx-auto text-sm md:text-lg text-neutral-700 dark:text-neutral-400 text-center">
          AI-driven content-aware cropping for flawless image resizing and smart video compression to reduce file size without losing quality. Optimize your media for social platforms instantly and effortlessly.
        </p>
      
      {videos.length === 0 ? (
        <div className="text-center text-lg text-muted-foreground">
          No videos available
        </div>
      ) : (
        <div className="flex justify-center w-full"> {/* Flex container for centering */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-screen-lg w-full"> {/* Restrict max width */}
            {videos.map((video) => (
              <VideoCard
                key={video.id}
                video={video}
                onDownload={handleDownload}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )


}