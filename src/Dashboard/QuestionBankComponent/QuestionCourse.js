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
import Loader from '../../MainComponents/Loader';
import { data } from 'jquery';
import { useParams } from "react-router-dom";


export default function QuestionCourse() {
    const params = useParams();
    const p =[params.id];
    const classes = useStyles();
    const location = useLocation();
    const history = useHistory();
    const [formData, setFormData] = useState({
        formTitle: '',
        ButtonTitle: ''
    })
    const [loader,setLoader] = useState(false)
    const [open, setOpen] = useState(false)
    const [data, setData] = useState()
    const [anchorEl, setAnchorEl] = useState(null);
    const [courseData, setCourseData] = useState('');
    const [courses,setCourses]=useState();
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
            courseCat:p
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
            
            courseName: data.cr_title,
            courseCat:data.cr_categ
           
        })
    }

    async function getCourses()
    {
       
        setLoader(true);
        try{
            const data1= await crud.retrieve('/courseapi/?cr_categ='+params.id+'&&')
            setCourses(data1);
            setLoader(false);
            }
        
        catch(e){
        setLoader(false);
        }
    }
    async function deletecourse(){
        
        await crud.confirm()
        
        await crud.delete('/courseapi/'+ data.cr_id)
        .then((response) => {
            if(response==null){
                getCourses();
            }
        });
    }


    useEffect(() => {
        
        getClearAll();
        getCourses();
    }, [location])
    return (
        <>
            <div className={'container-fluid py-4 '}>
                <div className={'row px-lg-5'}>
                    <div className={'col-12 py-2'}>
                        <h5>Category : <span className='back-tag' onClick={() => {history.push('/question-bank')}}>{location.state?.category}</span></h5>
                        <hr/>
                    </div>
                    <div className={'col-lg-3 col-12'}>
                        <h3 className={classes.title}>Courses({courses?.length})</h3>
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
                    {courses?.length?<>
                    {courses.map((value, index) => (
                        <div key={index} className={'col-xl-3 col-lg-4 col-md-6 col-12  mt-4'}>
                            <div className={clsx('card px-3 pt-2')}>
                                <div onClick={() => {history.push({pathname:'/question-subject/'+value?.cr_id,state:
                                 {category: location.state?.category,course:value?.cr_title}})}} className={'QuestionRedirect'}/>
                                <h5>{value?.cr_title}</h5>
                                
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
                                        
                                        deletecourse();
                                        setAnchorEl(false);
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
                                <h6>{value.topic} </h6>
                            </div>
                        </div>
                    ))}
                    </>:<><h2 className='text-center pt-5'>course is Empty...</h2></>}
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
                            <TextField value={courseData.courseName} onChange={(e)=>{
                                setCourseData({...courseData,courseName:e.target.value})
                            }} name='courseName'  fullWidth variant="outlined" InputProps={{className: 'TextFieldHeight',}}/>   
                        </div>
                    </div>
                </div>
                <DialogActions className={'mx-2'}>
                    <Button className={clsx(classes.Btn,)} variant={'contained'} onClick={async() => {
                    if(formData.ButtonTitle==='Create Course'){
                          await crud.create('/courseapi/',{
                            
                              cr_title:courseData.courseName,
                              cr_categ:courseData.courseCat
                              
                             
                            });
                            console.log("nniii",courseData.courseCat)
                        getCourses();
                        getClearAll();
                     }
                        setOpen(false)
                    if(formData.ButtonTitle==='UPDATE'){
                        await crud.update('/courseapi/'+data.cr_id+'/',{
                                        
                                        cr_title:courseData.courseName,  
                                        cr_categ:courseData.courseCat
                                        
                         });
                        getCourses();
                        }
                    }} color="primary">
                        {formData.ButtonTitle}
                    </Button>
                </DialogActions>
            </Dialog>
            {loader?<Loader/>:<></>}
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