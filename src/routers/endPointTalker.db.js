const express = require('express');
const connection = require('../connection');

const router = express.Router();

router.get('/talker/db', async (req, res) => {
    const [allManagers] = await connection
    .execute('SELECT age, id, name, talk_rate AS rate, talk_watched_at AS watchedAt FROM talkers');
    
    // const newArray = allManagers.map((ele) => )

    console.log(allManagers);
    return res.status(200).json(allManagers);
});

module.exports = router;
