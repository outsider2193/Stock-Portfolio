const express = require("express");
const router = express.Router();

const { getStocksByApi, addStockToPortfolio } = require("../controllers/stockController");
const { verifyToken, authorizedRoles } = require("../middleware/authMiddleware");

// router.post("/createstock", createStock);
// router.get("/fetchstock/:id", getStocksByCompanyId);
router.get("/stocks", verifyToken, authorizedRoles("user"), getStocksByApi);
router.post("/addstocks/:userId", verifyToken, authorizedRoles("user"), addStockToPortfolio)

module.exports = router;