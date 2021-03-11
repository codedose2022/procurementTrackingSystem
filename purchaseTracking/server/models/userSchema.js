import mongoose from "mongoose";
import validator from "validator";
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
      required: [true, "Username is required."],
      index: {
        unique: true,
      },
      validate: [validator.isEmail, "Please enter a valid email"],
    },
    password: {
      type: String,
      select:false,
      default: passwordHash,
    },
    department: { type: String, required: [true, "Department is required."] },
    resetToken: String,
    expireToken: Date,
  },
  { timestamps: true }
);

userSchema.path("username").validate(async (username) => {
  const usernameCount = await mongoose.models.users.countDocuments({
    username,
  });
  return !usernameCount;
}, "Username already exists.!");

const users = mongoose.model("users", userSchema);

export default users;
