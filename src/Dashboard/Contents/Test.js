import React,{useState} from "react";
import { BatchSidebar } from "../../MainComponents/SideNav";
import { NavLink } from "react-router-dom";
import {TextField,InputAdornment,Button,} from "@material-ui/core";
import {Search,FilterList,Add} from "@material-ui/icons";
import { Themes } from "../../Theme/theme";
import {Tab,Tabs,Box,Typography } from '@mui/material';
import PropTypes from 'prop-types';
import ExaminationTest from "./ExaminationTest";
import PracticeTests from "./PracticeTest";
import CreateNewTest from "./CreateNewTest";
//import CreateNewSection from "./CreateNewSection"

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


    


export default function Test() {
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
          <div className="col-lg-1 text" style={{background: Themes.MainHeaderColor}}>
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            {BatchSidebar.map((value => (
                                <li className="nav-item dropdown"  key={value.id}>
                                        <NavLink to={value.page} activeClassName={'active_link'}
                                                 className="nav-link">{value.icons}  {value.title}
                                        </NavLink> 
                                </li>
                            )))} 
            </ul> 
          </div>
          <div className="col-lg-11 py-4">
            <div className="row px-lg-0">
                    <div className={'col-lg-6 col-12 my-3 mt-lg-0'}>
                        <TextField fullWidth placeholder={'Search for Batches'} InputProps={{
                            startAdornment: (<InputAdornment position="start">
                                <Search/></InputAdornment>),}}/>
                    </div>
                    <div className={'col-lg-6 col-12 d-flex justify-content-lg-end my-3 mt-lg-0'}>
                        <Button className={'mx-lg-3 mx-1'} variant="contained" startIcon={<FilterList/>}>
                            Sort
                        </Button>
                       <CreateNewTest/>
                    </div>
                    <div className={'divider'}/>
              </div>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Practice" {...a11yProps(0)} />
          <Tab label="Examinations" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
          <PracticeTests/>
      </TabPanel>
      <TabPanel value={value} index={1}>
           <ExaminationTest />
      </TabPanel>
           </div>

        </div>
      </div>
      
</>)};
