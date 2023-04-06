const router = require('express').Router();
const { Post, Comment, User } = require('../models/');

//View all posts
router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [User],
    });

    const posts = postData.map((post) => post.get({ plain: true }));

    res.render('all', { posts });
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get('/posts/:id', async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        User,
        {
          model: Comment,
          include: [User],
        },
      ],
    });

    if (postData) {
      const post = postData.get({ plain: true });

      res.render('single', { post });
    } else {
      res.status(404).json({ message: 'This post does not exist' });
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/signup", (req, res) => {
    if (req.session.loggedIn) {
        res.redirect("/");
        return;
    }

    res.render("signup");
});

module.exports = router;
