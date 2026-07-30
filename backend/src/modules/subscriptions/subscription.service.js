const {

    Subscription,

    SubscriptionPlan

} = require('../../../models');

class SubscriptionService {

    async getActive(workspaceId) {

        return await Subscription.findOne({

            where: {

                workspaceId,

                status: 'active'

            },

            include: [

                {

                    model: SubscriptionPlan,

                    as: 'plan'

                }

            ],

            order: [

                ['expireAt', 'DESC']

            ]

        });

    }

    async isActive(workspaceId) {

        const subscription =

            await this.getActive(workspaceId);

        if (!subscription)
            return false;

        return subscription.expireAt > new Date();

    }

}

module.exports =
    new SubscriptionService();