import mongoose from "mongoose";

import * as dotenv from "dotenv";
dotenv.config();

const certificateInfoSchema = mongoose.Schema(
  {
    comments:{
      type:Object,
      default:{}
    },
    qualityPolicyStatement: String,
    qualityPolicyStatementEvid: String,
    qualityCertificateIso: String,
    qmsManual: String,
    orgChart:String,
    isoMandatoryProcedure:String,
    legalComplianceReg: String,
    calibCert: String,
    corruptPolicy: String,
    codeOfConduct: String,
    cyberSecPolicy: String,
    hsePolicy: String,
    hseManual: String,
    hseOrgChart: String,
    hseLawsReg:String,
    hseCert:Date,
    emergencyEvac:Date,
    hseStatitics:String,
    riskRegister:String,
    safeOprtnProcedure:String,
    status: {
      type: String,
      default:"saved",
    },
  },{ minimize: false },
  { timestamps: true }
);

const certificateInfo = mongoose.model("certificateInfo", certificateInfoSchema);

export default certificateInfo;
