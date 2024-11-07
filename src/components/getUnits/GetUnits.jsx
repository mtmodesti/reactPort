import "./getUnits.css";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Button,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import React, { useState } from "react";
import ListUnitsModal from "../listUsersModal/ListUnitsModal";

const GetUnits = () => {
  const [openModal, setOpenModal] = useState(false);

  // Função para abrir o modal
  const handleOpenModal = () => setOpenModal(true);

  // Função para fechar o modal
  const handleCloseModal = () => setOpenModal(false);

  return (
    <Accordion className="accordeon-line">
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography>Listar unidades</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Button
          variant="contained"
          color="primary"
          onClick={handleOpenModal}
          style={{
            marginTop: "10px",
            width: "fit-content",
            padding: "6px 16px",
          }}
        >
          Listar unidades do sistema
        </Button>
      </AccordionDetails>

      {/* Modal para listar usuários */}
      <ListUnitsModal open={openModal} onClose={handleCloseModal} />
    </Accordion>
  );
};

export default GetUnits;
