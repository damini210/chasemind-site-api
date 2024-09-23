const Testimonial = require("../models/testimonial");
const responseHandler = require("../utils/responseHandler");
const path = require("path");
const fs = require("fs");

exports.listTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.find({});
    responseHandler.successResponse(res, "Success", testimonials);
  } catch (error) {
    return responseHandler.errorResponse(res, "Fail", error.message);
  }
};

exports.listActiveTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.find({ status: 1 });
    responseHandler.successResponse(res, "Success", testimonials);
  } catch (error) {
    return responseHandler.errorResponse(res, "Fail", error.message);
  }
};

exports.createTestimonial = async (req, res) => {
  try {
    const { clientName, review, countryName } = req.body;
    const clientImage = req.files.clientImage ? req.files.clientImage[0].filename : null;
    const newTestimonial = new Testimonial({
      clientName,
      review,
      countryName,
      clientImage  
    });
    const testimonial = await newTestimonial.save();
    responseHandler.successResponse(res, "testimonialSaveSuccess", testimonial);
  } catch (error) {
    console.log(error);
    return responseHandler.errorResponse(res, "Fail", error.message);
  }
};

// Get a single testimonial entry by ID
exports.getTestimonialById = async (req, res) => {
  try {
    const { id } = req.params;
    const testimonial = await Testimonial.findById(id);
    if (!testimonial) {
      return responseHandler.errorResponse(res, "Fail", error.message);
    }
    responseHandler.successResponse(res, "Success", testimonial);
  } catch (error) {
    return responseHandler.errorResponse(res, "Fail", error.message);
  }
};

exports.updateTestimonial = async (req, res) => {
  try {
    const testimonialId = req.params.id;
    const testimonial = await Testimonial.findById(testimonialId);
    if (!testimonial) {
      return responseHandler.errorResponse(res, "Fail", error.message);
    }
    // Handle image update and deletion of old image
    if (req.files.clientImage) {
      // Delete old image if it exists
      if (testimonial.clientImage) {
        const oldImagePath = path.join(
          __dirname,
          "../uploads/client_image",
          testimonial.clientImage
        );
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
        req.body.clientImage = req.files.clientImage[0].filename;
      }
      // Update with new image URL
      console.log(req.body);
    }
    const updatedTestimonial = await Testimonial.findByIdAndUpdate(
      testimonialId,
      { $set: req.body },
      { new: true }
    );
    responseHandler.successResponse(
      res,
      "TestimonialUpdateSuccess",
      updatedTestimonial
    );
  } catch (error) {
    return responseHandler.errorResponse(res, "Fail", error.message);
  }
};

exports.updateStatus = async (req, res) => {
  try {
    const testimonialId = req.params.id;
    const { status } = req.body;

    if (typeof status !== "number") {
      return responseHandler.errorResponse(res, "Fail", "Invalid status value");
    }

    const updatedTestimonial = await Testimonial.findByIdAndUpdate(
      testimonialId,
      { $set: { status, updatedAt: new Date() } },
      { new: true }
    );

    if (!updatedTestimonial) {
      return responseHandler.errorResponse(res, "Fail", "Testimonial not found");
    }

    responseHandler.successResponse(
      res,
      "TestimonialUpdateSuccess",
      updatedTestimonial
    );
  } catch (err) {
    return responseHandler.errorResponse(res, "Fail", err.message);
  }
};
