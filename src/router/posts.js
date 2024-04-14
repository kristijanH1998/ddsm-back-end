import express from 'express';
import { isAuthenticated } from '../middlewares/authentication.js'

import { createPost, createComment } from '../controllers/posts.js';

export default (router) => {
  router.post('/posts', isAuthenticated, createPost);
  router.post('/posts/:id/comment', isAuthenticated, createComment);
};