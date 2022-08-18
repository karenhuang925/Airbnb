'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Spot extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Spot.belongsTo(
        models.User,
        {foreignKey: 'ownerId'}
      ),
      Spot.hasMany(
        models.Image,
        {
          foreignKey:'imageableId',
          constraints:false,
          scope:{
            imageableType:'spot'
          }
        }
      )
    }
  }
  Spot.init({
    ownerId: {
      type:DataTypes.INTEGER,
      allowNull: false,
    },
    address: {
      type:DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3, 256],
      }
    },
    city: {
      type:DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [2, 256],
      }
    },
    state: {
      type:DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [2,4],
      }
    },
    country: {
      type:DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3, 256],
      }},
    lat: {
      type:DataTypes.DECIMAL,
      isDecimal: true,
      allowNull: false,
      validate: {
        min: -90,
        max: 90
      }},
    lng: {
      type:DataTypes.DECIMAL,
      isDecimal: true,
      allowNull: false,
      validate: {
        min: -180,
        max: 180
      }
    },
    name: {
      type:DataTypes.STRING,
      allowNull:false
    },
    description: DataTypes.TEXT,
    price: DataTypes.INTEGER,
    previewImage: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Spot',
  });
  return Spot;
};
