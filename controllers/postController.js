import Post from '../models/Post.js';
import Comment from '../models/Comment.js';

const getPosts = (req, res) => {
  Post.find({ published: true })
    .limit(20)
    .populate('comments')
    .exec((err, posts) => {
      if (err) {
        res.send(err.message);
      }
      res.send(posts);
    });
};

const updatePost = (req, res, next) => {
  Post.findById(req.params.id).exec((err, post) => {
    if (err) {
      res.json({ message: err.message });
    }
    post.title = req.body.title || post.title;
    post.body = req.body.body || post.body;
    post.published = req.body.published || post.published;
    post.save((err, post) => {
      if (err) {
        res.json({ message: err.message });
      }
      res.json({ body: req.body, post });
    });
  });
};

const getOnePost = (req, res) => {
  Post.findById(req.params.id, (err, post) => {
    if (err) {
      res.send(err);
    }
    if (!post) {
      res.json({ message: 'This post does not exist' });
    }
    res.send(post);
  });
};

const createPost = (req, res) => {
  const post = new Post({
    creator: req.user.id,
    title: req.body.title,
    body: req.body.body,
    published: req.body.published || false,
  });

  post.save((err, p) => {
    if (err) {
      res.status(500);
      res.send(err);
    }
    res.json({ message: 'Post Successfully saved' });
  });
};

const deletePost = (req, res) => {
  Post.findByIdAndDelete(req.params.id, (err, post) => {
    if (err) {
      res.send(err);
    }
    res.send(post);
  });
};

const postComment = (req, res) => {
  const comment = new Comment({
    post: req.params.id,
    name: req.body.name,
    comment: req.body.comment,
  });
  comment.save((err, comment) => {
    if (err) {
      res.send(err);
    }
    res.send(comment);
  });
};

export default {
  postComment,
  getOnePost,
  getPosts,
  updatePost,
  createPost,
  deletePost,
};
