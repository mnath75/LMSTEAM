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
import {Add} from "@material-ui/icons";

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

export default function AddNewSection2() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="contained" onClick={handleClickOpen} style={{background: Themes.MainHeaderColor, color: Themes.WHITE}}>
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
        
         <div className="row my-2">
           <div className="col-sm-4 d-flex align-items-center"><h6>Test Duration</h6></div>
           <div className="col-sm-4"><h6>Time left: 30 mins</h6></div>
           <div className="col-sm-4"></div>
         </div>
         <div className="row my-2">
           <div className="col-sm-2 d-flex align-items-center"><h6 className='pr-4'>Duration</h6> </div>
           <div className="col-sm-6"><select name="hours" id="hours" className='border'><option value="1">1</option>
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
           <select name="hours" id="hours" className='border'>
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
               <option value="2">60</option>           */}
               </select>
               <label htmlFor="minutes"><p className='px-4'>Minute</p> </label>
               </div>
           <div className="col-sm-4 d-flex align-items-center"></div>
        
          
         </div>
         <div className="row my-1">
           <div className="col-sm-9 d-flex align-items-center"><h6>Allow Section Switching</h6></div>
           <div className="col-sm-3">off<Switch {...label} />on</div>
         </div> 
         <div className="row my-1">
           <div className="col-sm-9 d-flex align-items-center"><h6>Skip Seletion before time over</h6></div>
           <div className="col-sm-3">off<Switch {...label} />on</div>
         </div> 
         <div className="row my-1">
           <div className="col-sm-9 d-flex align-items-center"><h6>Use section as break</h6></div>
           <div className="col-sm-3">off<Switch {...label} />on</div>
         </div> 
         <div className="row my-1">
           <div className="col-sm-9 d-flex align-items-center"><h6>Show previous section question attempt summary after end section</h6></div>
           <div className="col-sm-3">off<Switch {...label} />on</div>
         </div> 

         <div className="row my-3">
           <label htmlFor="section-instruction"> <h6>Section Instructions</h6></label>
           <textarea name="section-instruction" id="section-instruction" cols="20" rows="5"></textarea>
         </div>
         {/* <div className="row my-3">
         </div> */}
       </div>
       
      
         <div className="row my-0">
       
           <div className="col-sm-4"></div>
           <div className="col-sm-3"><Button variant="outlined"  style={{background: Themes.MainHeaderColor, color: Themes.WHITE}}>
      <h6>Add Section</h6>
      </Button></div>
           <div className="col-sm-5"></div>
           
         </div>
       </DialogContent>
      </BootstrapDialog>
    </div>
  );
}