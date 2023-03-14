const express = require('express');
const { generatingToken } = require('../utils/manipulationJson');
const { validationEmail, validationPassword } = require('../middlewares');

const router = express.Router();

router.post('/login', validationEmail, validationPassword, async (req, res) => {
    const tokens = await generatingToken();
    return res.status(200).json({ token: tokens });
});

module.exports = router;