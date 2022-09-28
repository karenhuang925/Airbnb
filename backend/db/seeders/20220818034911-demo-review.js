'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Reviews', [
      {
        userId: 2,
        spotId: 1,
        content: "This room was perfect for our stay. We had a great time and everything was just as advertised.",
        stars: 5,
      },
      {
        userId: 3,
        spotId: 1,
        content: "Love how close it was to the beach, lovely back yard with pool !",
        stars: 5,
      },
      {
        userId: 4,
        spotId: 1,
        content: "This property has a lot of potential for A+ stay. It is so close to the beach just 1 min walk, the beach is soooo beautiful especially at around 4 pm and at night when the moon is out, it is just incredible to be out there in the evening. Awesome pictures with the moon reflection and water is very warm. Parking is not a problem for two cars or even 3 cars. We hope for the management to fix or make sure that the grill is working properly for the next guest, we bought lots of fresh seafood after our crab island adventure but end up baking it due to not having a working grill. The pool is very useful for a stay in day or for a quick evening dip. I recommend the property to have a speaker for there guest to use outside by the pool area, some beach properties have it so that’s why. The master bedroom shower floor can be more cleaner and whiter by using bleach, I wish they could leave salt and pepper in the property as well. Those are the little things I think that will need work on other than that it’s perfect.",
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
