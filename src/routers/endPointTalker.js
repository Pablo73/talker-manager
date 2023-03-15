const express = require('express');
const { getManager, getManagerId, postManager, 
    putManager, deleteManager, searchTermManager,
    patchManager,
  } = require('../utils/manipulationJson');
const { validationTokenExist, validationName, validationAge,
    validationTalk, validationRate,
    validationWatchedAt } = require('../middlewares');

const router = express.Router();

router.get('/talker', async (req, res) => {
    const allManagers = await getManager();
    return res.status(200).json(allManagers);
});

router.get('/talker/search', 
validationTokenExist,
 async (req, res) => {
    const { q, rate } = req.query;
    const validation = rate < 1 || rate > 5 || !Number.isInteger(+rate);
    if (rate && validation) {
        return res.status(400).json({
            message: 'O campo "rate" deve ser um número inteiro entre 1 e 5',
        });
    }
        const value = await searchTermManager(q, rate);
        return res.status(200).json(value);
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

router.patch('/talker/rate/:id', validationTokenExist, async (req, res) => {
    const { id } = req.params;
    const { rate } = req.body;
    if (rate === undefined) {
        return res.status(400).json({ message: 'O campo "rate" é obrigatório' });
    }
    if (rate < 1 || rate > 5 || !Number.isInteger(rate)) {
        return res.status(400).json({ message: 
            'O campo "rate" deve ser um número inteiro entre 1 e 5' });
     }
    const allManager = await getManager();
    const getId = allManager.find((ele) => +ele.id === +id);
    
    getId.talk.rate = rate; 
    patchManager(id, getId);
    
    res.status(204).json();
});

router.post('/talker', 
validationTokenExist,
validationName,
validationAge,
validationTalk,
validationRate,
validationWatchedAt,
async (req, res) => {
    const { body } = req;
    const newManagers = await postManager(body);
    return res.status(201).json(newManagers);
});

router.put('/talker/:id', 
validationTokenExist,
validationName,
validationAge,
validationTalk,
validationRate,
validationWatchedAt,
async (req, res) => {
    const { id } = req.params;
    const { body } = req;
    const allMAnager = await getManager();
    const thereIs = allMAnager.some((ele) => +ele.id === +id);

    if (thereIs) {
        const upDateManager = await putManager(+id, body);
    
        res.status(200).json(upDateManager);
    } else {
        res.status(404).json({
            message: 'Pessoa palestrante não encontrada',
        });
    }
});

router.delete('/talker/:id', validationTokenExist, async (req, res) => {
    const { id } = req.params;
    const allMAnager = await getManager();
    const thereIs = allMAnager.some((ele) => +ele.id === +id);

    if (thereIs) {
        await deleteManager(+id);
        res.status(204).end();
    } else {
        res.status(404).json({
            message: 'Pessoa palestrante não encontrada',
        });
    }
});

module.exports = router;
