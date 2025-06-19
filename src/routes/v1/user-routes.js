const express = require("express");
const router = express.Router();

const verifyUser = require("../../middlewares/verifyUser");
const { UserController } = require("../../controllers");
const { updateUser, getProfile } = UserController;

router.patch("/", verifyUser, updateUser);
router.get("/", verifyUser, getProfile);

module.exports = router;
