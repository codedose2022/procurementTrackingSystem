import express from "express";
import mongoose from "mongoose";
import ServiceRequests from "../models/serviceRequestSchema.js";
import Users from "../models/userSchema.js";
import constants from "../constants/constants.js";
import responseMessageConstants from "../constants/responseMessage.js";
import responseStatusConstants from "../constants/responseStatusCode.js";
import { getRefNum } from "../helper/util.js";

const router = express.Router();

export const getServiceRequests = async (req, res) => {
  //"userId":"604877b6057ad41cb87b62aa"
  let responseData = {};
  try {
    let serviceRequestsList = [];
    const user = await Users.findOne({ _id: req.body.userId });
    if (user.department === constants.ADMIN) {
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
    const serviceRequestsList = await ServiceRequests.find().sort({
      createdAt: -1,
    });
    responseData.message = responseMessageConstants.SERVICE_REQUEST_CREATED;
    responseData.status = responseStatusConstants.SUCCESS;
    responseData.serviceRequestsList = serviceRequestsList;
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
  const value = JSON.stringify(Object.values(req.body)[0]);
  const serviceReqId = req.header("serviceRequestId");
  const detailsId = req.header("detailsId");
  try {
    const serviceRequest = await ServiceRequests.findOne({
      _id:serviceReqId,
});
    const detailList = serviceRequest.details;
    detailList.map(async(detail, index) => {
      if(detail._id == detailsId){
       let path = JSON.stringify(`details.${index}.${reqKey}`);
    //  let path = JSON.stringify(`details.${index}`);
      const z = `{${reqKey} : ${value} }`;
      console.log(z)
      console.log(path)
        try {
          await ServiceRequests.updateOne(
            {_id:serviceReqId},
            {
              $set: {
                path: {status : "bad" }
        
              },
            }
            
          )
        } catch (error) {
        }
      }
    });
  } catch (error) {
    responseData.status = responseStatusConstants.FAILURE;
    responseData.message = responseMessageConstants.INVALID_ID;
    return res.status(404).json(responseData);
  }
};

export default router;
