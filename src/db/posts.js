import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
  post_owner_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model
    required: true,
  },
  post_content: {
    type: String,
    required: true,
  },
  post_timestamp: {
    type: Date,
    default: Date.now,
  },
  post_is_archived: {
    type: Boolean,
    default: false,
  },
  post_like_count: {
    type: Number,
    default: 0,
  },
  post_comment_count: {
    type: Number,
    default: 0,
  },
});

export const PostsModel = mongoose.model('Post', postSchema);

export const createNewPost = async (values) => {
  return PostsModel(values).save();
};

// Schema for creating comment
const commentSchema = new mongoose.Schema({
  post_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',
    required: true,
  },
  comment_owner_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  comment_content: {
    type: String,
    required: true,
  },
  comment_timestamp: {
    type: Date,
    default: Date.now,
  },
});

export const CommentModel = mongoose.model('Comment', commentSchema);

export const createNewComment = async (values) => {
  return CommentModel(values).save();
};

export const doesPostExist = async (post_id) => {
  const post = await PostsModel.findById(post_id);
  return !!post;
};