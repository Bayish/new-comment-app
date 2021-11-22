import React, {useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles(theme => ({
    root: {
        marginTop: theme.spacing(2)
    },
}));

const CommentsForm = ({onSubmit, id}) => {
    const classes = useStyles();

    const [state, setState] = useState({
        author: "",
        comment: ""
    });


    const inputChangeHandler = e => {
        const name = e.target.name;
        const value = e.target.value;
        setState(prevState => {
            return {...prevState, [name]: value};
        });
    };

    const onSave = e => {
        e.preventDefault();
        onSubmit({
            ...state,
            posts_id: id
        });
        setState({
            author: "",
            comment: ""}
        )
    };

    return (
        <Grid
            container
            direction="column"
            spacing={2}
            component='form'
            className={classes.root}
            autoComplete='off'
            onSubmit={onSave}>
            <Grid item xs>
                <TextField
                    label="Author"
                    value={state.author}
                    onChange={inputChangeHandler}
                    name="author"
                    variant='outlined'
                    fullWidth
                />
            </Grid>
            <Grid item xs>
                <TextField
                    multiline
                    rows={3}
                    label="Comment"
                    value={state.comment}
                    onChange={inputChangeHandler}
                    name="comment"
                    variant='outlined'
                    fullWidth
                />
            </Grid>
            <Grid item xs>
                <Button type="submit" color="primary" variant="contained">Create</Button>
            </Grid>
        </Grid>
    );
};

export default CommentsForm;
