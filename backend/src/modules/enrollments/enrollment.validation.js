const z = require('zod');

exports.createEnrollmentSchema = z.object({

    courseId: z
        .number()
        .int()
        .positive(),

    mobile: z
        .string()
        .trim()
        .min(11)
        .max(11)

});