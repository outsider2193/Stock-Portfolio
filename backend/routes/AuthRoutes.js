const express = require("express");
const { signup } = require("../controllers/AuthController");
const multer = require("multer");
const router = express.Router();

// File upload config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname)
});
const upload = multer({ storage });

router.post("/signup", signup);

module.exports = router;
