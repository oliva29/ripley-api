const { Sequelize, DataTypes, QueryTypes } = require('sequelize');
const { database } = require('./config/index');

let sequelize = null; 
if (!sequelize) {
  sequelize = new Sequelize({
    database: database.database,
    username: database.user,
    password: database.password,
    host: database.host,
    dialect: database.dialect,
    pool: database.pool,
    logging: false,
  });
}

sequelize
  .authenticate()
  .then(() => {
    sequelize.sync();
    console.log('DB connected');
  })
  .catch(err => console.error(`DB not connected _Error: ${err}`));

const db = {
  Sequelize,
  DataTypes,
  sequelize,
  QueryTypes
};

module.exports = db;
