import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
  post_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    index: true,
    unique: true,
    default: mongoose.Types.ObjectId // Generate a default ObjectId for post_id
  },
  post_owner_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model
    required: true
  },
  post_content: {
    type: String,
    required: true
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', //references the User model
    required: true
  },
  username: {
    type: String,
    required: true
  },
  profile_picture: {
    type: Buffer // assuming profile_picture is stored as binary data
  },
  post_timestamp: {
    type: Date,
    default: Date.now
  },
});

module.exports = mongoose.model('Post', postSchema);
