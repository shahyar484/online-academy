const crypto = require('crypto');

function generateOtp(length = 5) {
  const max = 10 ** length;

  return crypto
    .randomInt(0, max)
    .toString()
    .padStart(length, '0');
}

module.exports = generateOtp;