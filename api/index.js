var router = require('express').Router();

router.use('/user',require('./user'));
router.use('/git',require('./git'));
router.use('/app',require('./app'));

module.exports = router;
