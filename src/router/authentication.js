import express from 'express';

import { register, login } from '../controllers/authentication.js';
import {
  isAuthenticated,
  isValidRegistrationRequestBody,
  success,
} from '../middlewares/authentication.js';

export default (router) => {
  router.post('/auth/register', isValidRegistrationRequestBody, register);
  router.post('/auth/login', login);
  router.get('/auth/isAuthenticated', isAuthenticated, success);
};
