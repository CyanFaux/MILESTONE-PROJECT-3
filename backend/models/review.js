"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    static associate({ User, Movie }) {
      Review.belongsTo(Movie, { as: "movie", foreignKey: "movie_id" });
      Review.belongsTo(User, { as: "author", foreignKey: "author_id" });
    }
  }
  Review.init(
    {
      reviewId: {
        type: DataTypes.SMALLINT,
        primaryKey: true,
        autoIncrement: true,
      },
      movieId: DataTypes.SMALLINT,
      authorId: DataTypes.SMALLINT,
      content: DataTypes.STRING,
      rating: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      underscored: true,
      modelName: "Review",
    }
  );
  return Review;
};
