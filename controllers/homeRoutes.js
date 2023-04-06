const router = require('express').Router();
const { Post, Comment, User } = require('../models/');

//View all posts
router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [User],
    });

    const posts = postData.map((post) => post.get({ plain: true }));

    res.render('public-view', { posts });
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;