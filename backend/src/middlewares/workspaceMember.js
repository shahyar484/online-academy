const membershipService =
require('../modules/memberships/membership.service');

const AppError =
require('../utils/AppError');

module.exports = async (

    req,

    res,

    next

) => {

    try {

        const workspaceId =

            req.body.workspaceId ||

            req.params.workspaceId ||

            req.query.workspaceId;

        if (!workspaceId) {

            throw new AppError(

                400,

                'شناسه Workspace ارسال نشده است.'

            );

        }

        const membership =

            await membershipService.find(

                req.user.id,

                workspaceId

            );

        if (!membership) {

            throw new AppError(

                403,

                'شما عضو این Workspace نیستید.'

            );

        }

        req.membership = membership;

        next();

    }

    catch (err) {

        next(err);

    }

};