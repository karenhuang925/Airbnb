'use strict';
const uppercaseFirst = str => `${str[0].toUpperCase()}${str.substr(1)}`;

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Image extends Model {
    getImageable(options) {
      if (!this.imageableType) return Promise.resolve(null);
      const mixinMethodName = `get${uppercaseFirst(this.imageableType)}`;
      return this[mixinMethodName](options);
    }
    static associate(models) {
      Image.belongsTo(
        models.Spot,
        {
          foreignKey: 'imageableId',
          constraints: false
        }),
      Image.belongsTo(
        models.Review,
        {
          foreignKey: 'imageableId',
          constraints: false
        });
    }
  }
  Image.init({
    imageableId: {
      type: DataTypes.INTEGER,
      allowNull:false
    },
    imageableType: {
      type:DataTypes.TEXT,
      allowNull:false
    },
    url: {
      type:DataTypes.STRING,
      allowNull:false
    }
  }, {
    sequelize,
    modelName: 'Image',
    defaultScope: {
      attributes:  ["id", "imageableId", "imageableType", "url"]
    },
  });
  return Image;
};
