import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { Typography } from '@material-ui/core';
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        '& > *': {
            width:'100%',
            margin:theme.spacing(0.5),
            height: theme.spacing(7),
            display:'flex',
            flexDirection:'column',
            alignItems:'center',
            justifyContent:'center',
            [theme.breakpoints.up("sm")]: {
                height: theme.spacing(10),
            },
            [theme.breakpoints.up("lg")]: {
                height: theme.spacing(7),
            },
        },
    },
    bold: {
        fontWeight: 600,
        fontSize:'18px'
    },
    title:{
        fontSize:'18px',
        [theme.breakpoints.up("sm")]: {
            fontSize:'14px',

        },
    }

}));
export default function Box2(props) {
    const classes = useStyles();
    return (
        <div className={classes.root} >
            <Paper variant="outlined" >
                <Typography variant='h6' className={classes.bold}>{props.number}</Typography>
                <Typography variant='h6' className={classes.title} style={{fontWeight:400,}}>{props.title}</Typography>
            </Paper>
        </div>
    );
}
