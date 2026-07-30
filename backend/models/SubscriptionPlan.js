const { Model, DataTypes } = require('sequelize');
const sequelize = require('../src/config/database');

class SubscriptionPlan extends Model {}

SubscriptionPlan.init(

    {

        id: {
            type: DataTypes.BIGINT.UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },

        name: {
            type: DataTypes.STRING(100),
            allowNull: false
        },

        type: {
            type: DataTypes.ENUM(
                'academy',
                'teacher'
            ),
            allowNull: false
        },

        description: {
            type: DataTypes.TEXT,
            allowNull: true
        },

        price: {
            type: DataTypes.BIGINT.UNSIGNED,
            allowNull: false,
            defaultValue: 0
        },

        durationDays: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false
        },

        maxTeachers: {
            type: DataTypes.INTEGER.UNSIGNED,
            defaultValue: 1
        },

        maxStudents: {
            type: DataTypes.INTEGER.UNSIGNED,
            defaultValue: 100
        },

        maxCourses: {
            type: DataTypes.INTEGER.UNSIGNED,
            defaultValue: 5
        },

        maxStorageMB: {
            type: DataTypes.INTEGER.UNSIGNED,
            defaultValue: 1024
        },

        maxMeetingMinutes: {
            type: DataTypes.INTEGER.UNSIGNED,
            defaultValue: 120
        },

        maxConcurrentMeetings: {
            type: DataTypes.INTEGER.UNSIGNED,
            defaultValue: 1
        },

        hasAttendance: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },

        hasAssignment: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },

        hasRecording: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },

        isActive: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        }

    },

    {

        sequelize,

        modelName: 'SubscriptionPlan',

        tableName: 'subscription_plans',

        timestamps: true,

        paranoid: true

    }

);

module.exports = SubscriptionPlan;