import express from "express";
import { Request, Response, NextFunction } from "express";
import checkAuth from "../middleware/checkAuthMiddlware";
import createCustomer from "../controllers/customers/createCustomer";
import deleteCustomer from "../controllers/customers/deleteCustomer";
import getAllUserCustomers from "../controllers/customers/getAllUserCustomers";
import getSingleUserCustomer from "../controllers/customers/getSingleUserCustomer";
import updateCustomerInfo from "../controllers/customers/updateCustomerInfo";

const router = express.Router();

// create a new customer at /api/v1/customer/create
router.route("/create").post(checkAuth, createCustomer);

// get all of a users customers at /api/v1/customer/all
router.route("/all").get(checkAuth, getAllUserCustomers);

// get, update and delete a customer
router
  .route("/:id")
  .get(checkAuth, getSingleUserCustomer)
  .patch(checkAuth, updateCustomerInfo)
  .delete(checkAuth, deleteCustomer);

export default router;
