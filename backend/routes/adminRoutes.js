const express = require("express");
const router = express.Router();
const { verifyToken, authorizedRoles } = require("../middleware/authMiddleware");
const { deleteUser, getAllusers, getAllTransactions } = require("../controllers/adminController");

router.delete("/delete/user/:id", verifyToken, authorizedRoles("admin"), deleteUser);
router.get("/allusers", verifyToken, authorizedRoles("admin"), getAllusers);
router.get("/alltransactions", verifyToken, authorizedRoles("admin"), getAllTransactions);
module.exports = router;