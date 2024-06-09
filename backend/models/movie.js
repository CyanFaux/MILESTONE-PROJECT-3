"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Movie extends Model {
    static associate({ Review }) {
      Movie.hasMany(Review, { as: "reviews", foreignKey: "movie_id" });
    }
  }

  Movie.init({
    movieId: {
      type: DataTypes.SMALLINT,
      primaryKey: true,
      autoIncrement: true,
    },
    title: DataTypes.STRING,
    year: DataTypes.SMALLINT,
    genre: DataTypes.STRING,
    pic: DataTypes.STRING,
  },
  {
    sequelize,
    underscored: true,
    modelName: "Movie",
  }
);
};
