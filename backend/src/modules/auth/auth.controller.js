const authService = require('./auth.service');

const asyncHandler = require('../../utils/asyncHandler');

const { success } = require('../../utils/response');

class AuthController {

    sendOtp = asyncHandler(async (req, res) => {

        const result = await authService.sendOtp(req.body);

        return success(
            res,
            'کد تایید با موفقیت ارسال شد.',
            result
        );

    });

    

    verifyOtp = asyncHandler(async (req, res) => {

        const result = await authService.verifyOtp(req.body);

        res.cookie(

            'accessToken',

            result.token,

            {

                httpOnly: true,

                secure:
                    process.env.NODE_ENV === 'production',

                sameSite: 'lax',

                maxAge:
                    30 * 24 * 60 * 60 * 1000

            }

        );

        return success(

            res,

            'ورود با موفقیت انجام شد.',

            {

                user: result.user

            }

        );

    });

    logout = asyncHandler(async (req, res) => {

        res.clearCookie(

            'accessToken'

        );

        return success(

            res,

            'با موفقیت خارج شدید.'

        );

    });


    me = asyncHandler(async (req, res) => {

        return success(

            res,

            'اطلاعات کاربر دریافت شد.',

            {

                user: {

                    id: req.user.id,

                    mobile: req.user.mobile,

                    firstName: req.user.firstName,

                    lastName: req.user.lastName,

                    role: req.user.role

                }

            }

        );

    });

}

module.exports = new AuthController();