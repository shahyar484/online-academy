const academyService = require('./academy.service');

const { success } = require('../../utils/response');

const { presentAcademy } = require('./academy.presenter');

class AcademyController {

    async create(req, res, next) {

    try {

        const academy =
            await academyService.create(

                req.body,

                req.user.id

            );

        return success(

            res,

            'آموزشگاه با موفقیت ایجاد شد.',

            academy,

            201

        );

    }

    catch (err) {

        next(err);

    }

}

}

module.exports = new AcademyController();