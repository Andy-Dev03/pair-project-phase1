'use strict';
const {
  Model
} = require('sequelize');
const { getTime } = require('../helpers/helper');
module.exports = (sequelize, DataTypes) => {
  class Game extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
       Game.belongsTo(models.User, {
        foreignKey: "UserId",
      })

      Game.belongsToMany(models.Category, {
        through: models.GameCategory,
        foreignKey: "GameId",
      })

      Game.belongsToMany(models.User, {
        through: models.Purchase,
        foreignKey: "GameId",
      })
    }

    get time () {
      return getTime(this.createdAt)
    }
  }
  Game.init({
    gameName: DataTypes.STRING,
    UserId: DataTypes.INTEGER,
    imageUrl: DataTypes.STRING,
    createdAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Game',
  });
  return Game;
};