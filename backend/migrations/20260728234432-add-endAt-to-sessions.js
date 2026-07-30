'use strict';

module.exports = {

    async up(queryInterface, Sequelize) {

        await queryInterface.addColumn(

            'sessions',

            'endAt',

            {

                type: Sequelize.DATE,

                allowNull: false

            }

        );

    },

    async down(queryInterface) {

        await queryInterface.removeColumn(

            'sessions',

            'endAt'

        );

    }

};