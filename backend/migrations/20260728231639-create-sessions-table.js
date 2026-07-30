'use strict';

module.exports = {

    async up(queryInterface, Sequelize) {

        await queryInterface.createTable(
            'sessions',
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

                title: {
                    type: Sequelize.STRING,
                    allowNull: false
                },

                description: {
                    type: Sequelize.TEXT,
                    allowNull: true
                },

                sessionNumber: {
                    type: Sequelize.INTEGER.UNSIGNED,
                    allowNull: false
                },

                startAt: {
                    type: Sequelize.DATE,
                    allowNull: false
                },

                durationMinutes: {
                    type: Sequelize.INTEGER.UNSIGNED,
                    allowNull: false,
                    defaultValue: 120
                },

                status: {
                    type: Sequelize.ENUM(
                        'scheduled',
                        'live',
                        'finished',
                        'cancelled'
                    ),
                    defaultValue: 'scheduled'
                },

                roomId: {
                    type: Sequelize.UUID,
                    allowNull: false,
                    unique: true
                },

                startedAt: {
                    type: Sequelize.DATE,
                    allowNull: true
                },

                endedAt: {
                    type: Sequelize.DATE,
                    allowNull: true
                },

                isAttendanceOpen: {
                    type: Sequelize.BOOLEAN,
                    defaultValue: false
                },

                attendanceDeadline: {
                    type: Sequelize.DATE,
                    allowNull: true
                },

                isRecording: {
                    type: Sequelize.BOOLEAN,
                    defaultValue: false
                },

                recordingUrl: {
                    type: Sequelize.STRING,
                    allowNull: true
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
            'sessions',
            {
                fields: [
                    'courseId',
                    'sessionNumber'
                ],
                type: 'unique',
                name: 'unique_course_session_number'
            }
        );

    },

    async down(queryInterface) {

        await queryInterface.dropTable(
            'sessions'
        );

    }

};