import express from "express";
import {
  approveVendors,
  // getRegistrations,
  // getNewCompanyReg,
  getAllRegistrations,
  addCategory,
  getCategory
} from "../controllers/vendorRegister.js";

const router = express.Router();



//router.post("/getRegistrations", getRegistrations);
 router.post("/approveVendors", approveVendors);
// router.post("/getNewCompanyReg", getNewCompanyReg);
router.post("/getAllRegistrations", getAllRegistrations);addCategory
router.post("/addCategory", addCategory);
router.post("/getCategory", getCategory);

export default router;
