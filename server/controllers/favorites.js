const Favorite = require("../models/favorites");
const User = require("../models/user");

module.exports = {
  getAllFavorites: async (req, res) => {
    try {
      const favorites = await Favorite.findAll({
        include: [
          {
            model: User,
            required: false, // temp change
            attributes: ['username'],
          },
        ],
      });
      res.status(200).send(favorites);
    } catch (error) {
      console.log("ERROR IN getAllFavorites:", error);
      res.status(500).send({ error: error.message });
    }
  },

  addFavorite: async (req, res) => {
    try {
      const userId = req.user.id;
      const favoriteData = req.body;
      console.log(favoriteData);
      const favorite = await Favorite.create({ ...favoriteData, userId });
      res.status(200).send(favorite);
    } catch (error) {
      console.error(error);
      res.status(400).send(error);
    }
  },

  deleteFavorite: async (req, res) => {
    try {
      const { id } = req.params;
      await Favorite.destroy({ where: { id: +id } });
      res.sendStatus(200);
    } catch (error) {
      console.log('ERROR IN deleteFavorite');
      console.log(error);
      res.sendStatus(400);
    }
  },
};
