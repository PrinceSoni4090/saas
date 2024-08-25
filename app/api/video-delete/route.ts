import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { v2 as cloudinary } from 'cloudinary';

const prisma = new PrismaClient();

export async function DELETE(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Extract video ID from query parameters
    const { id } = req.query;

    if (!id || typeof id !== 'string') {
      return res.status(400).json({ error: 'Invalid video ID' });
    }

    // Fetch the video from the database using Prisma
    const video = await prisma.video.findUnique({
      where: { id },
    });

    if (!video) {
      return res.status(404).json({ error: 'Video not found' });
    }

    // Delete the video from Cloudinary
    await cloudinary.uploader.destroy(video.publicId, {
      resource_type: 'video',
    });

    // Delete the video record from the database
    await prisma.video.delete({
      where: { id },
    });

    return res.status(200).json({ message: 'Video deleted successfully' });
  } catch (error) {
    console.error('Error deleting video:', error);
    return res.status(500).json({ error: 'Internal server error' });
  } finally {
    await prisma.$disconnect();
  }
}

