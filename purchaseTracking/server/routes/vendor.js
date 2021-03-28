import express from "express";
import {
  addComments,
  finish,
  setStatusOnNext,
  getAllRegistration,
} from "../controllers/vendor.js";

const router = express.Router();

router.post("/addComments", addComments);
router.post("/finish", finish);
router.post("/setStatusOnNext", setStatusOnNext);

router.post("/getAllRegistration", getAllRegistration);

export default router;
