import { PostsModel, createNewPost, createNewComment } from '../db/posts.js';
import pkg from 'lodash';
const { get, merge } = pkg;

// Post creation
export const createPost = async (req, res) => {
  const { post_content } = req.body;

  const user = get(req, 'identity');

  try {
    const newPost = createNewPost({
      post_owner_id: user._id.toString(),
      post_content,
    });

    res.sendStatus(201);
  } catch (error) {
    console.error('error creating post:', error);
    res.status(400).json({
      error: 'Invalid request...',
    });
  }
};

// Comment creation
export const createComment = async (req, res) => {
  const { comment_content } = req.body;
  const { id: post_id } = req.params;
  const user = get(req, 'identity');

  try {
    //Check if the comment_content is provided
    if (!comment_content) {
      return res.status(400).json({ error: 'Comment content is required' });
    }

    // Check if the post ID is empty or equals ':id'
    if (!post_id || post_id === ':id') {
      return res.status(404).json({ error: 'Post not found' });
    }
    // Check if the post exists
    const post = await PostsModel.findById(post_id);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    // Create new comment if post id is valid
    const newComment = await createNewComment({
      post_id,
      comment_owner_id: user._id.toString(),
      comment_content,
    });

    res.sendStatus(201);
  } catch (error) {
    console.error('error creating comment:', error);
    res.status(400).json({
      error: 'Invalid request...',
    });
  }
};
