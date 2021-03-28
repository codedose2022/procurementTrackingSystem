import mongoose from "mongoose";

import * as dotenv from "dotenv";
dotenv.config();

const companyInfoSchema = mongoose.Schema(
  {
    comments:{
      type:Object,
      default:{}
    },
    vendorType: [[String]],
    orgStructure: String,
    companyName: [String],
    licenseNo: [Number],
    yearOfEst: [Number],
    licenseExpDate: [Date],
    licenseCopy: String,
    address1: [String],
    address2: [String],
    city: [String],
    emirates: [String],
    country: [String],
    poBox: [Number],
    email: [String],
    website: [String],
    phoneNo: [Number],
    faxNo: [Number],
    mobileNo: [Number],
    noOfEmp: [Number],
    sisCompanies: [[String]],
    status: {
      type: String,
      default:"saved",
    },
  },{ minimize: false },
  { timestamps: true }
);

const companyInfo = mongoose.model("companyInfo", companyInfoSchema);

export default companyInfo;
