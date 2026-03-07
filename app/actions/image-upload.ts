"use server";
import { api } from "@/lib/constants";
import { StartupInfo } from "@/types/types";
import axios from "axios";
import { cookies } from "next/headers";

export const getStartupsWithoutImage = async ({
  token,
}: {
  token: string;
}): Promise<{ startups: StartupInfo[] } | null> => {
  try {
    const response = await axios.get(`${api}/fetcher/fetch-all-startups`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data as { startups: StartupInfo[] };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Extract the specific error message from your backend's JSON response
      const backendError =
        error.response?.data?.error || "Signup failed due to a server error.";
      // Throw a new, simple error with that specific message
      console.log(backendError);
      return null;
    }
    // For any other kind of error, just re-throw it
    return null;
  }
};
export const uploadImage = async ({
  image,
  startupId,
}: {
  image: string;
  startupId: string;
}): Promise<{ msg: string } | null> => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("user-token")?.value;
    if (!token) {
      return null;
    }
    console.log(token)
    const response = await axios.patch(
      `${api}/fetcher/upload-image/${startupId}`,
      {
        imageUrl: image,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data as { msg: string };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Extract the specific error message from your backend's JSON response
      const backendError =
        error.response?.data?.error || "Upload failed due to a server error.";
      // Throw a new, simple error with that specific message
      console.log(backendError);
      return null;
    }
    // For any other kind of error, just re-throw it
    return null;
  }
};


import { v2 as cloudinary } from 'cloudinary';
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// This is your new delete function. No more axios!
export const handleDeleteImage = async (publicId: string) => {
  if (!publicId) {
    return { error: "No publicId provided." };
  }
  try {
    // Call Cloudinary directly from your Server Action
    const result = await cloudinary.uploader.destroy(publicId);
    return { success: true, result };

  } catch (error) {
    console.error("Error deleting image:", error);
    return { error: "Failed to delete image." };
  }
};