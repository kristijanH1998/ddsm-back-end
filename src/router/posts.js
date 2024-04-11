import express from 'express';

import { createPost } from '../controllers/posts.js';

export default (router) => {
  router.post('/posts', createPost);
};