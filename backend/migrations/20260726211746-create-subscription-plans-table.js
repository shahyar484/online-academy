'use strict';

module.exports = {

    async up(queryInterface, Sequelize) {

        await queryInterface.createTable(

            'subscription_plans',

            {

                id: {
                    type: Sequelize.BIGINT.UNSIGNED,
                    primaryKey: true,
                    autoIncrement: true
                },

                name: {
                    type: Sequelize.STRING(100),
                    allowNull: false
                },

                type: {
                    type: Sequelize.ENUM(
                        'academy',
                        'teacher'
                    ),
                    allowNull: false
                },

                description: {
                    type: Sequelize.TEXT,
                    allowNull: true
                },

                price: {
                    type: Sequelize.BIGINT.UNSIGNED,
                    allowNull: false,
                    defaultValue: 0
                },

                durationDays: {
                    type: Sequelize.INTEGER.UNSIGNED,
                    allowNull: false
                },

                maxTeachers: {
                    type: Sequelize.INTEGER.UNSIGNED,
                    allowNull: false,
                    defaultValue: 1
                },

                maxStudents: {
                    type: Sequelize.INTEGER.UNSIGNED,
                    allowNull: false,
                    defaultValue: 100
                },

                maxCourses: {
                    type: Sequelize.INTEGER.UNSIGNED,
                    allowNull: false,
                    defaultValue: 5
                },

                maxStorageMB: {
                    type: Sequelize.INTEGER.UNSIGNED,
                    allowNull: false,
                    defaultValue: 1024
                },

                maxMeetingMinutes: {
                    type: Sequelize.INTEGER.UNSIGNED,
                    allowNull: false,
                    defaultValue: 120
                },

                maxConcurrentMeetings: {
                    type: Sequelize.INTEGER.UNSIGNED,
                    allowNull: false,
                    defaultValue: 1
                },

                hasAttendance: {
                    type: Sequelize.BOOLEAN,
                    defaultValue: false
                },

                hasAssignment: {
                    type: Sequelize.BOOLEAN,
                    defaultValue: false
                },

                hasRecording: {
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

        await queryInterface.dropTable(
            'subscription_plans'
        );

    }

};