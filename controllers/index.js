const router = require('express').Router();
const apiRoutes = require('./api');
const pageRoutes = require('./pageRoutes');

router.use('/api', apiRoutes);

module.exports = router;