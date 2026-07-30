const router = require('express').Router();

const controller = require('./auth.controller');
const validate = require('../../middlewares/validate');

const {
    sendOtpSchema,
    verifyOtpSchema
} = require('./auth.validation');

router.post(
  '/send-otp',
  validate(sendOtpSchema),
  controller.sendOtp
);

router.post(
    '/verify-otp',
    validate(verifyOtpSchema),
    controller.verifyOtp
);

module.exports = router;