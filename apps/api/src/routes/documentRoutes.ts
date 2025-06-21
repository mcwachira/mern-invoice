import express from "express";
import { Request, Response, NextFunction } from "express";
import checkAuth from "../middleware/checkAuthMiddlware";
import createDocument from "../controllers/documents/createDocument";
import deleteDocument from "../controllers/documents/deleteDocument";
import getAllUserDocuments from "../controllers/documents/getAllUserDocuments";
import getSingleUserDocument from "../controllers/documents/getSingleUserDocument";
import updateDocument from "../controllers/documents/updateDocument";

const router = express.Router();

// create a new customer at /api/v1/customer/create
router.route("/create").post(checkAuth, createDocument);

// get all of a users customers at /api/v1/customer/all
router.route("/all").get(checkAuth, getAllUserDocuments);

// get, update and delete a customer
router
  .route("/:id")
  .get(checkAuth, getSingleUserDocument)
  .patch(checkAuth, updateDocument)
  .delete(checkAuth, deleteDocument);

export default router;
