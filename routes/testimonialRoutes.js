const express = require("express");
const testimonialController = require("../controllers/testimonialController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

// Route for getting all testimonial entries
router.get("/testimonials",  authMiddleware, testimonialController.listTestimonials);

// Route for getting all active testimonial entries
router.get("/activeTestimonials", testimonialController.listActiveTestimonials);

// Route for getting a single testimonial entry by ID
router.get(
  "/testimonial/:id",
  authMiddleware,
  testimonialController.getTestimonialById
);

// Route for creating a new testimonial with an image
router.post("/testimonials", authMiddleware, testimonialController.createTestimonial);

// Route for updating a testimonial entry
router.put(
  "/testimonial/:id",
  authMiddleware,
  testimonialController.updateTestimonial
);

router.patch(
  "/testimonial/:id/status",
  authMiddleware,
  testimonialController.updateStatus
);

module.exports = router;
