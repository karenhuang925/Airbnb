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
        {foreignKey: 'ownerId', as: 'Owner'}
      ),
      Spot.hasMany(
        models.Review,
        {foreignKey: 'spotId'}
      )
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
      allowNull: false
    },
    city: {
      type:DataTypes.STRING,
      allowNull: false
    },
    state: {
      type:DataTypes.STRING,
      allowNull: false,
    },
    country: {
      type:DataTypes.STRING,
      allowNull: false,
      },
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
    defaultScope: {
      attributes:  ["id", "ownerId", "address", "city","state","country","lat","lng","name","description","price","createdAt","updatedAt"]
    },
  });
  return Spot;
};
