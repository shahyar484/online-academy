const { Model, DataTypes } = require('sequelize');
const sequelize = require('../src/config/database');

class Workspace extends Model {}

Workspace.init(

    {

        id: {
            type: DataTypes.BIGINT.UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },

        ownerId: {
            type: DataTypes.BIGINT.UNSIGNED,
            allowNull: false
        },

        type: {
            type: DataTypes.ENUM(
                'academy',
                'teacher'
            ),
            allowNull: false
        },

        name: {
            type: DataTypes.STRING(150),
            allowNull: false
        },

        isActive: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        }

    },

    {

        sequelize,

        modelName: 'Workspace',

        tableName: 'workspaces',

        timestamps: true,

        paranoid: true

    }

);

module.exports = Workspace;