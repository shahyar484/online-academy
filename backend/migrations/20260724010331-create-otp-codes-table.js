'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.createTable('otp_codes', {

      id: {
        type: Sequelize.BIGINT.UNSIGNED,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },

      mobile: {
        type: Sequelize.STRING(11),
        allowNull: false,
        unique: true
      },

      code: {
        type: Sequelize.STRING(255),
        allowNull: false
      },

      attempts: {
        type: Sequelize.TINYINT.UNSIGNED,
        allowNull: false,
        defaultValue: 0
      },

      resendAt: {
        type: Sequelize.DATE,
        allowNull: false
      },

      expiresAt: {
        type: Sequelize.DATE,
        allowNull: false
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

  async down(queryInterface) {

    await queryInterface.dropTable('otp_codes');

  }
};