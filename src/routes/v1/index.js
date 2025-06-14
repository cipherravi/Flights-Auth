const express = require("express");
const router = express.Router();
const { infoController } = require("../../controllers");
const authRoutes = require("./auth-routes");
const userRoutes = require("./user-routes");

router.use("/info", infoController);
router.use("/auth", authRoutes);
router.use("/profile", userRoutes);
module.exports = router;
