import asyncHandler from "express-async-handler";
import Document from "../../models/documentModel";
import { Request, Response } from "express";

// $-title   Get Single  Documents
// $-path    Get /api/v1/document/:id
// $-auth    Private

const getSingleUserDocument = asyncHandler(
  async (req: Request, res: Response) => {
    if (!req.user) {
      res.status(401);
      throw new Error("Unauthorized: No user info in request");
    }

    const document = await Document.findById(req.params.id);

    const user = req.user._id;

    if (!document) {
      res.status(204);
      throw new Error("Document not found");
    }

    if (document.id !== user) {
      res.status(200).json({
        success: true,
        document,
      });
    } else {
      res.status(401);
      throw new Error(
        "You are not authorized to view this document information as they are not your document",
      );
    }
  },
);

export default getSingleUserDocument;
