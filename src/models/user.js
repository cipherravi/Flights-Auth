"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init(
    {
      fullName: { type: DataTypes.STRING, allowNull: false },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      passwordHash: { type: DataTypes.STRING, allowNull: false },
      phone: { type: DataTypes.BIGINT, allowNull: false, unique: true },
      isVerified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
      passportNumber: { type: DataTypes.STRING, allowNull: true },
      country: { type: DataTypes.STRING, allowNull: true },
      dateOfBirth: { type: DataTypes.DATE, allowNull: true },
      gender: {
        type: DataTypes.ENUM,
        allowNull: true,
        values: ["male", "female", "noDisclouser"],
      },
      role: {
        type: DataTypes.ENUM,
        values: ["user", "admin", "company"],
        defaultValue: "user",
      },
      profilePicUrl: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          isUrl: true,
        },
      },
      lastLoginAt: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: Date.now,
      },
      walletBalance: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 10000,
      },
    },
    {
      sequelize,
      modelName: "User",
      timestamps: true,
    }
  );
  return User;
};
