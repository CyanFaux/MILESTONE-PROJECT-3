// from rest-rant
"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate({ Review }) {
      User.hasMany(Review, { as: "author", foreignKey: "author_id" });
    }
  }
  User.init(
    {
      userId: {
        type: DataTypes.SMALLINT,
        primaryKey: true,
        autoIncrement: true,
      },
      username: DataTypes.STRING,
      email: DataTypes.STRING,
      passwordDigest: DataTypes.STRING,
      role: {
        type: DataTypes.ENUM,
        values: ["reviewer", "admin"],
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
