const z = require('zod');

exports.createCourseSchema = z.object({

    title: z
        .string()
        .trim()
        .min(3, 'عنوان کلاس حداقل ۳ کاراکتر باشد.')
        .max(200),

    description: z
        .string()
        .trim()
        .optional(),

    capacity: z
        .number()
        .int()
        .positive()
        .max(10000)
        .default(20),

    price: z
        .number()
        .min(0)
        .default(0),

    isFree: z
        .boolean()
        .default(true),

    image: z
        .string()
        .optional()

});