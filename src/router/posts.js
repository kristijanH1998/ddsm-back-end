import express from 'express';
import { isAuthenticated } from '../middlewares/authentication.js'

import { createPost } from '../controllers/posts.js';

export default (router) => {
  router.post('/posts', isAuthenticated, createPost);
};