import React, { useState } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  TextField,
  Button,
  MenuItem,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const DeleteProfessional = () => {
  return (
    <Accordion className="accordeon-line">
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography>Remover profissional</Typography>
      </AccordionSummary>
      <AccordionDetails style={{ maxHeight: "300px", overflowY: "auto" }}>
        delete
      </AccordionDetails>
    </Accordion>
  );
};

export default DeleteProfessional;
