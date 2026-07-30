'use strict';

module.exports = {

  async up(queryInterface, Sequelize) {

    await queryInterface.createTable(

      'academies',

      {

        id: {
          type: Sequelize.BIGINT.UNSIGNED,
          primaryKey: true,
          autoIncrement: true
        },

        workspaceId: {
          type: Sequelize.BIGINT.UNSIGNED,
          allowNull: false,
          unique: true,
          references: {
            model: 'workspaces',
            key: 'id'
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
        },

        name: {
          type: Sequelize.STRING(150),
          allowNull: false
        },

        shortName: {
          type: Sequelize.STRING(100),
          allowNull: true
        },

        slug: {
          type: Sequelize.STRING(150),
          allowNull: false,
          unique: true
        },

        code: {
          type: Sequelize.STRING(20),
          allowNull: false,
          unique: true
        },

        description: {
          type: Sequelize.TEXT
        },

        logo: {
          type: Sequelize.STRING
        },

        banner: {
          type: Sequelize.STRING
        },

        phone: {
          type: Sequelize.STRING(20)
        },

        email: {
          type: Sequelize.STRING(100)
        },

        website: {
          type: Sequelize.STRING
        },

        primaryColor: {
          type: Sequelize.STRING(20)
        },

        isVerified: {
          type: Sequelize.BOOLEAN,
          defaultValue: false
        },

        isActive: {
          type: Sequelize.BOOLEAN,
          defaultValue: true
        },

        createdAt: {
          allowNull: false,
          type: Sequelize.DATE
        },

        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE
        },

        deletedAt: {
          allowNull: true,
          type: Sequelize.DATE
        }

      }

    );

  },

  async down(queryInterface) {

    await queryInterface.dropTable('academies');

  }

};