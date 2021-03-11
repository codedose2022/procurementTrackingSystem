import mongoose from "mongoose";
const schema = mongoose.Schema;

const CommentsSchema = mongoose.Schema(
  {
    comments: {
      type: String,
    },
  },
  { timestamps: true }
);
const ReplySchema = mongoose.Schema(
  {
    reply: {
      type: String,
    },
  },
  { timestamps: true }
);
const DetailsSchema = mongoose.Schema(
  {
    serviceCategory: {
      type: String,
    },
    status: {
      type: String,
    },
    comments: [CommentsSchema],
    reply: [ReplySchema],
    poNumber: String,
    vendorName: String,
    vendorNumber: String,
  },
  { timestamps: true }
);
const serviceRequestSchema = mongoose.Schema(
  {
    sNo: { type: Number },
    requestorName: { type: String, required: true },
    refNum: { type: String, required: true },
    details: [DetailsSchema],
    userId: {
      type: [schema.Types.ObjectId],
      ref: "userSchema",
    },
  },
  { timestamps: true }
);

const serviceRequest = mongoose.model("serviceRequest", serviceRequestSchema);

export default serviceRequest;