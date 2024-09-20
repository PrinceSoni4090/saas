
// import { NextRequest, NextResponse } from "next/server";
// import { v2 as cloudinary } from "cloudinary";
// import { auth } from "@clerk/nextjs/server";
// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient()

// // Configuration
// cloudinary.config({
//   cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME, 
//   api_key: process.env.CLOUDINARY_API_KEY, 
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// interface CloudinaryUploadResult {
//     public_id: string;
//     [key: string] : any
//     bytes: number
//     duration?: number
//     secure_url: string // Add this line
// }

// export async function POST(request: NextRequest) {
//     try {
//         const { userId } = auth()

//         if (!userId) {
//             return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
//         }

//         if (
//             !process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ||
//             !process.env.CLOUDINARY_API_KEY ||
//             !process.env.CLOUDINARY_API_SECRET
//         ) {
//             return NextResponse.json({ error: "Cloudinary credentials not found" }, { status: 500 })
//         }

//         const formData = await request.formData()
//         const file = formData.get("file") as File | null;
//         const title = formData.get("title") as string;
//         const description = formData.get("description") as string;
//         const originalSize = formData.get("originalSize") as string;
        
//         if (!file) {
//             return NextResponse.json({ error: "File not found" }, { status: 400 })
//         }

//         const bytes = await file.arrayBuffer();
//         const buffer = Buffer.from(bytes)

//         const result = await new Promise<CloudinaryUploadResult>((resolve, reject) => {
//             const uploadStream = cloudinary.uploader.upload_stream(
//                 {
//                     resource_type: "video",
//                     folder: "video-uploads",
//                     transformation: [
//                         { quality: "auto", fetch_format: "mp4" },
//                     ]
//                 },
//                 (error, result) => {
//                     if (error) reject(error);
//                     else resolve(result as CloudinaryUploadResult);   
//                 }
//             )
//             uploadStream.end(buffer)
//         })

//         const video = await prisma.video.create({
//             data: {
//                 title, 
//                 description,
//                 publicId: result.public_id,
//                 originalSize: originalSize,
//                 compressedSize: String(result.bytes),
//                 duration: result.duration || 0,
//                 // url: result.secure_url,
//                 // userId,
//             }
//         })

//         console.log("Created video:", video); 

//         return NextResponse.json(video)
//     } catch (error) {
//         console.error("Upload video failed", error);
//         return NextResponse.json({ error: "Upload video failed" }, { status: 500 })
//     } finally {
//         await prisma.$disconnect()
//     }
// }

import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary, UploadApiOptions } from "cloudinary";
import { auth } from "@clerk/nextjs/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

// Configuration
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

interface CloudinaryUploadResult {
    public_id: string;
    [key: string] : any
    bytes: number
    duration?: number
    secure_url: string
    format: string
    width: number
    height: number
}

export async function POST(request: NextRequest) {
    try {
        const { userId } = auth()

        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        if (
            !process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ||
            !process.env.CLOUDINARY_API_KEY ||
            !process.env.CLOUDINARY_API_SECRET
        ) {
            return NextResponse.json({ error: "Cloudinary credentials not found" }, { status: 500 })
        }

        const formData = await request.formData()
        const file = formData.get("file") as File | null;
        const title = formData.get("title") as string;
        const description = formData.get("description") as string;
        const originalSize = formData.get("originalSize") as string;
        
        if (!file) {
            return NextResponse.json({ error: "File not found" }, { status: 400 })
        }

        const MAX_FILE_SIZE = 100 * 1024 * 1024; // 100MB
        if (file.size > MAX_FILE_SIZE) {
            return NextResponse.json({ error: "File size exceeds the maximum limit of 100MB." }, { status: 400 });
        }

        const allowedTypes = ['video/mp4', 'video/quicktime', 'video/x-msvideo', 'video/x-ms-wmv'];
        if (!allowedTypes.includes(file.type)) {
            return NextResponse.json({ error: "Invalid file type. Please upload a valid video file." }, { status: 400 });
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes)

        const uploadOptions: UploadApiOptions = {
            resource_type: "video" as const,
            folder: "video-uploads",
            transformation: [
                { quality: "auto", fetch_format: "mp4" },
                { codec: "h264" },
                { audio_codec: "aac" }
            ],
            eager: [
                { format: "mp4", transformation: [
                    { width: 640, crop: "scale" },
                    { quality: "auto" }
                ]}
            ],
            eager_async: true,
            eager_notification_url: "https://your-api.com/cloudinary-notification-endpoint" // Replace with your actual endpoint
        };

        const result = await new Promise<CloudinaryUploadResult>((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
                uploadOptions,
                (error, result) => {
                    if (error) {
                        console.error("Cloudinary upload error:", error);
                        reject(new Error(`Cloudinary upload failed: ${error.message}`));
                    }
                    else resolve(result as CloudinaryUploadResult);   
                }
            )
            uploadStream.end(buffer)
        })

        const video = await prisma.video.create({
            data: {
                title, 
                description,
                publicId: result.public_id,
                originalSize: originalSize,
                compressedSize: String(result.bytes),
                duration: result.duration || 0,
                // format: result.format,
                // width: result.width,
                // height: result.height,
                // url: result.secure_url,
                // userId,
            }
        })

        console.log("Created video:", video); 

        return NextResponse.json({
            ...video,
            url: result.secure_url,
            format: result.format,
            width: result.width,
            height: result.height
        })
    } catch (error) {
        console.error("Upload video failed", error);
        return NextResponse.json({ error: "Upload video failed" }, { status: 500 })
    } finally {
        await prisma.$disconnect()
    }
}











