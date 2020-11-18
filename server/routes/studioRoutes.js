const fs = require("fs");
const path = require("path");
const express = require("express");
const User = require("../models/User");
const {
  sendCuponEmail,
  registerUser,
} = require("../controllers/studioControllers");
const { Cupon } = require("../models/Cupon");
const router = express.Router();

//-----------------------------------------------------------------
router.post("/discountCode", sendCuponEmail);

//-----------------------------------------------------------------
router.post("/register", registerUser);

//-----------------------------------------------------------------
router.get("/users", async (req, res, next) => {
  const users = await User.find({}).populate(
    "cupon",
    "expire shopDiscountCode commerceDiscountCode"
  );
  res.status(200).json(users);
});

//-----------------------------------------------------------------
router.get("/cupons", async (req, res, next) => {
  const cupons = await Cupon.find({}).populate("user", "name email");
  res.status(200).json(cupons);
});

//-----------------------------------------------------------------
router.get("/download/:pdf", (req, res, next) => {
  try {
    const fileName = req.params.pdf;
    const filePath = path.join(__dirname, "..", "download", fileName);
    var stat = fs.statSync(filePath);
    res.setHeader("Content-Length", stat.size);
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "attachment; filename=" + fileName);
    const stream = fs.createReadStream(filePath);
    stream.pipe(res);
  } catch (err) {
    return next(new Error(err));
  }
});

module.exports = router;
