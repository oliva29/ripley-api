const { sequelize, DataTypes } = require('../database');   

const Client = sequelize.define(
  'client',
  {
    id: {
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      type: DataTypes.UUID,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING(255), 
      allowNull: false,
    },
    dateOfBirth: {
      type:  DataTypes.DATE 
    }, 
    age: {
      type: DataTypes.INTEGER,
    },  
    state: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    }, 
    createdAt: {
      type: DataTypes.DATE,
      allowNull: true
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true
    }
  },
  {
    timestamps: true,
  },
);

 

module.exports = Client;
