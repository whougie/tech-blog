const router = require('express').Router();
const userAPI = require('./userAPI');
const postAPI = require('./postAPI');
const commentAPI = require('./commentAPI');
const seedsAPI = require('./seedsAPI');

router.use('/users', userAPI);
router.use('/posts', postAPI);
router.use('/comments', commentAPI);
router.use('/seeds', seedsAPI);

module.exports = router;