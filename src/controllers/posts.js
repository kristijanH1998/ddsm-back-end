import { createNewPost } from '../db/posts.js';
import pkg from 'lodash';
const { get, merge } = pkg;

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
