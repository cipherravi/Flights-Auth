const { UserRepository } = require("../repositories");
const { ServerConfig } = require("../config");
const { getLogger } = require("../config");
const logger = getLogger(__filename);
const { SECRET_KEY } = ServerConfig;
const AppError = require("../utils/AppError");
const { StatusCodes } = require("http-status-codes");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userRepository = new UserRepository();

async function signup(fullName, email, phone, password) {
  try {
    const passwordHash = await bcrypt.hash(password, 10);

    const createdUser = await userRepository.create({
      fullName,
      email,
      phone,
      passwordHash,
    });

    if (!createdUser) {
      throw new AppError(
        "Failed to create User",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
    return createdUser;
  } catch (error) {
    logger.error(error.stack || error.message);

    if (error.name == "SequelizeValidationError") {
      let explanation = [];
      error.errors.forEach((err) => {
        explanation.push(err.message);
      });
      logger.error(explanation);
      throw new AppError(explanation, StatusCodes.BAD_REQUEST);
    }
    logger.error(error.message);

    throw new AppError(
      "Failed to create user object",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function login(phone, email, password) {
  try {
    let user;
    if (phone) {
      user = await userRepository.findUser(phone);
    } else if (email) {
      user = await userRepository.findUser(email);
    } else {
      throw new AppError("Phone or email is required", StatusCodes.BAD_REQUEST);
    }
    if (!user) {
      throw new AppError(
        "Invalid credentials , User not found",
        StatusCodes.BAD_REQUEST
      );
    }
    const verifiedPassword = await bcrypt.compare(password, user.passwordHash);

    if (!verifiedPassword) {
      throw new AppError(
        "Invalid credentials , Incorrect password",
        StatusCodes.BAD_REQUEST
      );
    }

    //update lastLoginAt
    await userRepository.update(user.id, {
      lastLoginAt: new Date(),
    });

    const payload = {
      id: user.id,
      email: user.email,
      role: user.role,
      issuedAt: new Date(),
    };

    const token = await jwt.sign(payload, SECRET_KEY, { expiresIn: "7d" });

    return token;
  } catch (error) {
    logger.error(error.stack || error.message);

    // Don't override existing AppError
    if (error instanceof AppError) {
      throw error;
    }

    throw error;
  }
}

module.exports = { signup, login };
