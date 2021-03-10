import users from "../models/userSchema.js";
import responseMessageConstants from "../constants/responseMessage.js";
import responseStatusConstants from "../constants/responseStatusCode.js";

export const getUsers = async (req, res) => {
  const responseMessages = {};
  try {
    const usersList = await users
      .find({}, { password: 0 })
      .sort({ createdAt: -1 });

    responseMessages.users = usersList;

    return res.status(200).send(responseMessages);
  } catch (error) {
    responseMessages.message = error.message;
    res.status(404).json(responseMessages);
  }
};

export const createUser = async (req, res) => {
  const responseMessages = {};
  try {
    const user = new users(req.body);
    await user.save();
    const usersList = await users
      .find({}, { password: 0 })
      .sort({ createdAt: -1 });

    responseMessages.message = responseMessageConstants.USER_CREATED;
    responseMessages.status = responseStatusConstants.SUCCESS;
    responseMessages.users = usersList;

    return res.status(200).json(responseMessages);
  } catch (error) {
    responseMessages.message = error.message;
    res.status(404).json(responseMessages);
  }
};

export const deleteUser = async (req, res) => {
  const responseMessages = {};
  try {
    await users.findByIdAndRemove(req.body._id);
    const usersList = await users
      .find({}, { password: 0 })
      .sort({ createdAt: -1 });

    responseMessages.message = responseMessageConstants.USER_DELETED;
    responseMessages.status = responseStatusConstants.SUCCESS;
    responseMessages.users = usersList;

    return res.status(200).send(responseMessages);
  } catch (error) {
    responseMessages.message = error.message;
    res.status(404).json({ responseMessages });
  }
};
