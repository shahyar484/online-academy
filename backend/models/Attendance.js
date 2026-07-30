const {

    Model,

    DataTypes

} = require('sequelize');

const sequelize =
require('../src/config/database');

class Attendance extends Model {}

Attendance.init(

    {

        id: {

            type: DataTypes.BIGINT.UNSIGNED,

            autoIncrement: true,

            primaryKey: true

        },

        sessionId: {

            type: DataTypes.BIGINT.UNSIGNED,

            allowNull: false

        },

        enrollmentId: {

            type: DataTypes.BIGINT.UNSIGNED,

            allowNull: false

        },

        joinedAt: {

            type: DataTypes.DATE

        },

        leftAt: {

            type: DataTypes.DATE

        },

        durationMinutes: {

            type: DataTypes.INTEGER.UNSIGNED,

            defaultValue: 0

        },

        lateMinutes: {

            type: DataTypes.INTEGER.UNSIGNED,

            defaultValue: 0

        },

        status: {

            type: DataTypes.ENUM(

                'present',

                'late',

                'absent',

                'excused'

            ),

            defaultValue: 'absent'

        }

    },

    {

        sequelize,

        modelName: 'Attendance',

        tableName: 'attendances',

        timestamps: true,

        paranoid: true

    }

);

module.exports = Attendance;