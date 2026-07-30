'use strict';

module.exports = {

    async up(queryInterface, Sequelize) {

        await queryInterface.createTable(
            'enrollments',
            {

                id: {
                    type: Sequelize.BIGINT.UNSIGNED,
                    autoIncrement: true,
                    primaryKey: true
                },

                courseId: {
                    type: Sequelize.BIGINT.UNSIGNED,
                    allowNull: false,
                    references: {
                        model: 'courses',
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
                    onDelete: 'CASCADE'
                },

                status: {
                    type: Sequelize.ENUM(
                        'registered',
                        'active',
                        'completed',
                        'cancelled'
                    ),
                    defaultValue: 'registered'
                },

                registeredAt: {
                    type: Sequelize.DATE,
                    allowNull: false,
                    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
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
            'enrollments',
            {
                fields: [
                    'courseId',
                    'membershipId'
                ],
                type: 'unique',
                name: 'unique_course_membership'
            }
        );

    },

    async down(queryInterface) {

        await queryInterface.dropTable(
            'enrollments'
        );

    }

};