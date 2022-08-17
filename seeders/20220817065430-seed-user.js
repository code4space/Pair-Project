'use strict';
const fs = require('fs')
const bcrypt = require('bcrypt')
module.exports = {
  up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    // utk hashing password nya bisa jalan
    const salt = bcrypt.genSaltSync(10);

    const data = JSON.parse(fs.readFileSync('./data/users.json', 'utf-8')).map(el => {

      return {
        ...el,
        password: bcrypt.hashSync(el.password, salt),

        createdAt: new Date(), updatedAt: new Date()
      }
    })
    // console.log(data)
    return queryInterface.bulkInsert('Users', data, {})
  },
  down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    return queryInterface.bulkDelete('Users', null, {})
  }
};
