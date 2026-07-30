const { randomBytes } = require('crypto');

function generateAcademyCode() {

    return (
        'SCH-' +
        randomBytes(3)
            .toString('hex')
            .toUpperCase()
    );

}

module.exports = generateAcademyCode;