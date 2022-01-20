import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { Typography } from '@material-ui/core';
import clsx from 'clsx'


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        '& > *': {
            margin:theme.spacing(0.5),
            width:'100%',
            height: theme.spacing(9),
            display:'flex',
            flexDirection:'column',
            alignItems:'center',
            justifyContent:'center',
            border:'1px solid #ccc'
        },
    },
    bold: {
        fontWeight: 800,
        fontSize:'20px'
    }
}));

export default function Box(props) {

    const classes = useStyles();

    return (
        <div className={classes.root} >
            <Paper variant="outlined "  >
                <Typography variant='h6' className={classes.bold}>{props.number}</Typography>
                <Typography variant='h6' className={classes.bold}>{props.title}</Typography>
            </Paper>
        </div>
    );
}
