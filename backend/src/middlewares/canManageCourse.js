const courseService =
require('../modules/courses/course.service');

const AppError =
require('../utils/AppError');

const ROLES =
require('../constants/roles');

module.exports = async (

    req,
    res,
    next

) => {

    try {

        const course =
            await courseService.findById(
                req.params.id
            );

        if (!course) {

            throw new AppError(
                404,
                'کلاس پیدا نشد.'
            );

        }

        if (
            course.workspaceId !==
            req.workspace.id
        ) {

            throw new AppError(
                404,
                'کلاس پیدا نشد.'
            );

        }

        const role =
            req.membership.role;

        if (

            role === ROLES.OWNER ||

            role === ROLES.MANAGER ||

            role === ROLES.ASSISTANT

        ) {

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

                    'اجازه مدیریت این کلاس را ندارید.'

                );

            }

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