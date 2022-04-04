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
  Badge,
  Slide,
} from "@material-ui/core";
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
import { Checkbox,Box,Paper,Stack,Radio,FormControl,RadioGroup,FormControlLabel } from '@mui/material';
import { Themes } from "../../Theme/theme";
import clsx from "clsx";
import { crud } from "../../services/crud";
import "../QuestionBankComponent/QuestionCss.css";
import Loader from "../../MainComponents/Loader";
import {BatchSidebar} from "../../MainComponents/SideNav";
import { NavLink,useHistory,useLocation} from 'react-router-dom';
import '../../Website/Component/headerCss.css';
import LiveTvIcon from '@mui/icons-material/LiveTv';
import { pink } from '@mui/material/colors';

const courses = [
    {id: 1, title: 'BATCH 01', topic:65, subtitle: 'Maths, Physics, Chemistry'},
    {id: 2, title: 'BATCH 02', topic:40, subtitle: 'Maths, Physics, Chemistry'},
    {id: 3, title: 'BATCH 03', topic:125, subtitle: 'Maths, Physics, Chemistry'},
    {id: 4, title: 'BATCH 04', topic:35, subtitle: 'Maths, Physics, Chemistry'},
  
    
]

export default function BatchDetail() {
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
  const classes = useStyles();
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
  //const [courses, setCourses] = useState();
  function CreateNewSubject() {
    setOpen(true);
    setFormData({
      formTitle: "Create New Subject",
      ButtonTitle: "Create Subject",
    });
  }
    
  function CreateNewTopic() {
    setOpen1(true);
    setFormData({
      formTitle: "Create New Topic",
      ButtonTitle: "Create Tope",
    });
  }
  function getClearAll() {
    setCourseData({
      courseName: "",
      course_subtitle: "",
    });
  }
  //Edit
  function getEdit() {
    setOpen(true);
    setFormData({
      formTitle: "Edit Category",
      ButtonTitle: "UPDATE",
    });
    setCourseData({
      courseName: data.category_title,
      course_subtitle: data.category_short,
    });
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
  async function getCourses() {
    setLoader(true);
    try {
      const data = await crud.retrieve("/categoryapi/");
     // setCourses(data);
      setLoader(false);
    } catch (e) {
      setLoader(false);
    }
  }
  useEffect(() => {
    getClearAll();
    getCourses();
  }, [location]);
  return (
    <>
      <div className="container-fluid" style={{textSize: 8}}>
        <div className="row px-lg-0 py-0">
          <div className="col-lg-1 text" style={{background: Themes.MainHeaderColor}}><ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            {BatchSidebar.map((value => (
                                <li className="nav-item dropdown" style={{color: Themes.WHITE}} key={value.id}>
                                   {/*{value.page === '/course-batch' ? <><Badge className={classes.Badge}
                                                                                 color="secondary"
                                                                                 badgeContent={'Free'}/></> : <></>}*/}
                                    {!(value.title === 'Log Out') ?
                                        <NavLink to={value.page} activeClassName={'active_link'}
                                                 className="nav-link">{value.icons}  {value.title}</NavLink> : <></>}
                                </li>
                            )))}</ul> </div>
          <div className="col-lg-8 py-4">
            <div className="row px-lg-0">
            <Box
      sx={{
        display: 'flex',
        '& > :not(style)': {
          m: 2,
          p: 2,
          mt:-1,
          width: 900,
          height: 300,
          borderColor: 'text.primary',
        },
      }}
    >
      <Paper variant="outlined" >
        <div className="row px-lg-0"><div className="col-lg-11 col-12"><h6>Batch 02</h6><p>code:XYZcode</p></div><div className="col-lg-1 col-12"><MoreVert/></div></div>
        <div className="row"><div className="col-lg-9"><h6>subject</h6><p>Maths,Physics,Chemistry</p></div><div className="col-lg-3 "> <Stack spacing={1} direction="column" sx={{p: -2}}>
    
        <Button variant="outlined" size="small" className={'mx-lg-3 mx-1'} onClick={() => {CreateNewSubject()}} startIcon={<Add/>}>Add Subject</Button>
        <Button variant="outlined" size="small"className={'mx-lg-3 mx-1'}  onClick={() => {CreateNewTopic()}} startIcon={<Add/>}>Add Topic</Button>
        </Stack></div></div>
        <div className="row"><h6>Educator</h6><p>Nikhil,Tanisha,Mandeep</p></div>
      </Paper>
    </Box>
    <Box
      sx={{
        display: 'flex',
        '& > :not(style)': {
          m: 2,
          p: 2,
          width: 900,
          height: 300,
          borderColor: 'text.primary',
        },
      }}
    >
      <Paper variant="outlined" >
        <div className="row bBorder"><div className="col-lg-10"><h6>Live Sessions</h6></div><div className="col-lg-2"><Button variant="outlined" size="small"className={'mx-lg-2  mb-3'} startIcon={<Add/>}>Add</Button></div></div>
        <div className="row"><div className="col-lg-2"><h6>Monday</h6></div><div className="col-lg-2"><h6>Tuesday</h6></div><div className="col-lg-2"><h6>Wednesday</h6></div><div className="col-lg-2"><h6>Thursday</h6></div><div className="col-lg-2"><h6>Friday</h6></div><div className="col-lg-2"><h6>Saturday</h6></div></div>
      </Paper>
    </Box>
    <Box
      sx={{
        display: 'flex',
        '& > :not(style)': {
          m: 2,
          p: 2,
          width: 900,
          height: 300,  borderColor: 'text.primary',
        },
      }}
    >
      <Paper variant="outlined" >
       <div className="row bBorder"> <div className={'col-lg-4 col-12'}>
                        <h6 className={classes.title}>Students({courses?.length})</h6>
                    </div>
                    <div className={'col-lg-4 col-12 my-3 mt-lg-0'}>
                        <TextField fullWidth placeholder={'search for Students'} InputProps={{
                            startAdornment: (<InputAdornment position="start">
                                <Search/></InputAdornment>),}}/>
                    </div>
                    <div className={'col-lg-4 col-12 d-flex justify-content-lg-end my-3 mt-lg-0'}>
                        <Button className={'mx-lg-3 mx-1'} variant="contained" startIcon={<FilterList/>}>
                            Sort
                        </Button>
                        <Button onClick={() => {CreateNewSubject()}} variant="contained" className={'mx-lg-3 mx-1'} startIcon={<Add/>}
                                style={{background: Themes.MainHeaderColor, color: Themes.WHITE}}>
                            Add
                        </Button>
                    </div></div>
                    <div className="row">
                       <FormControl>
         <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        defaultValue="female"
        name="radio-buttons-group"
      >
        <FormControlLabel value="female" control={<Radio />} label="" />
        <FormControlLabel value="male" control={<Radio />} label="" />
        <FormControlLabel value="other" control={<Radio />} label="" />
      </RadioGroup>
    </FormControl></div>
      </Paper>
    </Box>
                   
            </div>
           </div>

          <div className="col-lg-3 px-2">
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
                    <LiveTvIcon sx={{ color: pink[500] }} />
                    </IconButton>
                    Go Live Now
                  </Button>
                </div>
                <div className="row bBorder <IconButton  onClick={(event) => {
                                    setAnchorEl(event.currentTarget);
                                    setData(value)}} className={classes.menu}><MoreVert/></IconButton>">
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
                    <div className={'row pl-0 pr-0'}>
                        <div className={clsx('col-lg-3 col-12')}>
                            <h6 className={classes.InputTitle}>Subject Name</h6>
                        </div>
                        <div className={'col-lg-9 col-12'}>
                            <TextField value={courseData.courseName} onChange={(e)=>{
                                     setCourseData({...courseData,courseName:e.target.value})
                            }} name='courseName'  fullWidth variant="outlined" InputProps={{className: 'TextFieldHeight',}}/>
                        </div>
                    </div>
                        <div className={'row  my-4 pl-0 pr-0'}>
                            <div className={clsx('col-lg-3 col-12')}>
                                <h6 className={classes.InputTitle}>Topic Name</h6>
                            </div>
                            <div className={'col-lg-9 col-12'}>
                            <TextField value={courseData.course_subtitle} onChange={(e)=>{
                                     setCourseData(
                                         {...courseData,
                                            course_subtitle:e.target.value})
                            }} name='course_subtitle'  fullWidth variant="outlined" InputProps={{className: 'TextFieldHeight',}}/>
                        </div>
                        </div>
                </div>
                <DialogActions className={'mx-2'}>
                    <Button className={clsx(classes.Btn,)} variant={'contained'} onClick={async() => {
                    if(formData.ButtonTitle==='Create Category'){
                          await crud.create('/categoryapi/',{
                              category_short:courseData.course_subtitle,
                              category_title:courseData.courseName,
                            });
                        getCourses();
                        getClearAll();
                     }
                        setOpen(false)
                    if(formData.ButtonTitle==='UPDATE'){
                           await crud.update('/categoryapi/'+data.category_id+'/',{
                                    category_short:courseData.course_subtitle,      
                                    category_title:courseData.courseName,      
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
                <DialogTitle id="alert-dialog-slide-title">{formData.formTitle}
                    <hr/>
                </DialogTitle>
                <IconButton onClick={() => {
                    setOpen1(false);
                    getClearAll()
                }} className={classes.CloseBtn}><Clear/></IconButton>
                <div className={clsx('container-fluid mx-lg-4', classes.FormWidth)}>
                    <div className={'row pl-0 pr-0'}>
                        <div className={clsx('col-lg-3 col-12')}>
                            <h6 className={classes.InputTitle}>Topic Name</h6>
                        </div>
                        <div className={'col-lg-9 col-12'}>
                            <TextField value={courseData.courseName} onChange={(e)=>{
                                     setCourseData({...courseData,courseName:e.target.value})
                            }} name='courseName'  fullWidth variant="outlined" InputProps={{className: 'TextFieldHeight',}}/>
                        </div>
                    </div>
                        <div className={'row  my-4 pl-0 pr-0'}>
                            <div className={clsx('col-lg-3 col-12')}>
                                <h6 className={classes.InputTitle}>Tags</h6>
                            </div>
                            <div className={'col-lg-9 col-12'}>
                            <TextField value={courseData.course_subtitle} onChange={(e)=>{
                                     setCourseData(
                                         {...courseData,
                                            course_subtitle:e.target.value})
                            }} name='course_subtitle'  fullWidth variant="outlined" InputProps={{className: 'TextFieldHeight',}}/>
                        </div>
                        </div>
                </div>
                <DialogActions className={'mx-2'}>
                    <Button className={clsx(classes.Btn,)} variant={'contained'} onClick={async() => {
                    if(formData.ButtonTitle==='Create Category'){
                          await crud.create('/categoryapi/',{
                              category_short:courseData.course_subtitle,
                              category_title:courseData.courseName,
                            });
                        getCourses();
                        getClearAll();
                     }
                        setOpen(false)
                    if(formData.ButtonTitle==='UPDATE'){
                           await crud.update('/categoryapi/'+data.category_id+'/',{
                                    category_short:courseData.course_subtitle,      
                                    category_title:courseData.courseName,      
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
