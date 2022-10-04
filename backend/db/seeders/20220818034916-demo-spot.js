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
        address: "234 Palm Harbor Lane",
        city: "Palm Harbor",
        state: "Florida",
        country: "United States of America",
        lat: 37.7645358,
        lng: -125.4730327,
        name: "Relaxing Saltwater Canal Home with Pool & Close Proximity to the Beach",
        description: "This 2-bedroom, 2-bathroom home is the perfect place to soak up the sun. Enjoy fishing in the backyard off the deck or enjoy a nice cup of coffee as the sun comes up while watching a dolphin cruise by. Treat yourself to salt life at its finest and take a dip in your own private turquoise pool, relax or head out for some fun in the surf. Grass-covered backyard is ideal for quiet relaxation as you lounge on the deck and marvel at the lush tropical canopy (think towering palms, Spanish moss) framing the Florida sky. If you’re feeling festive, this private oasis has everything you need for entertaining family and friends, including seating areas under a covered patio, propane grill and a spa just waiting to soothe away all your stress.",
        price: 999,
        previewImage:"https://media.vrbo.com/lodging/84000000/83800000/83797500/83797466/5f1a0c3c.f10.jpg"
      },
      {
        ownerId: 2,
        address: "345 Cherokee Lane",
        city: "Cherokee Triangle",
        state: "Louisville",
        country: "United States of America",
        lat: 38.2372,
        lng: 85.7141,
        name: "Perfectly Located Carriage Home in the Heart of the Highlands",
        description: "Enjoy a stylish experience at this perfectly-located home just steps away from Louisville's well known area of The Highlands - Bardstown Road! This calming, bohemian inspired space, was designed for a serene stay for those who are seeking a tranquil getaway while in the city or you can also enjoy your days/nights out on Louisville's extremely popular area of Bardstown Road where you will have quick access to some of the city's best places to eat, shop, and explore.",
        price: 210,
        previewImage:"https://media.vrbo.com/lodging/84000000/83460000/83455600/83455582/7c8d1c14.f6.jpg"
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
