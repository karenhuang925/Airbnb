'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Spots', [
      {
        ownerid: 1,
        address: "123 Disney Lane",
        city: "San Francisco",
        state: "CA",
        country: "United States of America",
        lat: 57.7645358,
        lng: -122.4730327,
        name: "House 1 by the sea",
        description: "Place where web developers are created",
        price: 123
      },
      {
        ownerid: 1,
        address: "234 Disney Lane",
        city: "San Jose",
        state: "CA",
        country: "United States of America",
        lat: 37.7645358,
        lng: -125.4730327,
        name: "House 2 by the square",
        description: "La Place where web developers are created",
        price: 999
      },
      {
        ownerid: 3,
        address: "345 Disney Lane",
        city: "San Mateo",
        state: "CA",
        country: "United States of America",
        lat: 38.7645358,
        lng: -162.4730327,
        name: "House 3 by the lake",
        description: "Lala Place where web developers are created",
        price: 34
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Spots', {
      id: { [Op.in]: [1,2,3] }
    }, {});
  }
};
