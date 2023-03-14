const { validationEmail, validationPassword } = require('./validationLogin');
const { validationTokenExist,
    validationName,
    validationAge,
    validationTalk,
    validationWatchedAt,
    validationRate } = require('./validationNewManager');

module.exports = {
    validationEmail,
    validationPassword,
    validationTokenExist,
        validationName,
        validationAge,
        validationTalk,
        validationWatchedAt,
        validationRate,
};