import express from "express";
import auth from "../middleware/auth.js";
import * as serviceRequests from "../controllers/serviceRequests.js";

const router = express.Router();
router.post("/getServiceRequests", auth, serviceRequests.getServiceRequests);
router.post("/createServiceRequests", auth, serviceRequests.createServiceRequests);
router.post("/updateServiceRequests", auth, serviceRequests.updateServiceRequests);

export default router;
