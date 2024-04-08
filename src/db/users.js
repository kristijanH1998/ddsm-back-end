import mongoose from 'mongoose';

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
    date_of_birth: { type: Date, required: true },
    profile_picture: { type: Buffer }, // Assuming profile_picture is stored as binary data
    datetime_created: { type: Date, default: Date.now },
    biography: { type: String },
  },
});

export const UserModel = mongoose.model('User', userSchema);

export const createUser = async (values) => {
  return UserModel(values)
    .save()
    .then((user) => user.toObject());
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
