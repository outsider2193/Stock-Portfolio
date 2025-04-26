const express = require("express");
const router = express.Router();
const { createPortfolio, getPortfolio } = require("../controllers/portfolioController")

router.post("/create/:id", createPortfolio);
router.get("/fetchportfolio/:userId", getPortfolio)

module.exports = router;
