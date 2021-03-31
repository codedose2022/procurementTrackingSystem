import initRegistration from "../models/vendorReg/initRegistrationSchema.js";
import responseMessageConstants from "../constants/responseMessage.js";
import responseStatusConstants from "../constants/responseStatusCode.js";
import { createUsername } from "../helper/util.js";
import { sendEmail } from "../mail.js";
import bcryptjs from "bcryptjs";

// export const getRegistrations = async (req, res) => {
//   let responseData = {};
//   try {
//     const initRegistrations = await initRegistration.find({
//       companyDetail: {
//         $elemMatch: {
//           $or: [{ status: "approved" }, { status: "rejected" }],
//         },
//       },
//     });
//     responseData.initRegistrationList = initRegistrations;
//     responseData.status = responseStatusConstants.SUCCESS;
//     return res.status(200).json(responseData);
//   } catch (error) {
//     responseData.status = responseStatusConstants.FAILURE;
//     responseData.message = error.message;
//     return res.status(404).json(responseData);
//   }
// };

export const approveVendors = async (req, res) => {
  /*
  {
    "_id":"606181f35fd45523086bb744",
    "compId":"606181f35fd45523086bb745",
    "flag":"R" //or "A"
}
*/
  let responseData = {};
  let username = createUsername();
  let password = createUsername();
  const salt = await bcryptjs.genSalt();
  const passwordHash = await bcryptjs.hash(password, salt);
  try {
    let updates = {};
    const key = "companyDetail.$.status";
    if (req.body.flag === "A") {
      updates = {
        [key]: "approved",
        username: username,
        password: passwordHash,
      };
    }
    if (req.body.flag === "R") {
      updates = {
        [key]: "rejected",
      };
    }

    await initRegistration
      .findOneAndUpdate(
        {
          _id: req.body._id,
          "companyDetail._id": req.body.compId,
        },
        {
          $set: updates,
        },
        { new: true }
      )
      .then((result) => {
        if (req.body.flag === "A") {
          sendEmail(
            result.email[0],
            result.fName[0],
            "ApprovedRegIdPwd",
            null,
            username,
            password
          );
        } else if (req.body.flag === "R") {
          sendEmail(result.email[0], result.fName[0], "RejectedReg", null);
        }
      });
    // const initRegistrations = await initRegistration.find();
    // responseData.initRegistrationList = initRegistrations;
    responseData.status = responseStatusConstants.SUCCESS;
    return res.status(200).json(responseData);
  } catch (error) {
    responseData.status = responseStatusConstants.FAILURE;
    responseData.message = error.message;
    return res.status(404).json(responseData);
  }
};

// export const getNewCompanyReg = async (req, res) => {
//   let responseData = {};
//   try {
//     const initRegistrationList = await initRegistration.find({
//       companyDetail: {
//         $elemMatch: {
//           status: "new",
//         },
//       },
//     });
//     responseData.initRegistrationList = initRegistrationList;
//     responseData.status = responseStatusConstants.SUCCESS;
//     return res.status(200).json(responseData);
//   } catch (error) {
//     responseData.status = responseStatusConstants.FAILURE;
//     responseData.message = error.message;
//     return res.status(404).json(responseData);
//   }
// };

export const getAllRegistrations = async (req, res) => {
  let responseData = {};
  try {
    const initRegistrations = await initRegistration.find();
    responseData.initRegistrationList = initRegistrations;
    responseData.status = responseStatusConstants.SUCCESS;
    return res.status(200).json(responseData);
  } catch (error) {
    responseData.status = responseStatusConstants.FAILURE;
    responseData.message = error.message;
    return res.status(404).json(responseData);
  }
};

export const addCategory = async (req, res) => {
  let responseData = {};
  try {
    const category = req.body.category;
    const initRegId = req.body.initRegId;
    const compId = req.body.companyId;
    const key = "companyDetail.$.category";
    const updates = {
      [key]: category,
    };

    await initRegistration.findOneAndUpdate(
      {
        _id: initRegId,
        "companyDetail._id": compId,
      },
      {
        $set: updates,
      },
      { new: true }
    );
    responseData.status = responseStatusConstants.SUCCESS;
    return res.status(200).json(responseData);
  } catch (error) {
    responseData.status = responseStatusConstants.FAILURE;
    responseData.message = error.message;
    return res.status(404).json(responseData);
  }
};

export const getCategory = async (req, res) => {
  let responseData = {};
  try {
    const initRegId = req.body.initRegId;
    const compId = req.body.companyId;

    const regDetails = await initRegistration.findOne({
      _id: initRegId,
      companyDetail: {
        $elemMatch: {
          _id: compId,
        },
      },
    });

    const compDetail = regDetails.companyDetail.filter(
      (detail) => detail._id == compId
    );
    responseData.categories = compDetail[0].category;
    responseData.status = responseStatusConstants.SUCCESS;
    return res.status(200).json(responseData);
  } catch (error) {
    responseData.status = responseStatusConstants.FAILURE;
    responseData.message = error.message;
    return res.status(404).json(responseData);
  }
};
