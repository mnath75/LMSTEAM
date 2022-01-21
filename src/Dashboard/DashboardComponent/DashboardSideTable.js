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
                    <Box number={51} title="institutions" />
                </Grid>
            </Grid>
            <Grid container className={clsx(classes.paper,)}>
                <Grid item xs={6}>
                    <Box2 number={50} title="Educators" />
                </Grid>
                <Grid item xs={6}>
                    <Box2 number={15} title="parents" />
                </Grid>
            </Grid>
            <Grid container className={classes.paper}>
                <Grid item xs={12}>
                    <Box number={105} title="Courses" />
                </Grid>

                <Grid item xs={6}>
                    <Box2 number={205} title="Batches" />
                </Grid>
                <Grid item xs={6}>
                    <Box2 number={405} title="Subjects" />
                </Grid>
                <Grid item xs={6}>
                    <Box2 number={140} title="test" />
                </Grid>
                <Grid item xs={6}>
                    <Box2 number={705} title="Topics" />
                </Grid>
                <Grid item xs={6}>
                    <Box2 number={500} title="Questions" />
                </Grid>
                <Grid item xs={6}>
                    <Box2 number={150} title="Videos" />
                </Grid>

                <Grid item xs={6}>
                    <Box2 number={154} title="Assignments" />
                </Grid>
                <Grid item xs={6}>
                    <Box2 number={1500} title="Study Material" />
                </Grid>
            </Grid>
            <Grid container className={classes.paper}>
                <Grid item xs={6}>
                    <Box2 number={15} title="test Conducted" />
                </Grid>
                <Grid item xs={6}>
                    <Box2 number={154} title="Class Conduct" />
                </Grid>
                <Grid item xs={12}>
                    <Box number={2005} title="Watch time (hours)" />
                </Grid>
                <Grid item xs={12}>
                    <Box number={15} number={2000} title="Assignments Submmited" />
                </Grid>
            </Grid>
        </>
    );
}
