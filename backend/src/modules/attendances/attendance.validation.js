const z =
require('zod');

exports.updateAttendanceSchema =

z.object({

    status:

        z.enum([

            'present',

            'late',

            'absent',

            'excused'

        ]).optional(),

    joinedAt:

        z.string()

        .datetime()

        .optional(),

    leftAt:

        z.string()

        .datetime()

        .optional()

});