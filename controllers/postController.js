const Post = require('../models/Post');
const Comment = require('../models/Comment');

exports.getPosts = (req, res) => {
  Post.find({ published: true })
    .limit(20)
    .sort({ createdAt: -1 })
    .exec((err, posts) => {
      if (err) {
        return res.send(err.message);
      }
      res.json({ posts });
    });
};

exports.getComments = (req, res, next) => {
  Comment.find({ post: req.params.id }).exec((err, comments) => {
    if (err) {
      res.status(500);
      res.json({ success: false, message: 'Database Error' });
    }
    res.json({ success: true, postId: req.params.id, comments });
  });
};

exports.updatePost = (req, res, next) => {
  Post.findById(req.params.id).exec((err, post) => {
    if (err) {
      res.json({ message: err.message });
    }
    post.title = req.body.title || post.title;
    post.body = req.body.body || post.body;
    post.published = req.body.published || post.published;
    post.save((err, post) => {
      if (err) {
        return res.json({ message: err.message });
      }
      res.json({ body: req.body, post });
    });
  });
};

exports.getOnePost = (req, res) => {
  Post.findById(req.params.id)
    .populate('creator')
    .exec((err, post) => {
      if (err) {
        return res.json({ success: false, error: err.message });
      }
      if (!post) {
        return res.json({
          success: false,
          message: 'This post does not exist',
        });
      }

      // assign only the username to creator field so as not expose
      // vital info
      let p = { ...post };
      p = p._doc;
      p.creator = p.creator.username;
      res.json({ success: true, post: p });
    });
};

exports.createPost = (req, res) => {
  const post = new Post({
    creator: req.user.id,
    title: req.body.title,
    body: req.body.body,
    published: req.body.published || false,
  });

  post.save((err, p) => {
    if (err) {
      res.status(500);
      return res.json({ success: false, message: err.message });
    }
    res.json({ success: true, message: 'Post Successfully saved', post: p });
  });
};

exports.deletePost = (req, res) => {
  Post.findByIdAndDelete(req.params.id, (err, post) => {
    if (err) {
      return res.send(err);
    }
    res.send(post);
  });
};

exports.postComment = (req, res) => {
  const comment = new Comment({
    post: req.params.id,
    name: req.body.name,
    comment: req.body.comment,
  });
  comment.save((err, comment) => {
    if (err) {
      return res.send(err);
    }
    res.send(comment);
  });
};
