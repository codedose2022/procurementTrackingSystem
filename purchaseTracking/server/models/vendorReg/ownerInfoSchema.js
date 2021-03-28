import mongoose from "mongoose";

import * as dotenv from "dotenv";
dotenv.config();

const ownerInfoSchema = mongoose.Schema(
  {
    comments:{
      type:Object,
      default:{}
    },
    name: [String],
    designation: [String],
    percentOfShare: [Number],
    nationality: [String],
    tel: [Number],
    mob: [Number],
    email: [String],

  },{ minimize: false },
  { timestamps: true }
);

const ownerInfo = mongoose.model("ownerInfo", ownerInfoSchema);

export default ownerInfo;
