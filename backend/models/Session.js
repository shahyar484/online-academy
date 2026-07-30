const {

    Model,

    DataTypes

} = require('sequelize');

const sequelize =
require('../src/config/database');

const {

    v4: uuid

} = require('uuid');

class Session extends Model {}

Session.init(

    {

        id: {

            type: DataTypes.BIGINT.UNSIGNED,

            autoIncrement: true,

            primaryKey: true

        },

        courseId: {

            type: DataTypes.BIGINT.UNSIGNED,

            allowNull: false

        },

        title: {

            type: DataTypes.STRING,

            allowNull: false

        },

        description: {

            type: DataTypes.TEXT

        },

        sessionNumber: {

            type: DataTypes.INTEGER.UNSIGNED,

            allowNull: false

        },

        startAt: {

            type: DataTypes.DATE,

            allowNull: false

        },

        endAt: {

            type: DataTypes.DATE,

            allowNull: false

        },

        durationMinutes: {

            type: DataTypes.INTEGER.UNSIGNED,

            defaultValue: 120

        },

        status: {

            type: DataTypes.ENUM(

                'scheduled',

                'live',

                'finished',

                'cancelled'

            ),

            defaultValue: 'scheduled'

        },

        
        roomId: {

            type: DataTypes.UUID,

            defaultValue: () => uuid()

        },

        startedAt: DataTypes.DATE,

        endedAt: DataTypes.DATE,

        isAttendanceOpen: {

            type: DataTypes.BOOLEAN,

            defaultValue: false

        },

        attendanceDeadline: DataTypes.DATE,

        isRecording: {

            type: DataTypes.BOOLEAN,

            defaultValue: false

        },

        recordingUrl: DataTypes.STRING

    },

    {

        sequelize,

        modelName: 'Session',

        tableName: 'sessions',

        timestamps: true,

        paranoid: true

    }

);

module.exports = Session;