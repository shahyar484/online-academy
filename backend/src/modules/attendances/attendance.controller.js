const {

    updateAttendanceSchema

} = require('./attendance.validation');

const attendanceService =
require('./attendance.service');

module.exports = {

    listBySession: async (

        req,

        res,

        next

    ) => {

        try {

            const attendances =

                await attendanceService.findBySession(

                    req.sessionModel.id

                );

            return res.json({

                success: true,

                data: attendances

            });

        }

        catch (err) {

            next(err);

        }

    },



    update: async (

        req,

        res,

        next

    ) => {

        try {

            const data =

                updateAttendanceSchema.parse(

                    req.body

                );

            const attendance =

                await attendanceService.updateStatus(

                    req.attendance,

                    data

                );

            return res.json({

                success: true,

                message:

                    'حضور و غیاب بروزرسانی شد.',

                data: attendance

            });

        }

        catch (err) {

            next(err);

        }

    }

};