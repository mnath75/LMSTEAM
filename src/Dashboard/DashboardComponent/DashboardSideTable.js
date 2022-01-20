import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import Box from "./Box";
import Box2 from "./Box2";
import clsx from 'clsx'
const useStyles = makeStyles((theme) => ({
    paper: {
        border: "1px solid lightgrey",
        borderRadius:'5px',
        marginTop:theme.spacing(1),
    },
}));
export default function SideTable() {
    const classes = useStyles();
    return (
        <>
            <Grid container>
                <Grid item xs={12}>
                    <Box number={15} title="institutions" />
                </Grid>
            </Grid>


            <Grid container className={clsx(classes.paper,)}>
                <Grid item xs={6}>
                    <Box2 number={15} title="institutions" />
                </Grid>
                <Grid item xs={6}>
                    <Box2 number={15} title="institutions" />
                </Grid>
            </Grid>


            <Grid container className={classes.paper}>
                <Grid item xs={12}>
                    <Box number={15} title="institutions" />
                </Grid>

                <Grid item xs={6}>
                    <Box2 number={15} title="institutions" />
                </Grid>
                <Grid item xs={6}>
                    <Box2 number={15} title="institutions" />
                </Grid>

                <Grid item xs={6}>
                    <Box2 number={15} title="institutions" />
                </Grid>
                <Grid item xs={6}>
                    <Box2 number={15} title="institutions" />
                </Grid>

                <Grid item xs={6}>
                    <Box2 number={15} title="institutions" />
                </Grid>
                <Grid item xs={6}>
                    <Box2 number={15} title="institutions" />
                </Grid>

                <Grid item xs={6}>
                    <Box2 number={15} title="institutions" />
                </Grid>
                <Grid item xs={6}>
                    <Box2 number={15} title="institutions" />
                </Grid>
            </Grid>


            <Grid container className={classes.paper}>
                <Grid item xs={6}>
                    <Box2 number={15} title="institutions" />
                </Grid>
                <Grid item xs={6}>
                    <Box2 number={15} title="institutions" />
                </Grid>

                <Grid item xs={12}>
                    <Box number={15} title="institutions" />
                </Grid>

                <Grid item xs={12}>
                    <Box number={15} number={2000} title="institutions" />
                </Grid>
            </Grid>
        </>
    );
}
