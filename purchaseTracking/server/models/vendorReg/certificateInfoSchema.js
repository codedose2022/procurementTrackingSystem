import mongoose from "mongoose";

import * as dotenv from "dotenv";
dotenv.config();

const certificateInfoSchema = mongoose.Schema(
  {
    comments:{
      type:Object,
      default:{}
    },
    qmsCertCopy: String,
    qmsManualCopy: String,
    qmsPolicyCopy: String,
    qmsListQAQCCopy: String,
    hsCertStandard:String,
    hsCertCopy:String,
    hsCertAuthority: String,
    hsEndDate: String,
    hseManualCopy: String,
    hsePolicyCopy: String,
    hseMgtSystemCopy: String,
    eCertType: String,
    eCertNumber: String,
    eCertFile: String,
    eCertAuth:String,
    eIssDate:Date,
    eExpDate:Date,
    adComDevCopy:String,
    adValueCertCopy:String,
    countryValueCertCopy:String,
    status: {
      type: String,
      default:"saved",
    },
  },{ minimize: false },
  { timestamps: true }
);

const certificateInfo = mongoose.model("certificateInfo", certificateInfoSchema);

export default certificateInfo;
