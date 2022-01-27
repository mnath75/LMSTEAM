import React,{useState} from 'react';
import {Drawer,Hidden,IconButton,List,ListItem,ListItemIcon,ListItemText} from '@material-ui/core';
import AppsIcon from '@material-ui/icons/Apps';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import {CoursesSideNav} from "../../MainComponents/SideNav";
import QuestionCreateCourse from "../QuestionBankComponent/QuestionCreateCourses";
const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    drawer: {
        [theme.breakpoints.up('sm')]: {
            width: drawerWidth,
            flexShrink: 0,
        },
    },
    appBar: {
        [theme.breakpoints.up('sm')]: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: drawerWidth,
        },
    },
    menuButton: {
     position:'absolute',
        right:0,
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        width: drawerWidth,
        marginTop: 70
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
}));
const courses =[
    {id:1,title:'IIT Advanced',topic:45},
    {id:2,title:'JEE Mains',topic:405},
    {id:3,title:'NEET',topic:125},
    {id:4,title:'SSC',topic:35},
    {id:5,title:'Banking',topic:85},
]
const Subjects =[
    {id:1,title:'Maths',topic:45},
    {id:2,title:'English',topic:405},
    {id:3,title:'Science',topic:125},
    {id:4,title:'Physics',topic:35},
]
const Topics =[
    {id:1,title:'Kinetic',topic:45},
    {id:2,title:'Motion',topic:405},
    {id:3,title:'Electro Magnetic Induction',topic:125},
    {id:4,title:'Magnetic Field',topic:35},
]
function QuestionBank(props) {
    const {window} = props;
    const classes = useStyles();
    const theme = useTheme();
    const [mobileOpen, setMobileOpen] = useState(false);
    const [data,setData] = useState(courses);
    const [ComponentTiltle,setComponentTitle] = useState('Courses')
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawer = (
        <div>
            <div className={classes.toolbar}/>
            <List>
                {CoursesSideNav.map((value,index) =>(
                    <ListItem  button key={index} onClick={()=>{
                        setComponentTitle(value.title);
                        if(value.title==='Courses'){setData(courses)}
                        else if(value.title==='Subject'){setData(Subjects)}
                        else if(value.title==='Topic'){setData(Topics)}
                    }}>
                        <ListItemIcon>{value.icon}</ListItemIcon>
                        <ListItemText primary={value.title}/>
                    </ListItem>
                ))}
            </List>
        </div>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <div className={classes.root}>
            <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                className={classes.menuButton}
            >
                <AppsIcon/>
            </IconButton>

            <nav className={classes.drawer} aria-label="mailbox folders">
                <Hidden smUp implementation="css">
                    <Drawer
                        container={container}
                        variant="temporary"
                        anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        ModalProps={{
                            keepMounted: true
                        }}
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
                <Hidden xsDown implementation="css">
                    <Drawer
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        variant="permanent"
                        open
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
            </nav>
            <main className={classes.content}>
                <QuestionCreateCourse data={data} Title={ComponentTiltle}/>
            </main>
        </div>
    );
}
export default QuestionBank;
