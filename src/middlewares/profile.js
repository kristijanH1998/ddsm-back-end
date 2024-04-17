import pkg from 'lodash';

import { getUserById } from '../db/users.js';

const { get, merge } = pkg;

export const profileExists = async (req, res, next) => {
  try {
    const { id: user_id } = req.params;
    const profile = await getUserById(user_id, false);

    if (!profile) return res.status(404).json({ error: 'Profile does not exist' });

    merge(req, { identity: profile });
    next();
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
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