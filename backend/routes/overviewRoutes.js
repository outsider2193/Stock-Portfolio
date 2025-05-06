const express = require('express');
const router = express.Router();
const { getPortfolioOverview } = require('../controllers/overviewController');
const { verifyToken, authorizedRoles } = require('../middleware/authMiddleware');

router.get('/overview/:userId', verifyToken, authorizedRoles("user"), getPortfolioOverview);

module.exports = router;
