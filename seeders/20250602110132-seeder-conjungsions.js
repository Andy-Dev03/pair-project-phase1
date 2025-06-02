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
   const conjungsions = require('../data/conjungsions.json')
   conjungsions.forEach(c => {
    delete c.id
    c.createdAt = c.updatedAt = new Date()
   });
   await queryInterface.bulkInsert('Conjungsions', conjungsions, {})
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Conjungsions', null, {
      restartIdentity: true,
      truncate: true,
      cascade: true
    })
  }
};
