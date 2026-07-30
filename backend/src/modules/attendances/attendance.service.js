const {

    Attendance,

    Enrollment,

    Session

} = require('../../../models');

const AppError =
require('../../utils/AppError');

class AttendanceService {

    async findById(id) {

        return await Attendance.findByPk(id);

    }

    async findBySession(sessionId) {

        return await Attendance.findAll({

            where: {

                sessionId

            },

            include: [

                {

                    model: Enrollment,

                    as: 'enrollment'

                }

            ],

            order: [

                ['createdAt', 'ASC']

            ]

        });

    }

    async getEnrollment(

        session,

        membershipId

    ) {

        const enrollment =

            await Enrollment.findOne({

                where: {

                    membershipId,

                    courseId:

                        session.courseId

                }

            });

        if (!enrollment) {

            throw new AppError(

                403,

                'کاربر عضو این کلاس نیست.'

            );

        }

        return enrollment;

    }

    async joinSession(

        sessionId,

        membershipId

    ) {

        const session =

            await Session.findByPk(

                sessionId

            );

        if (!session) {

            throw new AppError(

                404,

                'جلسه پیدا نشد.'

            );

        }

        const enrollment =

            await this.getEnrollment(

                session,

                membershipId

            );

        let attendance =

            await Attendance.findOne({

                where: {

                    sessionId,

                    enrollmentId:

                        enrollment.id

                }

            });

        const now =

            new Date();

        const lateMinutes =

            Math.max(

                0,

                Math.floor(

                    (

                        now -

                        new Date(

                            session.startAt

                        )

                    ) / 60000

                )

            );

        if (!attendance) {

            attendance =

                await Attendance.create({

                    sessionId,

                    enrollmentId:

                        enrollment.id,

                    joinedAt:

                        now,

                    lateMinutes,

                    status:

                        lateMinutes > 0

                            ? 'late'

                            : 'present'

                });

        }

        else {

            if (!attendance.joinedAt) {

                attendance.joinedAt = now;

            }

            attendance.status =

                lateMinutes > 0

                    ? 'late'

                    : 'present';

            attendance.lateMinutes =

                lateMinutes;

            await attendance.save();

        }

        return attendance;

    }

    async leaveSession(

        sessionId,

        membershipId

    ) {

        const session =

            await Session.findByPk(

                sessionId

            );

        if (!session) {

            throw new AppError(

                404,

                'جلسه پیدا نشد.'

            );

        }

        const enrollment =

            await this.getEnrollment(

                session,

                membershipId

            );

        const attendance =

            await Attendance.findOne({

                where: {

                    sessionId,

                    enrollmentId:

                        enrollment.id

                }

            });

        if (!attendance) {

            throw new AppError(

                404,

                'حضور و غیاب پیدا نشد.'

            );

        }

        const now =

            new Date();

        attendance.leftAt =

            now;

        if (attendance.joinedAt) {

            attendance.durationMinutes =

                Math.floor(

                    (

                        now -

                        new Date(

                            attendance.joinedAt

                        )

                    ) / 60000

                );

        }

        await attendance.save();

        return attendance;

    }

    async updateStatus(

        attendance,

        data

    ) {

        await attendance.update(data);

        return attendance;

    }

    async createAbsentStudents(sessionId) {

    const session = await Session.findByPk(sessionId);

    if (!session) {

        throw new AppError(
            404,
            'جلسه پیدا نشد.'
        );

    }

    const enrollments = await Enrollment.findAll({

        where: {

            courseId: session.courseId

        },

        attributes: [

            'id'

        ]

    });

    const attendances = await Attendance.findAll({

        where: {

            sessionId

        },

        attributes: [

            'enrollmentId'

        ]

    });

    const existingEnrollmentIds = new Set(

        attendances.map(

            attendance => attendance.enrollmentId

        )

    );

    const rows = [];

    for (const enrollment of enrollments) {

        if (!existingEnrollmentIds.has(enrollment.id)) {

            rows.push({

                sessionId,

                enrollmentId: enrollment.id,

                status: 'absent'

            });

        }

    }

    if (rows.length) {

        await Attendance.bulkCreate(rows);

    }

}

}

module.exports =
new AttendanceService();