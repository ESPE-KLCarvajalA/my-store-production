// config/config.js
require('dotenv').config();

module.exports = {
  development: {
    url: process.env.DATABASE_URL,
    dialect: 'postgres',
    logging: console.log,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
    port: process.env.PORT || 3000, // Puerto
    isProd: false, // Indica si es producción
  },
  production: {
    url: process.env.DATABASE_URL,
    dialect: 'postgres',
    logging: console.log,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
    port: process.env.PORT || 3000, // Puerto
    isProd: true, // Indica si es producción
  },
};
