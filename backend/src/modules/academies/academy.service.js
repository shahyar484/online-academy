const { sequelize } = require('../../../models');

const {
    Academy,
    Workspace,
    Membership
} = require('../../../models');

const slugify = require('../../utils/slugify');

const randomCode = () => {

    return 'SCH-' + Math.random()
        .toString(16)
        .substring(2, 8)
        .toUpperCase();

};

class AcademyService {

    async create(data, userId) {

        const transaction =
            await sequelize.transaction();

        try {

            const workspace =
                await Workspace.create(

                    {

                        type: 'academy',

                        name: data.name,

                        ownerId: userId,

                        isActive: true

                    },

                    { transaction }

                );


            const academy =
                await Academy.create(

                    {

                        workspaceId: workspace.id,

                        name: data.name,

                        shortName: data.shortName,

                        slug:
                            slugify(data.name) ||
                            randomCode().toLowerCase(),

                        code: randomCode(),

                        description: data.description,

                        phone: data.phone,

                        email: data.email,

                        website: data.website,

                        primaryColor: data.primaryColor,

                        logo: data.logo,

                        banner: data.banner,

                        isActive: true,

                        isVerified: false

                    },

                    { transaction }

                );


            await Membership.create(

                {

                    userId,

                    workspaceId: workspace.id,

                    role: 'owner',

                    isActive: true

                },

                { transaction }

            );


            await transaction.commit();

            return academy;

        }

        catch (error) {

            await transaction.rollback();

            throw error;

        }

    }

}

module.exports = new AcademyService();