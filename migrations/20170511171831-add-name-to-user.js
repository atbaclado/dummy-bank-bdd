'use strict';

// add column
module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.addColumn('users', 'name', {
      type: Sequelize.STRING
    });
  },

  // revert the last database scheme
  down: function (queryInterface, Sequelize) {
    queryInterface.removeColumn('users', 'name');
  }
};