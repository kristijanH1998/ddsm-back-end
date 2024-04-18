import pkg from 'lodash';

const { get, merge } = pkg;

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
