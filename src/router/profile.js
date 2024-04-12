import express from 'express';
import { isAuthenticated } from '../middlewares/authentication.js';
import { updateProfile } from '../controllers/profile.js';

export default (router) => {
  router.put('/profile', isAuthenticated, updateProfile);
};
