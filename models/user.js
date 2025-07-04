'use strict';
const {
  Model
} = require('sequelize');
const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasOne(models.Profile, {
        foreignKey: "UserId",
      });

      User.hasMany(models.Game, {
        foreignKey: "UserId",
      });

      User.belongsToMany(models.Game, {
        through: models.Purchase,
        foreignKey: "UserId",
      });
    }
  }
  User.init({
    userName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });

  // Hooks
  User.beforeCreate((user) => {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(user.password, salt);
    user.password = hash;
  });

  return User;
};