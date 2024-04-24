const { Schema, models, model } = require("mongoose");

const CategorySchema = new Schema(
  {
    name: { type: String, required: [true, "Name category is required"] },
  },
  { timestamps: true }
);

export const Category = models?.Category || model("Category", CategorySchema);
