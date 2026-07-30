class SmsService {
  async sendOtp(mobile, code) {
    console.log(`OTP for ${mobile}: ${code}`);

    return true;
  }
}

module.exports = new SmsService();