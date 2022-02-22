import React, {useEffect, useState} from 'react'
import {makeStyles,TextField,InputAdornment,Button,IconButton,Menu,MenuItem,Dialog,DialogActions,DialogTitle} from '@material-ui/core';
import {useHistory, useLocation} from 'react-router-dom'
import SearchIcon from '@material-ui/icons/Search';
import AddIcon from '@material-ui/icons/Add';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import ClearIcon from '@material-ui/icons/Clear';
import {Themes} from "../../Theme/theme";
import clsx from "clsx";
import {crud} from "../../services/crud";
import Slide from '@material-ui/core/Slide';
import {colourOptions} from "../../MainComponents/SideNav";
import Select from 'react-select'
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import './QuestionCss.css';
import { useParams } from "react-router-dom";
import Loader from '../../MainComponents/Loader'
const courses =[
    {id:1,title:'Kinetic',topic:45,subtitle:'Physics'},
    {id:2,title:'Motion',topic:405,subtitle:'Physics'},
    {id:3,title:'Electro Magnetic Induction',topic:125,subtitle:'Physics'},
    {id:4,title:'Magnetic Field',topic:35,subtitle:'Physics'},
]
export default function QuestionTopic() {
    const params = useParams();
    const p =[params.id];
    const classes = useStyles();
    const history = useHistory();
    const location = useLocation();
    const [state, setState] = useState({
        courseCategory: null,
        courseSubject: null
    });
    const [formData, setFormData] = useState({
        formTitle: '',
        ButtonTitle: ''
    })
    const [loader,setLoader] = useState(false)
    const [open, setOpen] = useState(false);
    const [data, setData] = useState()
    const [anchorEl, setAnchorEl] = useState(null);
    const [courseData, setCourseData] = useState('');
    const [courses,setCourses]=useState();
    function GetFormManage() {
        setOpen(true)
        setFormData({
            formTitle: 'Create New Topic',
            ButtonTitle: 'Create Topic',
        });
    }
    function getClearAll() {
        setCourseData({
            topicName: '',
            topicCat:p
        });
      
    }
    //Edit
    function getEdit() {
        setOpen(true)
        setFormData({
            formTitle: 'Edit Topic',
            ButtonTitle: 'UPDATE'
        });
        setCourseData({
            
            topicName: data.top_title,
            topicCat:data.top_subject
        })
    }
    async function getTopics()
    {
       
        setLoader(true);
        try{
            const data1= await crud.retrieve('/topicapi/?top_subject='+params.id+'&&')
            setCourses(data1);
            setLoader(false);
            }
        
        catch(e){
        setLoader(false);
        }
    }
    async function deleteTopic(){
        
        await crud.confirm()
        
        await crud.delete('/topicapi/'+ data.top_id)
        .then((response) => {
            if(response==null){
                getTopics();
            }
        });
    }
    useEffect(() => {
        getClearAll();
        getTopics();
    }, [location])
    return (
        <>
            <div className={'container-fluid py-4 '}>
                <div className={'row px-lg-5'}>
                    <div className={'col-12 py-2'}>
                    <h5>Category : <span className='back-tag' onClick={() => {history.push('/question-bank')}}>{location.state?.category}</span>
                    <span className='back-tag' onClick={() => {history.push({pathname: '/question-course',
                              state: {category:location.state?.category,course:location.state?.course}})}}>{location.state?.course}</span>
                               <span className='back-tag' onClick={() => {history.push({pathname: '/question-subject',
                              state: {category:location.state?.category,course:location.state?.course,subject:location.state?.subject}})}}>
                                  {location.state?.subject}</span>
                    </h5>
                    </div>
                    <div className={'col-lg-3 col-12'}>
                        <h3 className={classes.title}>Topics({courses?.length})</h3>
                    </div>
                    <div className={'col-lg-4 col-12 my-3 mt-lg-0'}>
                        <TextField fullWidth placeholder={'search here...'} InputProps={{startAdornment: (<InputAdornment position="start">
                                <SearchIcon/></InputAdornment>),}}/>
                    </div>
                    <div className={'col-lg-5 col-12 d-flex justify-content-lg-end my-3 mt-lg-0'}>
                        <Button startIcon={<ArrowBackIcon/>} className={'mx-lg-3 mx-1'} variant="contained" 
                        onClick={history.goBack}>Back</Button>
                        <Button onClick={() => {GetFormManage()}} variant="contained" className={'mx-lg-3 mx-1'} startIcon={<AddIcon/>}
                                style={{background: Themes.MainHeaderColor, color: Themes.WHITE}}>
                            Create Topics
                        </Button>
                    </div>
                    <div className={'divider'}/>
                    {courses?.length?<>
                    {courses.map((value, index) => (
                        <div key={index} className={'col-xl-3 col-lg-4 col-md-6 col-12  mt-4'}>
                            <div className={clsx('card px-3 pt-2')}>
                                <div onClick={()=>{history.push({pathname: '/question-type',
                              state: {category:location.state?.category,course:location.state?.course,subject:location.state?.subject,topic:value?.title}})}} className={'QuestionRedirect'} />
                                <h5>{value?.top_title}</h5>
                                
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
                                       
                                       deleteTopic();
                                       setAnchorEl(false);
                                    }}>
                                        Delete <DeleteIcon className={classes.menuIcon}/></MenuItem>
                                    <MenuItem className={'text-success'} onClick={() => {
                                        setAnchorEl(false);
                                    }}>Enabled</MenuItem>
                                    <MenuItem onClick={() => {setAnchorEl(false);crud.confirm()}}>Disabled</MenuItem>
                                </Menu>
                                <h6>{value.topic}  </h6>
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
                    <div className={'row pl-0 pr-0'}>
                        <div className={clsx('col-lg-3 col-12')}>
                            <h6 className={classes.InputTitle}>Topic Name</h6>
                        </div>
                        <div className={'col-lg-9 col-12'}>
                            <TextField value={courseData.topicName} onChange={(e)=>{
                                setCourseData({...courseData,topicName:e.target.value})
                            }} name='topicName'  fullWidth variant="outlined" InputProps={{className: 'TextFieldHeight',}}/>   
                        </div>
                    </div>
                </div>
                <DialogActions className={'mx-2'}>
                <Button className={clsx(classes.Btn,)} variant={'contained'} onClick={async() => {
                    if(formData.ButtonTitle==='Create Topic'){
                          await crud.create('/topicapi/',{
                            
                              top_title:courseData.topicName,
                              top_subject:courseData.topicCat
                              
                             
                            });
                            
                        getTopics();
                        getClearAll();
                     }
                        setOpen(false)
                    if(formData.ButtonTitle==='UPDATE'){
                        await crud.update('/topicapi/'+data.top_id+'/',{
                                        
                                        top_title:courseData.topicName,  
                                        top_subject:courseData.topicCat
                                        
                         });
                        getTopics();
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
        minHeight: 200,
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