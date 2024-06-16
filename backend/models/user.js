// from rest-rant
"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate({ review }) {
      User.hasMany(review, { as: "user", foreignKey: "user_id" });
    }
  }
  User.init(
    {
      userId: {
        type: DataTypes.SMALLINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      username: {
        type: DataTypes.VARCHAR(50),
        allowNull: false,
      },
      email: {
        type: DataTypes.VARCHAR(100),
        allowNull: false,
      },
      passwordDigest: {
        type: DataTypes.VARCHAR(255),
        allowNull: false,
      },
      role: {
        type: DataTypes.ENUM,
        values: ["reviewer", "admin"],
        allowNull: false,
      },
    },
    {
      sequelize,
      underscored: true,
      modelName: "User",
    }
  );
  return User;
};
