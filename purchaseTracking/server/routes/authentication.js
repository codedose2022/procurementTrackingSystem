import express from "express";
import auth from "../middleware/auth.js";
import * as authActions from "../controllers/authentication.js";



const router = express.Router();
router.post("/login", authActions.login);
router.post("/changePassword", authActions.changePassword);

export default router;
