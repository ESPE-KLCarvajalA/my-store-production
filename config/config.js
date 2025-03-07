require('dotenv').config();

const config = {
  env: process.env.NODE_ENV || 'development',
  isProd: process.env.NODE_ENV === 'production',
  port: process.env.PORT || 3000,
  dbUrl: process.env.DATABASE_URL, // Railway proporciona esta variable
};

module.exports = { config };
