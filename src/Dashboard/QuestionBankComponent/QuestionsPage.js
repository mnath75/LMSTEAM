import React from "react";
import {useLocation,useHistory} from "react-router-dom";
import {Button, makeStyles, Radio, RadioGroup, FormControlLabel , Dialog,Slide,DialogTitle,DialogActions,IconButton,TextField ,MenuItem} from "@material-ui/core";
import clsx from "clsx";
import {Themes} from "../../Theme/theme";
import AddIcon from '@material-ui/icons/Add';
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';
import ClearIcon from '@material-ui/icons/Clear';
import {crud} from "../../services/crud";
export default function QuestionPage() {
    const location = useLocation();
    const history = useHistory();
    const classes = styles();
    const [value, setValue] = React.useState('Agra');
    const [open, setOpen] = React.useState(false);
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
                    <h5>Category : <span className='back-tag' onClick={() => {history.push('/question-bank')}}>{location.state?.category}</span>/
                    <span className='back-tag' onClick={() => {history.push({pathname: '/question-course',
                              state: {category:location.state?.category,course:location.state?.course}})}}>{location.state?.course}</span>/
                               <span className='back-tag' onClick={() => {history.push({pathname: '/question-subject',
                              state: {category:location.state?.category,course:location.state?.course,subject:location.state?.subject}})}}>
                                  {location.state?.subject}</span>/  <span className='back-tag' onClick={() => {history.push({pathname: '/question-topic',
                              state: {category:location.state?.category,course:location.state?.course,subject:location.state?.subject,topic:location.state?.topic}})}}>
                                  {location.state?.topic}</span>/
                                  <span className='back-tag' onClick={() => {history.push({pathname: '/question-type',
                              state: {category:location.state?.category,course:location.state?.course,subject:location.state?.subject,topic:location.state?.topic}})}}>
                                  {location.state?.question_type}</span>
                    </h5>
                    </div>
                    <div className={'col-lg-7 col-12 d-lg-flex justify-content-lg-end'}>
                        <Button variant={'contained'} onClick={() => {setOpen(true);}} startIcon={<AddIcon/>} className={clsx(classes.Button)}>Create
                            Question</Button>
                        <Button variant={'contained'} startIcon={<AddIcon/>} className={clsx('mx-md-3 my-3 my-lg-0', classes.Button)}>Import
                            Question</Button>
                        <Button variant={'contained'} startIcon={<AddIcon/>} className={clsx(classes.Button)}>Export
                            Question</Button>
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
                                        <FormControlLabel value={option.value1} control={<Radio/>} label={option.value1}/>
                                    </RadioGroup>
                                ))}
                                <div className={'my-2'}>
                                    <Button size={'small'} color={'primary'}><CreateIcon/> Edit</Button>
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
                            <DialogTitle>{location.state?.type} Q.1</DialogTitle>
                            <IconButton onClick={() => {setOpen(false);}}  className={classes.menu}><ClearIcon/></IconButton>
                            <div className={'mydivider'}/>
                        </div>
                        <div className={'col-lg-8 offset-lg-4 col-12 my-3 px-lg-3 d-lg-flex justify-content-lg-end'}>
                            <TextField fullWidth  select label="Add Difficulty Level">
                                <MenuItem value={'english'}>Easy</MenuItem>
                                <MenuItem value={'hindi'}>Medium</MenuItem>
                                <MenuItem value={'both'}>Hard</MenuItem>
                            </TextField>
                            <TextField fullWidth className={'mx-lg-3 my-2 my-lg-0'} select label="Select">
                                <MenuItem value={'hindi'}>Hindi</MenuItem>
                                <MenuItem value={'english'}>English</MenuItem>
                                <MenuItem value={'both'}>Both</MenuItem>
                            </TextField>
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

}))
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});