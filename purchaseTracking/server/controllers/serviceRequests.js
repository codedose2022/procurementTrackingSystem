import express from "express";
import mongoose from "mongoose";
import ServiceRequests from "../models/serviceRequestSchema.js";
import Users from "../models/userSchema.js";
import constants from "../constants/constants.js";
import responseMessageConstants from "../constants/responseMessage.js";
import responseStatusConstants from "../constants/responseStatusCode.js";
import { getRefNum } from "../helper/util.js";
import _ from "lodash";

const router = express.Router();

export const getServiceRequests = async (req, res) => {
  //"userId":"604877b6057ad41cb87b62aa"
  let responseData = {};
  try {
    let serviceRequestsList = [];
    const user = await Users.findOne({ _id: req.body.userId });
    if ([constants.ADMIN, constants.PR].includes(user.department)) {
      serviceRequestsList = await ServiceRequests.find().sort({
        createdAt: -1,
      });
    } else {
      serviceRequestsList = await ServiceRequests.find({
        userId: req.body.userId,
      }).sort({ createdAt: -1 });
    }
    responseData.status = responseStatusConstants.SUCCESS;
    responseData.serviceRequestsList = serviceRequestsList;
    return res.status(200).send(responseData);
  } catch (error) {
    responseData.message = error.message;
    return res.status(404).json(responseData);
  }
};

export const createServiceRequests = async (req, res) => {
  // details,requestorName, userId
  let responseData = {};
  try {
    const latestRequest = await ServiceRequests.find().sort({
      createdAt: -1,
    });
    let details = req.body.details;
    details.map((detail) => {
      detail.status = constants.NEW;
      detail.poNumber = "";
      detail.vendorName = "";
      detail.vendorNumber = "";
    });
    const referenceNum = latestRequest.length
      ? latestRequest[0].refNum
      : constants.REFERENCE_NUM;
    const serviceObj = {
      sNo: latestRequest.length + 1,
      requestorName: req.body.requestorName,
      refNum: getRefNum(referenceNum),
      details: details,
      userId: req.body.userId,
    };
    const newReq = new ServiceRequests(serviceObj);
    await newReq.save();
   
    responseData.message = responseMessageConstants.SERVICE_REQUEST_CREATED;
    responseData.status = responseStatusConstants.SUCCESS;
    
    return res.status(200).send(responseData);
  } catch (error) {
    responseData.message = error.message;
    return res.status(404).json(responseData);
  }
};

export const updateServiceRequests = async (req, res) => {
  // serviceRequestId, detailsId, property to change.
  let responseData = {};
  const reqKey = Object.keys(req.body)[0];
  const key = `details.$.${reqKey}`;
  const value = Object.values(req.body)[0];
  const serviceReqId = req.header("serviceRequestId");
  const detailsId = req.header("detailsId");
  try {
    const updates = {
      [key]: value,
    };
    if (["comments", "reply"].includes(reqKey)) {
      ServiceRequests.findOneAndUpdate(
        { _id: serviceReqId, "details._id": detailsId },
        {
          $push: updates,
        }
      ).exec((err, successres) => {
        if (successres) {
          responseData.message =
            responseMessageConstants.COMMENTS_ADDED_SUCCESS;
          responseData.status = responseStatusConstants.SUCCESS;
          return res.status(200).json(responseData);
        }
      });
    } else {
      ServiceRequests.findOneAndUpdate(
        { _id: serviceReqId, "details._id": detailsId },
        {
          $set: updates,
        }
      ).exec((err, successres) => {
        if (successres) {
          responseData.message =
            responseMessageConstants.SERVICE_REQUEST_UPDATED;
          responseData.status = responseStatusConstants.SUCCESS;
          return res.status(200).json(responseData);
        }
      });
    }
  } catch (error) {
    responseData.status = responseStatusConstants.FAILURE;
    responseData.message = responseMessageConstants.INVALID_ID;
    return res.status(404).json(responseData);
  }
};

export default router;
