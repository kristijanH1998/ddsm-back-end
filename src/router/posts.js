import express from 'express';
import { isAuthenticated } from '../middlewares/authentication.js';

import { createPost, archivePost } from '../controllers/posts.js';
import { postExists, isPostOwner } from '../middlewares/posts.js';

export default (router) => {
  router.post('/posts', isAuthenticated, createPost);
  router.put(
    '/posts/:id/archive',
    isAuthenticated,
    postExists,
    isPostOwner,
    archivePost
  );
};
