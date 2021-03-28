import mongoose from "mongoose";


const productInfoSchema = mongoose.Schema(
  {
    comments:{
      type:Object,
      default:{}
    },
    product: [String],
    status: {
      type: String,
      default:"saved",
    },
  },{ minimize: false },
  { timestamps: true }
);

const productInfo = mongoose.model("productInfo", productInfoSchema);

export default productInfo;
