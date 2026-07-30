const membershipService =
require('../modules/memberships/membership.service');

const AppError =
require('../utils/AppError');

module.exports = (...roles) => {

    return async (req, res, next) => {

        try {

            const result =
                await membershipService.hasRole(

                    req.user.id,

                    req.workspace.id,

                    roles

                );

            if (!result.membership) {

                throw new AppError(
                    403,
                    'شما عضو این Workspace نیستید.'
                );

            }

            if (!result.success) {

                throw new AppError(
                    403,
                    'دسترسی لازم برای انجام این عملیات را ندارید.'
                );

            }

            req.membership =
                result.membership;

            next();

        }

        catch (err) {

            next(err);

        }

    };

};