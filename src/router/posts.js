import { isAuthenticated } from '../middlewares/authentication.js';

import {
  createPost,
  createComment,
  archivePost,
  deleteComment,
  deletePost,
} from '../controllers/posts.js';
import { postExists, isPostOwner, commentExists, isCommentOwner } from '../middlewares/posts.js';

export default (router) => {
  router.post('/posts', isAuthenticated, createPost);
  router.post('/posts/:id/comment', isAuthenticated, postExists, createComment);
  router.put(
    '/posts/:id/archive',
    isAuthenticated,
    postExists,
    isPostOwner,
    archivePost
  );
  router.delete('/posts/:id/comment/:commentId', isAuthenticated, postExists, commentExists, isCommentOwner, deleteComment);
  router.delete('/posts/:id/delete', isAuthenticated, postExists, isPostOwner, deletePost);
};
