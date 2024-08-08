const mongoose = require("mongoose");
const { StatusEnumValues, TypeEnumValues } = require('../utils/enums');

const portfolioSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    shortDesc: { type: String, required: true },
    status: {
      type: Number,
      enum: StatusEnumValues,
      required: true,
      default: 1,
    },
    type: {
      type: Number,
      enum: TypeEnumValues,
      required: true,
      default: 1,
    },
    Image: { type: String, default: null },
  },
  { timestamps: true }
);

const Portfolio = mongoose.model('Portfolio', portfolioSchema, 'Portfolio');

module.exports = Portfolio;