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
import Loader from '../../MainComponents/Loader'

export default function QuestionType() {
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
            formTitle: 'Create New Type',
            ButtonTitle: 'Create Type',
        });
    }
    function getClearAll() {
        setCourseData({
            typeName: '',
        });
    }
    //Edit
    function getEdit() {
        setOpen(true)
        setFormData({
            formTitle: 'Edit Type',
            ButtonTitle: 'UPDATE'
        });
        setCourseData({
            typeName: data.qt_title,
        })
    }
    async function getType()
    {
       
        setLoader(true);
        try{
            const data1= await crud.retrieve('/Qtype/')
            setCourses(data1);
            setLoader(false);
            }
        
        catch(e){
        setLoader(false);
        }
    }
    async function deleteType(){
        
        await crud.confirm()
        
        await crud.delete('/Qtype/'+ data.qt_id)
        .then((response) => {
            if(response==null){
                getType();
            }
        });
    }
    useEffect(() => {
        getClearAll();
        getType();
    }, [location]);
    return (
        <>
            <div className={'container-fluid py-4 '}>
                <div className={'row px-lg-5'}>
                    <div className={'col-12 py-2'}>
                    <h5>Category : <span className='back-tag' onClick={() => {history.push('/question-bank')}}>{location.state?.category}</span>&gt;
                    <span className='back-tag' onClick={() => {history.push({pathname: '/question-course',
                              state: {category:location.state?.category,course:location.state?.course}})}}>{location.state?.course}</span>&gt;
                               <span className='back-tag' onClick={() => {history.push({pathname: '/question-subject',
                              state: {category:location.state?.category,course:location.state?.course,subject:location.state?.subject}})}}>
                                  {location.state?.subject}</span>&gt; <span className='back-tag' onClick={() => {history.push({pathname: '/question-topic',
                              state: {category:location.state?.category,course:location.state?.course,subject:location.state?.subject,topic:location.state?.topic}})}}>
                                  {location.state?.topic}</span>
                    </h5>
                    <hr/>
                    </div>
                    <div className={'col-lg-3 col-12'}>
                        <h3 className={classes.title}>Questions Type({courses?.length})</h3>
                    </div>
                    <div className={'col-lg-4 col-12 my-3 mt-lg-0'}>
                        <TextField fullWidth placeholder={'search here...'} InputProps={{
                            startAdornment: (<InputAdornment position="start">
                                <SearchIcon/></InputAdornment>),}}/>
                    </div>
                    <div className={'col-lg-5 col-12 d-flex justify-content-lg-end my-3 mt-lg-0'}>
                        <Button startIcon={<ArrowBackIcon/>} className={'mx-lg-3 mx-1'} variant="contained" onClick={history.goBack}>Back</Button>
                        
                    </div>
                    <div className={'divider'}/>
                    {courses?.length?<>
                    {courses.map((value, index) => (
                        <div key={index} className={'col-xl-3 col-lg-4 col-md-6 col-12  mt-4'}>
                            <div className={clsx('card px-3 pt-2')}>
                                <div onClick={() => {history.push({pathname: '/question-page/'+value?.qt_id,
                              state: {category:location.state?.category,course:location.state?.course,subject:location.state?.subject,topic:location.state?.topic,question_type:value?.qt_title}})}} className={'QuestionRedirect'}/>
                                <h5>{value?.qt_title}</h5>
                                
                                
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
                                       
                                       deleteType();
                                       setAnchorEl(false);
                                    }}>
                                    Delete <DeleteIcon className={classes.menuIcon}/></MenuItem>
                                   
                              
                                </Menu>
                                <h6>{value.topic} </h6>
                            </div>
                        </div>
                    ))}
                    </>:<><h2 className='text-center pt-5'>type is Empty...</h2></>}

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
                            <h6 className={classes.InputTitle}>Question Type</h6>
                        </div>
                        <div className={'col-lg-9 col-12'}>
                            <TextField value={courseData.typeName} onChange={(e)=>{
                                setCourseData({...courseData,typeName:e.target.value})
                            }} name='typeName'  fullWidth variant="outlined" InputProps={{className: 'TextFieldHeight',}}/>   
                        </div>
                    </div>
                </div>
                <DialogActions className={'mx-2'}>
                <Button className={clsx(classes.Btn,)} variant={'contained'} onClick={async() => {
                    if(formData.ButtonTitle==='Create Type'){
                          await crud.create('/Qtype/',{
                            
                              qt_title:courseData.typeName,
                              
                             
                            });
                            console.log("miku",courseData.typeName)
                            
                        getType();
                        getClearAll();
                     }
                        setOpen(false)
                    if(formData.ButtonTitle==='UPDATE'){
                        await crud.update('/Qtype/'+data.qt_id+'/',{
                                        
                                        qt_title:courseData.typeName,  
                                        
                                        
                         });
                         getType();
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
