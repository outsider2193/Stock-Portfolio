const express = require("express");
const router = express.Router();
const { createPortfolio } = require("../controllers/portfolioController")

router.post("/create/:id", createPortfolio);

module.exports = router;
