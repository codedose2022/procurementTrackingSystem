import mongoose from "mongoose";
import bcryptjs from "bcryptjs";
import * as dotenv from "dotenv";
dotenv.config();

const salt = await bcryptjs.genSalt();
const passwordHash = await bcryptjs.hash("Welcome123", salt);

const userSchema = mongoose.Schema(
  {
    name: { type: String, required: [true, "Name is required."] },
    username: {
      type: String,
      lowercase: true,
      required: [true, "Email is required."],
      index: {
        unique: true,
      },
    }, 
    password: {
      type: String,
      default: passwordHash,
    },
    department: { type: String, required: [true, "Department is required."] },
    resetToken: String,
    expireToken: Date,
  },
  { timestamps: true }
);

const users = mongoose.model("users", userSchema);

export default users;