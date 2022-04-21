import React,{useState} from "react";
import {Tab,Tabs,Box,Typography } from '@mui/material';
import PropTypes from 'prop-types';
import PracticeTests from "./PracticeTest";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}


    


export default function ExaminationTest() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState()
  const [formData, setFormData] = useState({
    formTitle: "",
    ButtonTitle: "",
  });
  const handleChange = (event, newValue) => {
    setValue(newValue);
  }; 
  function GetFormManage() {
    setOpen(true);
    setFormData({
      formTitle: "Create New Batch",
      ButtonTitle: "Create Batch",
    });
  }

  return (
    <>
      <div className="container-fluid" style={{textSize: 8}}>
        <div className="row px-lg-0 py-0">
         
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Live" {...a11yProps(0)} />
          <Tab label="Upcomming" {...a11yProps(1)} />
          <Tab label="Previous" {...a11yProps()} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
      <PracticeTests/>
      </TabPanel>
      <TabPanel value={value} index={1}>
 
      </TabPanel>
      <TabPanel value={value} index={2}>
    
      </TabPanel>
          

        </div>
      </div>
      
</>)};
