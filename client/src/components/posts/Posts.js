import React from 'react';
import useStyles from './postsStyles';
import { useSelector } from 'react-redux';
// Posts use the Post component.
import Post from './post/Post';

// Add a react fragment to allow adding multiple component (to allow adding multiple Post).
const Posts = () => {
    const classes = useStyles();
    const posts = useSelector((state) => state.posts);
    console.log(posts); // Inspect the posts.
    return (
        <>
            <h1>Posts</h1>
            <Post />
            <Post />
        </>
    );
}

export default Posts;