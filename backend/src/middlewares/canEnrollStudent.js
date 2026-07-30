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

        const role =
            req.membership.role;

        switch (role) {

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

                        'فقط می‌توانید دانشجوی کلاس‌های خودتان را ثبت‌نام کنید.'

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