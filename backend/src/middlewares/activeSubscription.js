const subscriptionService =
require('../modules/subscriptions/subscription.service');

const AppError =
require('../utils/AppError');

module.exports = async (

    req,

    res,

    next

) => {

    try {

        const subscription =

            await subscriptionService.getActive(

                req.workspace.id

            );

        if (!subscription) {

            throw new AppError(

                403,

                'اشتراک فعالی وجود ندارد.'

            );

        }

        if (

            subscription.expireAt <= new Date()

        ) {

            throw new AppError(

                403,

                'اشتراک منقضی شده است.'

            );

        }

        req.subscription = subscription;

        next();

    }

    catch (err) {

        next(err);

    }

};