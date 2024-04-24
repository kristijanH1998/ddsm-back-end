import { isAuthenticated } from '../middlewares/authentication.js';

import {
  createPost,
  createComment,
  createLike,
  archivePost,
  deleteComment,
  deletePost,
  updatePost,
  getPost,
  getCommsForPost,
  unarchivePost,
} from '../controllers/posts.js';
import {
  postExists,
  isPostOwner,
  commentExists,
  isCommentOwner,
} from '../middlewares/posts.js';

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
  router.put(
    '/posts/:id/unarchive',
    isAuthenticated,
    postExists,
    isPostOwner,
    unarchivePost
  );
  router.delete(
    '/posts/:id/comment/:commentId',
    isAuthenticated,
    postExists,
    commentExists,
    isCommentOwner,
    deleteComment
  );
  router.delete('/posts/:id/comment', isAuthenticated, deleteComment);
  router.delete(
    '/posts/:id/delete',
    isAuthenticated,
    postExists,
    isPostOwner,
    deletePost
  );
  router.put(
    '/posts/:id',
    isAuthenticated,
    postExists,
    isPostOwner,
    updatePost
  );
  router.get('/posts/:id', isAuthenticated, postExists, getPost);
  router.get('/posts/:id/:lim/:step/allComments', 
    isAuthenticated, 
    postExists, 
    getCommsForPost
  );
  router.post('/posts/:id/like', isAuthenticated, postExists, createLike);
};
