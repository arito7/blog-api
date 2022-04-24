const Post = require('../models/Post');
const Comment = require('../models/Comment');

exports.getPosts = (req, res) => {
  const limit = 20;
  Post.find({ published: true })
    .limit(limit)
    .sort({ createdAt: -1 })
    .exec((err, posts) => {
      if (err) {
        return res.json({
          success: false,
          message: 'Database Error',
          error: err.message,
        });
      }
      res.json({
        success: true,
        message: `Retrieved ${limit} most recent posts.`,
        posts,
      });
    });
};

exports.getUserPosts = (req, res) => {
  Post.find({ creator: req.user.id })
    .sort({ createdAt: -1 })
    .limit(50)
    .exec((err, posts) => {
      if (err) {
        res.status(500);
        return res.json({
          success: false,
          message: 'Database Error',
          error: err.message,
        });
      }
      if (posts) {
        return res.json({ success: true, posts });
      } else {
        return res.json({ success: true, message: 'User has no posts.' });
      }
    });
};

exports.getComments = (req, res, next) => {
  Comment.find({ post: req.params.id })
    .sort({ createdAt: -1 })
    .exec((err, comments) => {
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
      return res.json({
        success: false,
        message: 'Database Error',
        error: err.message,
      });
    }
    if (req.user.id == post.creator) {
      post.title = req.body.title || post.title;
      post.body = req.body.body || post.body;
      post.published = req.body.published || post.published;
      post.save((err, post) => {
        if (err) {
          return res.json({
            success: false,
            message: 'Database Error',
            error: err.message,
          });
        }
        return res.json({
          success: true,
          message: 'Post successfully updated',
          post,
        });
      });
    } else {
      return res.json({
        success: false,
        message: 'You are not authorized to modify this post.',
      });
    }
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
    creator: req.user._id,
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
  Post.findById(req.params.id).exec((err, post) => {
    if (err) {
      return res.json({
        success: false,
        message: 'Database Error.',
        error: err.message,
      });
    }
    if (post) {
      console.log('userid', req.user.id, 'postcreator:', post.creator);
      if (req.user.id == post.creator) {
        Post.findByIdAndDelete(post.id).exec((err, post) => {
          if (err) {
            return res.json({
              success: false,
              message: 'Database Error',
              error: err.message,
            });
          }
          res.json({
            success: true,
            message: 'Post successfully deleted.',
            post,
          });
        });
      } else {
        res.json({
          success: false,
          message:
            'Failed to delete post. You are not authorized to modify this post.',
        });
      }
    } else {
      return res.json({
        success: false,
        message: 'Could not find a post with corresponding id',
      });
    }
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
      return res.json({
        success: false,
        message: 'Database Error',
        error: err.message,
      });
    }
    res.json({ success: true, message: 'Comment successfully saved', comment });
  });
};
