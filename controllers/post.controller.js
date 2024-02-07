const PostModel = require('../models/post.model');
const PostController = {};

PostController.create = (req, res) => {
    return PostModel.createPost(req.body, (err, post) => {
        if (err) {
            return res.status(500).end();
        } else {
            return res.json(post);
        }
    })

};

// TODO: Implement the update server method
PostController.update = (req, res) => {

};

// TODO: Implement the findPost server method
PostController.findPost = (req, res) => {
    return PostModel.findIDPost(req.params.id, (err, post) => {
        if (err) {
            return res.status(500).end();
        } else {
            return res.json(post);
        }
    });
};

PostController.getAllPosts = (req, res) => {

};

module.exports = PostController;