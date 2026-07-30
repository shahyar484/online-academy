const {

    createEnrollmentSchema

} = require('./enrollment.validation');

const enrollmentService =
require('./enrollment.service');

const userService =
require('../users/user.service');

const membershipService =
require('../memberships/membership.service');

const courseService =
require('../courses/course.service');

const AppError =
require('../../utils/AppError');

module.exports = {

    create: async (

        req,

        res,

        next

    ) => {

        try {

            const data =
                createEnrollmentSchema.parse(

                    req.body

                );

            const course = req.course;

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

            const user =

                await userService.findOrCreateByMobile(

                    data.mobile

                );

            const membership =

                await membershipService.findOrCreateStudent(

                    user.id,

                    req.workspace.id

                );

            const exists =

                await enrollmentService.exists(

                    course.id,

                    membership.id

                );

            if (exists) {

                throw new AppError(

                    400,

                    'دانشجو قبلاً در این کلاس ثبت‌نام شده است.'

                );

            }

            const enrollment =

                await enrollmentService.create({

                    courseId:

                        course.id,

                    membershipId:

                        membership.id

                });

            return res.status(201).json({

                success: true,

                message:

                    'دانشجو با موفقیت ثبت‌نام شد.',

                data: enrollment

            });

        }

        catch (err) {

            next(err);

        }

    },

    list: async (

        req,

        res,

        next

    ) => {

        try {

            const data =

                await enrollmentService.findByCourse(

                    req.params.courseId

                );

            return res.json({

                success: true,

                data

            });

        }

        catch (err) {

            next(err);

        }

    },

    remove: async (

        req,

        res,

        next

    ) => {

        try {

            await enrollmentService.remove(

                req.enrollment

            );

            return res.json({

                success: true,

                message:

                    'ثبت‌نام حذف شد.'

            });

        }

        catch (err) {

            next(err);

        }

    }

};