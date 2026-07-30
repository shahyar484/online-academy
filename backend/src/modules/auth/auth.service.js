const { OtpCode } = require('../../../models');
const userService = require('../users/user.service');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const AppError = require('../../utils/AppError');

const generateOtp = require('../../utils/generateOtp');
const smsService = require('./sms.service');

class AuthService {

  async sendOtp(data) {

    const { mobile } = data;

    const now = new Date();

    const otp = await OtpCode.findOne({
        where: { mobile }
    });

    if (otp && otp.resendAt > now) {
        throw new AppError(
            429,
            'لطفاً کمی صبر کنید و دوباره تلاش کنید.'
        );
    }

    const code = Math.floor(
        10000 + Math.random() * 90000
    ).toString();

    const hashedCode = await bcrypt.hash(code, 10);

    const resendAt = new Date(now.getTime() + 60 * 1000);

    const expiresAt = new Date(now.getTime() + 2 * 60 * 1000);

    await OtpCode.upsert({
        mobile,
        code: hashedCode,
        attempts: 0,
        resendAt,
        expiresAt
    });

    console.log(`OTP for ${mobile}: ${code}`);

    return;

}


  async verifyOtp(data) {

    const {
        mobile,
        code,
        firstName,
        lastName
    } = data;

    const otp = await OtpCode.findOne({
        where: {
            mobile
        }
    });

    if (!otp) {
        throw new AppError(
            404,
            'کد تاییدی برای این شماره یافت نشد.'
        );
    }

    if (otp.attempts >= 5) {
        throw new AppError(
            429,
            'تعداد دفعات وارد کردن کد بیش از حد مجاز است. لطفاً دوباره درخواست کد تایید بدهید.'
        );
    }

    if (otp.expiresAt < new Date()) {
        throw new AppError(
            400,
            'کد تایید منقضی شده است.'
        );
    }

    const isValidCode = await bcrypt.compare(
        code,
        otp.code
    );

    if (!isValidCode) {

        await otp.increment('attempts');

        throw new AppError(
            400,
            'کد تایید اشتباه است.'
        );

    }

    let user = await userService.findByMobile(mobile);

    if (!user) {

        if (!firstName || !lastName) {
            throw new AppError(
                400,
                'نام و نام خانوادگی برای ثبت‌نام الزامی است.'
            );
        }

        user = await userService.create({
            mobile,
            firstName,
            lastName
        });

    }

    const token = jwt.sign(
        {
            id: user.id,
            mobile: user.mobile
        },
        process.env.JWT_SECRET,
        {
            expiresIn: '30d'
        }
    );

    await otp.destroy();

    return {
        token,
        user: {
            id: user.id,
            mobile: user.mobile,
            firstName: user.firstName,
            lastName: user.lastName
        }
    };

}

}

module.exports = new AuthService();