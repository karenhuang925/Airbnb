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
        imageableId: 8,
        imageableType: "spot",
        url: "https://media.vrbo.com/lodging/26000000/25730000/25726600/25726512/b96f6169.f10.jpg",
      },
      {
        imageableId: 8,
        imageableType: "spot",
        url: "https://media.vrbo.com/lodging/26000000/25730000/25726600/25726512/dade0632.f10.jpg",
      },
      {
        imageableId: 8,
        imageableType: "spot",
        url: "https://media.vrbo.com/lodging/26000000/25730000/25726600/25726512/3f193f3c.f10.jpg",
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
