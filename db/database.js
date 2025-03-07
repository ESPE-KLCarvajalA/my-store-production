const { Sequelize } = require('sequelize');
const config = require('../config/config'); // Importa el archivo de configuración

// Determina si estamos en producción o desarrollo
const environment = process.env.NODE_ENV || 'development'; // Default a 'development' si no está definido

const sequelize = new Sequelize(config[environment].url, {
  dialect: 'postgres',
  dialectOptions: config[environment].dialectOptions,
  logging: environment === 'production' ? false : console.log, // Desactiva logs en producción
  pool: environment === 'production'
    ? {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
      }
    : {},
});

module.exports = sequelize;
