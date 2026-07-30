const sessionService =
require('../modules/sessions/session.service');

const courseService =
require('../modules/courses/course.service');

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

        const session =
            await sessionService.findById(

                req.params.id

            );

        if (!session) {

            throw new AppError(

                404,

                'جلسه پیدا نشد.'

            );

        }

        const course =
            await courseService.findById(

                session.courseId

            );

        if (

            course.workspaceId !==

            req.workspace.id

        ) {

            throw new AppError(

                404,

                'جلسه پیدا نشد.'

            );

        }

        const role =
            req.membership.role;

        if (

            role === ROLES.OWNER ||

            role === ROLES.MANAGER ||

            role === ROLES.ASSISTANT

        ) {

            req.sessionModel = session;

            req.course = course;

            return next();

        }

        if (

            role === ROLES.TEACHER

        ) {

            if (

                course.membershipId !==

                req.membership.id

            ) {

                throw new AppError(

                    403,

                    'اجازه مدیریت این جلسه را ندارید.'

                );

            }

            req.sessionModel = session;

            req.course = course;

            return next();

        }

        throw new AppError(

            403,

            'دسترسی ندارید.'

        );

    }

    catch (err) {

        next(err);

    }

};