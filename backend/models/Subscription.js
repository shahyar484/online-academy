const { Model, DataTypes } = require('sequelize');
const sequelize = require('../src/config/database');

class Subscription extends Model {}

Subscription.init(

    {

        id: {
            type: DataTypes.BIGINT.UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },

        workspaceId: {
            type: DataTypes.BIGINT.UNSIGNED,
            allowNull: false
        },

        subscriptionPlanId: {
            type: DataTypes.BIGINT.UNSIGNED,
            allowNull: false
        },

        startAt: {
            type: DataTypes.DATE,
            allowNull: false
        },

        expireAt: {
            type: DataTypes.DATE,
            allowNull: false
        },

        status: {
            type: DataTypes.ENUM(
                'active',
                'expired',
                'canceled'
            ),
            defaultValue: 'active'
        }

    },

    {

        sequelize,

        modelName: 'Subscription',

        tableName: 'subscriptions',

        timestamps: true,

        paranoid: true

    }

);

module.exports = Subscription;