const { StatusCodes } = require("http-status-codes");
const { ErrorResponse } = require("../utils/common");
const AppError = require("../utils/AppError");

function validateLoginRequest(req, res, next) {
  try {
    if (!req.body || typeof req.body !== "object") {
      throw new AppError("Invalid request body", StatusCodes.BAD_REQUEST);
    }
    const { email, phone, password } = req.body;
    if (!email && !phone) {
      throw new AppError(
        "Phone Number or email is required",
        StatusCodes.BAD_REQUEST
      );
    }
    if (!password) {
      throw new AppError("Password is required", StatusCodes.BAD_REQUEST);
    }
    next();
  } catch (error) {
    const statusCode =
      error instanceof AppError
        ? error.statusCode
        : StatusCodes.INTERNAL_SERVER_ERROR;
    const message =
      error instanceof AppError
        ? error.message
        : "Something went wrong while logging in ";
    ErrorResponse.error = error;
    ErrorResponse.message = message;
    return res.status(statusCode).json(ErrorResponse);
  }
}

module.exports = { validateLoginRequest };
