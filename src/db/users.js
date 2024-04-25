import mongoose from 'mongoose';

import { deleteAllPosts } from './posts.js';

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  authentication: {
    password: { type: String, required: true, select: false },
    salt: { type: String, required: true, select: false },
    session_token: { type: String, select: false },
  },
  user_info: {
    country: { type: String },
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    date_of_birth: { type: Date },
    profile_picture: { type: Buffer }, // Assuming profile_picture is stored as binary data, after being converted from base64 ASCII string
    datetime_created: { type: Date, default: Date.now },
    biography: { type: String },
  },
  profile_is_archived: {
    type: Boolean,
    default: false,
  },
});

export const UserModel = mongoose.model('User', userSchema);

export const createUser = async (values) => {
  return UserModel(values)
    .save()
    .then((user) => user.toObject());
};

export const getUserById = async (id, includeCredentials) => {
  if (includeCredentials) {
    return UserModel.findById(id).select(
      'authentication.password authentication.salt'
    );
  }

  return UserModel.findById(id);
};

export const getUserByEmail = async (email, includeCredentials) => {
  if (includeCredentials) {
    return UserModel.findOne({ email }).select(
      'authentication.password authentication.salt'
    );
  }

  return UserModel.findOne({ email });
};

export const updateUserSessionToken = async (id, session_token) => {
  return UserModel.findByIdAndUpdate(id, {
    'authentication.session_token': session_token,
  });
};

export const getUserBySessionToken = async (session_token) => {
  return UserModel.findOne({
    'authentication.session_token': session_token,
  }).select('authentication.salt');
};

export const updateUserProfile = async (id, updates) => {
  const user = await getUserById(id, false);

  if (!user) throw new Error('User not found');

  if (updates.username) {
    user.username = updates.username;
  }
  if (updates.email) {
    user.email = updates.email;
  }

  if (updates.country) {
    user.user_info.country = updates.country;
  }
  if (updates.first_name) {
    user.user_info.first_name = updates.first_name;
  }
  if (updates.last_name) {
    user.user_info.last_name = updates.last_name;
  }
  if (updates.date_of_birth) {
    user.user_info.date_of_birth = updates.date_of_birth;
  }
  if (updates.profile_picture) {
    user.user_info.profile_picture = updates.profile_picture;
  }
  if (updates.biography) {
    user.user_info.biography = updates.biography;
  }

  return await user.save();
};

export const archiveProfile = async (id) => {
  const user = await getUserById(id, false);
  user.profile_is_archived = true;
  return user.save();
};

export const deleteProfile = async (id) => {
  const user = await UserModel.findById(id);
  if (!user.profile_is_archived) {
    return {
      status: 400,
      message: 'Cannot delete a profile that is not archived',
    };
  }
  try {
    await deleteAllPosts(id);
    await UserModel.deleteOne({ _id: id });
    return { status: 200 };
  } catch (error) {
    console.error('Error deleting profile:', error);
    return {
      status: 500,
      message: 'Error deleting profile',
    };
  }
};

export const unarchiveProfile = async (id) => {
  const user = await getUserById(id, false);
  user.profile_is_archived = false;
  return user.save();
};

export const getUsernamesAndPics = async (comments) =>  {
  const users = new Array();
  comments.forEach(comment => {
    users.push(comment.comment_owner_id);
  })
  const usernamesAndPics = Array();
  for(const user of users) {
    const info = await UserModel.findById(user.toString());
    usernamesAndPics.push({username: info.username, profile_pic: info.user_info.profile_picture,
      first_name: info.user_info.first_name, last_name: info.user_info.last_name});
  }
  return usernamesAndPics;
};
