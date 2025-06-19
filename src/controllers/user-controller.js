// const jwt = require("jsonwebtoken");
const { UserService } = require("../services");
const { ErrorResponse, SuccessResponse } = require("../utils/common");
const { getLogger } = require("../config");
const logger = getLogger(__filename);
const AppError = require("../utils/AppError");
const { StatusCodes } = require("http-status-codes");
// const { serverConfig } = require("../config");
// const {} = ServerConfig;

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

    res.cookie("token", response, {
      httpOnly: true,
      secure: false, // Use true in production with HTTPS
      sameSite: "Strict",
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
    });
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

async function updateUser(req, res) {
  try {
    const userId = req.user.id;

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

    if (req.body == undefined) {
      throw new AppError("Empty fields ", StatusCodes.BAD_REQUEST);
    }

    for (const key of allowedFields) {
      if (req.body[key] !== undefined) {
        updateData[key] = req.body[key];
      }
    }

    const response = await UserService.updateUser(userId, updateData);

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

async function getProfile(req, res) {
  try {
    const { id } = req.user;
    const response = await UserService.getProfile(id);
    if (!response) {
      throw new AppError(
        "Profile not Found , please check details",
        StatusCodes.NOT_FOUND
      );
    }
    SuccessResponse.data = response;
    SuccessResponse.message = "Successfully fetched user Profile";
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
        : "Something went wrong while fetching profile ";
    ErrorResponse.error = error;
    ErrorResponse.message = message;

    return res.status(statusCode).json(ErrorResponse);
  }
}

module.exports = { signup, login, updateUser, getProfile };
