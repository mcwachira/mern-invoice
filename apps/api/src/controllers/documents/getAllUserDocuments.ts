import asyncHandler from "express-async-handler";
import Document from "../../models/documentModel";
import { Request, Response } from "express";

// $-title   Get All  User Documents
// $-path    Get /api/v1/document/
// $-auth    Private

const getAllUserDocuments = asyncHandler(
  async (req: Request, res: Response) => {
    if (!req.user) {
      res.status(401);
      throw new Error("Unauthorized: No user info in request");
    }

    const pageSize = 10;
    const page = Number(req.query.page) || 1;
    const count = await Document.countDocuments({ createdBy: req.user._id });

    const documents = await Document.find({
      createdBy: req.user._id,
    })
      .sort({
        createdAt: -1,
      })
      .limit(pageSize)
      .skip(pageSize * (page - 1))
      .lean();

    res.json({
      success: true,
      totlaDocuments: count,
      numberOfPages: Math.ceil(count / pageSize),
      myDocuments: documents,
    });
  },
);

export default getAllUserDocuments;
