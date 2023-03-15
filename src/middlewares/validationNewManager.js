const validationTokenExist = async (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) {
        return res.status(401).json({ message: 'Token não encontrado' });
    }
    if (authorization.length !== 16) {
        return res.status(401).json({ message: 'Token inválido' });
    }
    return next();
 };

const validationName = async (req, res, next) => {
    const { body: { name } } = req;
    
    if (!name || name === undefined) {
        return res.status(400).json({ message: 'O campo "name" é obrigatório' });
    }
    if (name.length < 3) {
    return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
    }
next();
};

const validationAge = async (req, res, next) => {
    const { body: { age } } = req;
    
    if (age === undefined || age.length === 0) {
        return res.status(400).json({ message: 'O campo "age" é obrigatório' });
    } 
    if (age <= 18 || !Number.isInteger(age)) {
        return res.status(400).json({ message: 
        'O campo "age" deve ser um número inteiro igual ou maior que 18' });
    }
    next();
    };

const validationTalk = async (req, res, next) => {
    const { body: { talk } } = req;
    
    if (talk === undefined) {
        return res.status(400).json({ message: 'O campo "talk" é obrigatório' });
    } 
    next();
    };

const validationWatchedAt = async (req, res, next) => {
    const { body: { talk: { watchedAt } } } = req;
    const dateformat = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/;
    const valiDate = dateformat.test(watchedAt);

    if (watchedAt === undefined) {
        return res.status(400).json({ message: 'O campo "watchedAt" é obrigatório' });
    }
    if (!valiDate) {
        return res.status(400).json({ message: 
            'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
     }
    next();
    };

    const validationRate = async (req, res, next) => {
        const { body: { talk: { rate } } } = req;
        if (rate === undefined) {
            return res.status(400).json({ message: 'O campo "rate" é obrigatório' });
        }
        if (rate < 1 || rate > 5 || !Number.isInteger(rate)) {
            return res.status(400).json({ message: 
                'O campo "rate" deve ser um número inteiro entre 1 e 5' });
         }
        next();
        };

    module.exports = { 
        validationTokenExist,
        validationName,
        validationAge,
        validationTalk,
        validationWatchedAt,
        validationRate,
    };