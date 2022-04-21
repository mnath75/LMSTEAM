import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Divider from '@mui/material/Divider';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CreateNewTest from './CreateNewTest';
import AddQuestionsL from './AddQuestions';
import SimpleAccordion from './TestSection';
import TestInstructions from './TestInstruction';
import TestSettings from './TestSettings';
import './Contents.css'
import AddNewSection from './AddNewSection';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function CreateNewSection(props) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Create New Section
      </Button>
      <Dialog
        fullScreen
        PaperProps={{ sx: {width: "90%", height: "90%"}}}
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        
          <Toolbar>
            <Typography sx={{ ml: 1, flex: 1 }} variant="h6" component="div">
            Test Name: {props.name} 
            </Typography>
            <AddNewSection/>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
              className='mx-3'
            >
              <CloseIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <div class="container-fluid min-vh-100 d-flex flex-column">
    <div className="row flex-grow-1">
        <div className="col-md-3 border">
           <div className="row mb-2"><SimpleAccordion /></div>
           <div className="row mb-2"><TestInstructions /></div>
           <div className="row mb-2"><TestSettings /></div>
        </div>
        <div className="col-md-9 border">
          <div className="row border m-2">
          <div className="col-md-3"><h6>First Section</h6><p>10 Questions 30 mins  30 Marks</p></div>
          <div className="col-md-2"></div>
            <div className="col-md-3 dropdown"><a className='dropbtn' ><h6>Add Questions</h6></a>
          <div className='dropdown-content'> <a href="#"><AddQuestionsL/></a>
    <a href="#">Import from Test</a>
    <a href="#">Type New Questions</a></div> </div>
            <div className="col-md-2 border mb-1 mt-1 text-center "><div className="row text-center"><div className="col">Set Marking</div></div>
             <div className="row m-0 text-center">
               <div className="col-md-4">
                 <input type="text" className='border form-control input-sm form-fixer' placeholder='+' />
               </div>
               <div className="col-md-8"> 
               <button className='btn-sm btn-light border p-0 form-fixer' type='button'>Apply</button>
               </div>
             </div>
             </div>
            <div className="col-md-2"><EditOutlinedIcon />Edit section <span><ExpandMoreIcon/></span></div>
            </div> 
            {/* <div className="row border m-2">
          <div className="col-md-3"><h6>Second Section</h6><p>10 Questions 30 mins  30 Marks</p></div>
          <div className="col-md-3"></div>
            <div className="col-md-2"><h6>Add Questions</h6></div>
            <div className="col-md-2 border mb-4 mt-2 text-center "><div className="row text-center"><div className="col">Set Marking</div></div>
             <div className="row text-center">
               <div className="col-sm-2"><button className='btn-sm btn-light border m-0 p-0' type='button'>+</button></div>
             <div className="col-sm-2"><button className='btn-sm btn-light border m-0 p-0' type='button'>-</button></div>
             <div className="col-sm-8"><button className='btn-sm btn-light border m-0 p-0' type='button'>Apply</button></div>
             </div>
             </div>
            <div className="col-md-2"><EditOutlinedIcon />Edit section<span><ExpandMoreIcon/></span></div>
            </div> 
            <div className="row border m-2">
          <div className="col-md-3"><h6>Third Section</h6><p>10 Questions 30 mins  30 Marks</p></div>
          <div className="col-md-3"></div>
            <div className="col-md-2"><h6>Add Questions</h6></div>
            <div className="col-md-2 border mb-4 mt-2 text-center "><div className="row text-center"><div className="col">Set Marking</div></div>
             <div className="row text-center">
               <div className="col-sm-2"><button className='btn-sm btn-light border m-0 p-0' type='button'>+</button></div>
             <div className="col-sm-2"><button className='btn-sm btn-light border m-0 p-0' type='button'>-</button></div>
             <div className="col-sm-8"><button className='btn-sm btn-light border m-0 p-0' type='button'>Apply</button></div>
             </div>
             </div>
            <div className="col-md-2"><EditOutlinedIcon />Edit section<span><ExpandMoreIcon/></span></div>
            </div>  */}
        </div>
    </div>
</div>
    
       
      
        
      </Dialog>
    </div>
  );
}