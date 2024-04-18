import { ObjectId } from 'mongodb';
import {
  createNewPost,
  createNewComment,
  delComment,
  delPost,
  archivePost as _archivePost,
  unarchivePost as _unarchivePost,
} from '../db/posts.js';
import pkg from 'lodash';
const { get, merge } = pkg;

export const createPost = async (req, res) => {
  const { post_content } = req.body;

  const user = get(req, 'identity');

  try {
    const newPost = await createNewPost({
      post_owner_id: user._id.toString(),
      post_content,
    });

    res.status(201).json(newPost._id);
  } catch (error) {
    console.error('error creating post:', error);
    res.status(400).json({
      error: 'Invalid request...',
    });
  }
};

export const archivePost = async (req, res) => {
  try {
    const post = get(req, 'post_identity');
    await _archivePost(post);

    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

export const unarchivePost = async (req, res) => {
  try {
    const post = get(req, 'post_identity');
    await _unarchivePost(post);

    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

// Comment creation
export const createComment = async (req, res) => {
  const { comment_content } = req.body;
  const { id: post_id } = get(req, 'post_identity');
  const user = get(req, 'identity');

  try {
    //Check if the comment_content is provided
    if (!comment_content) {
      return res.status(400).json({ error: 'Comment content is required' });
    }

    // Create new comment if post id is valid
    const newComment = await createNewComment({
      post_id,
      comment_owner_id: user._id.toString(),
      comment_content,
    });

    res.status(201).json(newComment._id);
  } catch (error) {
    console.error('error creating comment:', error);
    res.status(400).json({
      error: 'Invalid request...',
    });
  }
};

export const deleteComment = async (req, res) => {
  try {
    const comment = get(req, 'comment_identity');
    delComment(comment._id);
    return res.sendStatus(200);
  } catch {
    res.sendStatus(500);
  }
};

export const deletePost = async (req, res) => {
  try {
    const { id: post_id } = req.params;
    await delPost(post_id);
    return res.status(200).json({ message: 'Post deleted successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

export const getPost = async (req, res) => {
  try {
    const { post_identity } = req;
    return res.status(200).json(post_identity);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};
