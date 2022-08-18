'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Reviews', [
      {
        userId: 2,
        spotId: 1,
        content: "This was an awesome spot!",
        stars: 5,
      },
      {
        userId: 2,
        spotId: 1,
        stars: 4,
      },
      {
        userId: 2,
        spotId: 2,
        content: "I love this house!",
        stars: 5,
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Reviews', {
      id: { [Op.in]: [1,2,3] }
    }, {});
  }
};
