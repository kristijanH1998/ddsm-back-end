import {
  updateUserProfile,
  archiveProfile as _archiveProfile,
  deleteProfile as _deleteProfile,
  unarchiveProfile as _unarchiveProfile,
} from '../db/users.js';
import pkg from 'lodash';
const { get, merge } = pkg;

export const updateProfile = async (req, res) => {
  const user = get(req, 'identity');
  const newProfileData = get(req, 'newProfileData');

  if (newProfileData.profile_picture) {
    //converting base64 string from the request body into a Buffer object (binary)
    newProfileData.profile_picture = Buffer.from(
      newProfileData.profile_picture,
      'base64'
    );
  }

  try {
    await updateUserProfile(user._id, newProfileData);

    return res.sendStatus(200);
  } catch (error) {
    console.error('Error updating profile: ', error);
    return res.status(500).json({
      error: 'Invalid request...',
    });
  }
};

export const archiveProfile = async (req, res) => {
  try {
    const user = get(req, 'identity');
    await _archiveProfile(user._id);
    res.sendStatus(200);
  } catch (error) {
    console.error('Error archiving profile: ', error);
    return res.sendStatus(500);
  }
};

export const deleteProfile = async (req, res) => {
  try {
    const user = get(req, 'identity');
    await _deleteProfile(user._id);
    res.sendStatus(200);
  } catch (error) {
    console.error('Error deleting profile', error);
  }
};

export const unarchiveProfile = async (req, res) => {
  try {
    const user = get(req, 'identity');
    await _unarchiveProfile(user._id);
    res.sendStatus(200);
  } catch {
    console.error('Error trying to unarchive profile: ', error);
    return res.sendStatus(500);
  }
};
