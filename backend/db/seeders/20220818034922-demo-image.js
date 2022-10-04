'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Images', [
      {
        imageableId: 1,
        imageableType: "review",
        url: "https://media.vrbo.com/lodging/26000000/25730000/25726600/25726512/05d28f82.f10.jpg",
      },      {
        imageableId: 1,
        imageableType: "reivew",
        url: "https://media.vrbo.com/lodging/26000000/25730000/25726600/25726512/6845893f.f10.jpg",
      },
      {
        imageableId: 1,
        imageableType: "spot",
        url: "https://media.vrbo.com/lodging/26000000/25730000/25726600/25726512/dade0632.f10.jpg",
      },
      {
        imageableId: 1,
        imageableType: "spot",
        url: "https://media.vrbo.com/lodging/26000000/25730000/25726600/25726512/3f193f3c.f10.jpg",
      },
      {
        imageableId: 1,
        imageableType: "spot",
        url: "https://media.vrbo.com/lodging/26000000/25730000/25726600/25726512/f8f13d3a.f10.jpg",
      },
      {
        imageableId: 1,
        imageableType: "spot",
        url: "https://media.vrbo.com/lodging/26000000/25730000/25726600/25726512/cf1c1164.f10.jpg",
      },
      {
        imageableId: 2,
        imageableType: "spot",
        url: "https://media.vrbo.com/lodging/84000000/83800000/83797500/83797466/e3a65a6f.f10.jpg",
      },
      {
        imageableId: 2,
        imageableType: "spot",
        url: "https://media.vrbo.com/lodging/84000000/83800000/83797500/83797466/c00ecba4.f10.jpg",
      },
      {
        imageableId: 2,
        imageableType: "spot",
        url: "https://media.vrbo.com/lodging/84000000/83800000/83797500/83797466/7ff94b4f.f10.jpg",
      },
      {
        imageableId: 2,
        imageableType: "spot",
        url: "https://media.vrbo.com/lodging/84000000/83800000/83797500/83797466/b69d3c9b.f10.jpg",
      },
      {
        imageableId: 3,
        imageableType: "spot",
        url: "https://media.vrbo.com/lodging/26000000/25730000/25726600/25726512/3f193f3c.f10.jpg",
      },
      {
        imageableId: 3,
        imageableType: "spot",
        url: "https://media.vrbo.com/lodging/26000000/25730000/25726600/25726512/3f193f3c.f10.jpg",
      },
      {
        imageableId: 3,
        imageableType: "spot",
        url: "https://media.vrbo.com/lodging/85000000/84100000/84096400/84096336/a2fc87d4.f10.jpg",
      },
      {
        imageableId: 3,
        imageableType: "spot",
        url: "https://media.vrbo.com/lodging/85000000/84100000/84096400/84096336/5f7f2f77.f10.jpg",
      },
      {
        imageableId: 3,
        imageableType: "spot",
        url: "https://media.vrbo.com/lodging/85000000/84100000/84096400/84096336/fd61c839.f10.jpg",
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
