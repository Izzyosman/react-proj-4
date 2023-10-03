const sequelize = require('../util/database');
const User = require('./user');
const Favorite = require('./favorites');

User.hasMany(Favorite, { foreignKey: 'userId' });
Favorite.belongsTo(User, { foreignKey: 'userId' });

module.exports = {
    sequelize, 
    User, 
    Favorite
};
