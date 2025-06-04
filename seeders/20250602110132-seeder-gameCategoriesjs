'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   const gameCategories = require('../data/gameCategories.json')
   gameCategories.forEach(d => {
    delete d.id
    d.createdAt = d.updatedAt = new Date()
   });
   await queryInterface.bulkInsert('GameCategories', gameCategories, {})
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('GameCategories', null, {
      restartIdentity: true,
      truncate: true,
      cascade: true
    })
  }
};
