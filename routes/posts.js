const Router = require('express').Router;
const { jwtAuth } = require('../config/passport');
const postController = require('../controllers/postController');
const {
  checkValidationResult,
  postCreateValidation,
  postUpdateValidation,
} = require('../config/validationSchemas');

const router = Router();

// root is /posts/

router.get('/', postController.getPosts);

// get one post by id
router.get('/:id', postController.getOnePost);

router.get('/:id/comments', postController.getComments);

// create a post
router.post(
  '/',
  jwtAuth,
  postCreateValidation,
  checkValidationResult,
  postController.createPost
);

// DELETE a post by id
router.delete('/:id', jwtAuth, postController.deletePost);

// POST a comment
router.post('/:id/comments', postController.postComment);

// UPDATE a post
router.put(
  '/:id',
  jwtAuth,
  postUpdateValidation,
  checkValidationResult,
  postController.updatePost
);

module.exports = router;
