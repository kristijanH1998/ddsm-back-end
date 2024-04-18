import express from 'express';
import { isAuthenticated } from '../middlewares/authentication.js';
import {
  updateProfile,
  archiveProfile,
  deleteProfile,
} from '../controllers/profile.js';
import {
  profileExists,
  isProfileOwner,
  checkUpdateProfilePayload,
} from '../middlewares/profile.js';

export default (router) => {
  router.put(
    '/profile',
    isAuthenticated,
    checkUpdateProfilePayload,
    updateProfile
  );
  router.put(
    '/profile/archive',
    isAuthenticated,
    profileExists,
    isProfileOwner,
    archiveProfile
  );
  router.delete(
    '/profile/delete',
    isAuthenticated,
    profileExists,
    isProfileOwner,
    deleteProfile
  );
};
