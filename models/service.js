'use strict';
const {
  Model
} = require('sequelize');
const convertMoney = require('../helpers/currencyConverter')
module.exports = (sequelize, DataTypes) => {
  class Service extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Service.belongsTo(models.User)
      Service.belongsTo(models.Category)
    }



    get priceConvertedToRupiah() {
      return convertMoney(this.price)
    }

  }
  Service.init({
    nameService: DataTypes.STRING,
    description: DataTypes.TEXT,
    price: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER,
    CategoryId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Service',
  });
  return Service;
};