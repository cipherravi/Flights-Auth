const express = require("express");
const router = express.Router();
const { infoController } = require("../../controllers");
const authRoutes = require("./auth-routes");

router.use("/info", infoController);
router.use("/auth", authRoutes);
module.exports = router;
