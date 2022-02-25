import React, {useState} from "react";
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

export default function QuestionPage() {
    const location = useLocation();
    const history = useHistory();
    const classes = styles();
    const [value, setValue] = React.useState('Agra');
    const [open, setOpen] = React.useState(false);
    const [language, setLanguage] = useState("english");
    const [chip,setChip] = useState()
    const [options, setOptions] = useState([
        {
            checked: true,
            value: ""
        },
        {
            checked: false,
            value: ""
        },
        {
            checked: false,
            value: ""
        },
        {
            checked: false,
            value: ""
        }
    ]);

    const addOption = () => {
        setOptions([...options, {checked: false, value: ""}]);
    }

    const removeOption = (option) => {
        setOptions(options.filter(s => s != option));
    }

    // const optionValueChange = (e, option) => {
    //     setOptions(prev => {
    //         let old = [...prev];
    //         let selectedOption = old.find(s => s === option);
    //         selectedOption.value = e.target.value;
    //         return [old];
    //     })
    // }

    const Question=[
        {id:1,title:'Where is Taj?',option:[{value1:'Agra',},{value1:'Jaipur'},{value1:'Delhi'},{value1:'Pune'}]},
        {id:2,title:'10 is Divided by?',option:[{value1:'5',},{value1:'7'},{value1:'9'},{value1:'6'}]},
        {id:3,title:'40 is Divided by?',option:[{value1:'54',},{value1:'7'},{value1:'9'},{value1:'8'}]},
    ]
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
                            <Button variant={'contained'} onClick={() => {setOpen(true);}} startIcon={<AddIcon/>} className={clsx(classes.Button)}>Create
                                Question</Button>
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
                    {Question.map((question,index)=>(
                        <>
                            <div key={index} className={'col-12'}>
                                <h4>{index+1}. {question.title}</h4>
                                {question.option.map((option,index)=>(
                                    <RadioGroup key={index} aria-label="gender" name="gender1" value={value} onChange={(event) => {
                                        setValue(event.target.value);
                                    }}>
                                        <FormControlLabel value={option.value} control={<Radio/>} label={option.value1}/>
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

                </div>
            </div>
            <Dialog maxWidth={'lg'}
                    open={open}
                    TransitionComponent={Transition}>
                <div className={'container-fluid'}>
                    <div className={'row'}>
                        <div className={'col-12 pl-0 pr-0'}>
                            <DialogTitle>{location.state?.question_type} Q.1</DialogTitle>
                            <div style={{position:'absolute',top:15,right:90}}>
                                <Button variant={'contained'} className={clsx(classes.Button)}>Previous</Button>
                                <Button variant={'contained'} className={clsx(classes.Button,"mx-3")}>Save</Button>
                                <Button variant={'contained'} className={clsx(classes.Button)}>Next</Button>
                            </div>
                            <IconButton onClick={() => {setOpen(false);}}  className={classes.menu}><ClearIcon/></IconButton>
                            <hr/>
                        </div>
                        <div className={'col-lg-8 offset-lg-4 col-12  px-lg-3 d-lg-flex justify-content-lg-end'}>
                            <div>
                                <label className={'pb-2'}>Add Difficulty Level</label>
                            <TextField variant={'outlined'} fullWidth size={"small"} select label="">
                                <MenuItem value={'english'}>Easy</MenuItem>
                                <MenuItem value={'hindi'}>Medium</MenuItem>
                                <MenuItem value={'both'}>Hard</MenuItem>
                            </TextField>
                            </div>
                            <div className={'mx-lg-2 px-lg-2'}>
                                <label className={'pb-2'}>Select Language</label>
                            <TextField size={"small"} value={language} variant={'outlined'} onChange={(e) => {setLanguage(e.target.value)}} fullWidth  select>
                                <MenuItem value={'hindi'}>Hindi</MenuItem>
                                <MenuItem value={'english'}>English</MenuItem>
                                <MenuItem value={'both'}>Both</MenuItem>
                            </TextField>
                            </div>
                        </div>
                        <div className={'col-12 mt-3'}>
                            {language==='both'?<><TextField size="small" className={'my-2'} fullWidth placeholder={'Type MCQ Questions English'} variant={'outlined'} />
                                <TextField size="small" className={'my-2'} fullWidth placeholder={'Type MCQ Questions Hindi'} variant={'outlined'} /></>:<></>}
                            {language==='english'?<>
                                <TextField size="small" className={'my-2'} fullWidth placeholder={'Type MCQ Questions English'} variant={'outlined'} />
                            </>:<></>}
                            {language==='hindi'?<>
                                <TextField size="small" className={'my-2'} fullWidth placeholder={'Type MCQ Questions Hindi'} variant={'outlined'} />
                            </>:<></>}
                        </div>
                        <div className={'col-12 d-flex justify-content-between'}>
                            <h4 className={'py-3'}>Answers</h4>
                            <TextField size={"small"} className={'mt-2 mx-2'} value={"hindi"}  variant={'outlined'}   select>
                                <MenuItem value={'hindi'}>Single Choice</MenuItem>
                                <MenuItem value={'english'}>Multi Choice</MenuItem>
                                <MenuItem value={'both'}>None</MenuItem>
                            </TextField>
                        </div>

                        <Grid container spacing={2} justifyContent={"space-between"}>
                            {
                                options.map((option, index) => <>
                                    {
                                        language === "both" ? <>
                                            <Grid item xs={1}>
                                                <Grid container justifyContent={"flex-end"} alignItems={"center"}>
                                                    <Grid item>
                                                        <span className="bars">=</span>
                                                    </Grid>
                                                    <Grid item>
                                                        <FormControlLabel value="option1" control={<Radio checked={option.checked} color={"primary"}/>} />
                                                    </Grid>
                                                </Grid>
                                            </Grid>

                                            <Grid item xs={10}>
                                                <TextField fullWidth={true}  size="small" variant={'outlined'} placeholder={`Option ${index + 1} English`}/>
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

                                                <Grid item xs={1}>
                                                    <Grid container justifyContent={"flex-end"} alignItems={"center"}>
                                                        <Grid item>
                                                            <span className="bars">=</span>
                                                        </Grid>
                                                        <Grid item>
                                                            <FormControlLabel value="option1" control={<Radio checked={option.checked} color={"primary"}/>} />
                                                        </Grid>
                                                    </Grid>
                                                </Grid>

                                                <Grid item xs={10}>
                                                    <TextField fullWidth={true}  size="small" variant={'outlined'} placeholder={`Option ${index + 1} Hindi`}/>
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
                                             language === "hindi" ? <>
                                                     <>
                                                         <Grid item xs={1}>
                                                             <Grid container justifyContent={"flex-end"} alignItems={"center"}>
                                                                 <Grid item>
                                                                     <span className="bars">=</span>
                                                                 </Grid>
                                                                 <Grid item>
                                                                     <FormControlLabel value="option1" control={<Radio checked={option.checked} color={"primary"}/>} />
                                                                 </Grid>
                                                             </Grid>
                                                         </Grid>

                                                         <Grid item xs={10}>
                                                             <TextField fullWidth={true}  size="small" variant={'outlined'} placeholder={`Option ${index + 1} hindi`}/>
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
                                                            <FormControlLabel value="option1" control={<Radio checked={option.checked} color={"primary"}/>} />
                                                        </Grid>
                                                    </Grid>
                                                </Grid>

                                                <Grid item xs={10}>
                                                    <TextField fullWidth={true}  size="small" variant={'outlined'} placeholder={`Option ${index + 1} English`}/>
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
                        </Grid>
                        <div className={'col-12'}>
                            <h4 className={'pt-3'}>Solution</h4>
                            <TextField size="small" className={'my-2'} fullWidth placeholder={'Type Solutions'} variant={'outlined'} />
                        </div>
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
                        <div className={'col-5 mt-3'}>
                            <label className={'pb-2'}>Referance</label>

                            <div>
                                <ChipInput
                                    fullWidth
                                    // value={["2016 year","2020 years"]}
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
                        <div className={'col-12'}>
                            <DialogActions>
                                <Button onClick={() => {setOpen(false);}} color="secondary" variant={'contained'}>Cancel</Button>
                                <Button variant={'contained'} className={classes.Button}>Save</Button>
                            </DialogActions>
                        </div>

                    </div>
                </div>
            </Dialog>
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
