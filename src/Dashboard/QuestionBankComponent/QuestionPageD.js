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
    const i=1
    const [radiovalue, setRadiovalue] = useState();
    const [Qdiff, setQdiff] = useState('');
    const [Qtype, setQtype] = useState('');
  
    const params = useParams();
    const p =[params.id];
    const [data, setData] = useState()
    const [loader,setLoader] = useState(false)
  
    const location = useLocation();
    const history = useHistory();
    const [Question,setQuestion]=useState();

    const [Type,setType]=useState();
    const [Diff,setDiff]=useState();
    const [Lang,setLang]=useState();  

    const[AnswerRadio,setAnswerRadio]=useState();
    const [QuestionData,setQuestionData]=useState();
    const classes = styles();

    const [open, setOpen] = useState(false);
    const [chip,setChip] = useState()

    const [textpara, setTextpara] = useState("")
    const [textque, settextque] = useState("")
    const [textsol, settextsol] = useState("")
    const [textqdes, settextqdes] = useState("")
    const [optionData, setoptionData] = useState([])
  
    const R=[];
    const S=0;
   
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
    
    const inputHandler = (event, editor, index) => {
       
        let optionsValue = [...optionData]
        optionsValue[index] = editor.getData()
        setoptionData(optionsValue);

    };
    const [formData, setFormData] = useState({
        formTitle: '',
        ButtonTitle: ''
    })
    const [formData2, setFormData2] = useState({
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
            ButtonTitle: 'Add Details',
        });
    }

    function questionList(){
        setadQuestions([...adQuestions,{value:""}]);
    }
    
    function AddFinalQuestion(){
        setOpen(true)
        setFormData2({
            formTitle: 'Create Final Question',
            ButtonTitle: 'SAVE',
        });
    }

    function handleChangeR (option) {
        setRadiovalue(option);
         }
    function handleChangeQ(option)   {
        setAnswerRadio(option);
        
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
    const[Qid,setQid]=useState();
    const qid=0;
 
    async function getQid()
    {
        setLoader(true);
        try{
            const data1= await crud.retrieve('/questionsapi/')
            setQid(data1);
            setLoader(false);
           }
        catch(e){
        setLoader(false);
        }
    }

    async function getType()
    {
        setLoader(true);
        try{
            const data1= await crud.retrieve('/Qtype/')
            setType(data1);
            setLoader(false);
           }
        
        catch(e){
        setLoader(false);
        }
    }
    async function getDifficulty()
    {
        setLoader(true);
        try{
            const data1= await crud.retrieve('/DLevel/')
            setDiff(data1);
            setLoader(false);
           }
        
        catch(e){
        setLoader(false);
        }
    }
    async function getLanguage()
    {
        setLoader(true);
        try{
            const data1= await crud.retrieve('/Language/')
            setLang(data1);
            setLoader(false);
           }
        
        catch(e){
        setLoader(false);
        }
    }
 
    useEffect(() => {
        
        getQuestion();
        getAll();
        getType();
        getDifficulty();
        getLanguage();
        getQid();
       
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
                                state: {category:location.state?.category,course:location.state?.course,subject:location.state?.subject,topic:location.state?.topic,topic1:location.state?.topic1}})}}>
                                  {location.state?.topic}</span>&gt;
                            <span className='back-tag' onClick={() => {history.push({pathname: '/question-type',
                                state: {category:location.state?.category,course:location.state?.course,subject:location.state?.subject,topic:location.state?.topic,topic1:location.state?.topic1}})}}>
                                  {location.state?.question_type}</span>
                        </h5>
                    </div>
                    <div className={'col-lg-7 col-12 d-lg-flex justify-content-lg-end'}>
                        <label htmlFor="contained-button-file">
                            <Button
                            onClick={() => {
                                GetFormManage();
                                AddFinalQuestion();
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
                         
                         <CKEditor editor={ClassicEditor} datapara={textpara} 
                                            onChange={(event, editor) => { const datapara = editor.getData()
                                            setTextpara(datapara)
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
                            {Diff?.length?<>
                            <TextField  size={"small"} value={PostQuestions.QDifficulty} variant={'outlined'}
                            onChange={(e) => {setPostQuestions({...PostQuestions,QDifficulty:e.target.value})}} 
                            name='QDifficulty'fullWidth  select>
                                {Diff.map((diff,index)=>(
                                <MenuItem value={diff.dl_id}>{diff.dl_title}</MenuItem>
                                ))}
                            </TextField>  
                            </>:<><h2 className='text-center pt-5'></h2></>}   
                            </div>
                            <div className={'mx-lg-2 px-lg-2'}>
                            <label className={'pb-2'}>Select Language</label>
                            {Lang?.length?<>
                            <TextField size={"small"} value={PostQuestions.QLanguage} variant={'outlined'}
                             onChange={(e) => {setPostQuestions({...PostQuestions,QLanguage:e.target.value})}}  
                             name='QLanguage'  fullWidth  select>
                            {Lang.map((lang,index)=>(   
                                <MenuItem value={lang.lg_id}>{lang.lg_title}</MenuItem>
                            ))}
                            </TextField>
                            </>:<><h2 className='text-center pt-5'></h2></>}  
                            </div>
                        </div>    
                       
                        <div className={'col-12 d-flex justify-content-between'}>
                            <div className={'mx-lg-2 px-lg-2'}>  
                            <label className={'pb-2'}>Question Type</label>
                            {Type?.length?<>
                            <TextField  size={"small"} value={PostQuestions.QType} variant={'outlined'} 
                             onChange={(e) => {setPostQuestions({...PostQuestions,QType:e.target.value})}} 
                             name="QType" fullWidth  select>
                             {Type.map((type,index)=>(     
                               <MenuItem value={type.qt_id}>{type.qt_title}</MenuItem>
                            ))}
                            </TextField>
                            </>:<><h2 className='text-center pt-5'></h2></>}   
                            </div>
                        </div>   

                        <Grid container className="mt-3">
                            <Grid item xs={12}>
                            <DialogActions>
                            <Button className={clsx(classes.Btn,)} startIcon={<AddIcon />} variant={'contained'} onClick={async() => {
                                    if(formData.ButtonTitle==='Add Details'){
                                        await crud.create('/questionsapi/',{
                                            qtype:PostQuestions.QType,
                                            difficulty:PostQuestions.QDifficulty,
                                            language:PostQuestions.QLanguage,
                                            user:1,
                                            topic:location.state?.topic1
                                        });
                                    console.log("under",)
                                    
                                    }
                                    
                                    }} color="primary">
                                    {formData.ButtonTitle}
                                   

                            </Button>
                            <Button className={clsx(classes.Btn,)} startIcon={<AddIcon />} variant={'contained'}
                            onClick={async() => { questionList() }} color="primary" >
                              ADD Questions
                            </Button>
                            </DialogActions>
                            </Grid>
                        </Grid> 
                       
                        <div>
                        {
                        adQuestions.map((option, index) => <>
                        { 
                        <Grid container spacing={2} justifyContent={"space-between"}>
                            <div className={'col-12 mt-3'}>Question.{index+1}</div>
                            <div className={'col-12 mt-3'}>
                                  {PostQuestions.QLanguage===3?<>
                                  <CKEditor editor={ClassicEditor} data1={textque} 
                                                  onChange={(event, editor) => { const data1 = editor.getData()
                                                  settextque(data1)
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
                                    <CKEditor editor={ClassicEditor}  data2={textque} 
                                                  onChange={(event, editor) => { const data2 = editor.getData()
                                                    settextque(data2)
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
                                  {PostQuestions.QLanguage===2?<>
                                  <CKEditor editor={ClassicEditor} data3={textque} 
                                                  onChange={(event, editor) => { const data3 = editor.getData()
                                                    settextque(data3)
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
                                  {PostQuestions.QLanguage===1?<>
                                  <CKEditor editor={ClassicEditor} data4={textque} 
                                                  onChange={(event, editor) => { const data4 = editor.getData()
                                                    settextque(data4)
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
                                        PostQuestions.QLanguage === 3 ? <>
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
                                            <CKEditor editor={ClassicEditor} data5={optionData[index]}
                                           onChange={(event, editor) => { const data5 = editor.getData()
                                            let optionsValue = [...optionData]
                                            optionsValue[index] = data5
                                            setoptionData(optionsValue);
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
                                                <CKEditor editor={ClassicEditor} data6={optionData[index]} 
                                            onChange={(event, editor) => { const data6 = editor.getData()
                                                let optionsValue = [...optionData]
                                                optionsValue[index] = data6
                                                setoptionData(optionsValue);
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
                                             PostQuestions.QLanguage === 1 ? <>
                                                     <>
                                                         <Grid item xs={1}>
                                                             <Grid container justifyContent={"flex-end"} alignItems={"center"}>
                                                                 <Grid item>
                                                                     <span className="bars">=</span>
                                                                 </Grid>
                                                                 <Grid item>
                                                                     
                                                                 <RadioGroup key={index} onClick={() => {handleChangeR(option,index)}} name="is_right">      
                                                                     <FormControlLabel 
                                                                      onChange={(e) => {setAddFinalQuestions({...AddFinalQuestions,
                                                                        
                                                                        is_right:e.target.value ? true:false
                                                                    })
                                                                    }
                                                                    } 
                                                                      value={ AddFinalQuestions.is_right } 
                                                                      name="is_right" control={<Radio 
                                                                      checked={radiovalue===option} 
                                                                      color={"primary"}/>} />
                                                                 </RadioGroup>
                                                                 </Grid>
                                                             </Grid>
                                                         </Grid>

                                                         <Grid item xs={10}>
                                            <CKEditor  key={index} editor={ClassicEditor} data7={optionData[index]}
                                           onChange={(event, editor) => { const data7 = editor.getData()
                                            let optionsValue = [...optionData]
                                            optionsValue[index] = data7
                                            setoptionData(optionsValue);
                                        }}
                                           
                                            config={{
                                            headers: { 'Content-Type': 'application/json'},
                                            placeholder: 'option'+'  '+ (index+1) +'  '+'Hindi-only' ,
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
                                            <CKEditor editor={ClassicEditor} data8={optionData[index]}
                                           onChange={(event, editor) => { const data8 = editor.getData()
                                            let optionsValue = [...optionData]
                                            optionsValue[index] = data8
                                            setoptionData(optionsValue);
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
                              {PostQuestions.QLanguage===3?<>
                              <CKEditor editor={ClassicEditor} data9={textsol} 
                              onChange={(event, editor) => { const data9 = editor.getData()
                              settextsol(data9)}}
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
                           <CKEditor editor={ClassicEditor} data10={textsol} 
                           onChange={(event, editor) => { const data10 = editor.getData()
                           settextsol(data10) }}
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
                        {PostQuestions.QLanguage===2?<>
                       <CKEditor editor={ClassicEditor} data11={textsol} 
                        onChange={(event, editor) => { const data11 = editor.getData()
                        settextsol(data11)
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
                        {PostQuestions.QLanguage===1?<>
                        <CKEditor editor={ClassicEditor} data12={textsol} 
                        onChange={(event, editor) => { const data12 = editor.getData()
                        settextsol(data12)
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
                            <TextField value={AddFinalQuestions.QDes} variant={'outlined'}
                            onChange={(e) => {setAddFinalQuestions({...AddFinalQuestions,QDes:e.target.value})}} 
                            name='QDes'/>
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
                        <DialogActions>
                                <Button onClick={() => {setOpen(false);}} color="secondary" variant={'contained'}>Cancel</Button>
                                <Button className={clsx(classes.Btn,)} variant={'contained'} onClick={async() => {
                                    if(formData2.ButtonTitle==='SAVE'){ 
                                        console.log('optiondata', optionData)
                                        
                                        await crud.create('/testquestionsapi/',
                                        
                                        {
                                       
                                            qid:Qid[(Qid.length)-1].qu_id,
                                            question_para:textpara,
                                            question_text:textque,
                                            ques_lang:PostQuestions.QLanguage,
                                            description:AddFinalQuestions.QDes,
                                            solution:textsol,
                                            is_active:'true',
                                            choices:

                                        
                                        options.map((option, index) => <>
                                        {
                                            [
                                            {
                                                language:PostQuestions.QLanguage,
                                                answer_text:optionData[index],
                                                is_right:AddFinalQuestions.is_right
                                                
                                            }
                                            ]
                                          
                                        }
                                       
                                        </>)
                                         
                                        }
                                       
                                        );
                                        console.log("R value",AddFinalQuestions.is_right)  
                                        }
                                      
                                    }} color="primary">
                                    {formData2.ButtonTitle}

                                </Button>
                            </DialogActions>   
                        </Grid>
                        
                        
                        }
                        </>)
                        } 
                        </div>

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

