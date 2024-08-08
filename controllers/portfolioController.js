const Portfolio = require("../models/portfolio");
const responseHandler = require("../utils/responseHandler");
const path = require("path");
const fs = require("fs");

exports.listPortfolios = async (req, res) => {
  try {
    const portfolios = await Portfolio.find({});
    responseHandler.successResponse(res, "Success", portfolios);
  } catch (err) {
    return responseHandler.errorResponse(res, "Fail", error.message);
  }
};

exports.createPortfolio = async (req, res) => {
  try {
    const { title, shortDesc, type } = req.body;
    const Image = req.files.Image ? req.files.Image[0].filename : null;
    const newPortfolio = new Portfolio({
      title,
      shortDesc,
      Image,
      type,
    });
    const portfolio = await newPortfolio.save();
    responseHandler.successResponse(res, "PortfolioSaveSuccess", portfolio);
  } catch (error) {
    console.log(error);
    return responseHandler.errorResponse(res, "Fail", error.message);
  }
};

// Get a single portfolio entry by ID
exports.getPortfolioById = async (req, res) => {
  try {
    const { id } = req.params;
    const portfolio = await Portfolio.findById(id);
    if (!portfolio) {
      return responseHandler.errorResponse(res, "Fail", error.message);
    }
    responseHandler.successResponse(res, "Success", portfolio);
  } catch (error) {
    return responseHandler.errorResponse(res, "Fail", error.message);
  }
};

exports.updatePortfolio = async (req, res) => {
  console.log('111111111')

  try {
    const portfolioId = req.params.id;
    const portfolio = await Portfolio.findById(portfolioId);
    if (!portfolio) {
      return responseHandler.errorResponse(res, "Fail", error.message);
    }
    // Handle image update and deletion of old image
    if (req.files.Image) {
      // Delete old image if it exists
      if (portfolio.Image) {
        const oldImagePath = path.join(
          __dirname,
          "../uploads/photos",
          portfolio.Image
        );
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
        req.body.Image = req.files.Image[0].filename;
      }
      // Update with new image URL
      console.log(req.body);
    }
    const updatedPortfolio = await Portfolio.findByIdAndUpdate(
      portfolioId,
      { $set: req.body },
      { new: true }
    );
    responseHandler.successResponse(
      res,
      "PortfolioUpdateSuccess",
      updatedPortfolio
    );
  } catch (error) {
    return responseHandler.errorResponse(res, "Fail", error.message);
  }
};

exports.updateStatus = async (req, res) => {
  try {
    const portfolioId = req.params.id;
    const { status } = req.body;

    if (typeof status !== "number") {
      return responseHandler.errorResponse(res, "Fail", "Invalid status value");
    }

    const updatedPortfolio = await Portfolio.findByIdAndUpdate(
      portfolioId,
      { $set: { status, updatedAt: new Date() } },
      { new: true }
    );

    if (!updatedPortfolio) {
      return responseHandler.errorResponse(res, "Fail", "Portfolio not found");
    }

    responseHandler.successResponse(
      res,
      "PortfolioUpdateSuccess",
      updatedPortfolio
    );
  } catch (err) {
    return responseHandler.errorResponse(res, "Fail", err.message);
  }
};
