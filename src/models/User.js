const { Schema, models, model } = require("mongoose");

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    lastName: { type: String, required: [true, "Last name is required"] },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Email is not valid",
      ], //Verificion email valido
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    image: { type: String },
    purchasesMade: { type: Array, default: [] },
  },
  { timestamps: true }
);

export const User = models?.User || model("User", UserSchema);
