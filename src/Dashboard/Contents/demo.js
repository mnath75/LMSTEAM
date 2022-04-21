import React, { useEffect, useState } from "react";
import {
  makeStyles,
  
} from "@material-ui/core";
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import {IconButton, Switch} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
//import  styles from './Contents.css'
import { Themes } from "../../Theme/theme";
import {Add} from "@material-ui/icons";
import { crud } from "../../services/crud";
import { useLocation } from "react-router-dom";
import clsx from "clsx";
import { MobileDateTimePicker } from '@mui/x-date-pickers/MobileDateTimePicker';
import TextField from '@mui/material/TextField';

const label = {inputProps: { 'aria-label': 'Switch demo'}};
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(1),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 1 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export default function CreateNewTest() {
  const classes = useStyles();
  const location = useLocation();
  const [loader, setLoader] = useState(false);
  const [open, setOpen] = useState(false);
  const [testData,settestData]=useState();
  const [testLayout,settestLayout]=useState();
  const [clearedDate, setClearedDate] = useState(null);
  const [value, setValue] = useState(
    new Date('2019-01-01T18:54'),
  );

  const [formData, setFormData] = useState({
    formTitle: "",
    ButtonTitle: "",
  });
  const [saveTest, setsaveTest] = useState('');

  function AddsaveTest(){
  setOpen(true)
  setsaveTest({
      formTitle: 'Create Test',
      ButtonTitle: 'Create Test',
  });
  }
  function saveTestData() {
        setOpen(true)
        setFormData({
           formTitle: 'Create New Test',
           ButtonTitle: 'Create Test',
        });
  }
  const handleClickOpen = () => {
   
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

 
  async function getTestLayOut()
  {
     
      setLoader(true);
      try{
          const data1= await crud.retrieve('/testLayoutapi/')
          settestLayout(data1);
          setLoader(false);
        }
      
      catch(e){
      setLoader(false);
      }
  }
  useEffect(() => {
    
     getTestLayOut();
  }, [location]);
  return (
    <div>
      <Button variant="contained" onClick={() => {
        saveTestData();
        AddsaveTest();

      }} 
      startIcon={<Add/>}  style={{background: Themes.MainHeaderColor, color: Themes.WHITE}}>
      Create Test
      </Button>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        fullWidth
        maxWidth= "md"
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
         Create New Test
        </BootstrapDialogTitle>
        <DialogContent dividers>
       <div className="container-fluid">
         <div className="row">
           <div className="col-sm-2 d-flex align-items-center"><h6>Tag Name:</h6></div>
           <div className="col-sm-10">
             <input type="text" value={saveTest.testname} 
             onChange={(e) => {setsaveTest({...saveTest,testname:e.target.value})}} 
             className='border  form-control' 
             />
           </div>
         </div>
         <div className="row">
           <div className="col-sm-2 d-flex align-items-center"><h6>Tags:</h6></div>
           <div className="col-sm-10">
             <input type="text" value={saveTest.tagname} 
             onChange={(e) => {setsaveTest({...saveTest,tagname:e.target.value})}} 
             className='border  form-control' 
             />
           </div>
         </div>
         <div className="row">
           <div className="col-sm-2 d-flex align-items-center"><h6>No. of Questions</h6></div>
           <div className="col-sm-2">
             <input type='number'  value={saveTest.questionNo} 
             onChange={(e) => {setsaveTest({...saveTest,questionNo:e.target.value})}}
              className='border form-control' />
           </div>
           <div className="col-sm-2 d-flex align-items-center"><h6>Total Marks</h6></div>
           <div className="col-sm-2">
             <input type='number'  value={saveTest.totalmarks} 
             onChange={(e) => {setsaveTest({...saveTest,totalmarks:e.target.value})}}
              className='border form-control' />
           </div><br/>
           <div className="col-sm-2 d-flex align-items-center"><h6 className='px-4'>Duration</h6> </div>
           <div className="col-sm-6">
          <select name="hours"  value={saveTest.hour} 
          onChange={(e) => {setsaveTest({...saveTest,hour:e.target.value})}}  
          id="hours" className='border'>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
            <option value="11">11</option>
            <option value="12">12</option>
            </select>
            <label htmlFor="hour">
            <p className='px-4'>Hour</p>
            </label>
            <select name="hours" value={saveTest.minute} 
            onChange={(e) => {setsaveTest({...saveTest,minute:e.target.value})}}  
            id="hours" className='border'>
              <option value="0">0</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
              <option value="11">11</option>
              <option value="12">12</option>
              <option value="13">13</option>
              <option value="14">14</option>
              <option value="15">15</option>
              <option value="16">16</option>
              <option value="17">17</option>
              <option value="18">18</option>
              <option value="19">19</option>
              <option value="20">20</option>
              <option value="21">21</option>
              <option value="22">22</option>
              <option value="23">23</option>
              <option value="24">24</option>
              <option value="25">25</option>
              <option value="26">26</option>
              <option value="27">27</option>
              <option value="28">28</option>
              <option value="29">29</option>
              <option value="30">30</option>
              <option value="31">31</option>
              <option value="32">32</option>
              <option value="33">33</option>
              <option value="34">34</option>
              <option value="35">35</option>
              <option value="36">36</option>
              <option value="37">37</option>
              <option value="38">38</option>
              <option value="39">39</option>
              <option value="40">40</option>
              <option value="41">41</option>
              <option value="42">42</option>
              <option value="43">43</option>
              <option value="44">44</option>
              <option value="45">45</option>
              <option value="46">46</option>
              <option value="47">47</option>
              <option value="48">48</option>
              <option value="49">49</option>
              <option value="50">50</option>
              <option value="51">51</option>
              <option value="52">52</option>
              <option value="53">53</option>
              <option value="54">54</option>
              <option value="55">55</option>
              <option value="56">56</option>
              <option value="57">57</option>
              <option value="58">58</option>
              <option value="59">59</option>
              <option value="60">60</option>          
              </select>
              <label htmlFor="minutes">
              <p className='px-4'>Minute</p>
              </label></div>
          
         </div>
         <div className="row my-3">
           <div className="col-sm-2 d-flex align-items-center"><h6>Test Type</h6></div>
           <div className="col-sm-4">
             <select name="test-type" value={saveTest.testcategory} 
             onChange={(e) => {setsaveTest({...saveTest,testcategory:e.target.value})}} 
             id="test-type" className='border mx-3'>
             <option value="practice">Practice</option>
             <option value="examination">Examination</option>
             </select>
            </div>
           <div className="col-sm-2 d-flex align-items-center"><h6>Test Layout</h6></div>
          
           
           <div className="col-sm-4">
             <select name="test-layout" value={saveTest.testlayout} 
             onChange={(e) => {setsaveTest({...saveTest,testlayout:e.target.value})}} 
             className='border' id="test-layout">
             {testLayout?.map((value, index) => (  
              <option value={value?.tl_id}>{value?.tl_title}</option>
             ))} 
             </select>
           </div>
            
          </div>
           
           
         <div className="row my-3">
           <div className="col-sm-2 d-flex align-items-center"><h6>Pool Questions</h6></div>
           <div className="col-sm-4">
             <Switch value={saveTest.poolQ} 
             onChange={(e) => {setsaveTest({...saveTest,poolQ:e.target.value})}}
             {...label} />
           </div>
           <div className="col-sm-2 d-flex align-items-center"><h6>Free Available</h6></div>
           <div className="col-sm-4">
            <Switch value={saveTest.freeA} 
             onChange={(e) => {setsaveTest({...saveTest,freeA:e.target.value})}}
             {...label} /></div>
           </div>
         <div className="row my-3">
           <div className="col-sm-2 d-flex align-items-center"><h6>Test start From</h6></div>
           <div className="col-sm-2"><input type='date' id='start-date'className='border  form-control' /></div>
           <div className="col-sm-2"><input type="time" id='start-time' className='border  form-control' /></div>
           <div className="col-sm-2 d-flex align-items-center"><h6>Test End on</h6></div>
           <div className="col-sm-2"><input type='date' id='end-date'className='border  form-control' /></div>
           <div className="col-sm-2"><input type="time" id='end-time' className='border  form-control' /></div>
         </div>
         
        <MobileDateTimePicker
          value={value}
          onChange={(newValue) => {
            setValue(newValue);
          }}
          label="With error handler"
          onError={console.log}
          minDate={new Date('2018-01-01T00:00')}
          inputFormat="yyyy/MM/dd hh:mm a"
          mask="___/__/__ __:__ _M"
          renderInput={(params) => <TextField {...params} />}
        />
        
       </div>
        </DialogContent>
        <DialogActions>
        <Button className={clsx(classes.Btn,)} variant={'contained'} onClick={async() => {
                    if(formData.ButtonTitle==='Create Test'){
                          await crud.create('/testMakesapi/',{
                              user :1,
                              testName:saveTest.testname,
                              tags:saveTest.tagname,
                              noOfQuestions:saveTest.questionNo,
                              totalMarks:saveTest.totalmarks,
                              hour:saveTest.hour,
                              minute:saveTest.minute,
                              testCategory:saveTest.testcategory,
                              testLayout:saveTest.testlayout,
                              poolQuestion:'true',
                              freeAvailable:'false',
                              testShowFrom:'2022-05-11 02:30:00',
                              testEndON:saveTest.testendon

                            });
                      
                     }
                      setOpen(false)
                    }} color="primary"> 
                        {formData.ButtonTitle}
        </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
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