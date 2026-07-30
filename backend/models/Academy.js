const { Model, DataTypes } = require('sequelize');
const sequelize = require('../src/config/database');

class Academy extends Model {}

Academy.init(

    {

        id: {
            type: DataTypes.BIGINT.UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },

        workspaceId: {
            type: DataTypes.BIGINT.UNSIGNED,
            allowNull: false,
            unique: true
        },

        name: {
            type: DataTypes.STRING(150),
            allowNull: false
        },

        shortName: {
            type: DataTypes.STRING(100),
            allowNull: true
        },

        slug: {
            type: DataTypes.STRING(150),
            allowNull: false,
            unique: true
        },

        code: {
            type: DataTypes.STRING(20),
            allowNull: false,
            unique: true
        },

        description: {
            type: DataTypes.TEXT,
            allowNull: true
        },

        logo: {
            type: DataTypes.STRING,
            allowNull: true
        },

        banner: {
            type: DataTypes.STRING,
            allowNull: true
        },

        phone: {
            type: DataTypes.STRING(20),
            allowNull: true
        },

        email: {
            type: DataTypes.STRING(100),
            allowNull: true
        },

        website: {
            type: DataTypes.STRING,
            allowNull: true
        },

        primaryColor: {
            type: DataTypes.STRING(20),
            allowNull: true
        },

        isVerified: {
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

        modelName: 'Academy',

        tableName: 'academies',

        timestamps: true,

        paranoid: true

    }

);

module.exports = Academy;