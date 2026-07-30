const {

    Attendance,

    Session,

    Course

} = require('../../models');

const ROLES =
require('../constants/roles');

const AppError =
require('../utils/AppError');

module.exports = async (

    req,

    res,

    next

) => {

    try {

        const attendance =

            await Attendance.findByPk(

                req.params.id

            );

        if (!attendance) {

            throw new AppError(

                404,

                'حضور و غیاب پیدا نشد.'

            );

        }

        const session =

            await Session.findByPk(

                attendance.sessionId

            );

        const course =

            await Course.findByPk(

                session.courseId

            );

        if (

            course.workspaceId !==

            req.workspace.id

        ) {

            throw new AppError(

                404,

                'رکورد پیدا نشد.'

            );

        }

        switch (

            req.membership.role

        ) {

            case ROLES.OWNER:

            case ROLES.MANAGER:

            case ROLES.ASSISTANT:

                break;

            case ROLES.TEACHER:

                if (

                    course.membershipId !==

                    req.membership.id

                ) {

                    throw new AppError(

                        403,

                        'دسترسی ندارید.'

                    );

                }

                break;

            default:

                throw new AppError(

                    403,

                    'دسترسی ندارید.'

                );

        }

        req.attendance =

            attendance;

        next();

    }

    catch (err) {

        next(err);

    }

};