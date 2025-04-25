const express = require("express");
const router = express.Router();

const { getStocksByApi, addStockToPortfolio } = require("../controllers/stockController");

// router.post("/createstock", createStock);
// router.get("/fetchstock/:id", getStocksByCompanyId);
router.get("/stocks", getStocksByApi);
router.post("/addstocks/:userId", addStockToPortfolio)

module.exports = router;