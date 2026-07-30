const z = require('zod');

exports.createSessionSchema = z.object({

    courseId: z
        .number()
        .int()
        .positive(),

    title: z
        .string()
        .trim()
        .min(2)
        .max(100),

    description: z
        .string()
        .trim()
        .optional(),

    sessionNumber: z
        .number()
        .int()
        .positive(),

    startAt: z
        .string()
        .datetime(),

    durationMinutes: z
        .number()
        .int()
        .min(15)
        .max(480)

});