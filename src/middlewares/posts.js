import pkg from 'lodash';

import { getPostById } from '../db/posts.js';

const { get, merge } = pkg;

export const postExists = async (req, res, next) => {
  try {
    const { id: post_id } = req.params;
    const post = await getPostById(post_id);

    if (!post) return res.status(404).json({ error: 'Post does not exist' });

    merge(req, { post_identity: post });
    next();
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

export const isPostOwner = (req, res, next) => {
  try {
    const post = get(req, 'post_identity');
    const user = get(req, 'identity');

    if (post.post_owner_id.toString() !== user._id.toString()) {
      return res.status(403).json({ error: 'User does not have access' });
    }

    next();
  } catch (error) {
    console.error(error);
    return res.sendStatus(500);
  }
};
