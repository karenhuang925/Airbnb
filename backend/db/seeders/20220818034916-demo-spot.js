'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Spots', [
      {
        ownerId: 1,
        address: "123 Miramar Beach Lane",
        city: "Florida",
        state: "Miramar",
        country: "United States of America",
        lat: 57.7645358,
        lng: -122.4730327,
        name: "Treasure Chest - Gulf View, Heated Private Pool, Easy Walk to the Beach!",
        description: "Treasure Chest - This charming vacation home has four bedrooms and can sleep up to 12 happy beachgoers. It is located in a sought-after location off Scenic Gulf Drive in Destin’s Miramar Beach. You will find yourself in the heart of everything this area has to offer, but since you are tucked away in a private residential neighborhood you will be in a wonderful world of your own. The pristine beach is just a short stroll away with no roads to cross. However, you don’t have to take more than a few steps to enjoy a refreshing dip since this home has a private pool. The lagoon shaped pool has a lovely landscaped setting out back that is adorned with towering palm trees, tropical plantings, a paver tiled patio, a raised sun deck and an attractive arbor with plenty of seating for leisurely lounging. A gas grill, tables and chairs may inspire you to create your own Surf n Turf meal while enjoying favorite drinks before dining poolside.",
        price: 350,
        previewImage:"https://media.vrbo.com/lodging/26000000/25730000/25726600/25726512/c0023210.f10.jpg"
      },
      {
        ownerId: 1,
        address: "234 Disney Lane",
        city: "San Jose",
        state: "CA",
        country: "United States of America",
        lat: 37.7645358,
        lng: -125.4730327,
        name: "House 2 by the square",
        description: "La Place where web developers are created",
        price: 999,
        previewImage:"https://cdn.houseplansservices.com/content/9ns4vp133de3p7n98dhr862uvd/w384x256.jpg?v=2"
      },
      {
        ownerId: 3,
        address: "345 Disney Lane",
        city: "San Mateo",
        state: "CA",
        country: "United States of America",
        lat: 38.7645358,
        lng: -162.4730327,
        name: "House 3 by the lake",
        description: "Lala Place where web developers are created",
        price: 34,
        previewImage:"https://api.advancedhouseplans.com/uploads/plan-29921/29921-quinn-art-perfect-thumb.jpg"
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
