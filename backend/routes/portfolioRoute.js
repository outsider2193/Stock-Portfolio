const express = require("express");
const router = express.Router();
const { createPortfolio } = require("../controllers/portfolioController");
const { verifyToken, authorizedRoles } = require("../middleware/authMiddleware");

router.post("/create/:id", verifyToken, authorizedRoles("user"), createPortfolio);

module.exports = router;
