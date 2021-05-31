import React from 'react';
import useStyles from './postsStyles';
import { useSelector } from 'react-redux';
// Posts use the Post component.
import Post from './post/Post';
import { CircularProgress, Grid } from '@material-ui/core';

// Add a react fragment to allow adding multiple component (to allow adding multiple Post).
const Posts = () => {
    const classes = useStyles();
    const posts = useSelector((state) => state.posts);
    console.log(posts); // Inspect the posts.

    return (
        !posts.length ? <CircularProgress /> : (
            <Grid className={classes.mainContainer} container alignItems="stretch" spacing={3}>
                {
                    posts.map((post) => (
                        <Grid key={post._id} item xs={12} sm={6}>
                            <Post post={post} />
                        </Grid>
                    ))
                }
            </Grid>
        )
    );
}

export default Posts;