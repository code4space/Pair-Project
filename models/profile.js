'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Profile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Profile.belongsTo(models.User)
    }

    //helper di getter/static method , dahlah
    get formattingDate() {
      const optionsDate = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', };
      return this.createdAt.toLocaleDateString('id-ID', optionsDate);
    }
  }
  Profile.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    UserId: DataTypes.INTEGER,
    imageUrl: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Profile',
  });
  return Profile;
};