const mongoose = require('./connection');

const postSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    date: { type: Date, default: Date.now },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true }
  }
);

const Post = mongoose.model('posts', postSchema);

exports.createPost = (obj, next) => {
    const post = new Post(obj);

    post.save(function(err, post) {
        next(err, post)
    }) 
}

// TODO: Implement the findIDPost function
exports.findIDPost = (id, next) => {
    Post.find({"_id": id});
};

// TODO: Implement the UPDATE FUNCTION
exports.update = (obj, next) => {
    Post.findByIdAndUpdate(obj._id, obj, {new: true}, function(err, post) {
        next(err, post);
    }
    );

}