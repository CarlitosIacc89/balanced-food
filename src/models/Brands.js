const { Schema, model, models } = require("mongoose");

const BrandsSchema = new Schema(
  {
    title: { type: String, required: true },
    image: { type: String },
  },
  {
    timestamps: true,
  }
);

export const Brands = models?.Brands || model("Brands", BrandsSchema);
