import asyncHandler from "express-async-handler";
import Document from "../../models/documentModel";
import { Request, Response } from "express";

// $-title  Delete Document
// $-path    Delete /api/v1/document/:id
// $-auth    Private

const deleteDocument = asyncHandler(async (req: Request, res: Response) => {
  const document = await Document.findById(req.params.id);

  if (!document) {
    res.status(404);
    throw new Error("That document does not exist");
  }

  if (!req.user) {
    res.status(401);
    throw new Error("Unauthorized: No user info in request");
  }

  if (document.createdBy.toString() !== req.user.id) {
    res.status(401);

    throw new Error(
      "You are not authorized to delete this document .He/She is not your document",
    );
  }

  await document.deleteOne();

  res.status(200).json({
    success: true,
    message: `${document.documentType}'s was succesfully deleted`,
  });
});

export default deleteDocument;
