const router = require('express').Router();
const { User, Post, Comment } = require('../models');
const date = require('date-and-time');

///
// Routes to retrieve HTML pages
///
router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [{ model: User}]
    }
  );
  const posts = postData.map(post => {
    let result = post.get({ plain: true }) ;
    result.createdAt = date.format(post.createdAt,'MM/DD/YYYY'); //Convert the date to look nice
    return result;
  })
  res.render('homepage', {
    loggedIn: req.session.loggedIn,
    posts
  });
} catch (error) {
  console.log(error);
  res.status(500).json(error)
}
});

router.get('/dashboard', async (req, res) => {
  if (!req.session.loggedIn) {
    res.redirect('/login');
    return;
  }
  try {
    let posts;
    const postData = await Post.findAll({where: {user_id: req.session.userId}, 
      include: [{ model: User}]
    }
  );

  if (postData) {
      posts = postData.map(post => {
      let result = post.get({ plain: true }) ;
      result.createdAt = date.format(post.createdAt,'MM/DD/YYYY'); //Convert the date to look nice
      return result;
    })
  }

  console.log("AFtermath for posts")
  console.log(posts)

  res.render('dashboard', {
    loggedIn: req.session.loggedIn,
    posts
  });
} catch (error) {
  console.log(error);
  res.status(500).json(error)
}
});


router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  res.render('login');
});

module.exports = router;