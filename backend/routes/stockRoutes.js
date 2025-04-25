const express = require("express");
const router = express.Router();

const { createStock, getStocksByCompanyId, getStocksByApi } = require("../controllers/stockController");

router.post("/createstock", createStock);
router.get("/fetchstock/:id", getStocksByCompanyId);
router.get("/stocks", getStocksByApi);

module.exports = router;