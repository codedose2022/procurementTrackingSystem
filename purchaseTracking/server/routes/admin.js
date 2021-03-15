import express from "express";
import auth from '../middleware/auth.js';
import { createUser, getUsers, deleteUser } from "../controllers/admin.js";

const router = express.Router();

router.post("/createUser", auth,createUser);
router.post("/getUsers", auth,getUsers);
router.post("/deleteUser", auth,deleteUser);

export default router;
