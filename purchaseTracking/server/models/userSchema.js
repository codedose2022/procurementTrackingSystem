import mongoose from "mongoose";
import bcryptjs from "bcryptjs";
import * as dotenv from "dotenv";
dotenv.config();

const salt = await bcryptjs.genSalt();
const passwordHash = await bcryptjs.hash("Welcome123", salt);

const userSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    username: { type: String, required: true },
    password: {
      type: String,
      default: passwordHash,
    },
    department: { type: String, required: true },
    resetToken: String,
    expireToken: Date,
  },
  { timestamps: true }
);

const users = mongoose.model("users", userSchema);

export default users;
