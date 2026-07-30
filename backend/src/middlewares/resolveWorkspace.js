const { Workspace, Academy } = require('../../models');
const AppError = require('../utils/AppError');

module.exports = async (req, res, next) => {

    try {

        let workspaceId =

            req.params.workspaceId ||

            req.body.workspaceId ||

            req.query.workspaceId;

        /*
            اگر بعداً فقط academyId داشتیم
        */

        if (!workspaceId && req.params.academyId) {

            const academy = await Academy.findByPk(

                req.params.academyId,

                {
                    attributes: ['workspaceId']
                }

            );

            if (!academy) {

                throw new AppError(
                    404,
                    'آموزشگاه یافت نشد.'
                );

            }

            workspaceId = academy.workspaceId;

        }

        if (!workspaceId) {

            throw new AppError(
                400,
                'Workspace مشخص نشده است.'
            );

        }

        const workspace =
            await Workspace.findByPk(workspaceId);

        if (!workspace) {

            throw new AppError(
                404,
                'Workspace یافت نشد.'
            );

        }

        req.workspace = workspace;

        next();

    }

    catch (err) {

        next(err);

    }

};