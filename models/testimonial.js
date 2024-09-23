const mongoose = require("mongoose");
const { StatusEnumValues } = require('../utils/enums');

const testimonialSchema = new mongoose.Schema(
  {
    clientName: { type: String, required: true },
    review: { type: String, required: true },
    countryName: { type: String, required: true },
    status: {
      type: Number,
      enum: StatusEnumValues,
      required: true,
      default: 1,
    },
    clientImage: { type: String, default: null },
  },
  { timestamps: true }
);

const Testimonial = mongoose.model('Testimonial', testimonialSchema, 'Testimonial');

module.exports = Testimonial;