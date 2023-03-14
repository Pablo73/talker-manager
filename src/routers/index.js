const express = require('express');

const router = express.Router();

const endPointTalker = require('./endPointTalker');

router.use(endPointTalker);

module.exports = router;