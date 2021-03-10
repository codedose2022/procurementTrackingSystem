import express from "express";
import { createUser,getUsers,deleteUser } from "../controllers/admin.js";

const router = express.Router();


router.post("/createUser", createUser);
router.post("/getUsers", getUsers);
router.post("/deleteUser", deleteUser);


export default router;
