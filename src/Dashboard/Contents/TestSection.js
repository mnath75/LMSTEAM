import * as React from 'react';
import { styled } from '@mui/material/styles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddNewSection from './AddNewSection';
import { Row, Col } from 'react-bootstrap';

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&:before': {
    display: 'none',
  },
}));

const AccordionSummary = styled((props) => ( console.log('Accordion Props', props),
  <MuiAccordionSummary
    expandIcon={< ExpandMoreIcon sx={{ fontSize: '1.5rem' }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === 'light'
      ? 'rgba(255, 255, 255, .05)'
      : 'rgba(0, 0, 0, .03)',
  flexDirection: 'col-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(180deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(0),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(0),
  borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

export default function SimpleAccordion() {
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <div>
      <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          <Typography>Test Sections</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          <li>
         <label htmlFor="section-name">First Section</label>
         <label htmlFor="button"><EditIcon/><DeleteIcon/></label><br/>
         <label htmlFor="Qno.">10 Q. 30 min 30 Marks</label>
          </li>
          </Typography>
        
        </AccordionDetails>
       <AccordionDetails>
      
       <Typography>
          <li>
         <label htmlFor="section-name">Second Section</label>
         <label htmlFor="button"><EditIcon/><DeleteIcon/></label><br/>
         <label htmlFor="Qno.">10 Q. 30 min 30 Marks</label>
          </li>
          </Typography>
     
        </AccordionDetails>
         {/* 
        <AccordionDetails>
        
           Third Section
         
        </AccordionDetails> */}
      </Accordion>
      
       
    </div>
  );
}