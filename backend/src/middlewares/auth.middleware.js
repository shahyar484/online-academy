const jwt = require('jsonwebtoken');
const userService = require('../modules/users/user.service');
const AppError = require('../utils/AppError');

const auth = async (req, res, next) => {

    try {

        const authHeader = req.headers.authorization;

        if (!authHeader) {
            throw new AppError(
                401,
                'توکن ارسال نشده است.'
            );
        }

        if (!authHeader.startsWith('Bearer ')) {
            throw new AppError(
                401,
                'فرمت توکن معتبر نیست.'
            );
        }

        const token = authHeader.split(' ')[1];

        const payload = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        const user = await userService.findById(payload.id);

        if (!user) {
            throw new AppError(
                401,
                'کاربر یافت نشد.'
            );
        }

        req.user = {
            id: user.id,
            mobile: user.mobile,
        };

        next();

    } catch (error) {

        next(error);

    }

};

module.exports = auth;