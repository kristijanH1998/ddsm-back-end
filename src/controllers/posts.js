import Post from './db/postSchema';

export const createPost = async (req, res) => {
    const {post_content, user_id, username, profile_picture } = req.body;
    
}