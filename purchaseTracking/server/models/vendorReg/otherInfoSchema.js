import mongoose from "mongoose";

import * as dotenv from "dotenv";
dotenv.config();

const otherInfoSchema = mongoose.Schema(
  {
    comments:{
      type:Object,
      default:{}
    },
    companyDesc: [String],
    incorpCopy: String,
    pptCopy: String,
    logoCopy: String,
    coverCopy: String,
    associationName: [[String]],
    status: {
      type: String,
      default:"saved",
    },
  },{ minimize: false },
  { timestamps: true }
);

const otherInfo = mongoose.model("otherInfo", otherInfoSchema);

export default otherInfo;
