const express = require('express');

const router = express.Router();

const endPointTalker = require('./endPointTalker');
const endPointLogin = require('./endPointLogin');

router.use(endPointTalker);
router.use(endPointLogin);

module.exports = router;