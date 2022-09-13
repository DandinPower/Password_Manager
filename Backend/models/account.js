'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Account extends Model {
    static associate(models) {
      Account.belongsTo(models.Manager);
    }
  }
  Account.init({
    managerId: DataTypes.INTEGER,
    description: DataTypes.STRING,
    account: DataTypes.STRING,
    password: DataTypes.STRING,
    note: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Account',
  });
  return Account;
};