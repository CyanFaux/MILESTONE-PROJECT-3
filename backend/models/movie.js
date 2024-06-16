"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Movie extends Model {
    static associate({ Review }) {
      Movie.hasMany(Review, { as: "review", foreignKey: "movie_id" });
    }
  }

  Movie.init(
    {
      movieId: {
        type: DataTypes.SMALLINT,
        primaryKey: true,
        autoIncrement: true,
      },
      poster: DataTypes.STRING,
      title: DataTypes.STRING,
      year: DataTypes.SMALLINT,
      director: DataTypes.STRING,
      genre: DataTypes.STRING,
      plot: DataTypes.STRING,
    },
    {
      sequelize,
      underscored: true,
      modelName: "Movie",
    }
  );
  return Movie;
};
