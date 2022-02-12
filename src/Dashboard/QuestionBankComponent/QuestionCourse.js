import React, {useEffect, useState} from 'react'
import {makeStyles,TextField,InputAdornment,Button,IconButton,Menu,MenuItem,Dialog,DialogActions,DialogTitle} from '@material-ui/core';
import {useHistory} from 'react-router-dom'
import {Search ,Add,MoreVert,Edit,Delete,Clear,ArrowBack} from '@material-ui/icons';
import {Themes} from "../../Theme/theme";
import clsx from "clsx";
import {crud} from "../../services/crud";
import Slide from '@material-ui/core/Slide';
import './QuestionCss.css';
import { useLocation } from "react-router-dom";
const courses = [
    {id: 1, title: 'IIT Advanced', topic: 45, subtitle: 'Maths'},
    {id: 2, title: 'Jee Mains', topic: 405, subtitle: 'Maths'},
    {id: 3, title: 'NEET', topic: 125, subtitle: 'Bio'},
    {id: 4, title: 'SSC', topic: 35, subtitle: 'Gk'},
]
export default function QuestionCourse() {
    const classes = useStyles();
    const location = useLocation();
    const history = useHistory();
    const [formData, setFormData] = useState({
        formTitle: '',
        ButtonTitle: ''
    })
    const [open, setOpen] = useState(false)
    const [data, setData] = useState()
    const [anchorEl, setAnchorEl] = useState(null);
    const [courseData, setCourseData] = useState('');
    function GetFormManage() {
        setOpen(true)
        setFormData({
            formTitle: 'Create New Course',
            ButtonTitle: 'Create Course',
        });
    }
    function getClearAll() {
        setCourseData({
            courseName: '',
        });
    }
    //Edit
    function getEdit() {
        setOpen(true)
        setFormData({
            formTitle: 'Edit Course',
            ButtonTitle: 'UPDATE'
        });
        setCourseData({
            courseName: data.title,
        })
    }
    useEffect(() => {
        getClearAll();
    }, [location]);
    return (
        <>
            <div className={'container-fluid py-4 '}>
                <div className={'row px-lg-5'}>
                    <div className={'col-12 py-2'}>
                        <h5>Category : <span className='back-tag' onClick={() => {history.push('/question-bank')}}>{location.state?.category}</span></h5>
                        <hr/>
                    </div>
                    <div className={'col-lg-3 col-12'}>
                        <h3 className={classes.title}>Courses(4)</h3>
                    </div>
                    <div className={'col-lg-4 col-12 my-3 mt-lg-0'}>
                        <TextField fullWidth placeholder={'search here...'} InputProps={{
                            startAdornment: (<InputAdornment position="start">
                                <Search/></InputAdornment>),
                        }}/>
                    </div>
                    <div className={'col-lg-5 col-12 d-flex justify-content-lg-end my-3 mt-lg-0'}>
                        <Button startIcon={<ArrowBack/>} className={'mx-lg-3 mx-1'} variant="contained"
                                onClick={() => {history.push('/question-bank')}}>Back</Button>
                        <Button onClick={() => {
                            GetFormManage()
                        }} variant="contained" className={'mx-lg-3 mx-1'} startIcon={<Add/>}
                                style={{background: Themes.MainHeaderColor, color: Themes.WHITE}}>
                            Create Courses
                        </Button>
                    </div>
                    <div className={'divider'}/>
                    {courses.map((value, index) => (
                        <div key={index} className={'col-xl-3 col-lg-4 col-md-6 col-12  mt-4'}>
                            <div className={clsx('card px-3 pt-2')}>
                                <div onClick={() => {history.push({pathname:'/question-subject',state: {category: location.state?.category,course:value.title}})}} className={'QuestionRedirect'}/>
                                <h5>{value.title}</h5>
                                <p>{value.subtitle}</p>
                                <IconButton onClick={(event) => {
                                    setAnchorEl(event.currentTarget);
                                    setData(value);
                                }} className={classes.menu}><MoreVert/></IconButton>
                                <Menu key={index}
                                      id="simple-menu"
                                      anchorEl={anchorEl}
                                      open={anchorEl}
                                      onClose={() => {
                                          setAnchorEl(null)
                                      }}>
                                    <MenuItem className={'d-flex justify-content-between text-primary'} onClick={() => {
                                        getEdit();
                                        setAnchorEl(false)
                                    }}>Edit<Edit className={classes.menuIcon}/></MenuItem>
                                    <MenuItem className={'d-flex justify-content-between text-danger'} onClick={() => {
                                        setAnchorEl(false);
                                        crud.confirm()
                                    }}>
                                        Delete <Delete className={classes.menuIcon}/></MenuItem>
                                    <MenuItem className={'text-success'} onClick={() => {
                                        setAnchorEl(false);
                                    }}>Enabled</MenuItem>
                                    <MenuItem onClick={() => {
                                        setAnchorEl(false);
                                        crud.confirm()
                                    }}>Disabled</MenuItem>
                                </Menu>
                                <h6>{value.topic} Topics</h6>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <Dialog maxWidth={'lg'} open={open} TransitionComponent={Transition} keepMounted>
                <DialogTitle id="alert-dialog-slide-title">{formData.formTitle}
                    <hr/>
                </DialogTitle>
                <IconButton onClick={() => {
                    setOpen(false);
                    getClearAll()
                }} className={classes.CloseBtn}><Clear/></IconButton>
                <div className={clsx('container-fluid mx-lg-4', classes.FormWidth)}>
                    <div className={'row pl-0 pr-0 mt-2'}>
                        <div className={clsx('col-lg-3 col-12')}>
                            <h6 className={classes.InputTitle}>Course Name</h6>
                        </div>
                        <div className={'col-lg-9 col-12'}>
                            <TextField value={courseData.courseName} fullWidth variant="outlined"
                                       InputProps={{className: 'TextFieldHeight',}}/>
                        </div>
                    </div>
                </div>
                <DialogActions className={'mx-2'}>
                    <Button className={clsx(classes.Btn,)} variant={'contained'} onClick={() => {
                        setOpen(false)
                    }} color="primary">
                        {formData.ButtonTitle}
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}
const useStyles = makeStyles((theme) => ({
    title: {
        marginTop: '-16px',
        [theme.breakpoints.up('sm')]: {
            marginTop: '0px',

        },
    },
    menu: {
        position: 'absolute',
        top: 0,
        right: 0
    },
    menuIcon: {
        marginLeft: 10
    },
    CloseBtn: {
        position: 'absolute',
        top: 5,
        right: 10
    },
    FormWidth: {
        width: 300,
        minHeight: 100,
        [theme.breakpoints.up('sm')]: {
            width: 600,
        },
    },
    InputTitle: {
        paddingTop: 5
    },
    Btn: {
        background: Themes.MainHeaderColor,
        color: Themes.WHITE
    },
}));
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});