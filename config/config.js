require("dotenv").config();
const path = require('path');

module.exports = {
  mongodb: {
    uri: "mongodb+srv://chasemindinfo:Damini%40210@cluster0.ay6krc8.mongodb.net/chasemind",
  },
  EMAIL: {
    HOST: "mail.chasemind.in",
    PORT: 25,
    SECURE: false,
    USER: "admin@chasemind.in",
    PASS: "Chasemind@123",
  },
  jwtSecret: "bnRox$@2014",
  JWT_EXPIRES_IN: "30d",
  port: process.env.PORT || 5001,

  UPLOADS: {
    ROOT_PATH: path.join(__dirname, "/../.."),
    DEFAULT: path.join(__dirname, "../uploads/"),
    DIR_PATH_PHOTOS: path.join(__dirname, "../uploads/photos/"),
    DIR_PATH_CLIENT_IMAGE: path.join(__dirname, "../uploads/client_image/"),
    DIR_PATH_PROJECT_IMAGE: path.join(__dirname, "../uploads/project_images/"),
    DIR_PATH_DOCUMENTS: path.join(__dirname, "../uploads/documents/"),
    DB_PATH_ICONS: "/uploads/",
    DB_PATH_PHOTOS: "/uploads/photos/",
    DB_PATH_VIDEOS: "/uploads/videos/",
    DB_PATH_DOCUMENTS: "/uploads/documents/",
  },
};
