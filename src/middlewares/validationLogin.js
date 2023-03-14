const validationEmail = async (req, res, next) => {
    const { body: { email } } = req;
    const validation = (
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
      );
      const valiEmail = validation.test(email);
    if (email === undefined) {
       return res.status(400).json({ message: 'O campo "email" é obrigatório' });
    } 
    if (!valiEmail) {
       return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
    }
    return next();
    };

    const validationPassword = async (req, res, next) => {
        const { body: { password } } = req;
        
        if (password === undefined) {
           return res.status(400).json({ message: 'O campo "password" é obrigatório' });
        } 
        if (password.length < 6) {
       return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
        }
        return next();
        };

    module.exports = { 
        validationEmail,
        validationPassword,
    };