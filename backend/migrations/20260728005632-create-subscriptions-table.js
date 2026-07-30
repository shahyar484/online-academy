'use strict';

module.exports = {

    async up(queryInterface, Sequelize) {

        await queryInterface.createTable(

            'subscriptions',

            {

                id: {
                    type: Sequelize.BIGINT.UNSIGNED,
                    primaryKey: true,
                    autoIncrement: true
                },

                workspaceId: {
                    type: Sequelize.BIGINT.UNSIGNED,
                    allowNull: false
                },

                subscriptionPlanId: {
                    type: Sequelize.BIGINT.UNSIGNED,
                    allowNull: false
                },

                startAt: {
                    type: Sequelize.DATE,
                    allowNull: false
                },

                expireAt: {
                    type: Sequelize.DATE,
                    allowNull: false
                },

                status: {
                    type: Sequelize.ENUM(
                        'active',
                        'expired',
                        'canceled'
                    ),
                    allowNull: false,
                    defaultValue: 'active'
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

        await queryInterface.dropTable(
            'subscriptions'
        );

    }

};