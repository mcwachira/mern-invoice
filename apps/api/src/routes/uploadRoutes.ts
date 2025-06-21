import express, { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import upload from "../helpers/multer";
import cloudinaryUploader from "../config/cloudinaryConfig";

const router = express.Router();

router.patch(
  "/",
  upload.single("logo"),
  asyncHandler(async (req: Request, res: Response): Promise<void> => {
    if (!req.file?.path) {
      res.status(400).json({ error: "No file uploaded" });
      return;
    }

    const localFilePath = req.file.path;

    const result = await cloudinaryUploader(localFilePath);

    if (result.message === "Success") {
      res.status(200).json({
        success: true,
        url: result.url,
      });
    } else {
      res.status(500).json({
        success: false,
        error: "Cloudinary upload failed",
      });
    }
  }),
);

export default router;
