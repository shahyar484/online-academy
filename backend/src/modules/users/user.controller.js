const asyncHandler = require('../../utils/asyncHandler');
const { presentUser } = require('./user.presenter');

class UserController {

    me = asyncHandler(async (req, res) => {

        return success(
            res,
            'اطلاعات کاربر دریافت شد.',
            presentUser(req.user)
        );

});

    updateProfile = asyncHandler(async (req, res) => {

        // این متد را هم بعداً به همین سبک کامل می‌کنیم.
        return success(
            res,
            'پروفایل با موفقیت بروزرسانی شد.',
            presentUser(user)
        );

    });

}

module.exports = new UserController();