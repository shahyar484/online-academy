const { z } = require('zod');

const sendOtpSchema = z.object({
    mobile: z
        .string()
        .regex(/^09\d{9}$/, 'شماره موبایل معتبر نیست')
});

const verifyOtpSchema = z.object({

    mobile: z
        .string()
        .regex(/^09\d{9}$/, 'شماره موبایل معتبر نیست'),

    code: z
        .string()
        .regex(/^\d{5}$/, 'کد تایید معتبر نیست'),

    firstName: z
        .string()
        .trim()
        .min(2, 'نام باید حداقل ۲ کاراکتر باشد')
        .max(50, 'نام نباید بیشتر از ۵۰ کاراکتر باشد')
        .optional(),

    lastName: z
        .string()
        .trim()
        .min(2, 'نام خانوادگی باید حداقل ۲ کاراکتر باشد')
        .max(50, 'نام خانوادگی نباید بیشتر از ۵۰ کاراکتر باشد')
        .optional()

});

module.exports = {
    sendOtpSchema,
    verifyOtpSchema
};