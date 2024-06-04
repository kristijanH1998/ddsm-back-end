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
    profile_picture: { type: Buffer, default: Buffer.from("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", 'base64')},
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

export const getUserByUsername = async (username) => {
  return UserModel.findOne({ username });
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

export const getReactionAndUserData = async (reactions) =>  {
  const users = new Array();
  if (reactions.type == 'comments') {
    reactions.content.forEach((comment) => {
      users.push(comment.comment_owner_id);
    });
  } else {
    reactions.content.forEach((like) => {
      users.push(like.like_owner_id);
    });
  }
  const reactionAndUserData = Array();
  for(const user of users) {
    const info = await UserModel.findById(user.toString());
    reactionAndUserData.push({username: info.username, profile_pic: info.user_info.profile_picture ? info.user_info.profile_picture.toString('base64') : null,
      first_name: info.user_info.first_name, last_name: info.user_info.last_name});
  }
  //also fetch every comment's content and timestamp:
  if(reactions.type == 'comments'){
    for(let i = 0; i < reactionAndUserData.length; i++) {
      reactionAndUserData[i] = {...reactionAndUserData[i], content: reactions.content[i].comment_content, 
        timestamp: reactions.content[i].comment_timestamp, _id: reactions.content[i]._id}
    }
  }
  return reactionAndUserData;
};

export const getUserInfo = async (username) => {
  let userData = await UserModel.findOne({ username }).select('user_info -_id');  
  return userData.user_info;
}

export const getUserList = async () => {
  try {
    const users = await UserModel.find()
      .select('username -_id user_info.profile_picture')
    return users;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
}

  