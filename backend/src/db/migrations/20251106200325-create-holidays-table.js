'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('holidays', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER.UNSIGNED 
      },
      title: {
        type: Sequelize.STRING(128), 
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      main_meal: {
        type: Sequelize.STRING, 
        allowNull: false,
      },
      date_mm_dd: {
        type: Sequelize.STRING(5), 
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    }); 
  },

  async down (queryInterface) {
    await queryInterface.dropTable('holidays');
  }
};