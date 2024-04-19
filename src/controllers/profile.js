import {
  updateUserProfile,
  archiveProfile as _archiveProfile,
} from '../db/users.js';
import pkg from 'lodash';
const { get, merge } = pkg;

export const getProfile = async (req, res) => {
  const profile = get(req, 'identity');

  try {
    return res.status(200).json({ profile });
  } catch (error) {
    console.error('Error updating profile: ', error);
    return res.status(500).json({
      error: 'Invalid request...',
    });
  }
};

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
