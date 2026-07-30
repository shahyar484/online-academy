const {

    Session,

    Course

} = require('../../../models');

const {

    Op

} = require('sequelize');

class SessionService {

    async create(data) {

        return await Session.create(data);

    }

    async findById(id) {

        return await Session.findByPk(id);

    }

    async findByCourse(courseId) {

        return await Session.findAll({

            where: {

                courseId

            },

            order: [

                [

                    'sessionNumber',

                    'ASC'

                ]

            ]

        });

    }

    async update(

        session,

        data

    ) {

        await session.update(data);

        return session;

    }

    async remove(session) {

        await session.destroy();

    }

    async teacherHasConflict(

        membershipId,

        startAt,

        endAt,

        ignoreSessionId = null

    ) {

        const teacherCourses =

            await Course.findAll({

                where: {

                    membershipId

                },

                attributes: [

                    'id'

                ]

            });

        const courseIds =

            teacherCourses.map(

                c => c.id

            );

        if (

            !courseIds.length

        ) {

            return false;

        }

        const where = {

            courseId: {

                [Op.in]:

                courseIds

            },

            startAt: {

                [Op.lt]:

                endAt

            },

            endAt: {

                [Op.gt]:

                startAt

            }

        };

        if (

            ignoreSessionId

        ) {

            where.id = {

                [Op.ne]:

                ignoreSessionId

            };

        }

        return !!await Session.findOne({

            where

        });

    }


async getHostMembershipId(sessionId) {

    const session = await Session.findByPk(

        sessionId,

        {

            include: [

                {

                    model: Course,

                    as: 'course',

                    attributes: [

                        'membershipId'

                    ]

                }

            ]

        }

    );

    if (!session) {

        throw new AppError(

            404,

            'جلسه پیدا نشد.'

        );

    }

    return session.course.membershipId;

}

}

module.exports =

new SessionService();