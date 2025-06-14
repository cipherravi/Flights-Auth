const express = require("express");
const router = express.Router();

const { UserMiddleware } = require("../../middlewares");
const { validateLoginRequest } = UserMiddleware;

const { UserController } = require("../../controllers");
const { login, signup } = UserController;

router.post("/signup", signup);
router.post("/login", validateLoginRequest, login);

module.exports = router;
