import express from "express";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/userSchema.js";
import * as dotenv from "dotenv";
import crypto from "crypto";
import responseMessageConstants from "../constants/responseMessage.js";
import responseStatusConstants from "../constants/responseStatusCode.js";
import { sendEmail } from "../mail.js";

dotenv.config();

const router = express.Router();

export const login = async (req, res) => {
  const { password } = req.body;
  const responseData = {};
  try {
    const user = await User.findOne({ username: req.body.username }).select("+password");
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
    const user = await User.findOne({ username: username }).select("+password");
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

export const sendResetLink = async (req, res) => {
  const responseData = {};
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      responseData.message = responseMessageConstants.INVALID_EMAIL;
      responseData.status = responseStatusConstants.INVALID_EMAIL;
      return res.status(200).json(responseData);
    } else {
      crypto.randomBytes(32, (err, buffer) => {
        if (err) {
          responseData.message = err;
          return res.status(200).json(responseData);
        }
        const token = buffer.toString("hex");
        try {
          User.updateOne(
            {
              username: user.username,
            },
            {
              $set: {
                resetToken: token,
                expireToken: Date.now() + 1800000,
              },
            }
          ).then(async(result) => {
            sendEmail(req.body.username, user.name, "ForgetPassword", token);
          });
          responseData.message = responseMessageConstants.RESET_LINK;
          responseData.status = responseStatusConstants.SUCCESS;
          return res.status(200).json(responseData);
        } catch (e) {
          responseData.message = e.message;
          return res.status(200).json(responseData);
        }
      });
    }
  } catch (error) {
    responseData.message = error.message;
    return res.status(404).json(responseData);
  }
};

export const resetPassword = async (req, res) => {
  let salt = "";
  let passwordHash = "";
  const responseData = {};
  const { key, newPassword, confirmPassword } = req.body;

  try {
    const user = await User.findOne({
      resetToken: key,
      expireToken: { $gt: Date.now() },
    });
    if (!user) {
      responseData.message = responseMessageConstants.INVALID_LINK;
      responseData.status = responseStatusConstants.FAILURE;
      return res.status(200).json(responseData);
    } else {
      if (newPassword != confirmPassword) {
        responseData.message = responseMessageConstants.PASSWORD_UNMATCHED;
        responseData.status = responseStatusConstants.PASSWORD_UNMATCHED;
        return res.status(200).json(responseData);
      }
      salt = await bcryptjs.genSalt();
      passwordHash = await bcryptjs.hash(confirmPassword, salt);
      await User.updateOne(
        {
          username: user.username,
        },
        {
          $set: {
            password: passwordHash,
            resetToken: undefined,
            expireToken: undefined,
          },
        }
      );

      responseData.message = responseMessageConstants.PASSWORD_UPDATED;
      responseData.status = responseStatusConstants.SUCCESS;
      return res.status(200).json(responseData);
    }
  } catch (error) {
    responseData.message = error.message;
    return res.status(404).json(responseData);
  }
};
export default router;
