import express from "express";
import auth from "../middleware/auth.js";
import * as serviceRequests from "../controllers/serviceRequests.js";

const router = express.Router();
router.post("/ServiceRequests", serviceRequests.getServiceRequests);

export default router;
