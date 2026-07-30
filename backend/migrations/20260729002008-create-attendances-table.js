'use strict';

module.exports = {

    async up(queryInterface, Sequelize) {

        await queryInterface.createTable(
            'attendances',
            {

                id: {
                    type: Sequelize.BIGINT.UNSIGNED,
                    autoIncrement: true,
                    primaryKey: true
                },

                sessionId: {
                    type: Sequelize.BIGINT.UNSIGNED,
                    allowNull: false,
                    references: {
                        model: 'sessions',
                        key: 'id'
                    },
                    onUpdate: 'CASCADE',
                    onDelete: 'CASCADE'
                },

                enrollmentId: {
                    type: Sequelize.BIGINT.UNSIGNED,
                    allowNull: false,
                    references: {
                        model: 'enrollments',
                        key: 'id'
                    },
                    onUpdate: 'CASCADE',
                    onDelete: 'CASCADE'
                },

                joinedAt: {
                    type: Sequelize.DATE,
                    allowNull: true
                },

                leftAt: {
                    type: Sequelize.DATE,
                    allowNull: true
                },

                durationMinutes: {
                    type: Sequelize.INTEGER.UNSIGNED,
                    defaultValue: 0
                },

                lateMinutes: {
                    type: Sequelize.INTEGER.UNSIGNED,
                    defaultValue: 0
                },

                status: {
                    type: Sequelize.ENUM(
                        'present',
                        'late',
                        'absent',
                        'excused'
                    ),
                    defaultValue: 'absent'
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
            'attendances',
            {
                fields: [
                    'sessionId',
                    'enrollmentId'
                ],
                type: 'unique',
                name: 'unique_session_enrollment'
            }
        );

    },

    async down(queryInterface) {

        await queryInterface.dropTable(
            'attendances'
        );

    }

};