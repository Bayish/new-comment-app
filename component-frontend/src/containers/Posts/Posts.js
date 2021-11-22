import React, {useEffect} from 'react';
import useStyles from './styles';
import {Grid, Button} from '@material-ui/core';
import Post from '../../components/Post/Post';
import {useSelector, useDispatch} from "react-redux";
import {getNews} from "../../store/actions/newsActions";
import {Link} from "react-router-dom";
import Circular from "../../components/UI/Circular/Circular";

const Posts = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const {news, loading} = useSelector(state => state.news);

    useEffect(() => {
        dispatch(getNews());
    }, [dispatch]);

    return (
            <Grid container item xs={12} sm={12} spacing={3}>
                <Grid item>
                    <Button colot='primary' component={Link} to='/form/new'>Add</Button>
                </Grid>
                <Grid className={classes.mainContainer} container alignItems="stretch" sapcing={3} >
                    {loading?  <Circular/> : news.map(post => (
                        <Grid item key={post.id} xs={12} sm={6}><Post post={post}/>
                        </Grid>
                    ))}
                </Grid>
            </Grid>
    );
};

export default Posts;