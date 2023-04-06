const router = require("express").Router();
const { Post, Comment, User } = require("../../models/");
const withAuth = require("../../utils/auth");

router.post('/', withAuth, async (req, res) => {
    try {
        const newPost = await Post.create({ ...req.body, userId: req.session.user_id});
        res.json(newPost);
         
    } catch (error) {
        res.status(500).json(error);
    }
});

module.exports = router