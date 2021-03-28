import mongoose from "mongoose";
import companyInfo from "./companyInfoSchema.js";
import ownerInfoSchema from "./ownerInfoSchema.js";
import bankInfoSchema from "./bankInfoSchema.js";
import taxInfoSchema from "./taxInfoSchema.js";
import certificateInfoSchema from "./certificateInfoSchema.js";
import productInfoSchema from "./productInfoSchema.js";
import contactInfoSchema from "./contactInfoSchema.js";
import otherInfoSchema from "./otherInfoSchema.js";

import * as dotenv from "dotenv";
dotenv.config();
const schema = mongoose.Schema;
const vendorRegistrationSchema = mongoose.Schema(
  {
    status: {
      type: String,
      default: "saved",
    },
    initRegId: {
      type: schema.Types.ObjectId,
      ref: "initRegistrationsSchema",
    },
    companyInfo: companyInfo.schema,

    ownerInfo: {
      status: {
        type: String,
        default: "saved",
      },
      owners: [ownerInfoSchema.schema],
    },
    bankInfo: bankInfoSchema.schema,
    taxInfo: taxInfoSchema.schema,
    certificateInfo: certificateInfoSchema.schema,
    productInfo: productInfoSchema.schema,
    contactInfo: {
      status: {
        type: String,
        default: "saved",
      },
      contacts: [contactInfoSchema.schema],
    },
    otherInfo: otherInfoSchema.schema,
  },
  { minimize: false },
  { timestamps: true }
);

const vendorRegistrations = mongoose.model(
  "vendorRegistrations",
  vendorRegistrationSchema
);

export default vendorRegistrations;
