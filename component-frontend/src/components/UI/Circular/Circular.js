import React from 'react';
import {CircularProgress, Grid} from "@material-ui/core";

const Circular = () => {
    return (
        <Grid container justifyContent="center" alignItems="center">
            <Grid item>
                <CircularProgress/>
            </Grid>
        </Grid>
    );
};

export default Circular;