const { Schema, models, model } = require("mongoose");

const OrdersSchema = new Schema({
  personReiceves: { type: String, required: [true, ""] },
  deliveryAddress: { type: String, required: [true, ""] },
  numberDeliveryAddress: { type: String, required: [true, ""] },
  floor: { type: String },
  sale: { type: Array },
  district: { type: String, required: [true, ""] },
  emailClient: { type: String },
  noteToSeller: { type: String },
  createdAt: String,
  hour: String,
  userClient: Object,
  totalProducts: Number,
  totalPrice: Number,
  phone: String,
  revenueOrder: Number,
});

export const Orders = models?.Orders || model("Orders", OrdersSchema);
