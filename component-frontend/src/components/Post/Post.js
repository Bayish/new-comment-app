import React from 'react';
import {Card, CardActions, CardContent, CardMedia, Button, Typography} from '@material-ui/core';
import useStyles from './styles';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import imageNotAvailable from '../../assets/images/not_available.png';
import {Link} from "react-router-dom";
import {useDispatch} from "react-redux";
import {removePost} from "../../store/actions/newsActions";

const Post = ({post}) => {
    const classes = useStyles();
    const dispatch = useDispatch();

    let cardImage = imageNotAvailable;

    if(post.image){
        cardImage = 'http://localhost:8000/uploads/' + post.image;
    }

    const deleteSingleNewsHandler = id => {
        dispatch(removePost(id));
    };

    return (
        <Card className={classes.card}>
            <CardMedia className={classes.media} image={cardImage}/>
            <div className={classes.overlay}>
                <Typography variant="h6">
                    {post.title}
                </Typography>
                <Typography variant="body2">
                    {post.datetime}
                </Typography>
            </div>
            <CardContent>
                <Typography  variant="h5" gutterBottom>{post.title}</Typography>
            </CardContent>
            <CardActions className={classes.cardActions}>
                <Button size="small" color="primary" onClick={() => deleteSingleNewsHandler(post.id)}>
                    Delete
                </Button>
                <Button size="small" component={Link} to={'/news/' + post.id}>
                    <ArrowForwardIosIcon/>
                </Button>
            </CardActions>
        </Card>
    );
};

export default Post;