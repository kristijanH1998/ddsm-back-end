import Post from './db/postSchema';

export const createPost = async (req, res) => {
    const {post_owner_id, post_content} = req.body;

    try{
        const newPost = await Post.create({
            post_owner_id,
            post_content,
            post_timestamp: new Date(),
            post_is_archived: false,
            post_like_count: 0,
            post_comment_count: 0
        });

        res.status(201).json(newPost);
    } catch (error) {
        console.error('error creating post:', error);
        res.status(400).json({ 
            error: 'Invalid request...',
        });
    }
};