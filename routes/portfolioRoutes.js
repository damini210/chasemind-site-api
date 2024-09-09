const express = require("express");
const portfolioController = require("../controllers/portfolioController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

// Route for getting all portfolio entries
router.get("/portfolios",  authMiddleware, portfolioController.listPortfolios);

// Route for getting all active portfolio entries
router.get("/activePortfolios", portfolioController.listActivePortfolios);

// Route for getting a single portfolio entry by ID
router.get(
  "/portfolio/:id",
  authMiddleware,
  portfolioController.getPortfolioById
);

// Route for creating a new portfolio with an image
router.post("/portfolios", authMiddleware, portfolioController.createPortfolio);

// Route for updating a portfolio entry
router.put(
  "/portfolio/:id",
  authMiddleware,
  portfolioController.updatePortfolio
);

router.patch(
  "/portfolio/:id/status",
  authMiddleware,
  portfolioController.updateStatus
);

module.exports = router;
