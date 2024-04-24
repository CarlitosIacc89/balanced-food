const { Schema, models, model } = require("mongoose");

const ProductSchema = new Schema(
  {
    title: { type: String },
    description: { type: String },
    kilogram: { type: String },
    protein: { type: String },
    type: { type: String },
    basePrice: { type: Number },
    // price: { type: String },
    publicPrice: Number,
    quantity: { type: Number },
    specie: { type: String },
    stage: { type: String },
    specific: { type: Boolean },
    size: { type: String },
    savour: { type: String },
    image: { type: String },
    selectBrand: { type: String },
    quality: { type: String },
    // kilogramOfGift: { type: String },
    kilogramOfGift: { type: Boolean },
    offer: { type: Boolean },
    discount: { type: Number },
    sales: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const Products = models?.Products || model("Products", ProductSchema);
