import React, {useEffect, useState} from 'react'
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
    DialogTitle
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import FilterListIcon from '@material-ui/icons/FilterList';
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



export default function QuestionCreateCourse(props) {
    const classes = useStyles();
    const [state, setState] = useState({
        courseCategory: null,
        courseSubject: null
    });
    const [subjectData,setSubjectData] = useState({
         subjectCourse: null,
         subjectCategory:null,
        subjectTopic:null,
    });
    const [topicData,setTopicData] = useState({
        topicCourse:null,
        topicCategory:null,
        topicSubject:null,
        topicTag:null

    })
    const [formData, setFormData] = useState({
        formTitle: '',
        ButtonTitle: ''
    })
    const [open, setOpen] = useState(false)
    const [data, setData] = useState()
    const [anchorEl, setAnchorEl] = useState(null);
    const [courseName, setCourseName] = useState()
    const [courseData, setCourseData] = useState('');

    function GetFormManage() {
        setOpen(true)
        if (props.Title === 'Courses') {
            setFormData({
                formTitle: 'Create New Course',
                ButtonTitle: 'Create Course',
            });
            setCourseName('Course');
        }
        if (props.Title === 'Subject') {
            setCourseName('Subject');
            setFormData({
                formTitle: 'Create New Subject',
                ButtonTitle: 'Create Subject'
            });
        }
        if (props.Title === 'Topic') {
            setCourseName('Topic');
            setFormData({
                formTitle: 'Create New Topic',
                ButtonTitle: 'Create Topic'
            });
        }

    }

    function getClearAll() {
        setCourseData({
            courseName: '',
        });
        setState({
            courseCategory: null,
            courseSubject: null
    });
        setSubjectData({
            subjectCourse: null,
            subjectCategory:null,
            subjectTopic:null,
        });


    }

    //Edit
    function getEdit() {
        setOpen(true)
        if (props.Title === 'Courses') {
            setCourseName('Course');
            setFormData({
                formTitle: 'Edit Course',
                ButtonTitle: 'UPDATE'
            });
            setCourseData({
                courseName: data.title
            })
        }
        if (props.Title === 'Subject') {
            setCourseName('Subject');
            setFormData({
                formTitle: 'Edit Subject',
                ButtonTitle: 'UPDATE'
            });
            setCourseData({
                courseName: data.title
            })
        }
        if (props.Title === 'Topic') {
            setCourseName('Topic');
            setFormData({
                formTitle: 'Edit Topic',
                ButtonTitle: 'UPDATE'
            });
            setCourseData({
                courseName: data.title
            });
        }

    }

    useEffect(() => {
        getClearAll();
    }, [])
    return (
        <>
            <div className={'container-fluid'}>
                <div className={'row'}>
                    <div className={'col-lg-3 col-12'}>
                        <h3 className={classes.title}>{props.Title}(55)</h3>
                    </div>
                    <div className={'col-lg-4 col-12 my-3 mt-lg-0'}>
                        <TextField fullWidth placeholder={'search here...'} InputProps={{
                            startAdornment: (<InputAdornment position="start">
                                <SearchIcon/></InputAdornment>),
                        }}/>
                    </div>
                    <div className={'col-lg-5 col-12 d-flex justify-content-lg-end my-3 mt-lg-0'}>
                        <Button className={'mx-lg-3 mx-1'} variant="contained" startIcon={<FilterListIcon/>}>
                            Sort
                        </Button>
                        <Button onClick={() => {
                            GetFormManage()
                        }} variant="contained" className={'mx-lg-3 mx-1'} startIcon={<AddIcon/>}
                                style={{background: Themes.MainHeaderColor, color: Themes.WHITE}}>
                            Create {props.Title}
                        </Button>
                    </div>
                    <div className={classes.divider}/>
                    {props.data.map((value, index) => (
                        <div key={index} className={'col-xl-3 col-lg-4 col-md-6 col-12  mt-4'}>
                            <div className={clsx(classes.card, 'px-3 pt-2')}>
                                <h5>{value.title}</h5>
                                <p>{value.subtitle}</p>
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
                            <h6 className={classes.InputTitle}>{courseName} Name</h6>
                        </div>
                        <div className={'col-lg-9 col-12'}>
                            <TextField value={courseData.courseName} fullWidth variant="outlined"
                                       InputProps={{className: classes.TextFieldHeight,}}/>
                        </div>
                    </div>
                    {props.Title==='Courses'?<> <div className={'row my-4 pl-0 pr-0'}>
                        <div className={clsx('col-lg-3 col-12')}>
                            <h6 className={classes.InputTitle}>Category</h6>
                        </div>
                        <div className={'col-lg-9 col-12'}>
                            <Select
                                value={state.courseCategory}
                                isMulti
                                onChange={(selected) => {
                                    setState({courseCategory: selected});
                                }}
                                name="colors"
                                options={colourOptions}
                                className="basic-multi-select"
                                classNamePrefix="select"
                            />
                        </div>
                    </div>
                        <div className={'row pl-0 pr-0'}>
                            <div className={clsx('col-lg-3 col-12')}>
                                <h6 className={classes.InputTitle}>Subjects</h6>
                            </div>
                            <div className={'col-lg-9 col-12'}>
                                <Select
                                    value={state.courseSubject}
                                    isMulti
                                    onChange={(selected) => {
                                        setState({courseSubject: selected});
                                    }}
                                    name="colors"
                                    options={colourOptions}
                                    className="basic-multi-select"
                                    classNamePrefix="select"
                                />
                            </div>
                        </div></>:<></>}
                    {props.Title==='Subject'?<> <div className={'row my-4 pl-0 pr-0'}>
                        <div className={clsx('col-lg-3 col-12')}>
                            <h6 className={classes.InputTitle}>Course</h6>
                        </div>
                        <div className={'col-lg-9 col-12'}>
                            <Select
                                value={subjectData.subjectCourse}
                                isMulti
                                onChange={(selected) => {
                                    setSubjectData({subjectCourse: selected});
                                }}
                                name="colors"
                                options={colourOptions}
                                className="basic-multi-select"
                                classNamePrefix="select"
                            />
                        </div>
                    </div>
                        <div className={'row pl-0 pr-0'}>
                            <div className={clsx('col-lg-3 col-12')}>
                                <h6 className={classes.InputTitle}>Category</h6>
                            </div>
                            <div className={'col-lg-9 col-12'}>
                                <Select
                                    value={subjectData.subjectCategory}
                                    isMulti
                                    onChange={(selected) => {
                                        setSubjectData({subjectCategory: selected});
                                    }}
                                    name="colors"
                                    options={colourOptions}
                                    className="basic-multi-select"
                                    classNamePrefix="select"
                                />
                            </div>
                        </div>
                        <div className={'row pl-0 pr-0 my-4'}>
                            <div className={clsx('col-lg-3 col-12')}>
                                <h6 className={classes.InputTitle}>Topics</h6>
                            </div>
                            <div className={'col-lg-9 col-12'}>

                                <Select
                                    value={subjectData.subjectTopic}
                                    isMulti
                                    onChange={(selected) => {
                                        setSubjectData({subjectTopic: selected});
                                    }}
                                    name="colors"
                                    options={colourOptions}
                                    className="basic-multi-select"
                                    classNamePrefix="select"
                                />
                            </div>
                        </div>
                    </>:<></>}

                    {props.Title==='Topic'?<> <div className={'row my-4 pl-0 pr-0'}>
                        <div className={clsx('col-lg-3 col-12')}>
                            <h6 className={classes.InputTitle}>Course</h6>
                        </div>
                        <div className={'col-lg-9 col-12'}>
                            <Select
                                value={topicData.topicCourse}
                                isMulti
                                onChange={(selected) => {
                                    setTopicData({topicCourse: selected});
                                }}
                                name="colors"
                                options={colourOptions}
                                className="basic-multi-select"
                                classNamePrefix="select"
                            />
                        </div>
                    </div>
                        <div className={'row pl-0 pr-0'}>
                            <div className={clsx('col-lg-3 col-12')}>
                                <h6 className={classes.InputTitle}>Category</h6>
                            </div>

                            <div className={'col-lg-9 col-12'}>
                                <Select
                                    value={topicData.topicCategory}
                                    isMulti
                                    onChange={(selected) => {
                                        setTopicData({topicCategory: selected});
                                    }}
                                    name="colors"
                                    options={colourOptions}
                                    className="basic-multi-select"
                                    classNamePrefix="select"
                                />
                            </div>
                        </div>
                        <div className={'row pl-0 pr-0 my-4'}>
                            <div className={clsx('col-lg-3 col-12')}>
                                <h6 className={classes.InputTitle}>Subject</h6>
                            </div>
                            <div className={'col-lg-9 col-12'}>
                                <Select
                                    value={topicData.topicSubject}
                                    isMulti
                                    onChange={(selected) => {
                                        setTopicData({topicSubject: selected});
                                    }}
                                    name="colors"
                                    options={colourOptions}
                                    className="basic-multi-select"
                                    classNamePrefix="select"
                                />
                            </div>
                        </div>
                        <div className={'row pl-0 pr-0 my-4'}>
                            <div className={clsx('col-lg-3 col-12')}>
                                <h6 className={classes.InputTitle}>Tags</h6>
                            </div>
                            <div className={'col-lg-9 col-12'}>
                                <Select
                                    value={topicData.topicTag}
                                    isMulti
                                    onChange={(selected) => {setTopicData({topicTag: selected});}}
                                    name="colors"
                                    options={colourOptions}
                                    className="basic-multi-select"
                                    classNamePrefix="select"
                                     styles={ base => ({
                                         ...base,
                                         height: 35,
                                         minHeight: 35
                                     })}
                                />
                            </div>
                        </div>
                    </>:<></>}

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
    divider: {
        width: '100%',
        height: '1px',
        background: '#eee',
        marginTop: 10
    },
    title: {
        marginTop: '-16px',
        [theme.breakpoints.up('sm')]: {
            marginTop: '0px',

        },
    },
    card: {
        width: '100%',
        minHeight: '140px',
        border: '1px solid grey',
        borderRadius: 15,
        position: 'relative',
        [theme.breakpoints.up('sm')]: {
            width: '90%',

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
    justifyContentForm: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    TextFieldHeight: {
        height: 35,
        width: '100%'
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