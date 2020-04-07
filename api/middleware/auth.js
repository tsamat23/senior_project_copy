const User = require('../models/User');

const auth = async (req, res, next) => {
    const token = req.get('Token');
    let user;

    if (!token) {
        return res.status(401).send({message: 'Нет токена'});
    }
    try {
        user = await User.findOne({token: token});
    } catch (e) {
        res.status(400).send('Пользователь не найден')
    }


    if (!user) {
        return res.status(401).send({message: 'Такого пользователя не существует'});
    }

    req.user = user;

    next();
};

module.exports = auth;