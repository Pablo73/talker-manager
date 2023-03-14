const express = require('express');
const { getManager, getManagerId, postManager } = require('../utils/manipulationJson');
const { validationTokenExist,
    validationName,
    validationAge,
    validationTalk,
    validationRate,
    validationWatchedAt } = require('../middlewares');

const router = express.Router();

router.get('/talker', async (req, res) => {
    const allManagers = await getManager();
    return res.status(200).json(allManagers);
});

router.get('/talker/:id', async (req, res) => {
    const { id } = req.params;
    const capturingId = await getManagerId(id);
    if (capturingId.length === 0) {
        return res.status(404).json({
            message: 'Pessoa palestrante não encontrada',
        });
    }
    return res.status(200).json(capturingId[0]);
});

router.post('/talker', validationTokenExist, validationName, async (req, res) => {
    const { body } = req;
    const newManagers = await postManager(body);
    return res.status(201).json(newManagers);
});

module.exports = router;
