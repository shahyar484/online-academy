const {

    Enrollment,

    Course

} = require('../../../models');

class EnrollmentService {

    async create(data) {

        return await Enrollment.create(data);

    }

    async findById(id) {

        return await Enrollment.findByPk(id);

    }

    async findByCourse(courseId) {

        return await Enrollment.findAll({

            where: {

                courseId

            },

            include: [

                {

                    association: 'student'

                }

            ]

        });

    }

    async exists(

        courseId,

        membershipId

    ) {

        return await Enrollment.findOne({

            where: {

                courseId,

                membershipId

            }

        });

    }

    async remove(enrollment) {

        await enrollment.destroy();

    }

}

module.exports = new EnrollmentService();