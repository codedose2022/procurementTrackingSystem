import express from "express";
import mongoose from "mongoose";
import ServiceRequests from "../models/serviceRequestSchema.js";
import Users from "../models/userSchema.js";
import constants from "../constants/constants.js";
import responseStatusConstants from "../constants/responseStatusCode.js";

const router = express.Router();

export const getServiceRequests = async (req, res) => {
  try {
    const serviceRequestsList = [];
    const responseData = {};
    const user = await Users.findOne({ _id: req.body.userId });
    if(user.department!== constants.ADMIN){
      serviceRequestsList = await ServiceRequests.find({ userId: req.body.userId}).sort({ updatedAt: -1 });
    }
    else{
      serviceRequestsList = await ServiceRequests.find().sort({ updatedAt: -1 });
    }
    responseData.status = responseStatusConstants.SUCCESS;
    return res.status(200).send(results);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};




export default router;