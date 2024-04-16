import { updateUserProfile } from '../db/users.js';
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

  const user = get(req, 'identity');

  profile_picture = Buffer.from(profile_picture, "base64");  //converting base64 string from the request body into a Buffer object (binary)

  try {
    const update = {
      username,
      country,
      first_name,
      last_name,
      profile_picture,
      biography,
    };

    await updateUserProfile(user._id, update);

    return res.sendStatus(200);
  } catch (error) {
    console.error('Error updating profile: ', error);
    return res.status(500).json({
      error: 'Invalid request...',
    });
  }
};
