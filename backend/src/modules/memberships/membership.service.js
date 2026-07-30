const {

    Membership

} = require('../../../models');

const ROLES =
require('../../constants/roles');

class MembershipService {

    async create(data) {

        return await Membership.create(data);

    }

    async findById(id) {

        return await Membership.findByPk(id);

    }

    async findUserMembership(

        userId,

        workspaceId

    ) {

        return await Membership.findOne({

            where: {

                userId,

                workspaceId

            }

        });

    }

    async findOrCreateStudent(

        userId,

        workspaceId

    ) {

        let membership =
            await this.findUserMembership(

                userId,

                workspaceId

            );

        if (membership) {

            return membership;

        }

        membership =
            await Membership.create({

                userId,

                workspaceId,

                role: ROLES.STUDENT,

                isActive: true

            });

        return membership;

    }

    async hasRole(

        userId,

        workspaceId,

        roles

    ) {

        const membership =
            await this.findUserMembership(

                userId,

                workspaceId

            );

        if (!membership) {

            return false;

        }

        return roles.includes(

            membership.role

        );

    }

}

module.exports = new MembershipService();