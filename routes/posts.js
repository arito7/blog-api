import { Router } from 'express';
import { jwtAuth } from '../config/passport.js';
import Post from '../models/Post.js';
import Comment from '../models/Comment.js';

const router = Router();

// root is /posts/

// authenticated route that allows viewing of unpublished posts
router.get('/', jwtAuth, (req, res) => {
  Post.find()
    .limit(20)
    .populate('comments')
    .exec((err, posts) => {
      if (err) {
        res.send(err);
      }
      res.send(posts);
    });
});

// get one post by id
router.get('/:id', (req, res) => {
  Post.findById(req.params.id, (err, post) => {
    if (err) {
      res.send(err);
    }
    if (!post) {
      res.send('This post does not exist');
    }
    res.send(post);
  });
});

// create a post
router.post('/', jwtAuth, (req, res) => {
  const post = new Post({
    creator: req.user.id,
    title: req.body.title,
    body: req.body.body,
  });

  post.save((err, post) => {
    if (err) {
      res.send(err);
    }
    res.json(post);
  });
});

// DELETE a post by id
router.delete('/:id', jwtAuth, (req, res) => {
  Post.findByIdAndDelete(req.params.id, (err, post) => {
    if (err) {
      res.send(err);
    }
    res.send(post);
  });
});

// POST
router.post('/:id/comments', (req, res) => {
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
});

export default router;
