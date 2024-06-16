"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    static associate({ user, movie }) {
      Review.belongsTo(movie, { as: "movie", foreignKey: "imdb_id" });
      Review.belongsTo(user, { as: "user", foreignKey: "user_id" });
    }
  }
  Review.init(
    {
      reviewId: {
        type: DataTypes.SMALLINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      userId: {
        type: DataTypes.SMALLINT,
        references: {
          model: "user",
          key: "userId",
        },
        allowNull: false,
      },
      imdbId: {
        type: DataTypes.SMALLINT,
        references: {
          model: "movie",
          key: "imdbId",
        },
        allowNull: false,
      },
      reviewRating: { type: DataTypes.BOOLEAN, allowNull: false },
      reviewText: DataTypes.STRING,
    },
    {
      sequelize,
      underscored: true,
      modelName: "Review",
    }
  );
  return Review;
};
