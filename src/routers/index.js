const express = require('express');

const router = express.Router();

const endPointTalker = require('./endPointTalker');
const endPointLogin = require('./endPointLogin');
const endPointTalkerDb = require('./endPointTalker.db');

router.use(endPointTalkerDb);
router.use(endPointTalker);
router.use(endPointLogin);

module.exports = router;