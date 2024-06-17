// from rest-rant
"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate({ Review }) {
      User.hasMany(Review, { as: "user", foreignKey: "user_id" });
    }
  }
  User.init(
    {
      user_id: {
        type: DataTypes.SMALLINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      username: {
        type: DataTypes.STRING,
        length: 50,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        length: 100,
        allowNull: false,
      },
      passwordDigest: {
        type: DataTypes.STRING,
        length: 255,
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
