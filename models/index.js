const User = require("./User");
const Favorite = require("./Favorite.model");

User.belongsToMany(Favorite, { through: "UserFavorites" });
Favorite.belongsToMany(User, { through: "UserFavorites" });

module.exports = {
  User,
  Favorite,
};
