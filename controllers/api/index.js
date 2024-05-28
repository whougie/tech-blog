const router = require('express').Router();
const userAPI = require('./userAPI');
const postAPI = require('./postAPI');
const commentAPI = require('./commentAPI');

router.use('/users', userAPI);
router.use('/posts', postAPI);
router.use('/comments', commentAPI);

module.exports = router;