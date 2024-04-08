import express from 'express';
import pkg from 'lodash';
const { get, merge } = pkg;

export const isValidRegistrationRequestBody = (req, res, next) => {
  const { first_name, last_name, username, email, password, date_of_birth } =
    req.body;

  if (
    !first_name ||
    !last_name ||
    !username ||
    !email ||
    !password ||
    !date_of_birth
  ) {
    return res.status(400).json({
      error: 'All fields are required...',
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
