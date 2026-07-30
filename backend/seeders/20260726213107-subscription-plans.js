'use strict';

module.exports = {

    async up(queryInterface) {

        await queryInterface.bulkInsert(
            'subscription_plans',
            [

                {
                    name: 'monthly',
                    title: 'اشتراک ماهانه',
                    description: 'مناسب برای شروع فعالیت آموزشگاه',
                    durationDays: 30,
                    price: 500000,
                    isActive: true,
                    createdAt: new Date(),
                    updatedAt: new Date()
                },

                {
                    name: 'quarterly',
                    title: 'اشتراک سه ماهه',
                    description: 'مناسب برای آموزشگاه‌های در حال توسعه',
                    durationDays: 90,
                    price: 1300000,
                    isActive: true,
                    createdAt: new Date(),
                    updatedAt: new Date()
                },

                {
                    name: 'yearly',
                    title: 'اشتراک سالانه',
                    description: 'به‌صرفه‌ترین انتخاب برای آموزشگاه‌های فعال',
                    durationDays: 365,
                    price: 4500000,
                    isActive: true,
                    createdAt: new Date(),
                    updatedAt: new Date()
                }

            ]
        );

    },

    async down(queryInterface) {

        await queryInterface.bulkDelete(
            'subscription_plans',
            null,
            {}
        );

    }

};