const { Router } = require('express');
const { jwtAuth } = require('../config/passport');
const postController = require('../controllers/postController');

// root is /users

const users = Router();

users.get('/posts', jwtAuth, postController.getUserPosts);

users.get('/:id/posts', postController.getUserPublicPosts);

module.exports = users;
