const courseService =
require('../modules/courses/course.service');

const enrollmentService =
require('../modules/enrollments/enrollment.service');

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

                req.params.courseId

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

        switch (

            req.membership.role

        ) {

            case ROLES.OWNER:

            case ROLES.MANAGER:

            case ROLES.ASSISTANT:

                req.course = course;

                return next();

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

                req.course = course;

                return next();

            case ROLES.STUDENT:

                const enrolled =

                    await enrollmentService.exists(

                        course.id,

                        req.membership.id

                    );

                if (!enrolled) {

                    throw new AppError(

                        403,

                        'ابتدا باید در کلاس ثبت‌نام کنید.'

                    );

                }

                req.course = course;

                return next();

            default:

                throw new AppError(

                    403,

                    'دسترسی ندارید.'

                );

        }

    }

    catch (err) {

        next(err);

    }

};