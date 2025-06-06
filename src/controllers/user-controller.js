const jwt = require("jsonwebtoken");
const { UserService } = require("../services");
const { ErrorResponse, SuccessResponse } = require("../utils/common");
const { getLogger } = require("../config");
const logger = getLogger(__filename);
const AppError = require("../utils/AppError");
const { StatusCodes } = require("http-status-codes");
const { ServerConfig } = require("../config");
const { SECRET_KEY } = ServerConfig;

async function signup(req, res) {
  const { fullName, email, phone, password } = req.body;
  try {
    const response = await UserService.signup(fullName, email, phone, password);

    if (!response) {
      throw new AppError(
        "Failed to create user",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
    SuccessResponse.data = response;
    SuccessResponse.message = "Successfully created user";
    return res.status(StatusCodes.CREATED).json(SuccessResponse);
  } catch (error) {
    logger.error(error.stack || error.message);

    const statusCode =
      error instanceof AppError
        ? error.statusCode
        : StatusCodes.INTERNAL_SERVER_ERROR;
    const message =
      error instanceof AppError
        ? error.message
        : "Something went wrong while sign in ";
    ErrorResponse.error = error;
    ErrorResponse.message = message;
    return res.status(statusCode).json(ErrorResponse);
  }
}
async function login(req, res) {
  const { email, phone, password } = req.body;
  try {
    const response = await UserService.login(email, phone, password);

    if (!response) {
      throw new AppError("Failed to login ", StatusCodes.INTERNAL_SERVER_ERROR);
    }
    SuccessResponse.data = response;
    SuccessResponse.message = "Successfully logged in";
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    logger.error(error.stack || error.message);
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

async function updateuser(req, res) {
  try {
    const token = req.headers["x-access-token"];
    if (!token) {
      throw new AppError("Token not found", StatusCodes.BAD_REQUEST);
    }
    const isAuthenticated = await jwt.verify(token, SECRET_KEY);
    if (!isAuthenticated) {
      throw new AppError("Unauthorised user", StatusCodes.UNAUTHORIZED);
    }
    const userId = isAuthenticated.id;

    const allowedFields = [
      "fullName",
      "email",
      "phone",
      "profilePicUrl",
      "passportNumber",
      "dateOfBirth",
      "country",
      "gender",
    ];
    const updateData = {};

    for (const key of allowedFields) {
      if (req.body[key] !== undefined) {
        updateData[key] = req.body[key];
      }
    }

    const response = await UserService.updateuser(userId, updateData);

    SuccessResponse.data = response;
    SuccessResponse.message = "Successfully updated user";
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    logger.error(error.stack || error.message);
    const statusCode =
      error instanceof AppError
        ? error.statusCode
        : StatusCodes.INTERNAL_SERVER_ERROR;
    const message =
      error instanceof AppError
        ? error.message
        : "Something went wrong while updating profile ";
    ErrorResponse.error = error;
    ErrorResponse.message = message;

    return res.status(statusCode).json(ErrorResponse);
  }
}

module.exports = { signup, login, updateuser };
