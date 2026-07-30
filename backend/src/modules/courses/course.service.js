const { Course } = require('../../../models');

class CourseService {

    async create(data) {
        return await Course.create(data);
    }

    async findById(id) {
        return await Course.findByPk(id);
    }

    async findAll(workspaceId) {
        return await Course.findAll({
            where: {
                workspaceId,
                isActive: true
            },
            order: [
                ['createdAt', 'DESC']
            ]
        });
    }

    async update(course, data) {

        await course.update(data);

        return course;

    }

    async remove(course) {

        await course.destroy();

    }

}

module.exports = new CourseService();