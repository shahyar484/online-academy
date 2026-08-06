const jwt = require('jsonwebtoken');

const AppError = require('../utils/AppError');

const { User } = require('../../models');

const auth = (...roles) => {

    return async (req, res, next) => {

        try {

            const token = req.cookies.accessToken;

            if (!token) {

                throw new AppError(
                    401,
                    'ابتدا وارد حساب کاربری خود شوید.'
                );

            }

            const decoded = jwt.verify(
                token,
                process.env.JWT_SECRET
            );

            const user = await User.findByPk(
                decoded.id
            );

            if (!user) {

                throw new AppError(
                    401,
                    'کاربر یافت نشد.'
                );

            }

            if (

                roles.length &&

                !roles.includes(user.role)

            ) {

                throw new AppError(
                    403,
                    'شما دسترسی لازم را ندارید.'
                );

            }

            req.user = user;

            next();

        }

        catch (error) {

            next(error);

        }

    };

};

module.exports = auth;