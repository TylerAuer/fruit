'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Rating extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Rating.init(
    {
      session_id: DataTypes.STRING,
      bananas_x: DataTypes.FLOAT,
      bananas_y: DataTypes.FLOAT,
      blueberries_x: DataTypes.FLOAT,
      blueberries_y: DataTypes.FLOAT,
      cherries_x: DataTypes.FLOAT,
      cherries_y: DataTypes.FLOAT,
      coconuts_x: DataTypes.FLOAT,
      coconuts_y: DataTypes.FLOAT,
      grapefruits_x: DataTypes.FLOAT,
      grapefruits_y: DataTypes.FLOAT,
      grapes_x: DataTypes.FLOAT,
      grapes_y: DataTypes.FLOAT,
      green_apples_x: DataTypes.FLOAT,
      green_apples_y: DataTypes.FLOAT,
      lemons_x: DataTypes.FLOAT,
      lemons_y: DataTypes.FLOAT,
      melons_x: DataTypes.FLOAT,
      melons_y: DataTypes.FLOAT,
      oranges_x: DataTypes.FLOAT,
      oranges_y: DataTypes.FLOAT,
      peaches_x: DataTypes.FLOAT,
      peaches_y: DataTypes.FLOAT,
      pears_x: DataTypes.FLOAT,
      pears_y: DataTypes.FLOAT,
      pineapples_x: DataTypes.FLOAT,
      pineapples_y: DataTypes.FLOAT,
      red_apples_x: DataTypes.FLOAT,
      red_apples_y: DataTypes.FLOAT,
      strawberries_x: DataTypes.FLOAT,
      strawberries_y: DataTypes.FLOAT,
      watermelons_x: DataTypes.FLOAT,
      watermelons_y: DataTypes.FLOAT,
    },
    {
      sequelize,
      modelName: 'Rating',
    }
  );
  return Rating;
};
