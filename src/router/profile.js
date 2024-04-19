import express from 'express';
import { isAuthenticated } from '../middlewares/authentication.js';
import {
  updateProfile,
  archiveProfile,
  getProfile,
} from '../controllers/profile.js';
import {
  isProfileOwner,
  checkUpdateProfilePayload,
  getFullProfile,
} from '../middlewares/profile.js';

export default (router) => {
  router.get('/profile', isAuthenticated, getFullProfile, getProfile);
  router.put(
    '/profile',
    isAuthenticated,
    checkUpdateProfilePayload,
    updateProfile
  );
  router.put(
    '/profile/archive',
    isAuthenticated,
    isProfileOwner,
    archiveProfile
  );
};
