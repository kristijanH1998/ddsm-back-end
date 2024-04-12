import express from 'express';
import posts from './posts.js';
import authentication from './authentication.js';

const router = express.Router();

/**
 * router function. This function will add the routes to the router.
 *
 * @returns the router
 */
export default () => {
  posts(router);
  authentication(router);
  return router;
};
