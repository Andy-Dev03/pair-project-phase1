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
    const profiles = require('../data/profiles.json')
    profiles.forEach((p) => {
      delete p.id
      p.createdAt = p.updatedAt = new Date()
    })

    await queryInterface.bulkInsert('Profiles', profiles, {})
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Profiles', null, {
      restartIdentity: true,
      truncate : true,
      cascade: true
    })
  }
};
