'use strict';

module.exports = {

    async up(queryInterface, Sequelize) {

        await queryInterface.createTable(

            'courses',

            {

                id: {
                    type: Sequelize.BIGINT.UNSIGNED,
                    primaryKey: true,
                    autoIncrement: true
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

                membershipId: {
                    type: Sequelize.BIGINT.UNSIGNED,
                    allowNull: false,
                    references: {
                        model: 'memberships',
                        key: 'id'
                    },
                    onUpdate: 'CASCADE',
                    onDelete: 'RESTRICT'
                },

                title: {
                    type: Sequelize.STRING(200),
                    allowNull: false
                },

                slug: {
                    type: Sequelize.STRING(200),
                    allowNull: false,
                    unique: true
                },

                code: {
                    type: Sequelize.STRING(20),
                    allowNull: false,
                    unique: true
                },

                description: {
                    type: Sequelize.TEXT,
                    allowNull: true
                },

                image: {
                    type: Sequelize.STRING,
                    allowNull: true
                },

                capacity: {
                    type: Sequelize.INTEGER.UNSIGNED,
                    allowNull: false,
                    defaultValue: 20
                },

                price: {
                    type: Sequelize.BIGINT.UNSIGNED,
                    allowNull: false,
                    defaultValue: 0
                },

                isFree: {
                    type: Sequelize.BOOLEAN,
                    defaultValue: true
                },

                status: {
                    type: Sequelize.ENUM(
                        'draft',
                        'published',
                        'archived'
                    ),
                    defaultValue: 'draft'
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

        await queryInterface.dropTable('courses');

    }

};