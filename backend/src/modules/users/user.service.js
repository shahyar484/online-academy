const { User } = require('../../../models');

class UserService {

    async create(data) {

        return await User.create(data);

    }

    async findById(id) {

        return await User.findByPk(id);

    }

    async findByMobile(mobile) {

        return await User.findOne({

            where: {

                mobile

            }

        });

    }

    async findOrCreateByMobile(

        mobile,

        firstName = '',

        lastName = ''

    ) {

        let user =
            await this.findByMobile(
                mobile
            );

        if (user) {

            return user;

        }

        user = await User.create({

            mobile,

            firstName,

            lastName

        });

        return user;

    }

}

module.exports = new UserService();