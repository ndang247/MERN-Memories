import React from 'react';
import useStyles from './postStyles';
import { Card, CardActions, CardContent, CardMedia, Button, Typography } from '@material-ui/core';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { deletePost, likePost } from '../../../actions/posts';


const Post = (props) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    
    return (
        <Card className={classes.card}>
            <CardMedia className={classes.media} image={props.post.selectedFile} title={props.post.title} />
            <div className={classes.overlay}>
                <Typography variant="h6">{props.post.creator}</Typography>
                <Typography variant="body2">{moment(props.post.createdAt).fromNow()}</Typography>
            </div>
            <div className={classes.overlay2}>
                <Button 
                    style={{color: 'white'}} 
                    size='small' 
                    onClick={() => props.setCurrentId(props.post._id)}>
                    <MoreHorizIcon fontSize='default' />
                </Button>
            </div>
            <div className={classes.details}>
                <Typography variant='body2' color='textSecondary'>{props.post.tags.map((tag) => `#${tag} `)}</Typography> 
            </div>
            <Typography className={classes.title} variant='h5' gutterBottom>{props.post.title}</Typography>
            <CardContent>
                <Typography variant='body2' color='textSecondary' component='p'>{props.post.message}</Typography>
            </CardContent>
            <CardActions className={classes.cardActions}>
                <Button size='small' color='primary' onClick={() => dispatch(likePost(props.post._id))}>
                    <ThumbUpAltIcon fontSize='small' />
                    &nbsp; Like &nbsp;
                    {props.post.likeCount}
                </Button>
                <Button size='small' color='primary' onClick={() => dispatch(deletePost(props.post._id))}>
                    <DeleteIcon fontSize='small' />
                    &nbsp; Delete
                </Button>
            </CardActions>
        </Card>
    );
}

export default Post;