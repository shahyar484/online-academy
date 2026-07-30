'use strict';

module.exports = {

  async up(queryInterface, Sequelize) {

    await queryInterface.createTable(

      'memberships',

      {

        id: {
          type: Sequelize.BIGINT.UNSIGNED,
          primaryKey: true,
          autoIncrement: true
        },

        userId: {
          type: Sequelize.BIGINT.UNSIGNED,
          allowNull: false,
          references: {
            model: 'users',
            key: 'id'
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
        },

        workspaceId: {
          type: Sequelize.BIGINT.UNSIGNED,
          allowNull: false,
          references: {
            model: 'workspaces',
            key: 'id'
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
        },

        role: {
          type: Sequelize.ENUM(
            'owner',
            'manager',
            'assistant',
            'teacher',
            'student'
          ),
          allowNull: false
        },

        joinedAt: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.NOW
        },

        invitedBy: {
          type: Sequelize.BIGINT.UNSIGNED,
          allowNull: true,
          references: {
            model: 'users',
            key: 'id'
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL'
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

    await queryInterface.addConstraint(

      'memberships',

      {

        fields: [

          'userId',

          'workspaceId'

        ],

        type: 'unique',

        name: 'unique_user_workspace'

      }

    );

  },

  async down(queryInterface) {

    await queryInterface.dropTable('memberships');

  }

};