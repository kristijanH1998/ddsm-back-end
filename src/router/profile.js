import express from 'express';
import { isAuthenticated } from '../middlewares/authentication.js';
import {
  updateProfile,
  archiveProfile,
  deleteProfile,
  unarchiveProfile,
} from '../controllers/profile.js';
import {
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
    isProfileOwner,
    archiveProfile
  );
  router.delete(
    '/profile/delete',
    isAuthenticated,
    isProfileOwner,
    deleteProfile
  );
  router.put(
    '/profile/unarchive',
    isAuthenticated,
    isProfileOwner,
    unarchiveProfile
  );
};
