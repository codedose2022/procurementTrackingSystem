import mongoose from "mongoose";
import validator from "validator";
import bcryptjs from "bcryptjs";
import * as dotenv from "dotenv";
dotenv.config();
const schema = mongoose.Schema;

const companyDetailSchema = mongoose.Schema({
  companyName: [String],
  licenseNo: [String],
  licenseExpDt: [Date],
  licenseCopy: String,
  category:[String],
  status: {
    type: String,

    default: "new",
  },
});

const initRegistrationSchema = mongoose.Schema(
  {
    fName: [String],
    lName: [String],
    designation: [String],
    email: [String],
    mobNo: [Number],
    username: {
      type: String,
    },
    password: String,
    resetToken: String,
    expireToken: Date,
    companyDetail: [companyDetailSchema],
  },
  { timestamps: true }
);

const initRegistrations = mongoose.model(
  "initRegistrations",
  initRegistrationSchema
);

export default initRegistrations;
