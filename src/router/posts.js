import express from 'express';


import { } from '../controllers/posts.js';

export default (router) => {
  router.post('/posts', newPost);
};