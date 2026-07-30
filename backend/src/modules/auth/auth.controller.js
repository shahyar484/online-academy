const authService = require('./auth.service');

const asyncHandler = require('../../utils/asyncHandler');

const { success } = require('../../utils/response');

class AuthController {

  sendOtp = asyncHandler(async (req, res) => {

    await authService.sendOtp(req.body);

    return success(
        res,
        'کد تایید با موفقیت ارسال شد.'
    );

});

  

  verifyOtp = asyncHandler(async (req, res) => {

    const result = await authService.verifyOtp(req.body);

    return success(
        res,
        'ورود با موفقیت انجام شد.',
        result
    );

});

}

module.exports = new AuthController();