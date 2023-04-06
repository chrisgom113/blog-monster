const router = require('express').Router();
const { Post } = require('../models/');
const withAuth = require('../utils/auth');

router.get('/', withAuth, async (req, res) => {
  try {
    const postData = await Post.findAll({
      where: {
        userId: req.session.user_id,
      },
    });
    const posts = postData.map((post) => post.get({ plain: true }));

    res.render('myPosts', {
      layout: 'dashboard',
      posts,
    });
  } catch (error) {
    console.log('Not logged in!');
    res.redirect('login');
  }
});

router.get('/new', withAuth, (req, res) => {
  res.render('newPost', {
    layout: 'dashboard',
  });
});

module.exports = router;
