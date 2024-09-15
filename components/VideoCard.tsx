// import React,{useState, useEffect, useCallback} from 'react'
// import { getCldImageUrl, getCldVideoUrl } from 'next-cloudinary'
// import { Download, Clock, FileUp, FileDown, Delete, RemoveFormatting } from 'lucide-react'
// import dayjs from 'dayjs'
// import relativeTime from "dayjs/plugin/relativeTime"
// import {filesize} from "filesize"
// import { Video } from '@/types'


 

// dayjs.extend(relativeTime)


// interface VideoCardProps {
//     video: Video
//     onDownload: (url: string, title: string) => void;
    
// }

// const VideoCard: React.FC<VideoCardProps> = ({video, onDownload}) => {

//     const[isHovered, setIsHovered] = useState(false)
//     const [previewError, setPreviewError] = useState(false)

//     const getThumbnailUrl = useCallback((publicId: string) => {
//         return getCldImageUrl({
//             src: publicId,
//             width: 400,
//             height: 225,
//             crop: "fill",
//             gravity: "auto",
//             format: "jpg",
//             quality: "auto",
//             assetType: "video"
//         })
//     }, [])

//     const getFullVideoUrl = useCallback((publicId: string) => {
//         return getCldVideoUrl({
//             src: publicId,
//             width: 1920,
//             height: 1080, 
//         })
//     }, [])

   
//     const getPreviewVideoUrl = useCallback((publicId: string) => {
//         return getCldVideoUrl({
//             src: publicId,
//            width: 400,
//            height: 225,  
//            rawTransformations: 
//            ["e_preview:duration_15:max_seg_9:min_seg_dur_1"] 
//         })
//     }, [])

//     const formatSize =useCallback((size: number) =>{
//         return filesize(size)
//     }, [])

//     const formatDuration = useCallback((seconds: number) => {
//         const minutes = Math.floor(seconds / 60);
//         const remainingSeconds = Math.round(seconds % 60);
//         return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
//       }, []);

//       const compressionPercentage = Math.round(
//         (1 - Number(video.compressedSize) / Number(video.originalSize)) * 100
//       );


//       useEffect(() => {
//         setPreviewError(false);
//       }, [isHovered]);

//       const handlePreviewError = () => {
//         setPreviewError(true);
//       };


//       return (
//         <div
//           className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300"
//           onMouseEnter={() => setIsHovered(true)}
//           onMouseLeave={() => setIsHovered(false)}
//         >
//           <figure className="aspect-video relative">
//             {isHovered ? (
//               previewError ? (
//                 <div className="w-full h-full flex items-center justify-center bg-gray-200">
//                   <p className="text-red-500">Preview not available</p>
//                 </div>
//               ) : (
//                 <video
//                   src={getPreviewVideoUrl(video.publicId)}
//                   autoPlay
//                   muted
//                   loop
//                   className="w-full h-full object-cover"
//                   onError={handlePreviewError}
//                 />
//               )
//             ) : (
//               <img
//                 src={getThumbnailUrl(video.publicId)}
//                 alt={video.title}
//                 className="w-full h-full object-cover"
//               />
//             )}
//             <div className="absolute bottom-2 right-2 bg-base-100 bg-opacity-70 px-2 py-1 rounded-lg text-sm flex items-center">
//               <Clock size={16} className="mr-1" />
//               {formatDuration(video.duration)}
//             </div>
//           </figure>
//           <div className="card-body p-4">
//             <h2 className="card-title text-lg font-bold">{video.title}</h2>
//             <p className="text-sm text-base-content opacity-70 mb-4">
//               {video.description}
//             </p>
//             <p className="text-sm text-base-content opacity-70 mb-4">
//               Uploaded {dayjs(video.createdAt).fromNow()}
//             </p>
//             <div className="grid grid-cols-2 gap-4 text-sm">
//               <div className="flex items-center">
//                 <FileUp size={18} className="mr-2 text-primary" />
//                 <div>
//                   <div className="font-semibold">Original</div>
//                   <div>{formatSize(Number(video.originalSize))}</div>
//                 </div>
//               </div>
//               <div className="flex items-center">
//                 <FileDown size={18} className="mr-2 text-secondary" />
//                 <div>
//                   <div className="font-semibold">Compressed</div>
//                   <div>{formatSize(Number(video.compressedSize))}</div>
//                 </div>
//               </div>
//             </div>
//             <div className="flex justify-between items-center mt-4">
//               <div className="text-sm font-semibold">
//                 Compression:{" "}
//                 <span className="text-accent">{compressionPercentage}%</span>
//               </div>
//               <button
//                 className="btn btn-primary btn-sm"
//                 onClick={() =>
//                   onDownload(getFullVideoUrl(video.publicId), video.title)
//                 }
//               >
//                 <Download size={16} />
//               </button>
//               {/* <button
//           className="btn btn-danger btn-sm bg-red-900"
//           onClick={() => onDelete(video.id)}
//         >
//           <FiTrash2 size={16} />
//         </button> */}
//             </div>
//           </div>
//         </div>
//       );
// }

// export default VideoCard

import React, { useState, useEffect, useCallback } from 'react'
import { getCldImageUrl, getCldVideoUrl } from 'next-cloudinary'
import { Download, Clock, FileUp, FileDown } from 'lucide-react'
import dayjs from 'dayjs'
import relativeTime from "dayjs/plugin/relativeTime"
import { filesize } from "filesize"
import { Video } from '@/types'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card'
import { Button } from "@/components/ui/button"
import { Badge } from './ui/badge'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip"

dayjs.extend(relativeTime)

interface VideoCardProps {
  video: Video | null | undefined
  onDownload: (url: string, title: string) => void
}

const VideoCard: React.FC<VideoCardProps> = ({ video, onDownload }) => {
  const [isHovered, setIsHovered] = useState(false)
  const [previewError, setPreviewError] = useState(false)

  const getThumbnailUrl = useCallback((publicId: string) => {
    return getCldImageUrl({
      src: publicId,
      width: 480,
      height: 270,
      crop: "fill",
      gravity: "auto",
      format: "jpg",
      quality: "auto",
      assetType: "video"
    })
  }, [])

  const getFullVideoUrl = useCallback((publicId: string) => {
    return getCldVideoUrl({
      src: publicId,
      width: 1920,
      height: 1080,
    })
  }, [])

  const getPreviewVideoUrl = useCallback((publicId: string) => {
    return getCldVideoUrl({
      src: publicId,
      width: 480,
      height: 270,
      rawTransformations: ["e_preview:duration_15:max_seg_9:min_seg_dur_1"]
    })
  }, [])

  const formatSize = useCallback((size: number | undefined) => {
    return size ? filesize(size) : 'N/A'
  }, [])

  const formatDuration = useCallback((seconds: number | undefined) => {
    if (typeof seconds !== 'number') return 'N/A'
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = Math.round(seconds % 60)
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`
  }, [])

  const compressionPercentage = (() => {
    const originalSize = Number(video?.originalSize)
    const compressedSize = Number(video?.compressedSize)
    if (isNaN(originalSize) || isNaN(compressedSize) || originalSize === 0) {
      return 'N/A'
    }
    return Math.round((1 - compressedSize / originalSize) * 100)
  })()

  useEffect(() => {
    setPreviewError(false)
  }, [isHovered])

  const handlePreviewError = () => {
    setPreviewError(true)
  }

  if (!video) {
    return (
      <Card className="w-full overflow-hidden transition-all duration-300 hover:shadow-lg">
        <CardContent className="p-6">
          <p className="text-center text-muted-foreground">Video data not available</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card
      className="w-full overflow-hidden transition-all duration-300 hover:shadow-lg"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="aspect-video relative">
        {isHovered ? (
          previewError ? (
            <div className="w-full h-full flex items-center justify-center bg-muted">
              <p className="text-destructive">Preview not available</p>
            </div>
          ) : (
            <video
              src={getPreviewVideoUrl(video.publicId)}
              autoPlay
              muted
              loop
              className="w-full h-full object-cover"
              onError={handlePreviewError}
            />
          )
        ) : (
          <img
            src={getThumbnailUrl(video.publicId)}
            alt={video.title || 'Video thumbnail'}
            className="w-full h-full object-cover"
          />
        )}
        <Badge variant="secondary" className="absolute bottom-3 right-3 flex items-center gap-1">
          <Clock size={14} />
          {formatDuration(video.duration)}
        </Badge>
      </div>
      <CardHeader className="p-5">
        <CardTitle className="text-xl">{video.title || 'Untitled'}</CardTitle>
      </CardHeader>
      <CardContent className="p-5 pt-0">
        <p className="text-sm text-muted-foreground mb-4">{video.description || 'No description'}</p>
        <p className="text-sm text-muted-foreground mb-4">
          Uploaded {video.createdAt ? dayjs(video.createdAt).fromNow() : 'Unknown date'}
        </p>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex items-center">
                  <FileUp size={20} className="mr-2 text-primary" />
                  <div>
                    <div className="font-semibold">Original</div>
                    <div>{formatSize(video.originalSize)}</div>
                  </div>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Original file size</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex items-center">
                  <FileDown size={20} className="mr-2 text-secondary" />
                  <div>
                    <div className="font-semibold">Compressed</div>
                    <div>{formatSize(video.compressedSize)}</div>
                  </div>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Compressed file size</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center p-5">
        <Badge variant="outline" className="text-sm">
          Compression: {compressionPercentage}%
        </Badge>
        <Button
          size="sm"
          onClick={() => onDownload(getFullVideoUrl(video.publicId), video.title || 'video')}
        >
          <Download size={18} className="mr-2" />
          Download
        </Button>
      </CardFooter>
    </Card>
  )
}

export default VideoCard