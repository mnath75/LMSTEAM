import React,{useState} from 'react';
import {Drawer,Hidden,IconButton,List,ListItem,ListItemIcon,ListItemText} from '@material-ui/core';
import AppsIcon from '@material-ui/icons/Apps';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import {CoursesSideNav} from "../../MainComponents/SideNav";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import Collapse from "@material-ui/core/Collapse";
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import SystemUpdateAltIcon from '@material-ui/icons/SystemUpdateAlt';
import OpenInBrowserIcon from '@material-ui/icons/OpenInBrowser';
//Question-Pages
import QuestionCreateCourse from "../QuestionBankComponent/QuestionCreateCourses";
import SingleMultiChoice from "../QuestionBankComponent/SingleMultiChoice";
import ComprehensionPage from "../QuestionBankComponent/ComprehensionPage";
import Subjective from "../QuestionBankComponent/Subjective";
import True_False from "../QuestionBankComponent/True_False";
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
    toolbar1: {
        height:40
    },
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
    {id:1,title:'IIT Advanced',topic:45,subtitle:'Maths,Physics, Chemistry'},
    {id:2,title:'JEE Mains',topic:405,subtitle:'Maths,Physics, Chemistry'},
    {id:3,title:'NEET',topic:125,subtitle:'Maths,Physics, Chemistry'},
    {id:4,title:'SSC',topic:35,subtitle:'Maths,Physics, Chemistry'},
    {id:5,title:'Banking',topic:85,subtitle:'Maths,Physics, Chemistry'},
]
const Subjects =[
    {id:1,title:'Maths',topic:45,subtitle:'IIT Advanced'},
    {id:2,title:'English',topic:405,subtitle:'SSC'},
    {id:3,title:'Science',topic:125,subtitle:'Banking'},
    {id:4,title:'Physics',topic:35,subtitle:'NEET'},
]
const Topics =[
    {id:1,title:'Kinetic',topic:45,subtitle:'Physics'},
    {id:2,title:'Motion',topic:405,subtitle:'Physics'},
    {id:3,title:'Electro Magnetic Induction',topic:125,subtitle:'Physics'},
    {id:4,title:'Magnetic Field',topic:35,subtitle:'Physics'},
]
function QuestionBank(props) {
    const {window} = props;
    const classes = useStyles();
    const theme = useTheme();
    const [mobileOpen, setMobileOpen] = useState(false);
    const [data,setData] = useState(courses);
    const [ComponentTiltle,setComponentTitle] = useState('Courses');
    const [questionLink,setQuestionLinks] = useState(false);
    const [questionPage,setQuestionPage] = useState('Courses');
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawer = (
        <div style={{overFlow:'scroll'}}>
            <div className={classes.toolbar1}/>
            <List>
                {CoursesSideNav.map((value,index) =>(
                    <ListItem  button key={index} onClick={()=>{
                        setComponentTitle(value.title);
                        setQuestionPage('Courses');
                        if(value.title==='Courses'){setData(courses)}
                        else if(value.title==='Subject'){setData(Subjects)}
                        else if(value.title==='Topic'){setData(Topics)}
                    }}>
                            <ListItemIcon>{value.icon}</ListItemIcon>
                            <ListItemText primary={value.title}/>
                    </ListItem>
                ))}
                <ListItem button onClick={() => {setQuestionLinks(!questionLink);}}>
                    <ListItemIcon>
                        <HelpOutlineIcon />
                    </ListItemIcon>
                    <ListItemText primary="Create Questions" />
                    {questionLink ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={questionLink} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <ListItem button onClick={()=>{setQuestionPage('Single_Multi Choice')}}><ListItemText primary="Single_Multi Choice" /></ListItem>
                        <ListItem button onClick={()=>{setQuestionPage('comprehension')}}><ListItemText primary="Comprehension Type" /></ListItem>
                        <ListItem button onClick={()=>{setQuestionPage('subjective')}}><ListItemText primary="Subjective" /></ListItem>
                        <ListItem button onClick={()=>{setQuestionPage('true_false')}}><ListItemText primary="True / False" /></ListItem>
                        <ListItem button ><ListItemText primary="Fill in the blanks" /></ListItem>
                        <ListItem button ><ListItemText primary="Integer Type" /></ListItem>
                        <ListItem button ><ListItemText primary="Match Matrix_Following" /></ListItem>
                        <ListItem button ><ListItemText primary="Re_arrange Type" /></ListItem>
                        <ListItem button ><ListItemText primary="Multi Marking" /></ListItem>
                        <ListItem button ><ListItemText primary="Typing Paragraph" /></ListItem>
                    </List>
                </Collapse>
                <ListItem  button>
                    <ListItemIcon><SystemUpdateAltIcon/></ListItemIcon>
                    <ListItemText primary='Import Questions'/>
                </ListItem>
                <ListItem  button>
                    <ListItemIcon><OpenInBrowserIcon/></ListItemIcon>
                    <ListItemText primary='Export Questions'/>
                </ListItem>
            </List>
            <div className={classes.toolbar}/>

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
                {questionPage==='Courses'?<QuestionCreateCourse data={data} Title={ComponentTiltle}/>:<></>}
                {questionPage==='Single_Multi Choice'? <SingleMultiChoice/>:<></>}
                {questionPage==='comprehension'? <ComprehensionPage/>:<></>}
                {questionPage==='subjective'? <Subjective/>:<></>}
                {questionPage==='true_false'? <True_False/>:<></>}
            </main>
        </div>
    );
}
export default QuestionBank;
