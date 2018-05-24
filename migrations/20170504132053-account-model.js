'use strict';

module.exports = {
  
  // Migrations is used to create the needed table in the database
  up: function (migration, Sequelize) {
    return migration.createTable('accounts', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      balance: {
        type: Sequelize.FLOAT,
        defaultValue: 0
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id'
        }
      },
      createdAt: {
        type: Sequelize.DATE
      },
      updatedAt: {
        type: Sequelize.DATE
      }
    });
  },

  // to undo the created table or database scheme
  down: function (migration, Sequelize) {
    return migration.dropTable('accounts');
  }
};