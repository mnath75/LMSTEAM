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
} from "@material-ui/icons";
import MoreVertIcon from "@material-ui/icons/MoreVert";
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
//import Button from '@mui/material/Button';

const courses = [
    {id: 1, title: 'Single_Multi Choice', topic: 45, subtitle: 'NEET'},
    {id: 2, title: 'Comprehension Type', topic: 405, subtitle: 'NEET'},
    {id: 3, title: 'Subjective', topic: 125, subtitle: 'NEET'},
    {id: 4, title: 'True/False', topic: 35, subtitle: 'NEET'},
    {id: 5, title: 'Fill in the blanks', topic: 35, subtitle: 'NEET'},
    {id: 6, title: 'Integer Type', topic: 35, subtitle: 'NEET'},
    {id: 7, title: 'Math Matrix_following', topic: 35, subtitle: 'NEET'},
    {id: 8, title: 'Re_arrange Type', topic: 35, subtitle: 'NEET'},
    {id: 9, title: 'Multiple Marking', topic: 35, subtitle: 'NEET'},
    {id: 10, title: 'Typing Paragraph', topic: 35, subtitle: 'NEET'},
]

export default function CourseCategory() {
  const classes = useStyles();
  const location = useLocation();
  const history = useHistory();
  const [formData, setFormData] = useState({
    formTitle: "",
    ButtonTitle: "",
  });
  const [loader, setLoader] = useState(false);
  const [open, setOpen] = useState(false);
  const [data, setData] = useState();
  const [anchorEl, setAnchorEl] = useState(null);
  const [courseData, setCourseData] = useState("");
  //const [courses, setCourses] = useState();
  function GetFormManage() {
    setOpen(true);
    setFormData({
      formTitle: "Create New Category",
      ButtonTitle: "Create Category",
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
        <div className="row px-lg-2">
          <div className="col-lg-8 py-4">
            <div className="row px-lg-0">
            <div className={'col-lg-2 col-12'}>
                        <h6 className={classes.title}>TYPE({courses?.length})</h6>
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
                            Create Type
                        </Button>
                    </div>
                    <div className={'divider'}/>
                    
                    {courses?.length?<>
                        {courses?.map((value, index) => (
                        <div key={index} className={'col-xl-4 col-lg-4 col-md-6 col-12  mt-4'}>
                            <div className={clsx('px-3 pt-2 card')} >
                                <div onClick={()=>{history.push({pathname: '/course-/',
                                    state: {category:value.title}})}} className={'QuestionRedirect'} />
                                <h5>{value?.title}</h5>
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
                                    <MenuItem className={'d-flex justify-content-between text-danger'} onClick={() => {
                                       deletecourse();
                                       setAnchorEl(false);}}>
                                      Delete <Delete className={classes.menuIcon}/></MenuItem>
                                    <MenuItem className={'text-success'} onClick={() => {setAnchorEl(false);}}>Enabled</MenuItem>
                                    <MenuItem onClick={() => {
                                        setAnchorEl(false);
                                        crud.confirm()
                                    }}>Disabled</MenuItem>
                                </Menu>
                                <h6>{value?.topic} Courses</h6>
                            </div>
                        </div>
                    ))}
                    </>:<><h2 className='text-center pt-5'>Type is Empty...</h2></>} 

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