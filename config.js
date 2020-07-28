require('dotenv').config();

const env = process.env.NODE_ENV;
const config = {
  app: {
    port: process.env.SERVER_PORT || 3000,
    api: process.env.IEX_API_KEY,
  },
  // db: {
  //   host: process.env.DB_HOST || 'localhost',
  //   port: parseInt(process.env.DB_PORT, 10) || 5432,
  //   database: process.env.DB_DATABASE || 'watchlist',
  //   user: process.env.DB_USERNAME,
  //   // password: process.env.DB_PASSWORD,
  // },
};

module.exports = config;