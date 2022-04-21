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
import {IconButton, Switch} from '@mui/material';
import Slider from '@mui/material/Slider';
import CloseIcon from '@mui/icons-material/Close';
import './Contents.css'
import { Themes } from "../../Theme/theme";
import {Add} from "@material-ui/icons";
import { crud } from "../../services/crud";
import { useLocation } from "react-router-dom";
import clsx from "clsx";
import AddNewSection1 from './AddNewSection1';

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

export default function AddNewSection() {
  const classes = useStyles();
  const location = useLocation();
  const [loader, setLoader] = useState(false);
  const [testLayout,settestLayout]=useState();
  const [open, setOpen] = React.useState(false);
  const [saveSection, setsaveSection] = useState('');
  const [formData, setFormData] = useState({
    formTitle: "",
    ButtonTitle: "",
  });
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
  function Addsectionsave(){
    setOpen(true)
    setsaveSection({
        formTitle: 'Add New Section',
        ButtonTitle: 'Add Section',
    });
    }
    function saveSctiondata() {
          setOpen(true)
          setFormData({
             formTitle: 'Create New Section',
             ButtonTitle: 'Add Section',
          });
    }

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
 
  useEffect(() => {
    
     getTestLayOut();
  }, [location]);

  return (
    <div>
      <Button variant="contained" onClick={() => {
        saveSctiondata();
        Addsectionsave();

      }} startIcon={<Add/>}  style={{background: Themes.MainHeaderColor, color: Themes.WHITE}}>
       Add New Section
      </Button>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        fullWidth
        maxWidth= "md"
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
         Add New Section
        </BootstrapDialogTitle>
        <DialogContent dividers>
       <div className="container-fluid">
         <div className="row my-2">
           <div className="col-sm-2 d-flex align-items-center"><h6>Section Name</h6></div>
           <div className="col-sm-10"><input type="text"  value={saveSection.secname} 
             onChange={(e) => {setsaveSection({...saveSection,secname:e.target.value})}}  className='border  form-control' /></div>
         </div>
         <div className="row my-2">
           <div className="col-sm-4 d-flex align-items-center"><h6>Select Section Layout</h6></div>
           <div className="col-sm-4">
           <select name="test-layout" value={saveSection.testlayout} 
             onChange={(e) => {setsaveSection({...saveSection,testlayout:e.target.value})}} 
             className='border' id="test-layout">
             {testLayout?.map((value, index) => (  
              <option value={value?.tl_id}>{value?.tl_title}</option>
             ))} 
            </select>
            </div>
           <div className="col-sm-4">
           </div>
         </div>
         <div className="row my-2">
           <div className="col-sm-3 d-flex align-items-center"><h6>Test Duration</h6></div>
           <div className="col-sm-2 d-flex align-items-center"><Slider /></div>
           <div className="col-sm-3"><h6>Time left: 30 mins</h6></div>
           <div className="col-sm-4"></div>
         </div>
         <div className="row my-2">
           <div className="col-sm-2 d-flex align-items-center"><h6 className='pr-4'>Duration</h6> </div>
           <div className="col-sm-6"><select name="hours"  value={saveSection.hour} 
          onChange={(e) => {setsaveSection({...saveSection,hour:e.target.value})}}   id="hours" className='border'>
             <option value="1">1</option>
             <option value="2">2</option>
             <option value="2">3</option>
             {/* <option value="2">4</option>
             <option value="2">5</option>
             <option value="2">6</option>
             <option value="2">7</option>
             <option value="2">8</option>
             <option value="2">9</option>
             <option value="2">10</option>
             <option value="2">11</option>
             <option value="2">12</option> */}
             </select>
             <label htmlFor="hour"><p className='px-4'>Hour</p></label>
             <select name="hours"  value={saveSection.minute} 
          onChange={(e) => {setsaveSection({...saveSection,minute:e.target.value})}}   id="hours" className='border'>
               {/* <option value="1">1</option>
               <option value="2">2</option>
               <option value="2">3</option>
               <option value="2">4</option>
               <option value="2">5</option>
               <option value="2">6</option>
               <option value="2">7</option>
               <option value="2">8</option>
               <option value="2">9</option>
               <option value="2">10</option>
               <option value="2">11</option>
               <option value="2">12</option>
               <option value="2">13</option>
               <option value="2">14</option> */}
               <option value="2">15</option>
               {/* <option value="1">16</option>
               <option value="2">17</option>
               <option value="2">18</option>
               <option value="2">19</option>
               <option value="2">20</option>
               <option value="2">21</option>
               <option value="2">22</option>
               <option value="2">23</option>
               <option value="2">24</option>
               <option value="2">25</option>
               <option value="2">26</option>
               <option value="2">27</option>
               <option value="2">28</option>
               <option value="2">29</option> */}
               <option value="2">30</option>
               {/* <option value="1">31</option>
               <option value="2">32</option>
               <option value="2">33</option>
               <option value="2">34</option>
               <option value="2">35</option>
               <option value="2">36</option>
               <option value="2">37</option>
               <option value="2">38</option>
               <option value="2">39</option>
               <option value="2">40</option>
               <option value="2">41</option>
               <option value="2">42</option>
               <option value="2">43</option>
               <option value="2">44</option> */}
               <option value="2">45</option>
               {/* <option value="1">46</option>
               <option value="2">47</option>
               <option value="2">48</option>
               <option value="2">49</option>
               <option value="2">50</option>
               <option value="2">51</option>
               <option value="2">52</option>
               <option value="2">53</option>
               <option value="2">54</option>
               <option value="2">55</option>
               <option value="2">56</option>
               <option value="2">57</option>
               <option value="1">58</option>
               <option value="2">59</option>
               <option value="2">60</option>         */}
               </select><label htmlFor="minutes">
                <p className='px-4'>Minute</p> 
              </label>
            </div>
           <div className="col-sm-4 d-flex align-items-center">

           </div>
        
          
         </div>
         <div className="row my-1">
           <div className="col-sm-9 d-flex align-items-center"><h6>Allow Section Switching</h6></div>
           <div className="col-sm-3">off<Switch value={saveSection.secSwich ? "off" :"on"} 
             onChange={(e) => {setsaveSection({...saveSection,secSwich:e.target.checked})
             console.log("value1",e.target.value)
             }} {...label} />on</div>
         </div> 
         <div className="row my-1">
           <div className="col-sm-9 d-flex align-items-center"><h6>Skip Seletion before time over</h6></div>
           <div className="col-sm-3">off<Switch value={saveSection.secSkip ? "off" :"on"} 
             onChange={(e) => {setsaveSection({...saveSection,secSkip:e.target.checked})}} {...label} />on</div>
         </div> 
         <div className="row my-1">
           <div className="col-sm-9 d-flex align-items-center"><h6>Give students choice fo which questions to attempt</h6></div>
           <div className="col-sm-3">off<Switch value={saveSection.stdChoice ? "off" :"on"} 
             onChange={(e) => {setsaveSection({...saveSection,stdChoice:e.target.checked})}} {...label} />on</div>
         </div> 
         <div className="row my-1">
           <div className="col-sm-9 d-flex align-items-center"><h6>Use section as break</h6></div>
           <div className="col-sm-3">off<Switch value={saveSection.secBreak ? "off" :"on"} 
             onChange={(e) => {setsaveSection({...saveSection,secBreak:e.target.checked})}} {...label} />on</div>
         </div> 

         <div className="row my-3">
           <label htmlFor="section-instruction"> <h6>Section Instructions</h6></label>
           <textarea name="section-instruction" value={saveSection.secInstruction ? "off" :"on"} 
             onChange={(e) => {setsaveSection({...saveSection,secInstruction:e.target.checked})}} id="section-instruction" cols="20" rows="5"></textarea>
         </div>
         <div className="row my-3">
         </div>
       </div>
       
       <div className="row my-0">
           <div className="col-sm-2"></div>
           <div className="col-sm-3"><Button variant="outlined"   style={{background: Themes.MainHeaderColor, color: Themes.WHITE}}>
      Add Questions
      </Button></div>
           <div className="col-sm-2"></div>
           <div className="col-sm-3"><Button className={clsx(classes.Btn,)} variant={'contained'} onClick={async() => {
                    if(formData.ButtonTitle==='Add Section'){
                          await crud.create('/TestSectionApi/',{
                              sectionName:saveSection.secname,
                              hour:saveSection.hour,
                              minute:saveSection.minute,
                              allowedSectionSwitching:saveSection.secSwich,
                              skipSectionBeforeTimeOver:saveSection.secSkip,
                              studentChoice: saveSection.stdChoice,
                              useSectionAsBreak:saveSection.secBreak,
                              showPreviousSection:false,
                              sectionInstruction:saveSection.secInstruction,
                              testmake:10
                          });
                    }
                      // setOpen(false)
                    }} color="primary"> 
                        {formData.ButtonTitle}
        </Button></div>
           <div className="col-sm-2"></div>
           
         </div>
       </DialogContent>
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