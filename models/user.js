'use strict';

const bcrypt = require('bcrypt')

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasOne(models.Profile)
      User.hasMany(models.Service)
    }
  }
  User.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notNull: {
          msg: "username cannot be null"
        },
        notEmpty: {
          msg: "username cannot be empty"
        },
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Password cannot be null"
        },
        notEmpty: {
          msg: "Password cannot be empty"
        },
        len: {
          args: [8],
          msg: "Password must be more than 8"
        }
      }
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "role cannot be null"
        },
        notEmpty: {
          msg: "role cannot be empty"
        },
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "email cannot be null"
        },
        notEmpty: {
          msg: "email cannot be empty"
        },
      }
    },
  }, {
    sequelize,
    modelName: 'User'
  });

  User.beforeCreate((user, option) => {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(user.password, salt);

    user.password = hash
  })

  return User;
};