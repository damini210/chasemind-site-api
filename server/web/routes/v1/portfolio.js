const express = require("express");
const router = express.Router();

const portfolioCtrl = require("../../../services/security/portfolioCtrl");
const uniqueCtrl = require("../../../services/security/uniqueCtrl");
const CONFIG = require("../../../config");

/**
 * @description 
 * @example http://localhost:3001/v1/AdminMaster/'Route name'
 */
////Un Read Notification Count API : http://localhost:3000/v1/notification/getUnReadNotificationCount

//Create portfolio Data : http://localhost:3003/v1/portfolio/portfolio-create-update
router.route("/portfolio-create-update").post(CONFIG.JWTTOKENALLOWACCESS, portfolioCtrl.createOrUpdate)


//Get portfolio Details By Id For Admin  : http://localhost:3003/v1/portfolio/portfolio-deatilsById:/id
router.route("/portfolio-detailsById").get(portfolioCtrl.portfolioDetailsByIdForAdmin);


//Get portfolio Data List For Admin : http://localhost:3003/v1/portfolio/portfolio-List
router.route("/portfolio-List").get(portfolioCtrl.portfolioDataList);

//portfolio  Data Stataus Active-Deactive   : http://localhost:3003/v1/blog/portfolio-statusActiveDeactive
router.route("/portfolio-statusActiveDeactive").post(portfolioCtrl.portfolioActiveDeactive);

//Update Blog Data  : http://localhost:3003/v1/blog/blog-update
// router.route("/blog-update").post(CONFIG.JWTTOKENALLOWACCESS, BlogCtrl.update);

module.exports = router;

