import mongoose from "mongoose";

import * as dotenv from "dotenv";
dotenv.config();

const bankInfoSchema = mongoose.Schema(
  {
    comments:{
      type:Object,
      default:{}
    },
    bankName: [String],
    branchName: [String],
    accNo: [Number],
    ibanNo: [String],
    swiftCode: [String],
    tel: [String],
    ibanCopy: String,
    status: {
      type: String,
      default:"saved",
    },
  },{ minimize: false },
  { timestamps: true }
);

const bankInfo = mongoose.model("bankInfo", bankInfoSchema);

export default bankInfo;
