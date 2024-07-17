const express = require("express");
const router = express.Router();
const AdminAuthCtrl = require("../../../services/security/adminAuthCtrl");
const uniqueCtrl = require("../../../services/security/uniqueCtrl");
const CONFIG = require("../../../config");
// const AuthCtrl = require("../../../services/security/authCtrl");

/**
 * @description Authentication routes
 * @example http://localhost:3000/v1/adminAuth/'Route name'
 */

//Admin create API : http://localhost:5001/v1/adminAuth/admin-create
router.route("/admin-create").post(uniqueCtrl.uniqueAdminEmail, AdminAuthCtrl.adminCreate);

//Admin login API : http://localhost:5001/v1/adminAuth/login
router.route("/login").post(AdminAuthCtrl.login);


//Check Token For User: http://localhost:5001/v1/adminAuth/tokenCheck
router.route("/tokenCheck").get(CONFIG.JWTTOKENALLOWACCESS, AdminAuthCtrl.TokenCheck);

//Change password For Admin API : http://localhost:5001/v1/adminAuth/changePassword-Admin
router.route("/changePassword-Admin").post(CONFIG.JWTTOKENALLOWACCESS, AdminAuthCtrl.ChangePasswordForAdmin);


module.exports = router;
