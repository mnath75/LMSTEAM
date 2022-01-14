import React from 'react';
import clsx from 'clsx';
import {Link} from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DehazeIcon from '@material-ui/icons/Dehaze';
import WebLogo from '../Images/logo.png';
const useStyles = makeStyles({
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
    Header:{
        height:'70px',
        display:'flex',
        justifyContent:'space-between',
        alignItems:'center',
    },
    Logo:{
        width:'200px',
        height:'80%',
    }
});

export default function Drawer(props) {
    const classes = useStyles();
    const [state, setState] = React.useState({
        left: false,
    });

    const toggleDrawer = (anchor, open) => (event) => {
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setState({ ...state, [anchor]: open });
    };

    const list = (anchor) => (
        <div className={clsx(classes.list, {
                [classes.fullList]: anchor === 'top' || anchor === 'bottom',
            })}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <List style={{background:props.background}}>
                    <ListItem button >
                        <img src={WebLogo} className={clsx(classes.Logo,'img-fluid')}/>
                    </ListItem>
            </List>
            <Divider />
            {props.component.map((nav => (
                <>
                    <ListItem button key={nav.title} to={nav.page} component={Link} >
                        <ListItemIcon>{nav.icon}</ListItemIcon>
                        <ListItemText primary={nav.title}/>
                    </ListItem>
                </>
            )))}
        </div>
    );

    return (
        <div>
            {['left'].map((anchor) => (
                <React.Fragment key={anchor}>
                    <div className={clsx('px-2 ',classes.Header)} style={{background:props.background}}>
                        <img src={WebLogo} className={clsx(classes.Logo,'img-fluid')}/>
                    <Button className={'text-light'} onClick={toggleDrawer(anchor, true)}><DehazeIcon/></Button>
                    </div>
                    <SwipeableDrawer
                        anchor={anchor}
                        open={state[anchor]}
                        onClose={toggleDrawer(anchor, false)}
                        onOpen={toggleDrawer(anchor, true)}>
                        {list(anchor)}
                    </SwipeableDrawer>
                </React.Fragment>
            ))}
        </div>
    );
}
