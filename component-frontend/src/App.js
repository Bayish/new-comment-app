import React from 'react';
import {AppBar, Typography} from '@material-ui/core';
import memories from './assets/images/news.jpeg';
import useStyles from './styles';
import Posts from "./containers/Posts/Posts";
import NewPost from './containers/NewPost/NewPost';
import {Route, Switch} from "react-router-dom";
import Post from "./containers/Post/Post";

const App = () => {
    const classes = useStyles();
    return (
        <>
            <AppBar className={classes.appBar} position="static" color="inherit">
                <Typography className={classes.heading} variant="h2" align="center">News</Typography>
                <img className={classes.image} src={memories} alt="memories" height="60"/>
            </AppBar>
            <Switch>
                <Route path="/" exact component={Posts}/>
                <Route path="/form/new" component={NewPost}/>
                <Route path="/news/:id" component={Post}/>
            </Switch>
        </>
    );
};

export default App;