const express = require("express");
const router = express.Router();

const { getStocksByApi, addStockToPortfolio, buyStock, sellStock, searchStockBySymbol, searchStockSuggestions } = require("../controllers/stockController");
const { verifyToken, authorizedRoles } = require("../middleware/authMiddleware");

// router.post("/createstock", createStock);
// router.get("/fetchstock/:id", getStocksByCompanyId);
router.get("/getstocks", verifyToken, authorizedRoles("user"), getStocksByApi);
router.post("/addstocks/:userId", verifyToken, authorizedRoles("user"), addStockToPortfolio);
router.post("/buystocks/:userId", verifyToken, authorizedRoles("user"), buyStock);
router.post("/sellstocks/:userId", verifyToken, authorizedRoles("user"), sellStock);
router.get("/searchstocks", verifyToken, authorizedRoles("user"), searchStockBySymbol);
router.get("/suggeststocks", verifyToken, authorizedRoles("user"), searchStockSuggestions);
module.exports = router;