import express from "express";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/userSchema.js";
import * as dotenv from "dotenv";
import authMessageConstants from "../constants/authMessage.js";
import authStatusConstants from "../constants/authStatusCode.js";

dotenv.config();

const router = express.Router();

export const login = async (req, res) => {
  const { password } = req.body;
  const responseData = {};
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      responseData.message = authMessageConstants.INVALID_EMAIL;
      responseData.status = authStatusConstants.INVALID_EMAIL;
      return res.status(200).json(responseData);
    }
    const isMatch = await bcryptjs.compare(password, user.password);
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    if (!isMatch) {
      responseData.message = authMessageConstants.INVALID_PASSWORD;
      responseData.status = authStatusConstants.INVALID_PASSWORD;
      return res.status(200).json(responseData);
    }
    responseData.message = authMessageConstants.LOGIN_SUCCESS;
    responseData.status = authStatusConstants.SUCCESS;
    responseData.token = token;
    delete user._doc.password;
    responseData.userInfo = user;
    return res.status(200).json(responseData);
  } catch (error) {
    responseData.message = error.message;
    return res.status(404).json(responseData);
  }
};

export const changePassword = async (req, res) => {
  const { username, password, newPassword, confirmPassword } = req.body;
  let salt = "";
  let passwordHash = "";
  const responseData = {};
  try {
    const user = await User.findOne({ username: username });
    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch) {
      responseData.message = authMessageConstants.INVALID_PASSWORD;
      responseData.status = authStatusConstants.INVALID_PASSWORD;

      return res.status(200).json(responseData);
    }
    if (newPassword != confirmPassword) {
      responseData.message = authMessageConstants.PASSWORD_UNMATCHED;
      responseData.status = authStatusConstants.PASSWORD_UNMATCHED;
      return res.status(200).json(responseData);
    }

    salt = await bcryptjs.genSalt();
    passwordHash = await bcryptjs.hash(confirmPassword, salt);
    await User.updateOne(
      {
        username: username,
      },
      {
        $set: { password: passwordHash },
      }
    );
    responseData.message = authMessageConstants.PASSWORD_UPDATED;
    responseData.status = authStatusConstants.SUCCESS;
    return res.status(200).json(responseData);
  } catch (error) {
    responseData.message = error.message;
    return res.status(404).json(responseData);
  }
};

export default router;
