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

        const course =

            await courseService.findById(

                req.body.courseId

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

        if (

            req.membership.role ===

            ROLES.TEACHER

        ) {

            if (

                course.membershipId !==

                req.membership.id

            ) {

                throw new AppError(

                    403,

                    'اجازه ایجاد جلسه برای این کلاس را ندارید.'

                );

            }

        }

        req.course = course;

        next();

    }

    catch (err) {

        next(err);

    }

};