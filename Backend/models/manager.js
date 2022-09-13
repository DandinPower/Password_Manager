'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Manager extends Model {
    static associate(models) {
      Manager.hasMany(models.Account);
    }
  }
  Manager.init({
    username: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Manager',
  });
  return Manager;
};