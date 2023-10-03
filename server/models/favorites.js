const { DataTypes } = require("sequelize");
const sequelize = require("../util/database");

const Favorite = sequelize.define("favorite", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  businessId: DataTypes.STRING,
  imageUrl: DataTypes.STRING,
  name: DataTypes.STRING,
  address: DataTypes.STRING,
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'users', // 'users' refers to the table name for User model, sequelize converts all table names to plural by default
      key: 'id',
    },
  },
});

module.exports = Favorite;
