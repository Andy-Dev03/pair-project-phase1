'use strict';
const {
  Model
} = require('sequelize');
const { getDate } = require('../helpers/helper');
module.exports = (sequelize, DataTypes) => {
  class Purchase extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Purchase.belongsTo(models.User, {
        foreignKey: "UserId",
      })

      Purchase.belongsTo(models.Game, {
        foreignKey: "GameId",
      })
    }
    get date () {
      return getDate(this.purchaseDate)
    }
  }
  Purchase.init({
    UserId: DataTypes.INTEGER,
    GameId: DataTypes.INTEGER,
    purchaseDate: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Purchase',
  });
  return Purchase;
};