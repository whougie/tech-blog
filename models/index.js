// import models
const Comment = require('./Comment');
const Post = require('./Post');
const User = require('./User');

Comment.belongsTo(User, {
  foreignKey: "user_id"
});

Comment.belongsTo(Post, {
  foreignKey: "post_id"
});

Post.belongsTo(User, {
  foreignKey: "user_id"
});


User.hasMany(Comment, {
  onDelete: 'SET NULL'
});

User.hasMany(Post, {
  onDelete: 'SET NULL'
});

Post.hasMany(Comment, {
  onDelete: 'SET NULL'
})

module.exports = {
  Comment,
  Post,
  User
};
