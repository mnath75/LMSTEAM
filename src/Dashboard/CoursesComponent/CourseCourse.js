import React, { useEffect, useState } from "react";
import {
  makeStyles,
  TextField,
  InputAdornment,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Dialog,
  DialogActions,
  DialogTitle,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import SearchIcon from "@material-ui/icons/Search";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import {
  Search,
  YouTube,
  FilterList,
  Add,
  MoreVert,
  Edit,
  Delete,
  Clear,
  FileCopyRounded,
} from "@material-ui/icons";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { Checkbox } from '@mui/material';
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import ClearIcon from "@material-ui/icons/Clear";
import { Themes } from "../../Theme/theme";
import clsx from "clsx";
import { crud } from "../../services/crud";
import Slide from "@material-ui/core/Slide";
import "../QuestionBankComponent/QuestionCss.css";
import { useLocation } from "react-router-dom";
import Loader from "../../MainComponents/Loader";
import { useParams } from "react-router-dom";

export default function CourseCourse() {
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
  const classes = useStyles();
  const params = useParams();
  const p =[params.id];
  const location = useLocation();
  const history = useHistory();
  const [formData, setFormData] = useState({
    formTitle: "",
    ButtonTitle: "",
  });
  //Vikash24change1
  const [formaData, setFormaData] = useState({
    formTitle0: "",
    formTitle1: "",
    formTitle2: "",
    formTitle3: "",
    ButtonTitle: "",

  });
  const [loader, setLoader] = useState(false);
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [data, setData] = useState();
  const [anchorEl, setAnchorEl] = useState(null);
  const [courseData, setCourseData] = useState("");
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
  //For duplicating data
  function getDuplicateCourse() {
    setOpen1(true);
    setFormaData({
      formaTitle0: "Duplicate Course",
      formaTitle1: "Course Name",
      formaTitle2: "Choose Batches",
      formaTitle3: "",
      ButtonTitle: "Next",
    });
  }


     //For duplicating Batch
  function getDuplicateBatch() {
    setOpen2(true);
    setFormaData({
      formaTitle0: "Duplicate Batch",
      formaTitle1: "Batch Name",
      formaTitle2: "Choose Batches",
      formaTitle3: "",
      ButtonTitle: "Duplicate",
    });
    
    setCourseData({
      courseName: data.category_title,
      course_subtitle: data.category_short,
    });
  }
  //delete
  async function deletecourse() {
    await crud.confirm();
    await crud.delete("/categoryapi/" + data.category_id);
    getCourses();
  }
  // getCourses
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
  }, [location]);
  return (
    <>
      <div className="container-fluid" style={{textSize: 8}}>
        <div className="row px-lg-2">
          <div className="col-lg-8 py-4">
            <div className="row px-lg-0">
            <div className={'col-lg-2 col-12'}>
                        <h6 className={classes.title}>COURSES({courses?.length})</h6>
                    </div>
                    <div className={'col-lg-3 col-12 my-3 mt-lg-0'}>
                        <TextField fullWidth placeholder={'search for courses'} InputProps={{
                            startAdornment: (<InputAdornment position="start">
                                <Search/></InputAdornment>),}}/>
                    </div>
                    <div className={'col-lg-6 col-12 d-flex justify-content-lg-end my-3 mt-lg-0'}>
                        <Button className={'mx-lg-3 mx-1'} variant="contained" startIcon={<FilterList/>}>
                            Sort
                        </Button>
                        <Button onClick={() => {GetFormManage()}} variant="contained" className={'mx-lg-3 mx-1'} startIcon={<Add/>}
                                style={{background: Themes.MainHeaderColor, color: Themes.WHITE}}>
                            Create Course
                        </Button>
                    </div>
                    <div className={'divider'}/>
                    
                    {courses?.length?<>
                        {courses?.map((value, index) => (
                        <div key={index} className={'col-xl-4 col-lg-4 col-md-6 col-12  mt-4'}>
                            <div className={clsx('px-3 pt-2 card')} >
                                <div onClick={()=>{history.push({pathname: '/course-batch/'+value?.cr_id,
                                    state: {category: location.state?.category,course:value?.cr_title}})}} className={'QuestionRedirect'} />
                                <h5>{value?.cr_title}</h5>
                                <p>{value?.subtitle}</p>
                                <IconButton  onClick={(event) => {
                                    setAnchorEl(event.currentTarget);
                                    setData(value)}} className={classes.menu}><MoreVert/></IconButton>
                                <Menu key={index}
                                      id="simple-menu"
                                      anchorEl={anchorEl}
                                      open={anchorEl}
                                      onClose={() => {setAnchorEl(null);}}>
                                    <MenuItem className={'d-flex justify-content-between text-primary'} onClick={() => {
                                        getEdit();
                                        setAnchorEl(false)
                                    }}>Edit<Edit className={classes.menuIcon}/></MenuItem>
                                     <MenuItem onClick={() => {
                                       getDuplicateCourse();
                                        setAnchorEl(false);                                       
                                    }}>Duplicate<FileCopyRounded className={classes.menuIcon} /></MenuItem>
                                    <MenuItem className={'d-flex justify-content-between text-danger'} onClick={() => {
                                       deletecourse();
                                       setAnchorEl(false);}}>
                                      Delete <Delete className={classes.menuIcon}/></MenuItem>
                                </Menu>
                                <h6>{value?.topic} Courses</h6>
                            </div>
                        </div>
                    ))}
                    </>:<><h2 className='text-center pt-5'>Course is Empty...</h2></>} 

            </div>
           </div>

          <div className="col-lg-4 px-2">
            <div className="row">
              <div className="card" style={{minHeight: 250}}>
                <div className="row bBorder">
                  <h5>Webinar</h5>
                </div>
                <div className="row bBorder ">
                  <p>
                    Now you can go live anytime, anywhere for guide your
                    students!
                  </p>
                  <Button variant="outlined">
                    <IconButton>
                      <YouTube   color='secondary' />
                    </IconButton>
                    Go Live Now
                  </Button>
                </div>
                <div className="row bBorder px-lg-0">
                  <div className="col-lg-6">
                    <p> Motivational Lecture by Director Sir</p>
                  </div>
                  <div className="col-lg-4"><p>10:00 AM <br/>January 06, 2022</p></div>
                    <div className="col-lg-2">
                      <IconButton
                        // onClick={(event) => {
                        //// setAnchorEl(event.currentTarget);
                        //setData(value);}}
                      >
                        <MoreVert />
                      </IconButton>
                    </div>
                </div>
                <div className="row bBorder px-lg-0">
                  <div className="col-lg-6">
                    <p> Republic Day Celebration</p>
                  </div>
                  <div className="col-lg-4"><p>10:00 AM <br/>January 06, 2022</p></div>
                    <div className="col-lg-2">
                      <IconButton
                        onClick={(event) => {
                          setAnchorEl(event.currentTarget);
                                      }} className={classes.menu}
                      >
                        <MoreVert />
                      </IconButton>
                                    <Menu 
                                      id="simple-menu"
                                      anchorEl={anchorEl}
                                      open={anchorEl}
                                      onClose={() => {setAnchorEl(null);}}>
                                    <MenuItem className={'d-flex justify-content-between text-primary'} onClick={() => {
                                        getEdit();
                                        setAnchorEl(false)
                                    }}>Edit<Edit className={classes.menuIcon}/></MenuItem>
                                     <MenuItem onClick={() => {
                                       getDuplicateCourse();
                                        setAnchorEl(false);                                       
                                    }}>Duplicate<FileCopyRounded className={classes.menuIcon} /></MenuItem>
                                    <MenuItem className={'d-flex justify-content-between text-danger'} onClick={() => {
                                       deletecourse();
                                       setAnchorEl(false);}}>
                                      Delete <Delete className={classes.menuIcon}/></MenuItem>
                                </Menu>
                    </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="card " style={{minHeight: 250}}>
                <div className="row bBorder px-lg-0">
                  <div className="col-lg-8"><h6>Recent Announcements</h6></div>
                  <div className="col-lg-4 mb-3">
                  <Button variant="contained" size="small">
         <b> Create</b>
        </Button></div>
                  </div>
                  <div className="row bBorder px-lg-0">
                  <div className="col-lg-6">
                    <p>Todays maths class off due to the power failure. Sorry for ...</p>
                  </div>
                  <div className="col-lg-4"><p>10:00 AM <br/>January 06, 2022</p></div>
                    <div className="col-lg-2">
                      <IconButton
                        // onClick={(event) => {
                        //// setAnchorEl(event.currentTarget);
                        //setData(value);}}
                      >
                        <MoreVert />
                      </IconButton>
                    </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="card" style={{minHeight: 250}}>
              <div className="row bBorder px-lg-0">
                  <div className="col-lg-8"><h6>Recent Presentations</h6></div>
                  <div className="col-lg-4 mb-3">
                  <Button variant="contained" size="small">
         <b> Create</b>
        </Button></div>
                  </div>
                  <div className="row bBorder px-lg-0">
                  <div className="col-lg-6">
                    <p>Introduction PPT free 20 Slides</p>
                  </div>
                  <div className="col-lg-4"><p>10:00 AM <br/>January 06, 2022</p></div>
                    <div className="col-lg-2">
                      <IconButton
                        // onClick={(event) => {
                        //// setAnchorEl(event.currentTarget);
                        //setData(value);}}
                      >
                        <MoreVert />
                      </IconButton>
                    </div>
                </div>
              </div>
            </div>
          </div>
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
 {/*Vikash24change1........................................................................................*/}
            <Dialog maxWidth={'lg'} open={open1} TransitionComponent={Transition} keepMounted>
                <DialogTitle id="alert-dialog-slide-title">{formaData.formaTitle0}
                    <hr/>
                </DialogTitle>
                <IconButton onClick={() => {
                    setOpen1(false);
                    getClearAll()
                }} className={classes.CloseBtn}><Clear/></IconButton>
            
                <div className={'row px-lg-4 '}>
                        <div className={clsx('col-lg-3 col-12 d-flex align-items-center')}>
                            <h6 className={classes.InputTitle}>{formaData.formaTitle1}</h6>
                        </div>
                        <div className="col-lg-8 col-12 my-3">  <TextField value={courseData.courseName} onChange={(e)=>{
                                     setCourseData({...courseData,courseName:e.target.value})
                            }} name='courseName'  fullWidth variant="outlined" InputProps={{className: 'TextFieldHeight',}}/> </div>
                        
                        <hr/>
                    </div>
                  
             
                <div className={"row px-lg-4"}>
                   <div className="col-lg-4 col-12"><h6>{formaData.formaTitle2}-1/3</h6></div>
                   <div className="col-lg-5 col-12   my-3 mt-lg-0">
                     <TextField fullWidth placeholder={'search for Batch'}
                      InputProps={{startAdornment: (<InputAdornment position="start">
                                <Search/></InputAdornment>),}}/>
                    </div>
                    <div className={'col-lg-3 col-12 d-flex justify-content-lg-end my-3 mt-lg-0'}>
                        <Button className={'mx-lg-3 mx-1'} variant="contained" startIcon={<FilterList/>}>
                            Sort
                        </Button>
                        
                    </div>
                    <hr/>
                </div>
                
                <div className={clsx('container-fluid mx-lg-4', classes.FormWidth)}>
                    <div className={'row pl-0 pr-0'}>
                    <div className="col-lg-5 "><p>Batch1</p></div>
                    <div className="col-lg-5"><p>100 students</p></div>
                    <div className="col-lg-2"><Checkbox {...label} defaultChecked /></div>
                    </div>
                    <div className={'row pl-0 pr-0'}>
                    <div className="col-lg-5"><p>Batch2</p></div>
                    <div className="col-lg-5"><p>500 students</p></div>
                    <div className="col-lg-2"><Checkbox {...label} /></div>
                    </div>
                    <div className={'row pl-0 pr-0'}>
                    <div className="col-lg-5"><p>Batch3</p></div>
                    <div className="col-lg-5"><p>800 students</p></div>
                    <div className="col-lg-2"><Checkbox {...label} /></div>
                    </div>
                       
                </div>
                <DialogActions className={'mx-2'}>
                    <Button className={clsx(classes.Btn,)} variant={'contained'} onClick={() => 
                    { getDuplicateBatch();}
                  }>
                        {formaData.ButtonTitle}
                    </Button>
                </DialogActions>
            </Dialog>
     {/*Vikash25change2........................................................................................*/}
             <Dialog maxWidth={'lg'} open={open2} TransitionComponent={Transition} keepMounted>
                <DialogTitle id="alert-dialog-slide-title">{formaData.formaTitle0}
                    <hr/>
                </DialogTitle>
                <IconButton onClick={() => {
                    setOpen2(false);
                    getClearAll()
                }} className={classes.CloseBtn}><Clear/></IconButton>
            
                <div className={'row px-lg-4 '}>
                        <div className={clsx('col-lg-3 col-12 d-flex align-items-center')}>
                            <h6 className={classes.InputTitle}>{formaData.formaTitle1}</h6>
                        </div>
                        <div className="col-lg-8 col-12 my-3">  <TextField value={courseData.courseName} onChange={(e)=>{
                                     setCourseData({...courseData,courseName:e.target.value})
                            }} name='courseName'  fullWidth variant="outlined" InputProps={{className: 'TextFieldHeight',}}/> </div>
                        
                        <hr/>
                    </div>
                  
             
                <div className={"row px-lg-4"}>
                   <div className="col-lg-4 col-12"><h6>{formaData.formaTitle2}-1/30</h6></div>
                   <div className="col-lg-5 col-12   my-3 mt-lg-0">
                     <TextField fullWidth placeholder={'search for Batch'}
                      InputProps={{startAdornment: (<InputAdornment position="start">
                                <Search/></InputAdornment>),}}/>
                    </div>
                    <div className={'col-lg-3 col-12 d-flex justify-content-lg-end my-3 mt-lg-0'}>
                        <Button className={'mx-lg-3 mx-1'} variant="contained" startIcon={<FilterList/>}>
                            Sort
                        </Button>
                        
                    </div>
                    <hr/>
                </div>
                
                <div className={clsx('container-fluid mx-lg-4', classes.FormWidth)}>
                    <div className={'row pl-0 pr-0'}>
                    <div className="col-lg-5 "><p>student 1</p></div>
                    <div className="col-lg-5"><p>100 students</p></div>
                    <div className="col-lg-2"><Checkbox {...label} defaultChecked /></div>
                    </div>
                    <div className={'row pl-0 pr-0'}>
                    <div className="col-lg-5"><p>Student 2</p></div>
                    <div className="col-lg-5"><p>500 students</p></div>
                    <div className="col-lg-2"><Checkbox {...label} /></div>
                    </div>
                    <div className={'row pl-0 pr-0'}>
                    <div className="col-lg-5"><p>Student3</p></div>
                    <div className="col-lg-5"><p>800 students</p></div>
                    <div className="col-lg-2"><Checkbox {...label} /></div>
                    </div>
                       
                </div>
                <DialogActions className={'mx-2'}>
                    <Button className={clsx(classes.Btn,)} variant={'contained'} onClick={async() => {
                    if(formaData.ButtonTitle==='Create Category'){
                          await crud.create('/categoryapi/',{
                              category_short:courseData.course_subtitle,
                              category_title:courseData.courseName,
                            });
                        getCourses();
                        getClearAll();
                     }
                        setOpen(false)
                    if(formaData.ButtonTitle==='UPDATE'){
                           await crud.update('/categoryapi/'+data.category_id+'/',{
                                    category_short:courseData.course_subtitle,      
                                    category_title:courseData.courseName,      
                         });
                        getCourses();
                        }
                    }} color="primary">
                        {formaData.ButtonTitle}
                    </Button>
                </DialogActions>
            </Dialog>
            {loader?<Loader/>:<></>}
    </>
  );
}
const useStyles = makeStyles((theme) => ({
  title: {
    marginTop: "-16px",
    [theme.breakpoints.up("sm")]: {
      marginTop: "0px",
    },
  },
  menu: {
    position: "absolute",
    top: 0,
    right: 0,
  },
  menuIcon: {
    marginLeft: 10,
  },
  CloseBtn: {
    position: "absolute",
    top: 5,
    right: 10,
  },
  FormWidth: {
    width: 300,
    minHeight: 200,
    [theme.breakpoints.up("sm")]: {
      width: 600,
    },
  },
  justifyContentForm: {
    display: "flex",
    justifyContent: "space-between",
  },
  InputTitle: {
    paddingTop: 5,
  },
  Btn: {
    background: Themes.MainHeaderColor,
    color: Themes.WHITE,
  },
}));
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
