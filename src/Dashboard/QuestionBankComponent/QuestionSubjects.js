import React, {useEffect, useState} from 'react'
import {makeStyles,TextField,InputAdornment,Button,IconButton,Menu,MenuItem,Dialog,DialogActions,DialogTitle} from '@material-ui/core';
import {useHistory} from 'react-router-dom'
import SearchIcon from '@material-ui/icons/Search';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import AddIcon from '@material-ui/icons/Add';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import ClearIcon from '@material-ui/icons/Clear';
import {Themes} from "../../Theme/theme";
import clsx from "clsx";
import {crud} from "../../services/crud";
import Slide from '@material-ui/core/Slide';
import './QuestionCss.css';
import { useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";
import Loader from '../../MainComponents/Loader';

export default function QuestionSubject() {
    const params = useParams();
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
            formTitle: 'Create New Subject',
            ButtonTitle: 'Create Subject',
        });
    }
    function getClearAll() {
        setCourseData({
            
            subjectName: '',
            subjectSlug:'',
            subjectCat:'',
        });
    }
    //Edit
    function getEdit() {
        setOpen(true)
        setFormData({
            formTitle: 'Edit Subject',
            ButtonTitle: 'UPDATE'
        });
        setCourseData({
            subjectName: data.sub_title,
            subjectSlug:data.sub_slug,
            subjectCat:data.sub_course
        })
    }
    async function getSubject()
    {
       
        setLoader(true);
        try{
            const data1= await crud.retrieve('/subjectapi/?sub_course='+params.id+'&&')
            setCourses(data1);
            setLoader(false);
            }
        
        catch(e){
        setLoader(false);
        }
    }
    async function deletesubject(){
        
        await crud.confirm()
        
        await crud.delete('/subjectapi/'+ data.sub_id)
        .then((response) => {
            if(response==null){
                getSubject();
            }
        });
    }
    useEffect(() => {
        getSubject();
        getClearAll();
    }, [location]);
    return (
        <>
            <div className={'container-fluid py-4 '}>
                <div className={'row px-lg-5'}>
                    <div className={'col-12 py-2'}>
                    <h5>Category : <span className='back-tag' onClick={() => {history.push('/question-bank')}}>{location.state?.category}</span>/
                    <span className='back-tag' onClick={() => {history.push({pathname: '/question-course',
                              state: {category:location.state?.category,course:location.state?.course}})}}>{location.state?.course}</span>
                    </h5>
                    <hr/>
                    </div>
                    <div className={'col-lg-3 col-12'}>
                        <h3 className={classes.title}>Subject({courses?.length})</h3>
                    </div>
                    <div className={'col-lg-4 col-12 my-3 mt-lg-0'}>
                        <TextField fullWidth placeholder={'search here...'} InputProps={{
                            startAdornment: (<InputAdornment position="start">
                                <SearchIcon/></InputAdornment>),
                        }}/>
                    </div>
                    <div className={'col-lg-5 col-12 d-flex justify-content-lg-end my-3 mt-lg-0'}>
                        <Button startIcon={<ArrowBackIcon/>} className={'mx-lg-3 mx-1'} variant="contained"
                              onClick={()=>{history.push({pathname: '/question-course',
                              state: {category:location.state?.category,course:location.state?.course}})}}>Back</Button>
                        <Button onClick={() => {
                            GetFormManage()
                        }} variant="contained" className={'mx-lg-3 mx-1'} startIcon={<AddIcon/>}
                                style={{background: Themes.MainHeaderColor, color: Themes.WHITE}}>
                            Create Subjects
                        </Button>
                    </div>
                    <div className={'divider'}/>
                    {courses?.length? <>
                    {courses.map((value, index) => (
                        <div key={index} className={'col-xl-3 col-lg-4 col-md-6 col-12  mt-4'}>
                            <div className={clsx('card px-3 pt-2')}>
                                <div onClick={() => {history.push({pathname:'/question-topic/'+value?.sub_id,state: {category:location.state?.category,course:location.state?.course,subject:value.title}})}} className={'QuestionRedirect'}/>
                                <h5>{value?.sub_title}</h5>
                                <p>{value?.sub_slug}</p>
                                <IconButton onClick={(event) => {
                                    setAnchorEl(event.currentTarget);
                                    setData(value);
                                }} className={classes.menu}><MoreVertIcon/></IconButton>
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
                                    }}>Edit<EditIcon className={classes.menuIcon}/></MenuItem>
                                    <MenuItem className={'d-flex justify-content-between text-danger'} onClick={() => {
                                        deletesubject();
                                        setAnchorEl(false);
                                        crud.confirm()
                                    }}>
                                        Delete <DeleteIcon className={classes.menuIcon}/></MenuItem>
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
                    </>:<><h2 className='text-center pt-5'>topic is Empty...</h2></>}
                </div>
            </div>
            <Dialog maxWidth={'lg'} open={open} TransitionComponent={Transition} keepMounted>
                <DialogTitle id="alert-dialog-slide-title">{formData.formTitle}
                    <hr/>
                </DialogTitle>
                <IconButton onClick={() => {
                    setOpen(false);
                    getClearAll()
                }} className={classes.CloseBtn}><ClearIcon/></IconButton>
                <div className={clsx('container-fluid mx-lg-4', classes.FormWidth)}>
                    <div className={'row pl-0 pr-0 mt-2'}>
                        <div className={clsx('col-lg-3 col-12')}>
                            <h6 className={classes.InputTitle}>Subject Name</h6>
                        </div>
                        <div className={'col-lg-9 col-12'}>
                            <TextField value={courseData.courseName} fullWidth variant="outlined"
                                       InputProps={{className: 'TextFieldHeight',}}/>
                        </div>
                    </div>
                </div>
                <DialogActions className={'mx-2'}>
                    <Button className={clsx(classes.Btn,)} variant={'contained'} onClick={async() => {
                    if(formData.ButtonTitle==='Create Subject'){
                          await crud.create('/subjectapi/',{
                              sub_title:courseData.courseName,
                              sub_slug:courseData.courseSlug,
                              sub_course:params.id
                            });
                        getSubject();
                        getClearAll();
                     }
                        setOpen(false)
                    if(formData.ButtonTitle==='UPDATE'){
                        await crud.update('/subjectapi/'+data.sub_id+'/',{
                                        sub_title:courseData.subjectName,  
                                        sub_slug:courseData.subjectSlug, 
                                        sub_course:courseData.subjectCat 
                         });
                        getSubject();
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