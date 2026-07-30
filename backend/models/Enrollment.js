const { Model, DataTypes } = require('sequelize');
const sequelize = require('../src/config/database');

class Enrollment extends Model {}

Enrollment.init(

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

        membershipId: {
            type: DataTypes.BIGINT.UNSIGNED,
            allowNull: false
        },

        status: {
            type: DataTypes.ENUM(
                'registered',
                'active',
                'completed',
                'cancelled'
            ),
            defaultValue: 'registered'
        },

        registeredAt: {
            type: DataTypes.DATE,
            allowNull: false
        }

    },

    {

        sequelize,

        modelName: 'Enrollment',

        tableName: 'enrollments',

        timestamps: true,

        paranoid: true

    }

);

module.exports = Enrollment;