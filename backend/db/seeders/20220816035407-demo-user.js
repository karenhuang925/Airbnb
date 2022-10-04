'use strict';
const bcrypt = require("bcryptjs");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        firstName:'Ace',
        lastName:'So',
        email: 'demo@user.io',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName:'Belle',
        lastName:'No',
        email: 'user2@user.io',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName:'Cooper',
        lastName:'East',
        email: 'user3@user.io',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName:'Dash',
        lastName:'West',
        email: 'user4@user.io',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName:'Eva',
        lastName:'NoWest',
        email: 'user5@user.io',
        hashedPassword: bcrypt.hashSync('password')
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Users', {
      email: { [Op.in]: ['demo@user.io', 'user1@user.io', 'user2@user.io'] }
    }, {});
  }
};
