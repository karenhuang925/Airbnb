'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Bookings', [
      {
        "spotId": 1,
        "userId": 2,
        "startDate": "2023-11-19",
        "endDate": "2023-12-19",
      },
      {
        "spotId": 1,
        "userId": 3,
        "startDate": "2021-10-19",
        "endDate": "2021-11-19",
      },
      {
        "spotId": 2,
        "userId": 2,
        "startDate": "2021-11-19",
        "endDate": "2021-11-20",
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Bookings', {
      id: { [Op.in]: [1,2,3] }
    }, {});
  }
};
