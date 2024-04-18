import express from 'express';
import { isAuthenticated } from '../middlewares/authentication.js';
import { updateProfile, archiveProfile } from '../controllers/profile.js';
import { isProfileOwner } from '../middlewares/profile.js';

export default (router) => {
  router.put('/profile', isAuthenticated, updateProfile);
  router.put(
    '/profile/archive',
    isAuthenticated,
    isProfileOwner,
    archiveProfile
  );
};
