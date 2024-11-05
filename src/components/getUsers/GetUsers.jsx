import "./getUsers.css";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Button,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import React, { useState } from "react";
import ListUsersModal from "../listUsersModal/ListusersModal";

const GetUsers = () => {
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
          <Typography>Listar usuários</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Button
            variant="contained"
            color="primary"
            onClick={handleOpenModal}
            style={{
              marginTop: '10px',
              width: 'fit-content',
              padding: '6px 16px',
            }}
          >
            Listar usuários do sistema
          </Button>
        </AccordionDetails>
  
        {/* Modal para listar usuários */}
        <ListUsersModal open={openModal} onClose={handleCloseModal} />
      </Accordion>
    );
  };
  
  export default GetUsers;