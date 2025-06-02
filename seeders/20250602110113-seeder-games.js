'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    const games = require('../data/games.json')
    games.forEach(g => {
      delete g.id
      g.createdAt = g.updatedAt = new Date()
    });
    await queryInterface.bulkInsert('Games', games, {})
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Games', null, {
      restartIdentity: true,
      truncate: true,
      cascade: true
    })
  }
};
