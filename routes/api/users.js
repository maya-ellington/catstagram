const express = require("express");
const router = express.Router();
const usersCtrl = require("../../controllers/users");
const multer = require("multer"); //handling multipart/form-data
const upload = multer();
/*---------- Public Routes ----------*/
router.post("/signup", upload.single("photo"), usersCtrl.signup);
router.post("/login", usersCtrl.login);

/*---------- Protected Routes ----------*/

module.exports = router;
