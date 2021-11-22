import React, {useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Input from "../UI/Input/Input";

const useStyles = makeStyles(theme => ({
    root: {
        marginTop: theme.spacing(2),
        backgroundColor: "white"
    }
}));

const NewsForm = ({onSubmit}) => {
    const classes = useStyles();

    const [state, setState] = useState({
        title: "",
        description: "",
        image: null,
    });

    const submitFormHandler = e => {
        e.preventDefault();

        const formData = new FormData();

        Object.keys(state).forEach(key => {
            formData.append(key, state[key]);
        });

        onSubmit(formData);
    };

    const inputChangeHandler = e => {
        const name = e.target.name;
        const value = e.target.value;
        setState(prevState => {
            return {...prevState, [name]: value};
        });
    };

    const fileChangeHandler = e => {
        const name = e.target.name;
        const file = e.target.files[0];
        setState(prev => {
            return {...prev, [name]: file}
        });
    }

    return (
        <Grid
            container
            direction="column"
            spacing={2}
            component='form'
            className={classes.root}
            autoComplete='off'
            onSubmit={submitFormHandler}>
            <Grid item xs>
                <TextField
                    label="Title"
                    value={state.title}
                    onChange={inputChangeHandler}
                    name="title"
                    variant='outlined'
                    fullWidth
                />
            </Grid>
            <Grid item xs>
                <TextField
                    multiline
                    rows={3}
                    type='number'
                    label="Description"
                    value={state.description}
                    onChange={inputChangeHandler}
                    name="description"
                    variant='outlined'
                    fullWidth
                />
            </Grid>
            <Grid item xs>
                <Input
                    name="image"
                    label='Image'
                    onChange={fileChangeHandler}
                    />
            </Grid>
            <Grid item xs>
                <Button type="submit" color="primary" disabled={!state.description || !state.title} variant="contained">Create</Button>
            </Grid>
        </Grid>
    );
};

export default NewsForm;
