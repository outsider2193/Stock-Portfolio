const express = require("express");
const router = express.Router();
const { createPortfolio, getPortfolio } = require("../controllers/portfolioController");
const { verifyToken, authorizedRoles } = require("../middleware/authMiddleware");


router.get("/fetchportfolio/:userId", getPortfolio);
router.post("/create/:id", verifyToken, authorizedRoles("user"), createPortfolio);

module.exports = router;
