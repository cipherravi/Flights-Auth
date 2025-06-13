const express = require("express");
const router = express.Router();

const { UserMiddleware } = require("../../middlewares");
const { validateLoginRequest, userVerification } = UserMiddleware;
const { UserController } = require("../../controllers");
const { login, signup, updateuser } = UserController;

router.post("/signup", signup);
router.post("/login", validateLoginRequest, login);
router.patch("/profile", userVerification, updateuser);

module.exports = router;
