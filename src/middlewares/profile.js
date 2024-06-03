import pkg from 'lodash';

import { getUserById, getUserByUsername } from '../db/users.js';

const { get, merge } = pkg;

export const profileExists = async (req, res, next) => {
  try {
    const { id: user_id } = req.params;
    const profile = await getUserById(user_id, false);

    if (!profile)
      return res.status(404).json({ error: 'Profile does not exist' });

    merge(req, { identity: profile });
    next();
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

export const userExistsByUsername = async (req, res, next) => {
  try {
    const { username } = req.params;
    const requested_user = await getUserByUsername(username);

    if (!requested_user)
      return res.status(404).json({ error: 'User does not exist' });

    merge(req, { requested_user_identity: requested_user });
    next();
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

export const getFullProfile = async (req, res, next) => {
  try {
    const user = get(req, 'identity');
    const profile = await getUserById(user._id, false);

    merge(req, { identity: profile });
    next();
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

export const checkUpdateProfilePayload = (req, res, next) => {
  const {
    date_of_birth,
    country,
    first_name,
    last_name,
    profile_picture,
    biography,
  } = req.body;

  try {
    if (
      !date_of_birth &&
      !country &&
      !first_name &&
      !last_name &&
      !profile_picture &&
      !biography
    ) {
      return res.status(400).json({ error: 'No data supplied' });
    }
    let newProfileData = {};

    if (date_of_birth !== undefined) newProfileData.date_of_birth = date_of_birth;
    if (country !== undefined) newProfileData.country = country;
    if (first_name !== undefined) newProfileData.first_name = first_name;
    if (last_name !== undefined) newProfileData.last_name = last_name;
    if (profile_picture !== undefined)
      newProfileData.profile_picture = profile_picture;
    if (biography !== undefined) newProfileData.biography = biography;

    merge(req, { newProfileData });

    next();
  } catch (error) {
    console.error(error);
    return res.sendStatus(500);
  }
};

export const isProfileOwner = (req, res, next) => {
  try {
    const user = get(req, 'identity');
    if (!user) return res.sendStatus(500);
    next();
  } catch (error) {
    console.error(error);
    return res.sendStatus(500);
  }
};
