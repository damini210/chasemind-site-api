const express = require("express");
const logger = require("./utils/logger");
// const errorHandler = require('./middlewares/errorHandler');
const contactRoutes = require("./routes/contactRoutes");
const portfolioRoutes = require("./routes/portfolioRoutes");
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
        file.fieldname === "photos" ||
        file.fieldname === "image" ||
        file.fieldname === "profile_image" ||
        file.fieldname === "logo" ||
        file.fieldname === "Image"
      ) {
        dirPath = CONFIG.UPLOADS.DIR_PATH_PHOTOS;
      } else if (
        file.fieldname === "videos" ||
        file.fieldname === "function_video"
      ) {
        dirPath = CONFIG.UPLOADS.DIR_PATH_VIDEOS;
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
    name: "photos",
    maxCount: 15,
  },
  {
    name: "videos",
    maxCount: 15,
  },
  {
    name: "documents",
    maxCount: 15,
  },
  {
    name: "profile_image",
    maxCount: 1,
  },
  {
    name: "profile_video",
    maxCount: 1,
  },
  {
    name: "vedioUrl",
    maxCount: 1,
  },
  {
    name: "function_video",
    maxCount: 1,
  },
  {
    name: "icon_image",
    maxCount: 1,
  },
  {
    name: "storyVideos",
    maxCount: 30,
  },
  {
    name: "storyImages",
    maxCount: 30,
  },
  {
    name: "logo",
    maxCount: 1,
  },
  {
    name: "Image",
    maxCount: 1,
  },
]);

app.use(express.json());
app.use(cors());
app.use(logger);
app.use("/uploads",  express.static(path.join(__dirname, 'uploads')));
app.use("/v1", contactRoutes);
app.use("/v1", cpUpload, portfolioRoutes);

app.use("/v1", authRoutes);

// app.use(errorHandler);

module.exports = app;
