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

import Editor from 'ckeditor5-custom-build/build/ckeditor';
import { CKEditor } from '@ckeditor/ckeditor5-react'

import VideoUpload from "./UploadVideo";
import ReactHtmlParser from 'react-html-parser';

const names = [
    'English',
    'Hindi',
    'Gujrati',
    
  ];
export default function QuestionPageD() {  
    
    const [radiovalue, setRadiovalue] = useState();
    const [radiovaluedual, setRadiovaluedual] = useState();

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
    const [textqueDual, settextqueDual] = useState("")

    const [textsol, settextsol] = useState("")
    const [textsolDual, settextsolDual] = useState("")

    const [textqdes, settextqdes] = useState("")
    const [optionData, setoptionData] = useState([])
    const [optionDatadual, setoptionDatadual] = useState([])
    
   
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
    const [formData2, setFormData2] = useState({
        formTitle: '',
        ButtonTitle: ''
    })

    const [formData3, setFormData3] = useState({
        formTitle: '',
        ButtonTitle: ''
    })
    // post questions
    const [PostQuestions, setPostQuestions] = useState('');
    const [AddFinalQuestions, setAddFinalQuestions] = useState('');
    const[Tquestion,setTquestion]=useState([false]);
    const[TquestionDual,setTquestionDual]=useState([false]);
   
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
    function AddFinalQuestion2(){
        setOpen(true)
        setFormData3({
            formTitle: 'Create Final Question2',
            ButtonTitle: 'SAVE',
        });
    }

    function handleChangeR (option) {
        setRadiovalue(option);
         }
    function handleChangeRdual (option) {
            setRadiovaluedual(option);
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
            const data1= await crud.retrieve('/testquestionsapi/')
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
    const API_URl = "https://lmsoskillupdated.herokuapp.com"
    const UPLOAD_ENDPOINT = "imagedemo/";
    function uploadAdapter(loader) {
        return {
            upload: () => {
                return new Promise((resolve, reject) => {
                    const body = new FormData();
                    loader.file.then((file) => {
                        body.append("image_text", file);
                        fetch(`${API_URl}/${UPLOAD_ENDPOINT}`, {
                            method: "post",
                            body: body
                        })
                            .then((res => res.json()))
                            .then((res) => {
                                resolve({ default: `${res.image_text}` })
                            })
                            .catch((err) => {
                                reject(err);
                            })
                    })
                })
            }
        }
    }

    function uploadPlugin(editor) {
        editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
        return uploadAdapter(loader);
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
                                AddFinalQuestion2();
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
                              
                                {index+1}. {ReactHtmlParser(question?.question_text)}
                                {question?.choices.map((option,index)=>(
                                 <RadioGroup key={index} aria-label="gender" name="gender1" value={ReactHtmlParser(question?.choices.answer_text)}  
                                 onClick={() => {handleChangeQ(option)}}
                                > 
                                <FormControlLabel value={ReactHtmlParser(option.answer_text)} checked={AnswerRadio==option} control={<Radio/>} label={ReactHtmlParser(option.answer_text)}/>
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

            <Dialog  disableEnforceFocus={true}  maxWidth={'lg'}
             
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
                         
                <CKEditor editor={Editor} datapara={textpara} 
                                            onChange={(event, editor) => { const datapara = editor.getData()
                                            setTextpara(datapara)
                                            }}
                                            
                                            value={AddFinalQuestions.QPara}
                                            config={{
                                                extraPlugins: [uploadPlugin]
                                            }}
                />
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
                                  <CKEditor editor={Editor} data1={textqueDual} 
                                                  onChange={(event, editor) => { const data1 = editor.getData()
                                                  settextqueDual(data1)
                                                  }}
                                                  config={{
                                                    extraPlugins: [uploadPlugin]
                                                  }}
                                                  />
                                    <CKEditor editor={Editor}  data2={textque} 
                                                  onChange={(event, editor) => { const data2 = editor.getData()
                                                    settextque(data2)
                                                  }}
                                                  config={{
                                                    extraPlugins: [uploadPlugin]
                                                  }}
                                                  />
                                  </>:<></>}
                                  {PostQuestions.QLanguage===2?<>
                                  <CKEditor editor={Editor} data3={textque} 
                                                  onChange={(event, editor) => { const data3 = editor.getData()
                                                    settextque(data3)
                                                  }}
                                                  config={{
                                                    extraPlugins: [uploadPlugin]
                                                  }}
                                                  />
                                      
                                  </>:<></>}
                                  {PostQuestions.QLanguage===1?<>
                                  <CKEditor editor={Editor} data4={textque} 
                                                  onChange={(event, editor) => { const data4 = editor.getData()
                                                    settextque(data4)
                                                  }}
                                                config={{
                                                    extraPlugins: [uploadPlugin]
                                                }}  
                                                />
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
                                                    <RadioGroup key={index} id={index} onClick={() => {handleChangeRdual(option,index)}} name="is_right">      
                                                                     <FormControlLabel 
                                                                      name="is_right" control={<Radio 
                                                                      value={radiovaluedual}
                                                                      checked={radiovaluedual===option} 
                                                                      onChange={(event) => { 
                                                                        let Rvaluedual = [false,false,false,false,false,false,false,false,false,false,false,false,false]
                                                                        event.target.checked?Rvaluedual[index]=true:Rvaluedual[index]=false
                                                                        setTquestionDual(Rvaluedual);
                                                                        console.log("rvalue=eng",Rvaluedual)
                                                                    }}
                                                                    
                                                                    
                                                                    color={"primary"}/>} />
                                                    </RadioGroup>
                                                    </Grid>
                                                </Grid>
                                            </Grid>

                                            <Grid item xs={10}>
                                            <CKEditor editor={Editor} data5={optionDatadual[index]}
                                           onChange={(event, editor) => { const data5 = editor.getData()
                                            let optionsValuedual = [...optionDatadual]
                                            optionsValuedual[index] = data5
                                            setoptionDatadual(optionsValuedual);
                                        }}
                                        config={{
                                            extraPlugins: [uploadPlugin]
                                        }}
                                        /></Grid>

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
                                                        <RadioGroup key={index} id={index} onClick={() => {handleChangeR(option,index)}} name="is_right">      
                                                                     <FormControlLabel 
                                                                     
                                                                     
                                                                      name="is_right" control={<Radio 
                                                                      value={radiovalue}
                                                                      checked={radiovalue===option} 
                                                                        onChange={(event) => { 
                                                                        let RValue = [false,false,false,false,false,false,false,false,false,false,false,false,false]
                                                                        event.target.checked?RValue[index]=true:RValue[index]=false
                                                                        setTquestion(RValue);
                                                                        console.log("rvalue=",RValue)
                                                                    }}
                                                                    
                                                                    
                                                                    color={"primary"}/>} />
                                                        </RadioGroup>  
                                                        </Grid>
                                                    </Grid>
                                                </Grid>

                                                <Grid item xs={10}>
                                                <CKEditor editor={Editor} data6={optionData[index]} 
                                            onChange={(event, editor) => { const data6 = editor.getData()
                                                let optionsValue = [...optionData]
                                                optionsValue[index] = data6
                                                setoptionData(optionsValue);
                                            }}
                                            config={{
                                                extraPlugins: [uploadPlugin]
                                            }}
                                            />
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
                                                                     
                                                                 <RadioGroup key={index} id={index} onClick={() => {handleChangeR(option,index)}} name="is_right">      
                                                                     <FormControlLabel 
                                                                     
                                                                     
                                                                      name="is_right" control={<Radio 
                                                                      value={radiovalue}
                                                                      checked={radiovalue===option} 
                                                                        onChange={(event) => { 
                                                                        let RValue = [false,false,false,false,false,false,false,false,false,false,false,false,false]
                                                                        event.target.checked?RValue[index]=true:RValue[index]=false
                                                                        setTquestion(RValue);
                                                                        console.log("rvalue=",RValue)
                                                                    }}
                                                                    
                                                                    
                                                                    color={"primary"}/>} />
                                                                 </RadioGroup>
                                                                 </Grid>
                                                             </Grid>
                                                         </Grid>

                                                         <Grid item xs={10}>
                                            <CKEditor  key={index} id={index} editor={Editor} data7={optionData[index]}
                                           onChange={(event, editor) => { const data7 = editor.getData()
                                            let optionsValue = [...optionData]
                                            optionsValue[index] = data7
                                            setoptionData(optionsValue);
                                        }}
                                           
                                        config={{
                                            extraPlugins: [uploadPlugin]
                                        }}
                                        />
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
                                            <CKEditor editor={Editor} data8={optionData[index]}
                                            onChange={(event, editor) => { const data8 = editor.getData()
                                            let optionsValue = [...optionData]
                                            optionsValue[index] = data8
                                            setoptionData(optionsValue);
                                        }}
                                        config={{
                                            extraPlugins: [uploadPlugin]
                                        }}
                                        />
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
                              <CKEditor editor={Editor} data9={textsolDual} 
                              onChange={(event, editor) => { const data9 = editor.getData()
                              settextsolDual(data9)}}
                              config={{
                                extraPlugins: [uploadPlugin]
                              }}
                            />
                           < VideoUpload /> 
                           <CKEditor editor={Editor} data10={textsol} 
                           onChange={(event, editor) => { const data10 = editor.getData()
                           settextsol(data10) }}
                           config={{
                            extraPlugins: [uploadPlugin]
                           }}
                          />
                            < VideoUpload /> 
                        </>:<></>}
                        {PostQuestions.QLanguage===2?<>
                       <CKEditor editor={Editor} data11={textsol} 
                        onChange={(event, editor) => { const data11 = editor.getData()
                        settextsol(data11)
                        }}
                        config={{
                            extraPlugins: [uploadPlugin]
                        }}
                        />
                        < VideoUpload />  
                        </>:<></>}
                        {PostQuestions.QLanguage===1?<>
                        <CKEditor editor={Editor} data12={textsol} 
                        onChange={(event, editor) => { const data12 = editor.getData()
                        settextsol(data12)
                        }}
                        config={{
                            extraPlugins: [uploadPlugin]
                        }}
                        />
                      < VideoUpload /> 
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
                            {PostQuestions.QLanguage===1 || PostQuestions.QLanguage===2?<>
                                <Button className={clsx(classes.Btn,)} variant={'contained'} onClick={async() => {
                                if(formData2.ButtonTitle==='SAVE'){ 
                                        
                                        
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

                                        
                                        options.map((option,index) =>    
                                        {
                                        return(  
                                            {
                                                language:PostQuestions.QLanguage,
                                                answer_text:optionData[index],
                                                is_right:Tquestion[index]
                                                
                                            }
                                        )
                                        }
                                     )
                                    }
                                    );
                                    console.log("qid",Qid[(Qid.length)-1].qu_id)
                                    console.log("R value",Tquestion[index])  
                                    }
                                    }} color="primary">
                                    {formData2.ButtonTitle}
                                </Button>
                            </>:<></>}    
                            {PostQuestions.QLanguage===3?<>
                                <Button className={clsx(classes.Btn,)} variant={'contained'} onClick={async() => {
                                 if(formData3.ButtonTitle==='SAVE'){ 
                                    
                                    await crud.create('/testquestionsapi/',
                                    {
                                        qid:Qid[(Qid.length)-1].qu_id,
                                        question_para:textpara,
                                        question_text:textque,
                                        ques_lang:1,
                                        description:AddFinalQuestions.QDes,
                                        solution:textsol,
                                        is_active:'true',
                                        choices: 
                                    options.map((option,index) =>    
                                    {
                                    return(  
                                        {
                                            language:1,
                                            answer_text:optionData[index],
                                            is_right:Tquestion[index]
                                        }
                                    )
                                    
                                    }
                                    
                                    )
                                    
                                    }
                                    
                                    );
                                    
                                    console.log("qid",Qid[(Qid.length)-1].qu_id)  
                                    await crud.create('/testquestionsapi/',
                                    {
                                        qid:Qid[(Qid.length)-1].qu_id,
                                        question_para:textpara,
                                        question_text:textqueDual,
                                        ques_lang:2,
                                        description:AddFinalQuestions.QDes,
                                        solution:textsolDual,
                                        is_active:'true',
                                        choices: 
                                    options.map((option,index) =>    
                                    {
                                    return(  
                                        {
                                            language:2,
                                            answer_text:optionDatadual[index],
                                            is_right:TquestionDual[index]
                                        }
                                    )
                                    }
                                    )
                                    
                                    }
                                   
                                    );
                                    console.log("qid",Qid[(Qid.length)-1].qu_id)
                                }
                                }} 
                                color="primary">
                                {formData3.ButtonTitle}
                                </Button>
                            </>:<></>}    
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
const Transition = React.forwardRef(function Transition(props,ref,key) {
    return <Slide direction="down" ref={ref}  {...props} />;
});

