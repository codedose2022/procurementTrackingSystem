import mongoose from "mongoose";
import validator from "validator";
import bcryptjs from "bcryptjs";
import * as dotenv from "dotenv";
dotenv.config();

const salt = await bcryptjs.genSalt();
const passwordHash = await bcryptjs.hash("Welcome123", salt);
const schema = mongoose.Schema;
const initRegistrationSchema = mongoose.Schema(
  {
    fName: [String],
    lName: [String],
    designation:[String],
    email:[String],
    mobNo:[Number],
    companyName:[String],
    licenseNo:[String],
    licenseExpDt:[Date],
    licenseCopy:String,
    status:{
      type: String,

      default: 'new',
    },
    username: {
      type: String,
    },
    password: {
      type: String,
      select: false,
      default: passwordHash,
    },
    resetToken: String,
    expireToken: Date,
    vendorRegId:{
      type: [schema.Types.ObjectId],
      ref: "vendorRegistrationSchema",
    },
  },
  { timestamps: true }
);


const initRegistrations = mongoose.model("initRegistrations", initRegistrationSchema);

export default initRegistrations;
