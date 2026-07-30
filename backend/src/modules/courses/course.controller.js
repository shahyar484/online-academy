const slugify =
require('../../utils/slugify');

const randomCode =
require('../../utils/randomCode');

const courseService =
require('./course.service');

const {
    createCourseSchema
} = require('./course.validation');

module.exports = {

    create: async (

        req,
        res,
        next

    ) => {

        try {

            const data =
                createCourseSchema.parse(
                    req.body
                );

            const course =
                await courseService.create({

                    workspaceId:
                        req.workspace.id,

                    membershipId:
                        req.membership.id,

                    title:
                        data.title,

                    slug:
                        slugify(data.title),

                    code:
                        randomCode('CRS'),

                    description:
                        data.description,

                    image:
                        data.image,

                    capacity:
                        data.capacity,

                    price:
                        data.price,

                    isFree:
                        data.isFree

                });

            return res.status(201).json({

                success: true,

                message:
                    'کلاس با موفقیت ایجاد شد.',

                data: course

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

            const course =
                await courseService.update(

                    req.course,

                    req.body

                );

            return res.json({

                success: true,

                message:
                    'کلاس بروزرسانی شد.',

                data: course

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

            await courseService.remove(
                req.course
            );

            return res.json({

                success: true,

                message:
                    'کلاس حذف شد.'

            });

        }

        catch (err) {

            next(err);

        }

    }

};