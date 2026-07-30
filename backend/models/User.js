const { Model, DataTypes } = require('sequelize');
const sequelize = require('../src/config/database');

class User extends Model {}

User.init(
    {
        id: {
            type: DataTypes.BIGINT.UNSIGNED,
            autoIncrement: true,
            primaryKey: true
        },

        mobile: {
            type: DataTypes.STRING(11),
            allowNull: false,
            unique: true
        },

        firstName: {
            type: DataTypes.STRING(50),
            allowNull: false
        },

        lastName: {
            type: DataTypes.STRING(50),
            allowNull: false
        },

        isActive: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        }
    },
    {
        sequelize,
        tableName: 'users',
        modelName: 'User',

        timestamps: true,
        paranoid: true
    }
);

module.exports = User;