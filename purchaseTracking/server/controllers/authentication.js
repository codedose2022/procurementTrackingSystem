import express from "express";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/userSchema.js";
import * as dotenv from "dotenv";
import responseMessageConstants from "../constants/responseMessage.js";
import responseStatusConstants from "../constants/responseStatusCode.js";

dotenv.config();

const router = express.Router();

export const login = async (req, res) => {
  const { password } = req.body;
  const responseData = {};
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      responseData.message = responseMessageConstants.INVALID_EMAIL;
      responseData.status = responseStatusConstants.INVALID_EMAIL;
      return res.status(200).json(responseData);
    }
    const isMatch = await bcryptjs.compare(password, user.password);
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    if (!isMatch) {
      responseData.message = responseMessageConstants.INVALID_PASSWORD;
      responseData.status = responseStatusConstants.INVALID_PASSWORD;
      return res.status(200).json(responseData);
    }
    responseData.message = responseMessageConstants.LOGIN_SUCCESS;
    responseData.status = responseStatusConstants.SUCCESS;
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
      responseData.message = responseMessageConstants.INVALID_PASSWORD;
      responseData.status = responseStatusConstants.INVALID_PASSWORD;

      return res.status(200).json(responseData);
    }
    if (newPassword != confirmPassword) {
      responseData.message = responseMessageConstants.PASSWORD_UNMATCHED;
      responseData.status = responseStatusConstants.PASSWORD_UNMATCHED;
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
    responseData.message = responseMessageConstants.PASSWORD_UPDATED;
    responseData.status = responseStatusConstants.SUCCESS;
    return res.status(200).json(responseData);
  } catch (error) {
    responseData.message = error.message;
    return res.status(404).json(responseData);
  }
};

export default router;
