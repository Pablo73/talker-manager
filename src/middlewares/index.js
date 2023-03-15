const { validationEmail, validationPassword } = require('./validationLogin');
const { validationTokenExist,
    validationName,
    validationAge,
    validationTalk,
    validationWatchedAt,
    validationRate } = require('./validationNewManager');

const { validationRateSearch, validationWatchedAtSearch } = require('./validationSearch');

module.exports = {
    validationEmail,
    validationPassword,
    validationTokenExist,
        validationName,
        validationAge,
        validationTalk,
        validationWatchedAt,
        validationRate,
        validationRateSearch,
        validationWatchedAtSearch,

};