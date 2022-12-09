const { DataTypes, Model } = require("sequelize");

const db = require("../config/db");

class Favorite extends Model {}
Favorite.init(
  {
    imdbID: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Year: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // Type: {
    //   type: DataTypes.STRING,
    //   allowNull: false,
    // },
    Poster: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { sequelize: db, modelName: "favorite" }
);

module.exports = Favorite;
