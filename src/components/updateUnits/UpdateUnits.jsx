import React, { useState, useRef } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  TextField,
  Button,
  Dialog,
  DialogContent,
  CircularProgress,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { getUnitById, updateUnitById } from "../../services/UnitsService";
import { useSnackbar } from "../../utils/SnackbarProvider";
import ModalUpdateUser from "../modalUpdateUser/ModalUpdateuser";

const UpdateUnits = () => {
  const showSnackbar = useSnackbar();
  const [searchValue, setSearchValue] = useState("");
  const [userData, setUserData] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const searchButtonRef = useRef(null); // Referência para o botão de busca

  const handleSearchUser = async () => {
    setLoading(true);
    try {
      const unit = await getUnitById(searchValue);
      if (unit) {
        setUserData(unit);
        setOpenModal(true);
      } else {
        showSnackbar(
          "Unidade não encontrada com o dado fornecido. Tente novamente",
          "error"
        );
        setUserData(null);
      }
    } catch (error) {
      showSnackbar("Erro ao buscar unidade. Tente novamente", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    // Devolve o foco para o botão de busca ao fechar o modal
    if (searchButtonRef.current) {
      searchButtonRef.current.focus();
    }
  };

  const handleUpdateUser = async (updatedData) => {
    setLoading(true);
    try {
      const success = await updateUnitById(updatedData.id, updatedData);
      if (success) {
        handleCloseModal();
        showSnackbar("Dados atualizados com sucesso!", "success");
        setSearchValue("");
      }
    } catch {
      showSnackbar("Erro ao atualizar unidade. Tente novamente", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Accordion className="accordeon-line">
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Atualizar dados da unidade</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <TextField
            label="Identificador"
            variant="outlined"
            fullWidth
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            style={{ marginBottom: "20px" }}
          />
          <Button
            ref={searchButtonRef} // Define a referência no botão
            variant="contained"
            color="primary"
            onClick={handleSearchUser}
            disabled={!searchValue}
          >
            Buscar
          </Button>
        </AccordionDetails>
      </Accordion>

      <ModalUpdateUser
        open={openModal}
        onClose={handleCloseModal}
        userData={userData}
        onUpdateUser={handleUpdateUser}
      />

      {/* Modal de carregamento com aria-hidden controlado */}
      <Dialog
        open={loading}
        PaperProps={{
          style: { backgroundColor: "transparent", boxShadow: "none" },
        }}
        aria-hidden={loading ? "false" : "true"} // Garante acessibilidade
      >
        <DialogContent
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default UpdateUnits;
