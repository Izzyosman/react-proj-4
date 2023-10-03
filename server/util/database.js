const Sequelize = require('sequelize');
require('dotenv').config();

// Establish database connection
const sequelize = new Sequelize(process.env.CONNECTION_STRING, {
  dialect: 'postgres',
  protocol: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    }
  }
});

module.exports = sequelize;
