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
    const [AddFinalQuestions, setAddFinalQuestions] = useState('');
    function GetFormManage() {
        setOpen(true)
        setFormData({
            formTitle: 'Create New Question',
            ButtonTitle: 'SAVE',
        });
    }
    function AddQuestion(){
        console.log("hhhhbb")
        setadQuestions([...adQuestions,{value:""}]);
        setOpen(true)
        setFormData({
            formTitle: 'Create Questions',
            ButtonTitle: 'AddQ',
        });
        setPostQuestions({
            
            QDifficulty: '',
            QLanguage: '',
            QType: '',
            QUser: 'hhh',
            QTopic: 'ttt',
           
        });
    }
    function getClearAll() {
        
    }
    function AddFinalQuestion(){
        setOpen(true)
        setFormData({
            formTitle: 'Create New Question',
            ButtonTitle: 'SAVE',
        });
        setAddFinalQuestions({
            Queid: '',
            QPara:'',
            QText:'',
            QLanguage: '',
            QDes:'',
            QSol: '',
            Qis_active: '',
            QChoices:'',
        })
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
    const handleChangeLang= (event) => {
            setLanguage(event.target.value);
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
                                GetFormManage();
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
                         
                         <CKEditor editor={ClassicEditor} datapara={AddFinalQuestions.QPara} 
                                            onChange={(event, editor) => { const datapara = editor.getData()
                                            setText(datapara)
                                            }}
                                              value={AddFinalQuestions.QPara}
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
                        <div className={'col-lg-8 offset-lg-4 col-12  px-lg-3 d-lg-flex justify-content-lg-end'}>
                            <div className={'mx-lg-2 px-lg-2'}>
                            <label className={'pb-2'}>Select Level</label>
                            <TextField  size={"small"} value={PostQuestions.QDifficulty} variant={'outlined'}
                            onChange={(e) => {setPostQuestions({...PostQuestions,QDifficulty:e.target.value})}} 
                            name='QDifficulty'fullWidth  select>
                                <MenuItem value={'Difficult'}>Difficult</MenuItem>
                                <MenuItem value={'Moderate'}>Moderate</MenuItem>
                                <MenuItem value={'Easy'}>Easy</MenuItem>
                            </TextField>   
                            </div>
                            <div className={'mx-lg-2 px-lg-2'}>
                            <label className={'pb-2'}>Select Language</label>
                            <TextField size={"small"} value={PostQuestions.QLanguage} variant={'outlined'}
                             onChange={(e) => {setPostQuestions({...PostQuestions,QLanguage:e.target.value})}}  
                             name='QLanguage'  fullWidth  select>
                                <MenuItem value={'hindi'}>Hindi</MenuItem>
                                <MenuItem value={'english'}>English</MenuItem>
                                <MenuItem value={'both'}>Bilingual</MenuItem>
                            </TextField>
                            </div>
                        </div>    
                       
                        <div className={'col-12 d-flex justify-content-between'}>
                            <div className={'mx-lg-2 px-lg-2'}>  
                            <label className={'pb-2'}>Question Type</label>
                            <TextField  size={"small"} value={PostQuestions.QType} variant={'outlined'} 
                             onChange={(e) => {setPostQuestions({...PostQuestions,QType:e.target.value})}} 
                             name="QType" fullWidth  select>
                               <MenuItem value={'Single_Multi Choice'}>Single_Multi Choice</MenuItem>
                               <MenuItem value={'Comprehension Type'}>Comprehension Type</MenuItem>
                               <MenuItem value={'True/False'}>True/False</MenuItem>
                               <MenuItem value={'Fill in the blanks'}>Fill in the blanks</MenuItem>
                            </TextField>
                            </div>
                        </div>   

                        <Grid container className="mt-3">
                            <Grid item xs={12}>
                            <IconButton onClick={() => {
                                setOpen(false);
                                getClearAll()
                               }} className={classes.CloseBtn}><ClearIcon/>
                            </IconButton>
                                <Button
                                    fullWidth
                                    variant={"outlined"}
                                    color={"primary"}
                                    onClick={() => 
                                        AddQuestion()
                                    }
                                    startIcon={<AddIcon />}
                                >
                                    Add Questions
                                </Button>
                            </Grid>
                        </Grid> 
                       
                        <div>
                        {
                        adQuestions.map((option, index) => <>
                        { 
                        <Grid container spacing={2} justifyContent={"space-between"}>
                            <div className={'col-12 mt-3'}>Question.{index+1}</div>
                            <div className={'col-12 mt-3'}>
                                  {PostQuestions.QLanguage==='both'?<>
                                  <CKEditor editor={ClassicEditor} data1={PostQuestions.QText} 
                                                  onChange={(event, editor) => { const data1 = editor.getData()
                                                  setText(data1)
                                                  }}
                                                  config={{
                                                  headers: { 'Content-Type': 'application/json'},
                                                  placeholder:'Type MCQ Questions both english',
                                                  ckfinder: {
                                                  uploadUrl: '/uploads',
                                                  withCredentials: true,
                                                  headers: {
                                                   'X-CSRF-TOKEN': 'CSFR-Token',
                                                    Authorization: 'Bearer <JSON Web Token>'
                                          },
                                  },
                                  }}/>
                                    <CKEditor editor={ClassicEditor}  data2={PostQuestions.QText} 
                                                  onChange={(event, editor) => { const data2 = editor.getData()
                                                  setText(data2)
                                                  }}
                                                  config={{
                                                  headers: { 'Content-Type': 'application/json'},
                                                  placeholder:'Type MCQ Questions both hindi',
                                                  ckfinder: {
                                                  uploadUrl: '/uploads',
                                                  withCredentials: true,
                                                  headers: {
                                                   'X-CSRF-TOKEN': 'CSFR-Token',
                                                    Authorization: 'Bearer <JSON Web Token>'
                                          },
                                  },
                                  }}/>
                                  </>:<></>}
                                  {PostQuestions.QLanguage==='english'?<>
                                  <CKEditor editor={ClassicEditor} data3={PostQuestions.QText} 
                                                  onChange={(event, editor) => { const data3 = editor.getData()
                                                  setText(data3)
                                                  }}
                                                  config={{
                                                  headers: { 'Content-Type': 'application/json'},
                                                  placeholder:'Type MCQ Questions only english',
                                                  ckfinder: {
                                                  uploadUrl: '/uploads',
                                                  withCredentials: true,
                                                  headers: {
                                                    'X-CSRF-TOKEN': 'CSFR-Token',
                                                    Authorization: 'Bearer <JSON Web Token>'
                                          },
                                  },
                                  }}/>
                                      
                                  </>:<></>}
                                  {PostQuestions.QLanguage==='hindi'?<>
                                  <CKEditor editor={ClassicEditor} data4={PostQuestions.QText} 
                                                  onChange={(event, editor) => { const data4 = editor.getData()
                                                  setText(data4)
                                                  }}
                                                  config={{
                                                  headers: { 'Content-Type': 'application/json'},
                                                  placeholder:'Type MCQ Questions only Hindi',
                                                  ckfinder: {
                                                  uploadUrl: '/uploads',
                                                  withCredentials: true,
                                                  headers: {
                                                   'X-CSRF-TOKEN': 'CSFR-Token',
                                                    Authorization: 'Bearer <JSON Web Token>'
                                          },
                                  },
                                  }}/>
                                  </>:<></>}
                              </div>
                              {
                                options.map((option, index) => <>
                                    {
                                        PostQuestions.QLanguage === "both" ? <>
                                            <Grid item xs={1}>
                                                <Grid container justifyContent={"flex-end"} alignItems={"center"}>
                                                    <Grid item>
                                                        <span className="bars">=</span>
                                                    </Grid>
                                                    <Grid item>
                                                    <RadioGroup  name="english" onClick={() => {handleChangeR(option)}} >   
                                                        <FormControlLabel  
                                                         key={index} checked={radiovalue==option} control={<Radio color="primary"/>} />
                                                    </RadioGroup>
                                                    </Grid>
                                                </Grid>
                                            </Grid>

                                            <Grid item xs={10}>
                                            <CKEditor editor={ClassicEditor} data5={PostQuestions.QText} 
                                            onChange={(event, editor) => { const data5 = editor.getData()
                                            setText(data5)
                                            }}
                                            config={{
                                            headers: { 'Content-Type': 'application/json'},
                                            placeholder:'option'+'  '+ (index+1)+'  '+'english',
                                            ckfinder: {
                                            uploadUrl: '/uploads',
                                            withCredentials: true,
                                            headers: {
                                             'X-CSRF-TOKEN': 'CSFR-Token',
                                              Authorization: 'Bearer <JSON Web Token>'
                                    },
                            },
                                             }}/></Grid>

                                            <Grid item xs={1}>
                                                <Grid container justifyContent={"flex-end"}>
                                                    <Grid item xs={12}>
                                                        <Button
                                                            startIcon={<DeleteIcon />}
                                                            onClick={() => {removeOption(option)}}
                                                        >
                                                            Delete
                                                        </Button>
                                                    </Grid>
                                                </Grid>
                                            </Grid>

                                                <Grid item xs={1}>
                                                    <Grid container justifyContent={"flex-end"} alignItems={"center"}>
                                                        <Grid item>
                                                            <span className="bars">=</span>
                                                        </Grid>
                                                        <Grid item>
                                                        <RadioGroup key={index} name="english">     
                                                            <FormControlLabel value="apple" onClick={() => {handleChangeR(option)}}  control={<Radio checked={radiovalue===option}  color={"primary"}/>} />
                                                        </RadioGroup>  
                                                        </Grid>
                                                    </Grid>
                                                </Grid>

                                                <Grid item xs={10}>
                                                <CKEditor editor={ClassicEditor} data6={PostQuestions.QText} 
                                            onChange={(event, editor) => { const data6 = editor.getData()
                                            setText(data6)
                                            }}
                                            config={{
                                            headers: { 'Content-Type': 'application/json'},
                                            placeholder: 'option'+'  '+ (index+1) +'  '+'Hindi' ,
                                            ckfinder: {
                                            uploadUrl: '/uploads',
                                            withCredentials: true,
                                            headers: {
                                             'X-CSRF-TOKEN': 'CSFR-Token',
                                              Authorization: 'Bearer <JSON Web Token>'
                                    }, },
                                }}/>
                                                </Grid>

                                                <Grid item xs={1}>
                                                    <Grid container justifyContent={"flex-end"}>
                                                        <Grid item xs={12}>
                                                            <Button
                                                                startIcon={<DeleteIcon />}
                                                                onClick={() => {removeOption(option)}}
                                                            >
                                                                Delete
                                                            </Button>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                        </> :
                                             PostQuestions.QLanguage === "hindi" ? <>
                                                     <>
                                                         <Grid item xs={1}>
                                                             <Grid container justifyContent={"flex-end"} alignItems={"center"}>
                                                                 <Grid item>
                                                                     <span className="bars">=</span>
                                                                 </Grid>
                                                                 <Grid item>
                                                                 <RadioGroup key={index} onClick={() => {handleChangeR(option)}} name="hindi">      
                                                                     <FormControlLabel value="option1"  name="value" control={<Radio checked={radiovalue==option} color={"primary"}/>} />
                                                                 </RadioGroup>
                                                                 </Grid>
                                                             </Grid>
                                                         </Grid>

                                                         <Grid item xs={10}>
                                                         <CKEditor editor={ClassicEditor} data7={PostQuestions.QText} 
                                            onChange={(event, editor) => { const data7 = editor.getData()
                                            setText(data7)
                                            }}
                                            config={{
                                            headers: { 'Content-Type': 'application/json'},
                                            placeholder: 'option'+'  '+ (index+1) +'  '+'Hindi' ,
                                            ckfinder: {
                                            uploadUrl: '/uploads',
                                            withCredentials: true,
                                            headers: {
                                             'X-CSRF-TOKEN': 'CSFR-Token',
                                              Authorization: 'Bearer <JSON Web Token>'
                                    }, },
                                }}/>
                                            </Grid>

                                                         <Grid item xs={1}>
                                                             <Grid container justifyContent={"flex-end"}>
                                                                 <Grid item xs={12}>
                                                                     <Button
                                                                         startIcon={<DeleteIcon />}
                                                                         onClick={() => {removeOption(option)}}
                                                                     >
                                                                         Delete
                                                                     </Button>
                                                                 </Grid>
                                                             </Grid>
                                                         </Grid>
                                                     </>
                                                 </> :
                                            <>
                                                <Grid item xs={1}>
                                                    <Grid container justifyContent={"flex-end"} alignItems={"center"}>
                                                        <Grid item>
                                                            <span className="bars">=</span>
                                                        </Grid>
                                                        <Grid item>
                                                        <RadioGroup key={index}  name="radio-buttons-group"   onClick={() => {handleChangeR(option)}}>  
                                                            <FormControlLabel key={index} control={<Radio  color={"primary"}/>}  checked={radiovalue==option}/>
                                                        </RadioGroup>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>

                                        <Grid item xs={10}>
                                            <CKEditor editor={ClassicEditor} data8={PostQuestions.QText} 
                                            onChange={(event, editor) => { const data8 = editor.getData()
                                            setText(data8)
                                            }}
                                            config={{
                                               placeholder:'option'+'  '+ (index+1)+'  '+'english1',
                                               headers: { 'Content-Type': 'application/json'},
                                               ckfinder: {
                                               uploadUrl: '/uploads',
                                               withCredentials: true,
                                               headers: {
                                                 'X-CSRF-TOKEN': 'CSFR-Token',
                                                  Authorization: 'Bearer <JSON Web Token>'
                                                },},
                                            }}/>
                                        </Grid>

                                                <Grid item xs={1}>
                                                    <Grid container justifyContent={"flex-end"}>
                                                        <Grid item xs={12}>
                                                            <Button
                                                                startIcon={<DeleteIcon />}
                                                                onClick={() => {removeOption(option)}}
                                                            >
                                                                Delete
                                                            </Button>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                            </>
                                    }
                                </>)
                            }

                        <Grid container className="mt-3">
                            <Grid item xs={12}>
                                <Button
                                    fullWidth
                                    variant={"outlined"}
                                    color={"primary"}
                                    onClick={() => addOption()}
                                    startIcon={<AddIcon />}
                                >
                                    Add new option
                                </Button>
                            </Grid>
                        </Grid>  
                        <div className={'col-12 mt-3'}>
                        <h4 className={'pt-3'}>Solution</h4>
                              {PostQuestions.QLanguage==='both'?<>
                              <CKEditor editor={ClassicEditor} data9={text} 
                              onChange={(event, editor) => { const data9 = editor.getData()
                              setText(data9)}}
                              config={{
                              headers: { 'Content-Type': 'application/json'},
                              placeholder:'Type solution in english',
                              ckfinder: {
                              uploadUrl: '/uploads',
                              withCredentials: true,
                              headers: {
                                'X-CSRF-TOKEN': 'CSFR-Token',
                                Authorization: 'Bearer <JSON Web Token>'
                              }, }, }}/>
                            <Button  endIcon={<AddCircleIcon />} variant="outlined">
                            ADD Video Solution 
                            </Button>
                           <CKEditor editor={ClassicEditor} data10={text} 
                           onChange={(event, editor) => { const data10 = editor.getData()
                           setText(data10) }}
                           config={{
                           headers: { 'Content-Type': 'application/json'},
                           placeholder:'Type solution in hindi',
                           ckfinder: {
                           uploadUrl: '/uploads',
                           withCredentials: true,
                           headers: {
                             'X-CSRF-TOKEN': 'CSFR-Token',
                              Authorization: 'Bearer <JSON Web Token>'
                            }, }, }}/>
                            <Button  endIcon={<AddCircleIcon />} variant="outlined">
                              ADD Video Solution 
                            </Button>
                        </>:<></>}
                        {PostQuestions.QLanguage==='english'?<>
                       <CKEditor editor={ClassicEditor} data11={text} 
                        onChange={(event, editor) => { const data11 = editor.getData()
                        setText(data11)
                        }}
                        config={{
                        headers: { 'Content-Type': 'application/json'},
                        placeholder:'Type solution in english',
                        ckfinder: {
                        uploadUrl: '/uploads',
                        withCredentials: true,
                        headers: {
                           'X-CSRF-TOKEN': 'CSFR-Token',
                            Authorization: 'Bearer <JSON Web Token>'
        },
    },
}}/>
                        <Button  endIcon={<AddCircleIcon />} variant="outlined">
                            ADD Video Solution 
                        </Button>   
                        </>:<></>}
                        {PostQuestions.QLanguage==='hindi'?<>
                        <CKEditor editor={ClassicEditor} data12={text} 
                        onChange={(event, editor) => { const data12 = editor.getData()
                        setText(data12)
                        }}
                        config={{
                        headers: { 'Content-Type': 'application/json'},
                        placeholder:'Type solution in Hindi',
                        ckfinder: {
                        uploadUrl: '/uploads',
                        withCredentials: true,
                        headers: {
                           'X-CSRF-TOKEN': 'CSFR-Token',
                           Authorization: 'Bearer <JSON Web Token>'
               },
              },
            }}/>
                        <Button  endIcon={<AddCircleIcon />} variant="outlined">
                            ADD Video Solution 
                        </Button>
            </>:<></>}
                        </div>

                        <div className={'col-5 mt-3'}>
                            <label className={'pb-2'}>Referance</label>
                            <div>
                                <ChipInput
                                    fullWidth
                                    variant={'outlined'}
                                    placeholder={'referance years'}
                                    size={'small'}
                                    onAdd={(chip) => setChip(chip)}
                                    onDelete={(chip, index) => setChip(chip, index)}
                                />
                            </div>
                        </div>
                        <div className={'col-5 mt-3'}>
                            <label className={'pb-2'}>Tags</label>
                            <div>
                                <ChipInput value={["math","Physics"]}
                                    fullWidth
                                    variant={'outlined'}
                                    size={'small'}
                                    placeholder={'referance subject'}
                                    onAdd={(chip) => setChip(chip)}
                                    onDelete={(chip, index) => setChip(chip, index)}
                                />
                            </div>
                        </div> 
                        </Grid>
                      

                        }
                        </>)
                        } 
                        </div>

                </div> 
                        <DialogActions>
                                <Button onClick={() => {setOpen(false);}} color="secondary" variant={'contained'}>Cancel</Button>
                                <Button className={clsx(classes.Btn,)} variant={'contained'} onClick={async() => {
                                    if(formData.ButtonTitle==='SAVE'){
                                        await crud.create('/testquestionsapi/',{
                                            qid:AddFinalQuestions.Queid,
                                            question_para:AddFinalQuestions.QPara,
                                            question_text:AddFinalQuestions.QText,
                                            ques_lang:AddFinalQuestions.QLanguage,
                                            description:AddFinalQuestions.QDes,
                                            solution:AddFinalQuestions.QSol,
                                            is_active:AddFinalQuestions.Qis_active,
                                            choices:AddFinalQuestions.QChoices
                                        });
                               
                                 
                                       }
                                    if(formData.ButtonTitle==='AddQ'){
                                        await crud.create('/questionsapi/',{
                                            qtype:PostQuestions.QType,
                                            difficulty:PostQuestions.QDiffifulty,
                                            language:PostQuestions.QLanguage,
                                            user:'ooo',
                                            topic:'kkkk'
                                        });
                                        console.log("under",PostQuestions.QType)
                                    getClearAll();
                                    }
                                    setOpen(false)
                                    }} color="primary">
                                    {formData.ButtonTitle}

                                    
                                </Button>
                            </DialogActions>
              
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

