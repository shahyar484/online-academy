const { Model, DataTypes } = require('sequelize');
const sequelize = require('../src/config/database');

class Course extends Model {}

Course.init(

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

        membershipId: {
            type: DataTypes.BIGINT.UNSIGNED,
            allowNull: false
        },

        title: {
            type: DataTypes.STRING(200),
            allowNull: false
        },

        slug: {
            type: DataTypes.STRING(200),
            allowNull: false,
            unique: true
        },

        code: {
            type: DataTypes.STRING(20),
            allowNull: false,
            unique: true
        },

        description: {
            type: DataTypes.TEXT
        },

        image: {
            type: DataTypes.STRING
        },

        capacity: {
            type: DataTypes.INTEGER.UNSIGNED,
            defaultValue: 20
        },

        price: {
            type: DataTypes.BIGINT.UNSIGNED,
            defaultValue: 0
        },

        isFree: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        },

        status: {
            type: DataTypes.ENUM(
                'draft',
                'published',
                'archived'
            ),
            defaultValue: 'draft'
        },

        isActive: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        }

    },

    {

        sequelize,

        modelName: 'Course',

        tableName: 'courses',

        timestamps: true,

        paranoid: true

    }

);

module.exports = Course;