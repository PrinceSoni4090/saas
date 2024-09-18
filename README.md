# CLoudify Media - Video Compressor and Social Media Image Formatter App

## Description

CLoudify Media is a web-based tool that offers two main functionalities:
1. A video compression tool that allows users to upload videos, compress them, and download the compressed versions.
2. A social media image formatter that enables users to crop and resize images for various social media platforms.

It's designed to help users optimize their media content for sharing and storage, reducing file sizes while maintaining quality. The app features user authentication to provide a personalized and secure experience.

## Features

### User Authentication
- **Secure Login**: User authentication implemented using Clerk.
- **Personalized Experience**: Users can access their own media library and settings.

### Video Compression

- **Video Upload**: Users can upload video files directly through the interface.
- **Automatic Compression**: Uploaded videos are automatically compressed in the background.
- **File Size Limit**: Enforces a maximum file size of 70MB for uploads.
- **Progress Tracking**: Displays upload progress in real-time.
- **Video Preview**: After processing, users can preview the compressed video.
- **Download Option**: Compressed videos can be downloaded directly from the interface.
- **Optional Metadata**: Users can add titles and descriptions to their videos.
- **Social Sharing**: Ability to share compressed videos on social media platforms.

### Social Media Image Formatter

- **Image Upload**: Users can upload image files for formatting.
- **Multiple Format Options**: Supports various social media image formats (e.g., Instagram Square, Twitter Header).
- **Real-time Preview**: Shows a live preview of the formatted image.
- **Aspect Ratio Maintenance**: Automatically maintains the correct aspect ratio for each format.
- **Download Option**: Formatted images can be downloaded in the selected social media format.

## Project Structure

- `app/(app)/video-upload/page.tsx`: Main component for video upload functionality.
- `app/(app)/social-share/page.tsx`: Component for social media image formatting features.
- `app/(app)/video-upload/video-preview.tsx`: Component for previewing uploaded videos.
- `app/api/video-upload/route.ts`: API route handler for video upload and processing.
- `app/api/videos/route.ts`: API route for managing video data.
- `app/api/image-upload/route.ts`: API route handler for image upload and processing.

## Technology Stack

- **Frontend**: React with Next.js
- **UI Components**: Custom UI components (Shadcn, Aceternity UI)
- **API Handling**: Axios for HTTP requests
- **State Management**: React Hooks (useState, useEffect, etc)
- **Styling**: Tailwind CSS
- **Notifications**: React Hot Toast for user feedback
- **Image Processing**: Cloudinary for image transformations
- **Authentication**: Clerk for user authentication and management

## How It Works

### User Authentication
1. Users sign up or log in using Clerk authentication.
2. Upon successful authentication, users gain access to their personalized dashboard.

### Video Compression

1. Authenticated users enter optional title and description for their video.
2. They select a video file to upload (max 70MB).
3. The app automatically starts uploading and processing the video.
4. Upload progress is displayed in real-time.
5. Once processed, the compressed video is displayed for preview.
6. Users can then download the compressed video or share it on social media.

### Social Media Image Formatting

1. Authenticated users upload an image file.
2. They select the desired social media format from the provided options.
3. The app displays a real-time preview of the formatted image.
4. Users can adjust the crop or try different formats as needed.
5. Once satisfied, users can download the formatted image for use on their chosen platform.

## Setup and Installation

(Include instructions for setting up the project locally, including Clerk authentication setup)

## API Endpoints

- `/api/video-upload`: Handles video upload and processing
- `/api/videos`: Manages video data (likely for retrieval and listing)
- `/api/image-upload`: Handles image upload and formatting

## Future Improvements

- Allow custom compression settings for videos
- Expand social media format options for images
- Implement batch processing for multiple images or videos
- Add filters and basic editing tools for images
- Implement a user dashboard for managing uploaded media

## Contributing

(Include guidelines for contributing to the project)

## License

(Specify the license under which the project is released)