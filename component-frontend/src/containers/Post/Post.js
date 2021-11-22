import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Box, Grid, Button, CardMedia, Paper, Typography} from "@material-ui/core";
import {getNewsItem} from '../../store/actions/newsActions';
import imageNotAvailable from "../../assets/images/not_available.png";
import {makeStyles} from "@material-ui/core/styles";
import {deleteComments, getComments} from "../../store/actions/commentActions";
import {createComments} from "../../store/actions/commentActions";
import CommentsForm from '../../components/CommentsForm/CommentsForm';

const useStyles = makeStyles(theme => ({
    media: {
        height: 0,
        paddingTop: '56.25%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        backgroundBlendMode: 'darken',
    },
}));


const Post = ({match}) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const {newsItem} = useSelector(state => state.news)
    const {comments} = useSelector(state => state.comments)

    useEffect(() => {
        dispatch(getNewsItem(match.params.id));
        dispatch(getComments(match.params.id))
    }, [dispatch, match.params.id])

    const createComment = (com) => {
        dispatch(createComments(com))
    };

    const onRemoveHandler = id => {
        dispatch(deleteComments(id))
    };
    return newsItem && (
        <Paper component={Box} p={4}>
            <Paper component={Box} p={3}>
                <Grid item>
                    <CardMedia className={classes.media}
                               image={newsItem.image ? 'http://localhost:8000/uploads/' + newsItem.image : imageNotAvailable}/>
                    <Grid container direction="column" spacing={3}>
                        <Grid item>
                            <Grid container justifyContent="space-between">
                                <Grid item>
                                    <Typography variant='h4'>
                                        Title: {newsItem.title}
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <Typography variant='subtitle2'>
                                        {newsItem.datetime}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item>
                            <Typography variant='body1'>
                                Info: {newsItem.description}
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>
            <Paper component={Box} p={3}>
                <Grid item>
                    <Typography variant="h5">Comment</Typography>
                </Grid>
                <Grid container direction="column" spacing={4}>
                    {comments && comments.map(c => (
                        <Grid item key={c.id}>
                            <Paper component={Box} p={3}>
                                <Grid container flexdirection="row" justifyContent="space-between"
                                      alignItems="center">
                                    <Typography variant='subtitle1'>
                                        {c.author}
                                    </Typography>
                                    <Typography variant='subtitle2'>
                                        {c.comment}
                                    </Typography>
                                    <Button size="small" color="primary" onClick={() => onRemoveHandler(c.id)}>
                                        Delete
                                    </Button>
                                </Grid>
                            </Paper>
                        </Grid>
                    ))}
                </Grid>
            </Paper>
            <CommentsForm onSubmit={createComment} id={match.params.id}/>
        </Paper>
    );
};

export default Post;