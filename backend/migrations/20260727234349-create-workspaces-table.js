'use strict';

module.exports = {

  async up(queryInterface, Sequelize) {

    await queryInterface.createTable(

      'workspaces',

      {

        id: {
          type: Sequelize.BIGINT.UNSIGNED,
          primaryKey: true,
          autoIncrement: true
        },

        ownerId: {
          type: Sequelize.BIGINT.UNSIGNED,
          allowNull: false,
          references: {
            model: 'users',
            key: 'id'
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
        },

        type: {
          type: Sequelize.ENUM(
            'academy',
            'teacher'
          ),
          allowNull: false
        },

        name: {
          type: Sequelize.STRING(150),
          allowNull: false
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

    await queryInterface.dropTable('workspaces');

  }

};