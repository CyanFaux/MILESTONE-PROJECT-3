"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    static associate({ User, Movie }) {
      Review.belongsTo(Movie, { as: "movie", foreignKey: "imdb_id" });
      Review.belongsTo(User, { as: "user", foreignKey: "user_id" });
    }
  }
  Review.init(
    {
      review_id: {
        type: DataTypes.SMALLINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      user_id: {
        type: DataTypes.SMALLINT,
        references: {
          model: "user",
          key: "userId",
        },
        allowNull: false,
      },
      imdb_id: {
        type: DataTypes.SMALLINT,
        references: {
          model: "movie",
          key: "imdbId",
        },
        allowNull: false,
      },
      review_rating: { type: DataTypes.BOOLEAN, allowNull: false },
      review_text: DataTypes.STRING,
    },
    {
      sequelize,
      underscored: true,
      modelName: "Review",
    }
  );
  return Review;
};
