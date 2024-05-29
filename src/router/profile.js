import express from 'express';
import { isAuthenticated } from '../middlewares/authentication.js';
import {
  updateProfile,
  archiveProfile,
  getProfile,
  deleteProfile,
  unarchiveProfile,
  getUserPublicInfo,
  getUsers,
} from '../controllers/profile.js';
import {
  isProfileOwner,
  checkUpdateProfilePayload,
  getFullProfile,
} from '../middlewares/profile.js';
import { userExistsByUsername } from '../middlewares/profile.js';

export default (router) => {
  router.get('/profile', isAuthenticated, getFullProfile, getProfile);
  router.get('/profile/user/:username', isAuthenticated, userExistsByUsername, getUserPublicInfo);
  router.get('/profile/userList', isAuthenticated, getUsers);
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
