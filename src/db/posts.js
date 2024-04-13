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

export const getPostById = async (id) => {
  return PostsModel.findById(id);
};

export const createNewPost = async (values) => {
  return PostsModel(values).save();
};

export const archivePost = async (post) => {
  post.post_is_archived = true;
  return post.save();
};
