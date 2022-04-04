
import React, {useEffect, useState} from 'react'
import {useHistory} from  'react-router-dom'
import clsx from "clsx";
import {makeStyles,TextField,InputAdornment,Button,IconButton,Menu,MenuItem,Dialog,DialogActions,DialogTitle} from '@material-ui/core';
import {Search ,FilterList,Add,MoreVert,Edit,Delete,Clear} from '@material-ui/icons';
import Loader from '../../MainComponents/Loader';
import {Themes} from "../../Theme/theme";
import {crud} from "../../services/crud";
import Slide from '@material-ui/core/Slide';
import '../QuestionBankComponent/QuestionCss.css';
import { useLocation } from "react-router-dom";
export default function QuestionCreateCourse() {
    const classes = useStyles();
    const location = useLocation();
    const history = useHistory();
    const [formData, setFormData] = useState({
        formTitle: '',
        ButtonTitle: ''
    });
    const [loader,setLoader] = useState(false)
    const [open, setOpen] = useState(false);
    const [data, setData] = useState()
    const [anchorEl, setAnchorEl] = useState(null);
    const [courseData, setCourseData] = useState('');
    const [courses,setCourses]=useState();
    function GetFormManage() {
        setOpen(true)
            setFormData({
                formTitle: 'Create New Category',
                ButtonTitle: 'Create Category',
            });
    }
    function getClearAll() {
        setCourseData({
            courseName: '',
            course_subtitle:''
        });
    }
    //Edit
    function getEdit() {
        setOpen(true)
            setFormData({
                formTitle: 'Edit Category',
                ButtonTitle: 'UPDATE'
            });
            setCourseData({
                courseName: data.category_title,
                course_subtitle:data.category_short
            })
    }
    //delete
    async function deletecourse(){
       await crud.confirm();
        await crud.delete('/categoryapi/'+ data.category_id);
        getCourses();

    }
    // getCourses
    async function getCourses()
    {
        setLoader(true);
        try{
        const data= await crud.retrieve('/categoryapi/');
        setCourses(data);
        setLoader(false);
    }
    catch(e){
        setLoader(false);
    }
}
    useEffect(() => {
        getClearAll();
        getCourses();
        
    }, [location])
    return (
        <>
            <div className={'container-fluid py-4 '}>
               
            </div>
         
           
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
    justifyContentForm: {
        display: 'flex',
        justifyContent: 'space-between'
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