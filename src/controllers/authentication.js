import express from 'express';

import { createUser } from '../db/users.js';
import { generateRandomString, authentication } from '../helpers/index.js';
import { getUserByEmail } from '../db/users.js';

import pkg from 'lodash';
const { get, merge } = pkg;

export const register = async (req, res) => {
  const registrationRequestBodyValid = get(
    req,
    'registrationRequestBodyValid',
    false
  );

  if (!registrationRequestBodyValid) {
    return res.status(400).json({
      error: 'Invalid request...',
    });
  }

  try {
    const { first_name, last_name, username, email, password, date_of_birth } =
      req.body;

    const userExists = await getUserByEmail(email);

    if (userExists) {
      return res.status(400).json({
        error: 'User already exists...',
      });
    }

    const salt = generateRandomString();

    const user = createUser({
      username,
      email,
      authentication: {
        password: authentication(salt, password),
        salt,
      },
      user_info: {
        first_name,
        last_name,
        date_of_birth,
      },
    });

    return res.sendStatus(200);
  } catch (error) {
    console.error('Error registering user: ', error);
    return res.status(400).json({
      error: 'Invalid request...',
    });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      error: 'Invalid email or password...',
    });
  }

  const user = await getUserByEmail(email, true);

  if (!user) {
    return res.status(400).json({
      error: 'Invalid email or password...',
    });
  }

  const { password: hashedPassword, salt } = user.authentication;

  if (authentication(salt, password) !== hashedPassword) {
    return res.status(400).json({
      error: 'Invalid email or password...',
    });
  }

  user.authentication.session_token = authentication(
    generateRandomString(),
    user._id.toString()
  );

  await user.save();

  res.cookie('session_token', user.authentication.session_token, {
    domain: 'localhost',
    path: '/',
    secure: true,
    httpOnly: true,
    sameSite: 'none',
  });

  return res.sendStatus(200);
};
