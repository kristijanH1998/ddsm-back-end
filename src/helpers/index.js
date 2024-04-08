import crypto from 'crypto';

const SECRET = 'CHANGE_ME_PLEASE_PUT_IN_ENV_FILE';

/**
 * generate random string function. This function will generate a random string. Uses the crypto library.
 *
 * @returns a random string
 */
export const generateRandomString = () => {
  return crypto.randomBytes(128).toString('base64');
};

/**
 * authentication function. This function will authenticate a user. Uses the crypto library.
 *
 * @param salt - 172 character string
 * @param password - 64 character string
 *
 * @returns the authentication
 */
export const authentication = (salt, password) => {
  return crypto
    .createHmac('sha256', [salt, password].join('/'))
    .update(SECRET)
    .digest('hex');
};
