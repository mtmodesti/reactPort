import React, { useState } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { updateProfessionalStatus } from "../../services/ProfessionalService";
import { useSnackbar } from "../../utils/SnackbarProvider";

const DeleteProfessional = () => {
  const showSnackbar = useSnackbar();

  const [id, setId] = useState("");

  const handleInputChange = (event) => {
    setId(event.target.value);
  };

  const handleDeleteClick = async () => {
    await updateProfessionalStatus(id, false);
    showSnackbar("Profissional desativado com sucesso.", "success");
  };

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
        <TextField
          label="ID do Profissional"
          variant="outlined"
          fullWidth
          value={id}
          onChange={handleInputChange}
          style={{ marginBottom: "16px" }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleDeleteClick}
          disabled={!id} // O botão fica desativado se o ID estiver vazio
        >
          Remover
        </Button>
      </AccordionDetails>
    </Accordion>
  );
};

export default DeleteProfessional;
