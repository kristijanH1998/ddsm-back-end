import express from 'express';

import { register, login } from '../controllers/authentication.js';
import { isValidRegistrationRequestBody } from '../middlewares/authentication.js';

export default (router) => {
  router.post('/auth/register', isValidRegistrationRequestBody, register);
  router.post('/auth/login', login);
};
