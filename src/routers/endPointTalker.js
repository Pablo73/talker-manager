const express = require('express');
const { getManager } = require('../utils/manipulationJson');

const router = express.Router();

router.get('/talker', async (req, res) => {
    const allManagers = await getManager();
    return res.status(200).json(allManagers);
});

module.exports = router;
