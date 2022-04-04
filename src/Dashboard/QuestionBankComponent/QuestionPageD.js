import React, {useState,useEffect} from "react";
import {useLocation,useHistory} from "react-router-dom";
import {Button, makeStyles, Radio, RadioGroup, FormControlLabel , Dialog,Slide,DialogTitle,DialogActions,IconButton,TextField ,MenuItem, Grid} from "@material-ui/core";
import clsx from "clsx";
import {Themes} from "../../Theme/theme";
import AddIcon from '@material-ui/icons/Add';
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';
import ClearIcon from '@material-ui/icons/Clear';
import {crud} from "../../services/crud";
import ChipInput from 'material-ui-chip-input'
import Loader from '../../MainComponents/Loader';
import { useParams } from "react-router-dom";
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import AddCircleIcon from '@mui/icons-material/AddCircle';

import OutlinedInput from '@mui/material/OutlinedInput';
import Checkbox from '@mui/material/Checkbox';
import ListItemText from '@mui/material/ListItemText';
const names = [
    'English',
    'Hindi',
    'Gujrati',
    
  ];
export default function QuestionPageD() {  
    const [radiovalue, setRadiovalue] = useState(null);
    const [Qdiff, setQdiff] = useState('');
    const [Qtype, setQtype] = useState('');
  
    const params = useParams();
    const p =[params.id];
    const [data, setData] = useState()
    const [loader,setLoader] = useState(false)
    const [courseData, setCourseData] = useState('');
    const location = useLocation();
    const history = useHistory();
    const [Question,setQuestion]=useState();
    const[AnswerRadio,setAnswerRadio]=useState();
    const [QuestionData,setQuestionData]=useState();
    const classes = styles();
    const [value, setValue] = useState('Agra');
    const [open, setOpen] = useState(false);
    const [language, setLanguage] = useState("english");
    const [difficulty, setDifficulty] = useState("Difficulty");
    const [chip,setChip] = useState()
    const [text, setText] = useState("")
    const [personName, setPersonName] = useState([]);
    const[adQuestions,setadQuestions]=useState([]);
    const [options, setOptions] =  useState([
        {

        },
        {
           
        },
        {
            
        },
        {
            
        }
    ]);
    const [formData, setFormData] = useState({
        formTitle: '',
        ButtonTitle: ''
    })
    // post questions
    const [PostQuestions, setPostQuestions] = useState('');

    function GetFormManage() {
        setOpen(true)
        setFormData({
            formTitle: 'Create New Question',
            ButtonTitle: 'Add Question',
        });
    }
    function AddQuestion(){
        setOpen(true)
        setFormData({
            formTitle: 'Create New Question',
            ButtonTitle: 'Save',
        });
    }
    function handleChangeR (option) {
        setRadiovalue(option);
        console.log('radiovalue', radiovalue);
        }
    function handleChangeQ(option)   {
        setAnswerRadio(option);
        console.log('radiovalue', Question);
    }
   
 
    const handleChange = (event) => {
        setQdiff(event.target.value);
      };
    
    const handleChangeType = (event) => {
        setQtype(event.target.value);
      };  
    const handleChangeLanguage = (event) => {
        const {
          target: { value },
        } = event;
        setPersonName(
          // On autofill we get a stringified value.
          typeof value === 'string' ? value.split(',') : value,
        );
      };  
    const addOption = () => {
        setOptions([...options, {checked: false, value: ""}]);
      
    }
    const addQuestion=()=>{
        console.log("hhhellop")
        setadQuestions([...adQuestions,{value:""}]);
    }
    const removeOption = (option) => {
        setOptions(options.filter(s => s != option));
    }
    function getClearAll() {
        setPostQuestions({
            QParagraph: '',
            QText:''

        });
    }

    function getEdit() {
        setOpen(true)
        setFormData({
            formTitle: 'Edit Question',
            ButtonTitle: 'UPDATE'
        });
        setPostQuestions({
            QParagraph: data.question_para,
            QText:data.question_text
        })
    }

    async function getQuestion()
    {
        setLoader(true);
        try{
            const data1= await crud.retrieve('/questions/?qtype='+params.id+'&&')
            setQuestion(data1);
            setLoader(false);
            console.log(data1.title)
            }
        
        catch(e){
        setLoader(false);
        }
    }
    async function getAll()
    {
       
        setLoader(true);
        try{
            const data1= await crud.retrieve('/questions/')
            setQuestionData(data1);
            setLoader(false);
           }
        
        catch(e){
        setLoader(false);
        }
    }
    useEffect(() => {
        getClearAll();
        getQuestion();
        getAll();
    }, [location]);
  
    


    return (
        <>
            <div className={'container-fluid px-lg-5 mt-3'}>
                <div className={'row'}>
                    <div className={'col-12 col-lg-5 py-2'}>
                        <h5>Category : <span className='back-tag' onClick={() => {history.push('/question-bank')}}>{location.state?.category}</span>&gt;
                            <span className='back-tag' onClick={() => {history.push({pathname: '/question-course',
                                state: {category:location.state?.category,course:location.state?.course}})}}>{location.state?.course}</span>&gt;
                            <span className='back-tag' onClick={() => {history.push({pathname: '/question-subject',
                                state: {category:location.state?.category,course:location.state?.course,subject:location.state?.subject}})}}>
                                  {location.state?.subject}</span>&gt; <span className='back-tag' onClick={() => {history.push({pathname: '/question-topic',
                                state: {category:location.state?.category,course:location.state?.course,subject:location.state?.subject,topic:location.state?.topic}})}}>
                                  {location.state?.topic}</span>&gt;
                            <span className='back-tag' onClick={() => {history.push({pathname: '/question-type',
                                state: {category:location.state?.category,course:location.state?.course,subject:location.state?.subject,topic:location.state?.topic}})}}>
                                  {location.state?.question_type}</span>
                        </h5>
                    </div>
                    <div className={'col-lg-7 col-12 d-lg-flex justify-content-lg-end'}>
                        <label htmlFor="contained-button-file">
                            <Button
                            onClick={() => {
                                GetFormManage()
                            }}
                            variant={'contained'}  startIcon={<AddIcon/>} className={clsx(classes.Button)}>
                                Create Question
                            </Button>
                        </label>
                        <input
                            accept="image/*"
                            className={classes.input}
                            id="contained-button-file"
                            multiple
                            type="file"
                        />
                        <label htmlFor="contained-button-file">
                            <Button startIcon={<AddIcon/>}  variant="contained" color="primary" component="span" className={clsx('mx-md-3 my-3 my-lg-0', classes.Button)}>
                                Import Question
                            </Button>
                        </label>

                        <label htmlFor="contained-button-file">
                            <Button variant={'contained'} startIcon={<AddIcon/>} className={clsx(classes.Button)}>Export
                                Question</Button>
                        </label>

                    </div>
                    <hr className={'my-3'}/>
                    {Question?.length?<>
                    {Question.map((question,index)=>(
                        <>
                        
                            <div key={index} className={'col-12'}>
                                <h4>{index+1}. {question?.title}</h4>
                                {question?.answer_set.map((option,index)=>(
                                 <RadioGroup key={index} aria-label="gender" name="gender1" value={question?.answer_set.answer_text}  
                                 onClick={() => {handleChangeQ(option)}}
                                > 
                                <FormControlLabel value={option.answer_text} checked={AnswerRadio==option} control={<Radio/>} label={option.answer_text}/>
                                </RadioGroup>
                                 ))}
                                <div className={'my-2'}>
                                    <Button onClick={() => {setOpen(true);}} size={'small'} color={'primary'}><CreateIcon/> Edit</Button>
                                    <Button size={'small'} className={'mx-3'} color={'secondary'} onClick={()=>{crud.confirm();}}><DeleteIcon/> Delete</Button>
                                </div>
                            </div>
                            <hr/>
                        </>
                    ))}
                    </>:<><h2 className='text-center pt-5'>no question...</h2></>}

                </div>
            </div> 

            <Dialog maxWidth={'lg'}
             
             open={open}
             TransitionComponent={Transition}>
               <div className={'container-fluid'}>
                <div className={'row'}>
                <div className={'col-12 pl-0 pr-0'}>
                            <DialogTitle>{location.state?.question_type} </DialogTitle>
                            <div style={{position:'absolute',top:15,right:90}}>

                                <Button variant={'contained'} className={clsx(classes.Button)}>Previous</Button>
                                <Button variant={'contained'} className={clsx(classes.Button,"mx-3")}>Save</Button>
                                <Button variant={'contained'} className={clsx(classes.Button)}>Next</Button>
                            </div>
                            <IconButton onClick={() => {setOpen(false);}}  className={classes.menu}><ClearIcon/></IconButton>
                            <hr/>
                </div>
                <div className={'col-12 mt-3'}>
                         
                         <CKEditor editor={ClassicEditor} datapara={PostQuestions.QText} 
                                            onChange={(event, editor) => { const datapara = editor.getData()
                                            setText(datapara)
                                            }}
                                              config={{
                                              headers: { 'Content-Type': 'application/json'},
                                              placeholder:'paragraph type something',
                                              ckfinder: {
                                              uploadUrl: '/uploads',
                                              withCredentials: true,
                                              headers: {
                                               'X-CSRF-TOKEN': 'CSFR-Token',
                                                Authorization: 'Bearer <JSON Web Token>'
                                            },
                            },
                            }}/>
                        <Grid container className="mt-3">
                            <Grid item xs={12}>
                                <Button
                                    fullWidth
                                    variant={"outlined"}
                                    color={"primary"}
                                    onClick={() => addQuestion()}
                                    startIcon={<AddIcon />}
                                >
                                    Add Questions
                                </Button>
                            </Grid>
                        </Grid>
                </div> 








                <div className={'col-12'}>
                            <DialogActions>
                                <Button onClick={() => {setOpen(false);}} color="secondary" variant={'contained'}>Cancel</Button>
                                <Button className={clsx(classes.Btn,)} variant={'contained'} onClick={async() => {
                                    if(formData.ButtonTitle==='Save'){
                                          await crud.create('/testquestionsapi/',{
                                            question_para:PostQuestions.QParagraph,
                                            question_text:PostQuestions.QText
                                            
                                         });
                                    getQuestion();
                                    getClearAll();
                                       }
                                    if(formData.ButtonTitle==='UPDATE'){
                                        await crud.update('/questionsapi/'+data.sub_id+'/',{
                                                        question_para:PostQuestions.QParagraph,  
                                                        question_text:PostQuestions.QText 
                                         });
                                    getQuestion();
                                    }
                                    setOpen(false)
                                    }} color="primary">
                                    {formData.ButtonTitle}

                                    
                                </Button>
                            </DialogActions>
                        </div>
                </div>
                </div>

            </Dialog>    
            {loader?<Loader/>:<></>}
</>
)            
}


const styles = makeStyles((theme) => ({
    Button: {
        background: Themes.MainHeaderColor,
        color: Themes.WHITE
    },
    menu:{
        position:'absolute',
        top:7,
        right:0,
        [theme.breakpoints.up('sm')]: {
            right:20,
            top:10},
    },
    input:{
        display:"none"
    }

}))
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});

