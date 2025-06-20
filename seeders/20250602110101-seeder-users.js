'use strict';
const bcrypt = require('bcryptjs');

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
    const users = require('../data/users.json')
    users.forEach(u => {
      delete u.id
      const salt = bcrypt.genSaltSync(10);
      u.password = bcrypt.hashSync(u.password, salt);
      u.createdAt = u.updatedAt = new Date()
    });
    await queryInterface.bulkInsert('Users', users, {})
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Users', null, {
      restartIdentity: true,
      truncate: true,
      cascade: true
    })
  }
};
