import pkg from 'lodash';

import { getUserById } from '../db/users.js';

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
    username,
    country,
    first_name,
    last_name,
    profile_picture,
    biography,
  } = req.body;

  try {
    if (
      !username &&
      !country &&
      !first_name &&
      !last_name &&
      !profile_picture &&
      !biography
    ) {
      return res.status(400).json({ error: 'No data supplied' });
    }
    let newProfileData = {};

    if (username !== undefined) newProfileData.username = username;
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
