 
require('dotenv').config({path:`${__dirname}/../../.env`});
 
module.exports = {
  dev: process.env.NODE_ENV !== 'production',
  port: process.env.PORT,
  database: {
    host: process.env.DB_HOST, 
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    dialect: process.env.DB_DIALECT,
    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  },
  client: process.env.CLIENT,
  secret_jwt: process.env.SECRET_JWT,
};
