import express from 'express';

import authentication from './authentication.js';

const router = express.Router();

/**
 * router function. This function will add the routes to the router.
 *
 * @returns the router
 */
export default () => {
  authentication(router);
  return router;
};
