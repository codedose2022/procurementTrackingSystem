import express from "express";
import users from "../models/userSchema.js";
import responseMessageConstants from "../constants/responseMessage.js";
import responseStatusConstants from "../constants/responseStatusCode.js";

const router = express.Router();

// const handleErrors = (error) => {
//   let errors = { name: "", username: "", department: "" };
//   if (error.message.includes("users validation failed")) {
//     Object.values(error.errors).forEach(({ properties }) => {
//       errors[properties.path] = properties.message;
//     });
//   }
//   return errors;
// };

export const getUsers = async (req, res) => {
  const responseMessages = {};
  try {
    const usersList = await users
      .find({ department: { $nin: ["Admin"] } })
      .sort({ createdAt: -1 });

    responseMessages.users = usersList;

    return res.status(200).json(responseMessages);
  } catch (error) {
    responseMessages.message = error.message;
    res.status(404).json(responseMessages);
  }
};

export const createUser = async (req, res) => {
  const responseMessages = {};
  try {
    const existingUser = await users.findOne({ username: req.body.username });
    if (existingUser) {
      responseMessages.message = responseMessageConstants.EXISTING_USER;
      responseMessages.status = responseStatusConstants.EXISTING_USER;
      return res.status(200).json(responseMessages);
    } else {
      const user = new users(req.body);
      await user.save();
      const usersList = await users
        .find({ department: { $nin: ["Admin"] } })
        .sort({ createdAt: -1 });
      responseMessages.message = responseMessageConstants.USER_CREATED;
      responseMessages.status = responseStatusConstants.SUCCESS;
      responseMessages.users = usersList;
      return res.status(200).json(responseMessages);
    }
  } catch (error) {
    responseMessages.message = error.message;
    res.status(404).json(responseMessages);
  }
};

export const deleteUser = async (req, res) => {
  const responseMessages = {};
  try {
    await users.findByIdAndRemove(req.body.id);
    const usersList = await users
      .find({ department: { $nin: ["Admin"] } })
      .sort({ createdAt: -1 });
    responseMessages.message = responseMessageConstants.USER_DELETED;
    responseMessages.status = responseStatusConstants.SUCCESS;
    responseMessages.users = usersList;

    return res.status(200).json(responseMessages);
  } catch (error) {
    responseMessages.message = error.message;
    res.status(404).json(responseMessages);
  }
};

export default router;
