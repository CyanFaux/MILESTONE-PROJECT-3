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
      imdbId: {
        type: DataTypes.SMALLINT, 
        primaryKey: true,
      },
      movieTitle: DataTypes.STRING,
    },
    {
      sequelize,
      underscored: true,
      modelName: "Movie",
    }
  );
  return Movie;
};
