const { Schema, models, model } = require("mongoose");

const visitsSchema = new Schema({
  title: String,
  visits: { type: Number, default: 0 },
  uniqueVisitors: Array,
});

export const Visits = models?.Visits || model("Visits", visitsSchema);
