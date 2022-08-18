'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Images', [
      {
        imageableId: 1,
        imageableType: "review",
        url: "https://cdn.vox-cdn.com/thumbor/F5uoRcOGCsqxzzKHN64ahUrJ0kc=/1400x1050/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/22375210/House_Tour_Liverman_3D6A3138_tour.jpg",
      },
      {
        imageableId: 1,
        imageableType: "spot",
        url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcEbrtRaZ6uNKaDxXGY69IiaryI5lYAV96MdBd8vUGnFCVrgxHRRT_9SYhhCjYkzsIw24&usqp=CAU",
      },
      {
        imageableId: 2,
        imageableType: "reivew",
        url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTeACXHKfOIaaHVs2gvY0qJ7Z8eDVkiqOO6wg&usqp=CAU",
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Images', {
      id: { [Op.in]: [1,2,3] }
    }, {});
  }
};
