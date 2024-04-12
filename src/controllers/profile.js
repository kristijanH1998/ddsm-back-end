import { updateUserProfile } from '../db/users';
import pkg from 'lodash';
const { get, merge } = pkg;

export const updateProfile = async (req, res) => {
  const {
    username,
    country,
    first_name,
    last_name,
    profile_picture,
    biography,
  } = req.body;

  try {
    const update = updateUserProfile({
      username,
      user_info: {
        country,
        first_name,
        last_name,
        profile_picture,
        biography,
      },
    });

    return res.sendStatus(200);
  } catch (error) {
    console.error('Error updating profile: ', error);
    return res.sendStatus(400).json({
      error: 'Invalid request...',
    });
  }
};
