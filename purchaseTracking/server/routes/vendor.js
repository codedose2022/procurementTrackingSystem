import express from "express";
import {
  addComments,
  finish,
  setStatusOnNext,
  getAllRegistration,
  getNewVendorReg,
} from "../controllers/vendor.js";

const router = express.Router();

router.post("/addComments", addComments);
router.post("/finish", finish);
router.post("/setStatusOnNext", setStatusOnNext);

router.post("/getAllRegistration", getAllRegistration);
router.post("/getNewVendorReg", getNewVendorReg);

export default router;
