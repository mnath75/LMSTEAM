import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Divider from '@mui/material/Divider';
import SettingsIcon from '@mui/icons-material/Settings';

export default function TestSettings() {
  return (
    <div>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Test Settings</Typography>
        </AccordionSummary>
        <Divider />
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, 
          </Typography>
          <Divider />
          <Typography>
            leo lobortis eget.
          </Typography>
          <Divider />
          <Typography>
            leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
     
     
    </div>
  );
}