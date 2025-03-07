const { config } = require('./../config/config');

module.exports = {
  development: {
    url: config.dbUrl,
    dialect: 'postgres',
  },
  production: {
    url: config.dbUrl,
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false 
      }
    },
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
};
