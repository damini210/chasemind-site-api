const Portfolio = require("../models/portfolio");
const responseHandler = require("../utils/responseHandler");
const path = require("path");
const fs = require("fs");

exports.listPortfolios = async (req, res) => {
  try {
    const portfolios = await Portfolio.find({});
    responseHandler.successResponse(res, "Success", portfolios);
  } catch (error) {
    return responseHandler.errorResponse(res, "Fail", error.message);
  }
};

exports.listActivePortfolios = async (req, res) => {
  try {
    const portfolios = await Portfolio.find({ status: 1 });
    responseHandler.successResponse(res, "Success", portfolios);
  } catch (error) {
    return responseHandler.errorResponse(res, "Fail", error.message);
  }
};

exports.createPortfolio = async (req, res) => {
  try {
    const { title, shortDesc, longDesc, projectInfo, slug, type } = req.body;
    const Image = req.files.Image ? req.files.Image[0].filename : null;
    const projectImages = req.files.projectImages.map((file) => file.filename); // Save file names to respond back

    console.log(projectImages);
    const newPortfolio = new Portfolio({
      title,
      shortDesc,
      longDesc,
      projectInfo,
      Image,
      slug,
      type,
      projectImages,
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

// Get a single portfolio entry by Slug
exports.getPortfolioBySlug = async (req, res) => {
  try {
    const slug = req.params;
    const portfolio = await Portfolio.findOne(slug);
    if (!portfolio) {
      return responseHandler.errorResponse(res, "Fail", error.message);
    }
    responseHandler.successResponse(res, "Success", portfolio);
  } catch (error) {
    return responseHandler.errorResponse(res, "Fail", error.message);
  }
};

exports.updatePortfolio = async (req, res) => {
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

    // Handle image updates
    if (req.files && req.files.projectImages) {
      // Delete old images
      if (portfolio.projectImages && Array.isArray(portfolio.projectImages)) {
        for (const oldImage of portfolio.projectImages) {
          const oldImagePath = path.join(
            __dirname,
            "../uploads/project_images",
            oldImage
          );
          if (fs.existsSync(oldImagePath)) {
            fs.unlinkSync(oldImagePath);
          }
        }
      }
      // Update with new images
      req.body.projectImages = req.files.projectImages.map(
        (file) => file.filename
      );
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
  } catch (error) {
    return responseHandler.errorResponse(res, "Fail", error.message);
  }
};
