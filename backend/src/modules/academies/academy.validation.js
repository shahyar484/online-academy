const { z } = require('zod');

exports.createAcademySchema = z.object({

    name: z
        .string()
        .trim()
        .min(3, 'نام آموزشگاه حداقل باید ۳ کاراکتر باشد.')
        .max(150),

    shortName: z
        .string()
        .trim()
        .max(100)
        .optional(),

    description: z
        .string()
        .trim()
        .optional(),

    phone: z
        .string()
        .trim()
        .max(20)
        .optional(),

    email: z
        .string()
        .trim()
        .email('ایمیل معتبر نیست.')
        .optional(),

    website: z
        .string()
        .trim()
        .url('آدرس سایت معتبر نیست.')
        .optional(),

    primaryColor: z
        .string()
        .trim()
        .optional()

});