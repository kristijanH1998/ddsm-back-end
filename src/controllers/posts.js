import {
  createNewPost,
  createNewComment,
  createNewLike,
  delComment,
  delPost,
  delLike,
  archivePost as _archivePost,
  getCommentsForPost,
  unarchivePost as _unarchivePost,
  postUpdate,
  getPostLikes,
  getPostsByUserId,
} from '../db/posts.js';
import { getReactionAndUserData } from '../db/users.js';
import pkg from 'lodash';
const { get, merge } = pkg;

export const createPost = async (req, res) => {
  const { post_content } = req.body;

  if (!post_content) {
    return res.status(400).json({ error: 'post_content required.' });
  }

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
    await delComment(comment._id);
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

// update posts
export const updatePost = async (req, res) => {
  try {
    const { post_content } = req.body;

    if (!post_content) {
      return res.status(400).json({ error: 'No post content provided' });
    }

    const post = get(req, 'post_identity');

    postUpdate(post._id, {
      post_content,
    });

    return res.status(200).json({ message: 'Post updated successfully' });
  } catch (error) {
    console.error('Error updating post: ', error);
    return res.sendStatus(500);
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

export const getPostByUsername = async (req, res) => {
  try {
    const requested_user = get(req, 'requested_user_identity');
    const { lim, step } = req.params;
    const posts = await getPostsByUserId(requested_user._id, lim, step);
    return res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

export const getLikesForPost = async (req, res) => {
  try {
    const post_id = req.params.id;
    const page = Number(req.params.page);
    if (!Number.isInteger(page) || page <= 0) {
      return res.status(400).json({
        error:
          'Page number must be integer greater than or equal to 1.',
      });
    }
    const likes = await getPostLikes(post_id, page);
    const userIds = await getReactionAndUserData({
      type: 'likes',
      content: likes,
    });
    return res.status(200).json(userIds);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};
export const getCommsForPost = async (req, res) => {
  try {
    const post_id = req.params.id;
    const page = Number(req.params.page);
    if (!Number.isInteger(page) || page <= 0) {
      return res.status(400).json({
        error:
          'Page number must be integer greater than or equal to 1.',
      });
    }
    const comments = await getCommentsForPost(post_id, page);
    const userIds = await getReactionAndUserData({
      type: 'comments',
      content: comments,
    });
    return res.status(200).json(userIds);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

export const createLike = async (req, res) => {
  const { id: post_id } = req.params;
  const user = get(req, 'identity');
  try {
    const statusCode = await createNewLike({
      post_id,
      like_owner_id: user._id.toString(),
    });
    if (statusCode === 201) {
      res.status(201).json({ message: 'New like created successfully' });
    } else {
      res.status(200).json({ message: 'You have already liked this post.' });
    }
  } catch (error) {
    console.error('Error creating like:', error);
    res.status(400).json({
      error: 'Invalid request...',
    });
  }
};

export const deleteLike = async (req, res) => {
  const { id: post_id } = req.params;
  const user = get(req, 'identity');
  try {
    const statusCode = await delLike({
      post_id,
      like_owner_id: user._id.toString(),
    });
    if (statusCode === 200) {
      res.status(200).json({ message: 'Like deleted successfully' });
    } else {
      res.status(404).json({ message: 'Like not found.' });
    }
  } catch (error) {
    console.error('Error deleting like:', error);
    res.status(400).json({
      error: 'Invalid request...',
    });
  }
};
