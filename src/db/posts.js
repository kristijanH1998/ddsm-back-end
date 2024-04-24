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

export const unarchivePost = async (post) => {
  post.post_is_archived = false;
  return post.save();
};

export const postUpdate = async (id, values) => {
  return PostsModel.findByIdAndUpdate(id, values);
};

export const delPost = async (id) => {
  // Delete all associated comments
  await CommentModel.deleteMany({ post_id: id });

  return PostsModel.findByIdAndDelete(id);
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

export const delComment = async (id) => {
  return CommentModel.findOneAndDelete(id);
};

export const getCommentById = async (id) => {
  return CommentModel.findById(id);
};

export const getCommentsForPost = async (postId, lim, step) => {
  return CommentModel.find({"post_id": postId}).skip(step).limit(lim);
};
// schema for creating like
const likeSchema = new mongoose.Schema({
  post_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',
    required: true,
  },
  like_owner_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  like_timestamp: {
    type: Date,
    default: Date.now,
  },
});

export const LikeModel = mongoose.model('Like', likeSchema);

export const createNewLike = async (values) => {
  const { post_id, like_owner_id } = values;
  const existingLike = await LikeModel.findOne({
    post_id,
    like_owner_id,
  });
  if (existingLike) {
    return 200; // already liked
  }
  const post = await PostsModel.findById(values.post_id);
  post.post_like_count += 1;
  await post.save();
  await LikeModel.create({
    post_id: values.post_id,
    like_owner_id: values.like_owner_id,
  });
  return 201; // new like created
};

export const deleteAllPosts = async (id) => {
  try {
    await PostsModel.deleteMany({ post_owner_id: id });
    await CommentModel.deleteMany({ comment_owner_id: id });
  } catch (error) {
    console.error('Error deleting posts and comments', error);
    throw error;
  }
};
