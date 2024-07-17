const express = require("express");
const router = express.Router();
const ContactCtrl = require("../../../services/security/contactCtrl");
const CONFIG = require("../../../config");

//Create Content API: http://localhost:27017/v1/contact/create
router.route("/create").post(ContactCtrl.create)

//Get Content Data List API : http://localhost:3005/v1/contact/get-contactDataList
router.route("/get-contactDataList").get(CONFIG.JWTTOKENALLOWACCESS, ContactCtrl.contactDataList);

module.exports = router;

