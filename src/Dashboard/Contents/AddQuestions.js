import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import "./Contents.css";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  paper: {
    overflowY: 'unset',
  },
  customizedButton: {
    position: 'absolute',
    left: '65%',
    top: '-15%',
    backgroundColor: 'lightgray',
    color: 'gray',
  }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AddQuestionsL(props) {
  const classes = useStyles();
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
        Import From Library
      </Button>
      <Dialog
        fullScreen
        PaperProps={{ sx: { width: "90%", height: "90%" } }}
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        
         
  
        <div class="container-fluid min-vh-100 d-flex flex-column">
          <div className="row">
          <div className="col-md-9">
          <div className="row-md border py-2 mt-4 ">
            <label htmlFor="">
              <select
                name="category"
                id="category"
                
                className="mx-1"
              >
                <option value="" disabled selected hidden>Select Category</option>
              </select>
              <select name="course" id="course">
                <option value="" disabled selected hidden>Select Course</option>
              </select>
              <select name="" id="" className="mx-1">
                <option value="" disabled selected hidden>Select Subject</option>
              </select>
              <select name="" id="">
                <option value="" disabled selected hidden>Select Topic</option>
              </select>
              <select name="" id="" className="mx-1">
                <option value="" disabled selected hidden>Select Question Type</option>
              </select>
              <select name="" id="">
                <option value="" disabled selected hidden>Language</option>
              </select>
              <select name="" id="" className="ms-1">
                <option value="" disabled selected hidden>Select Tags</option>
              </select>
              </label>
          </div>

          </div>
          <div className="col-md-2"><button className='btn-sm btn-light border mt-4 p-1' type='button'>Add Questions</button></div>
          <div className="col-md-1">
          <IconButton
            edge="end"
            color="inherit"
            onClick={handleClose}
            aria-label="close"
            className={classes.customizedButton}
          >
            <CloseIcon />
          </IconButton>
          </div>
          </div>
          <div className="border-bottom mt-0" />
          <div className="row">
            <div className="col-md-1"><input type="checkbox" id="Q" name="Ques" value="" className="ms-0"/></div>
            <div className="col-md-7">Questions</div>
            <div className="col-md-2">References</div>
            <div className="col-md-2">Test in used</div>
          </div>
          <div className="border-bottom mt-0" />
        </div>
      </Dialog>
    </div>
  );
}
