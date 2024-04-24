const { Schema, models, model } = require("mongoose");

const UserInfoSachema = new Schema(
  {
    email: { type: String, required: [true, "Email es required"] },
    address: { type: String },
    city: { type: String },
    postalCode: { type: String },
    phone: { type: String },
    numberAddress: { type: String },
    image: { type: String },
    admin: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

export const UserInfo = models?.UserInfo || model("UserInfo", UserInfoSachema);
