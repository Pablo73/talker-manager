const validationRateSearch = async (req, res, next) => {
    const { rate } = req.query;
    const validation = rate < 1 || rate > 5 || !Number.isInteger(+rate);
    if (rate && validation) {
        return res.status(400).json({
            message: 'O campo "rate" deve ser um número inteiro entre 1 e 5',
        });
    }
    next();
};

const validationWatchedAtSearch = async (req, res, next) => {
    const { date } = req.query;
    const dateformat = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/;
    const valiDate = dateformat.test(date);

    if (date && !valiDate) {
        return res.status(400).json({
            message: 'O parâmetro "date" deve ter o formato "dd/mm/aaaa"' });
        }
    next();
};

module.exports = { 
    validationRateSearch,
    validationWatchedAtSearch,
};