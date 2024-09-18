import React from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"

interface VideoPreviewProps {
  url: string
  title: string
  description: string
}

const VideoPreview: React.FC<VideoPreviewProps> = ({ url, title, description }) => {
  return (
    <Card className="w-full">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <video className="w-full rounded-lg" controls>
          <source src={url} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <p className="mt-4 text-sm text-muted-foreground">{description}</p>
      </CardContent>
      <CardFooter className="flex justify-center">
        <a href={url} download className="w-full max-w-xs">
          <Button size="lg" className="w-full">
            <Download className="mr-2 h-4 w-4" />
            Download Video
          </Button>
        </a>
      </CardFooter>
    </Card>
  )
}

export default VideoPreview