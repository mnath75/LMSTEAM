import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import {IconButton, Switch} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import './Contents.css'
import { Themes } from "../../Theme/theme";
import AddNewSection2 from './AddNewSection2';
//import {Add} from "@material-ui/icons";

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
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="contained" onClick={handleClickOpen}   style={{background: Themes.MainHeaderColor, color: Themes.WHITE}}>
      Add Section
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
           <div className="col-sm-10"><input type="text" className='border  form-control' /></div>
         </div>
         <div className="row my-1">
           <div className="col-sm-9 d-flex align-items-center"><h6>Allow Section Switching</h6></div>
           <div className="col-sm-3">off<Switch {...label} />on</div>
         </div> 
        
         <div className="row my-1">
           <div className="col-sm-9 d-flex align-items-center"><h6>Give students choice fo which questions to attempt</h6></div>
           <div className="col-sm-3">off<Switch {...label} />on</div>
         </div> 
         

         <div className="row my-3">
           <label htmlFor="section-instruction"> <h6>Section Instructions</h6></label>
           <textarea name="section-instruction" id="section-instruction" cols="20" rows="5"></textarea>
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
           <div className="col-sm-3"><AddNewSection2/></div>
           <div className="col-sm-2"></div>
           
         </div>
       </DialogContent>
      </BootstrapDialog>
    </div>
  );
}