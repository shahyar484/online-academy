const {

    createSessionSchema

} = require('./session.validation');

const sessionService =
require('./session.service');

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
                createSessionSchema.parse(

                    req.body

                );

            const startAt =
                new Date(data.startAt);

            const endAt =
                new Date(

                    startAt.getTime()

                    +

                    data.durationMinutes *

                    60000

                );

            const conflict =

                await sessionService.teacherHasConflict(

                    req.course.membershipId,

                    startAt,

                    endAt

                );

            if (conflict) {

                throw new AppError(

                    400,

                    'این مدرس در این بازه زمانی جلسه دیگری دارد.'

                );

            }

            const session =

                await sessionService.create({

                    ...data,

                    endAt

                });

            return res.status(201).json({

                success: true,

                message: 'جلسه ایجاد شد.',

                data: session

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

            const sessions =

                await sessionService.findByCourse(

                    req.course.id

                );

            return res.json({

                success: true,

                data: sessions

            });

        }

        catch (err) {

            next(err);

        }

    },



    getById: async (

        req,

        res,

        next

    ) => {

        try {

            return res.json({

                success: true,

                data: req.sessionModel

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

                createSessionSchema

                .partial()

                .parse(

                    req.body

                );

            const updateData = {

                ...data

            };

            if (

                data.startAt ||

                data.durationMinutes

            ) {

                const startAt =

                    new Date(

                        data.startAt ||

                        req.sessionModel.startAt

                    );

                const duration =

                    data.durationMinutes ||

                    req.sessionModel.durationMinutes;

                const endAt =

                    new Date(

                        startAt.getTime()

                        +

                        duration *

                        60000

                    );

                const conflict =

                    await sessionService.teacherHasConflict(

                        req.course.membershipId,

                        startAt,

                        endAt,

                        req.sessionModel.id

                    );

                if (conflict) {

                    throw new AppError(

                        400,

                        'این مدرس در این بازه زمانی جلسه دیگری دارد.'

                    );

                }

                updateData.endAt =

                    endAt;

            }

            const session =

                await sessionService.update(

                    req.sessionModel,

                    updateData

                );

            return res.json({

                success: true,

                message: 'جلسه بروزرسانی شد.',

                data: session

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

            await sessionService.remove(

                req.sessionModel

            );

            return res.json({

                success: true,

                message: 'جلسه حذف شد.'

            });

        }

        catch (err) {

            next(err);

        }

    }

};