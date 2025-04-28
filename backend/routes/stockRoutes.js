const express = require("express");
const router = express.Router();

const { getStocksByApi, addStockToPortfolio, buyStock, sellStock } = require("../controllers/stockController");
const { verifyToken, authorizedRoles } = require("../middleware/authMiddleware");

// router.post("/createstock", createStock);
// router.get("/fetchstock/:id", getStocksByCompanyId);
router.get("/stocks", verifyToken, authorizedRoles("user"), getStocksByApi);
router.post("/addstocks/:userId", verifyToken, authorizedRoles("user"), addStockToPortfolio)
router.post("/buystocks/:userId", verifyToken, authorizedRoles("user"), buyStock)
router.post("/sellstocks/:userId", verifyToken, authorizedRoles("user"), sellStock)
module.exports = router;