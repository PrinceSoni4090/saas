import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import { auth } from "@clerk/nextjs/server";

// Configuration
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME, //'dh1a6jawb',
  api_key: process.env.CLOUDINARY_API_KEY, //'746835896581285',
  api_secret: process.env.CLOUDINARY_API_SECRET, //'4-F-73H0CNYSzRk7sAXGrqj65bQ' //
});

interface CloudinaryUploadResult {
    public_id: string;
    [key: string] : any
 }

export async function POST(request: NextRequest) {

    const{userId} =auth()

    if(!userId){
        return NextResponse.json({error: "Unauthorized"},{status:401})
    }

    try {
        const formData = await request.formData()
        const file = formData.get("file") as File | null;
        
        if(!file){
            return NextResponse.json({error: "File not found"},{status:400})
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes)

        const result = await new Promise<CloudinaryUploadResult>((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
                {folder:"next-cloudinary-uploads"},
                (error, result) => {
                 if (error) reject (error);
                 else resolve (result as CloudinaryUploadResult);   
                }
            )
            uploadStream.end(buffer)
        }
    )
    return NextResponse.json({publicId: result.public_id}, {status:200})

    } catch (error) {
        console.log("Upload image failed", error);
        return NextResponse.json({error: "upload image failed"}, {status: 500})
        
    }
}















