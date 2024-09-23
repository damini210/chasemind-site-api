const express = require("express");
const logger = require("./utils/logger");
// const errorHandler = require('./middlewares/errorHandler');
const contactRoutes = require("./routes/contactRoutes");
const portfolioRoutes = require("./routes/portfolioRoutes");
const testimonialRoutes = require("./routes/testimonialRoutes");
const CONFIG = require("./config/config");

const authRoutes = require("./routes/authRoutes");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const app = express();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let dirPath = CONFIG.UPLOADS.DEFAULT;
    if (file.fieldname) {
      if (
        file.fieldname === "Image"
      ) {
        dirPath = CONFIG.UPLOADS.DIR_PATH_PHOTOS;
      } else if (
        file.fieldname === "clientImage"
      ) {
        dirPath = CONFIG.UPLOADS.DIR_PATH_CLIENT_IMAGE;
      } else if (
        file.fieldname === "projectImages"
      ) {
        dirPath = CONFIG.UPLOADS.DIR_PATH_PROJECT_IMAGE;
      } else if (file.fieldname === "documents") {
        dirPath = CONFIG.UPLOADS.DIR_PATH_DOCUMENTS;
      }
    }
    cb(null, dirPath);
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});
const upload = multer({
  storage: storage,
});
let cpUpload = upload.fields([
  {
    name: "clientImage",
    maxCount: 1,
  },
  {
    name: "Image",
    maxCount: 1,
  },
  {
    name: 'projectImages',
    maxCount: 20
  }
]);

app.post('/upload', cpUpload, (req, res) => {
  try {
    if (!req.files) {
      return res.status(400).json({ error: 'No files were uploaded!' });
    }
    // Log and respond with uploaded file details
    res.status(200).json({
      message: 'Files uploaded successfully!',
      files: req.files
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
app.use(express.json());
app.use(cors());
app.use(logger);
app.use("/uploads",  express.static(path.join(__dirname, 'uploads')));
app.use("/v1", contactRoutes);
app.use("/v1", cpUpload, portfolioRoutes);
app.use("/v1", testimonialRoutes);

app.use("/v1", authRoutes);

// app.use(errorHandler);

module.exports = app;
