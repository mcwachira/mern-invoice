import { v2 as cloudinary, UploadApiResponse } from "cloudinary";
import "dotenv/config";
import fs from "fs";

// Define the return type for better clarity
type CloudinaryUploadSuccess = {
  message: "Success";
  url: string;
};

type CloudinaryUploadFail = {
  message: "Fail";
};

type CloudinaryUploadResult = CloudinaryUploadSuccess | CloudinaryUploadFail;

// Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET, // Click 'View API Keys' above to copy your API secret
});

const cloudinaryUploader = async function uploadToCloudinary(
  localFilePath: string,
): Promise<CloudinaryUploadResult> {
  const mainFolderName = "merninvoice";
  const filePathOnCloudinary = `${mainFolderName}/${localFilePath}`;

  try {
    const result: UploadApiResponse = await cloudinary.uploader.upload(
      localFilePath,
      {
        public_id: filePathOnCloudinary,
      },
    );

    fs.unlinkSync(localFilePath); // Clean up local file

    return {
      message: "Success",
      url: result.url,
    };
  } catch (error) {
    fs.unlinkSync(localFilePath); // Clean up even on failure

    return { message: "Fail" };
  }
};

export default cloudinaryUploader;
