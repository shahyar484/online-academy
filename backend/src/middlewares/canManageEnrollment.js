const enrollmentService =
require('../modules/enrollments/enrollment.service');

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

        const enrollment =
            await enrollmentService.findById(

                req.params.id

            );

        if (!enrollment) {

            throw new AppError(

                404,

                'ثبت‌نام پیدا نشد.'

            );

        }

        const role =
            req.membership.role;

        if (

            role === ROLES.OWNER ||

            role === ROLES.MANAGER ||

            role === ROLES.ASSISTANT

        ) {

            req.enrollment =
                enrollment;

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