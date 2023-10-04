const Favorite = require("../models/favorites");
const User = require("../models/user");

module.exports = {
  getAllFavorites: async (req, res) => {
    try {
      const favorites = await Favorite.findAll({
        include: [
          {
            model: User,
            required: false,
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
      const favoriteData = req.body.favoriteData;
      const data = {...favoriteData, userId: userId};
      const favResponse = await Favorite.create(data);
      res.status(200).send(favResponse);
    } catch (error) {
      console.error(error);
      res.status(400).send(error);
    }
  },

  deleteFavorite: async (req, res) => {
    try {
      const id = req.params.id;
      await Favorite.destroy({ where: { id: +id } });
      res.status(200).json({ message: 'Successfully deleted' });
    } catch (error) {
      console.log('ERROR IN deleteFavorite');
      console.log(error);
      res.sendStatus(400);
    }
  },
};
