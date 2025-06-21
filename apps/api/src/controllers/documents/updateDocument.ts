import asyncHandler from "express-async-handler";
import Document from "../../models/documentModel";
import { Request, Response } from "express";

// $-title   Update Document
// $-path    Patch /api/v1/document/:id
// $-auth    Private

const updateDocument = asyncHandler(async (req: Request, res: Response) => {
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
      "You are not authorized to update this document's information.Its is not your document",
    );
  }

  // const { id: _id } = req.params;

  const fieldsToUpdate = req.body;

  const updatedDocument = await Document.findByIdAndUpdate(
    req.params.id,
    req.body,

    { new: true, runValidators: true },
  );

  res.status(200).json({
    success: true,
    message: `Your ${updatedDocument?.documentType}'s info was updated `,
  });
});

export default updateDocument;
