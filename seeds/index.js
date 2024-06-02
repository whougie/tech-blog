const sequelize = require('../config/connection');
const User = require('../models/User');
const Post = require('../models/Post');
const Comment = require('../models/Comment');

const userData = require('./usersData.json');
const postData = require('./postData.json');
const commentData = require('./commentData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });
  await User.bulkCreate(userData, { individualHooks: true} );
  await Post.bulkCreate(postData, { individualHooks: true} );
  await Comment.bulkCreate(commentData, { individualHooks: true} );
};

module.exports = seedDatabase;
