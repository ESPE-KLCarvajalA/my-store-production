// db/database.js
const { Sequelize } = require('sequelize');
const { config } = require('../config/config');

const sequelize = new Sequelize(config.dbUrl, {
  dialect: 'postgres',
  dialectOptions: config.isProd
    ? {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        },
      }
    : {},
  logging: config.isProd ? false : console.log, // Desactiva logs en producción
  pool: config.isProd
    ? {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
      }
    : {},
});

module.exports = sequelize;
