import mongoose from "mongoose";

const serviceCategorySchema = mongoose.Schema(
  {
    category: { type: String, required: true },
  },
  { timestamps: true }
);

const serviceCategories = mongoose.model(
  "serviceCategories",
  serviceCategorySchema
);

export default serviceCategories;
