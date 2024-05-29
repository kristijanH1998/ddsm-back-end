import express from 'express';
import pkg from 'lodash';
import { getUserBySessionToken } from '../db/users.js';
const { get, merge } = pkg;

export const isValidRegistrationRequestBody = (req, res, next) => {
  const { first_name, last_name, username, email, password, date_of_birth } =
    req.body;

  if (!first_name) {
    return res.status(400).json({
      error: 'First name is required...',
    });
  }

  if (!last_name) {
    return res.status(400).json({
      error: 'Last name is required...',
    });
  }

  if (!username) {
    return res.status(400).json({
      error: 'Username is required...',
    });
  }

  if (!email) {
    return res.status(400).json({
      error: 'Email is required...',
    });
  }

  if (!password) {
    return res.status(400).json({
      error: 'Password is required...',
    });
  }

  if (!date_of_birth) {
    return res.status(400).json({
      error: 'Date of birth is required...',
    });
  }

  if (first_name.length < 3) {
    return res.status(400).json({
      error: 'First name must be at least 3 characters...',
    });
  }

  if (last_name.length < 3) {
    return res.status(400).json({
      error: 'Last name must be at least 3 characters...',
    });
  }

  if (username.length < 3) {
    return res.status(400).json({
      error: 'Username must be at least 3 characters...',
    });
  }

  if (password.length < 6) {
    return res.status(400).json({
      error: 'Password must be at least 6 characters...',
    });
  }

  if (!(date_of_birth instanceof Date) || isNaN(body.date_of_birth)) {
    let date = new Date(date_of_birth);
    if (isNaN(date.getTime())) {
      return res
        .status(400)
        .json({ error: 'Invalid date format for date_of_birth' });
    }
  }

  const registrationRequestBodyValid = true;
  merge(req, { registrationRequestBodyValid });

  next();
};

export const isAuthenticated = async (req, res, next) => {
  const session_token = req.cookies.session_token;

  if (!session_token) {
    return res.status(403).json({ error: 'No session token' });
  }

  const user = await getUserBySessionToken(session_token);

  if (!user) {
    return res.status(403).json({ error: 'Invalid session token' });
  }

  merge(req, { identity: user });

  next();
};

export const success = (req, res) => {
  return res.sendStatus(200);
};
