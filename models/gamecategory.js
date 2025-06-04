'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class GameCategory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  GameCategory.init({
    CategoryId: DataTypes.INTEGER,
    GameId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'GameCategory',
  });
  return GameCategory;
};