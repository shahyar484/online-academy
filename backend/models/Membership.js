const { Model, DataTypes } = require('sequelize');
const sequelize = require('../src/config/database');

class Membership extends Model {}

Membership.init(

    {

        id: {
            type: DataTypes.BIGINT.UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },

        userId: {
            type: DataTypes.BIGINT.UNSIGNED,
            allowNull: false
        },

        workspaceId: {
            type: DataTypes.BIGINT.UNSIGNED,
            allowNull: false
        },

        role: {
            type: DataTypes.ENUM(
                'owner',
                'manager',
                'assistant',
                'teacher',
                'student'
            ),
            allowNull: false
        },

        joinedAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        },

        invitedBy: {
            type: DataTypes.BIGINT.UNSIGNED,
            allowNull: true
        },

        isActive: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        }

    },

    {

        sequelize,

        modelName: 'Membership',

        tableName: 'memberships',

        timestamps: true,

        paranoid: true,

        indexes: [

            {
                unique: true,
                fields: [
                    'userId',
                    'workspaceId'
                ]
            }

        ]

    }

);

module.exports = Membership;