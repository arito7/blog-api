import { Router } from 'express';
import { jwtAuth } from '../config/passport.js';
import postController from '../controllers/postController.js';
import {
  checkValidationResult,
  postUpdateValidation,
  postCreateValidation,
} from '../config/validationSchemas.js';

const router = Router();

// root is /posts/

router.get('/', postController.getPosts);

// get one post by id
router.get('/:id', postController.getOnePost);

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
  postUpdateValidation,
  checkValidationResult,
  postController.updatePost
);

export default router;
