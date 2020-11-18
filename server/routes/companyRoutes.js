const express = require("express");
const { discountEmail } = require("../controllers/companyControllers");
const router = express.Router();

router.get("/discount", discountEmail);

module.exports = router;
