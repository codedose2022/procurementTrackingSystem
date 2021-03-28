import express from "express";
import vendorRegistrations from "../models/vendorReg/vendorRegistrationSchema.js";
import initRegistrations from "../models/vendorReg/initRegistrationSchema.js";
import responseMessageConstants from "../constants/responseMessage.js";
import responseStatusConstants from "../constants/responseStatusCode.js";
import _ from "lodash";
import { getAllStatus, checkIfEmpty } from "../helper/util.js";

//procurement
export const addComments = async (req, res) => {
  /*{
    
    "licenseCopy": "ggg",
    "vendorId": "605aced40e24a239548ade4a",
     "sectionName": "companyInfo",
    flag : 'A' // adding or deleting the field with comments


    contactInfo / ownersInfo
    {
    "fieldName": "fieldValue",
    "vendorId": "605c3d3d88680b19e455d90d",
    "sectionName": "contactInfo",
    "flag" : "A",
    "conditionId" : "605ed4f20ebc8d077c7b535d"
}
} */
  let responseData = {};
  try {
    const fieldName = Object.keys(req.body)[0];
    const fieldValue = Object.values(req.body)[0];
    let sectionName = req.body.sectionName;
    let key = `${sectionName}.comments.${fieldName}`;
    let condition = "";
    if (sectionName === "contactInfo") {
      key = `contactInfo.contacts.$.comments.${fieldName}`;
      condition = "contactInfo.contacts._id";
    }
    if (sectionName === "ownerInfo") {
      key = `ownerInfo.owners.$.comments.${fieldName}`;
      condition = "ownerInfo.owners._id";
    }

    if (req.body.flag === "A") {
      //adding comments as value and the fieldName as key to update the document
      const updates = {
        [key]: fieldValue,
      };

      if (["contactInfo", "ownerInfo"].includes(sectionName)) {
        await vendorRegistrations.updateOne(
          {
            _id: req.body.vendorId,
            [condition]: req.body.conditionId,
          },

          {
            $set: updates,
          }
        );
      } else {
        await vendorRegistrations.updateOne(
          {
            _id: req.body.vendorId,
          },

          {
            $set: updates,
          }
        );
      }

      responseData.message = responseMessageConstants.COMMENTS_ADDED_SUCCESS;
      responseData.status = responseStatusConstants.SUCCESS;
    }
    if (req.body.flag === "D") {
      // deleting the comments
      const updates1 = {
        [key]: 1,
      };

      if (["contactInfo", "ownerInfo"].includes(sectionName)) {
        await vendorRegistrations.updateOne(
          {
            _id: req.body.vendorId,
            [condition]: req.body.conditionId,
          },

          {
            $unset: updates1,
          }
        );
      } else {
        await vendorRegistrations.updateOne(
          {
            _id: req.body.vendorId,
          },
          {
            $unset: updates1,
          }
        );
      }

      responseData.message = responseMessageConstants.COMMENTS_DELETED_SUCCESS;
      responseData.status = responseStatusConstants.SUCCESS;
    }
    return res.status(200).json(responseData);
  } catch (error) {
    responseData.status = responseStatusConstants.FAILURE;
    responseData.message = error.message;
    return res.status(404).json(responseData);
  }
};

export const setStatusOnNext = async (req, res) => {
  /* req format 
  {
    "vendorId": "605aced40e24a239548ade4a",
    "sectionName": "companyInfo"
} */
  let responseData = {};
  let updates = {};
  let flag = false;
  try {
    const sectionName = req.body.sectionName;
    const status = `${sectionName}.status`;
    await vendorRegistrations
      .findOne({
        _id: req.body.vendorId,
      })
      .then((vendorRegistrationsList) => {
        if (!checkIfEmpty(vendorRegistrationsList[sectionName], sectionName)) {
          flag = true;
        }
      });
    if (flag) {
      //if comments object under the section is not empty update the status to incomplete
      updates = {
        [status]: "incomplete",
        //  status: "incomplete",
      };
    } else {
      //if comments object under the section is  empty update the status to approved
      updates = {
        [status]: "approved",
      };
    }
    await vendorRegistrations.updateOne(
      {
        _id: req.body.vendorId,
      },
      {
        $set: updates,
      }
    );
    responseData.status = responseStatusConstants.SUCCESS;
    return res.status(200).json(responseData);
  } catch (error) {
    responseData.status = responseStatusConstants.FAILURE;
    responseData.message = error.message;
    return res.status(404).json(responseData);
  }
};

//procurement
export const finish = async (req, res) => {
  /* req format 
  {
    "vendorId": "605aced40e24a239548ade4a",
    "sectionName": "companyInfo"
} */
  let responseData = {};
  let updates = {};
  try {
    await vendorRegistrations
      .findOne({
        _id: req.body.vendorId,
      })
      .then((vendorRegistrationsList) => {
        if (!_.isEmpty(vendorRegistrationsList.otherInfo.comments)) {
          updates = {
            "otherInfo.status": "incomplete",
            status: "incomplete",
          };
        } else {
          if (getAllStatus(vendorRegistrationsList)) {
            updates = {
              "otherInfo.status": "approved",
              status: "approved",
            };
          }
        }
      });
    await vendorRegistrations.updateOne(
      {
        _id: req.body.vendorId,
      },
      {
        $set: updates,
      }
    );
    responseData.message = responseMessageConstants.APPROVED;
    responseData.status = responseStatusConstants.SUCCESS;
    return res.status(200).json(responseData);
  } catch (error) {
    responseData.status = responseStatusConstants.FAILURE;
    responseData.message = error.message;
    return res.status(404).json(error.message);
  }
};

//procurement
export const getAllRegistration = async (req, res) => {
  /* req format 
  {
    "initRegId": "6059ba940450373cb05c39b1"
} */
  let responseData = {};
  try {
    const vendorRegistrationsList = await vendorRegistrations.find();
    responseData.vendorRegistrationsList = vendorRegistrationsList;
    responseData.status = responseStatusConstants.SUCCESS;
    return res.status(200).json(responseData);
  } catch (error) {
    responseData.status = responseStatusConstants.FAILURE;
    responseData.message = error.message;
    return res.status(404).json(responseData);
  }
};
