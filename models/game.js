'use strict';
const {
  Model
} = require('sequelize');
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
  }
  Game.init({
    gameName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg : 'Game Name is required'
        },
        notEmpty: {
          args: true,
          msg : 'Game Name is required'
        }
      }
    },
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg : 'User is required'
        },
        notEmpty: {
          args: true,
          msg : 'User is required'
        }
      }
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg : 'Image Url is required'
        },
        notEmpty: {
          args: true,
          msg : 'Image Url is required'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Game',
  });
  return Game;
};