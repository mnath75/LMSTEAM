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
            height: theme.spacing(8),
            display:'flex',
            flexDirection:'column',
            alignItems:'center',
            justifyContent:'center'
        },
    },
    bold: {
        fontWeight: 800,
        fontSize:'20px'
    },
    title:{
        fontSize:'20px',
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
