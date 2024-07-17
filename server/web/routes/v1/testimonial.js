const express = require("express");
const router = express.Router();
const testimonialCtrl = require("../../../services/security/testimonialCtrl");
const CONFIG = require("../../../config");

//Create Content API: http://localhost:5001/v1/testimonial/create
router.route("/create").post(testimonialCtrl.create)

//Get Content Data List API : http://localhost:5001/v1/testimonial/get-testimonialDataList
router.route("/get-testimonialDataList").get(CONFIG.JWTTOKENALLOWACCESS, testimonialCtrl.testimonialDataList);

module.exports = router;

