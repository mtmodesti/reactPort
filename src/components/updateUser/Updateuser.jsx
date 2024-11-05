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
import {
  fetchUserByEmailOrCpf,
  updateUser,
} from "../../services/firestoreService"; // Importe a função de busca de usuários
import { useSnackbar } from "../../utils/SnackbarProvider";
import ModalUpdateUser from "../modalUpdateUser/ModalUpdateuser";

const UpdateUser = () => {
  const showSnackbar = useSnackbar();
  const [searchValue, setSearchValue] = useState(""); // Para armazenar o CPF ou e-mail digitado
  const [userData, setUserData] = useState(null); // Para armazenar os dados do usuário encontrado
  const [openModal, setOpenModal] = useState(false); // Estado para controlar a exibição do modal

  // Função para buscar o usuário
  const handleSearchUser = async () => {
    try {
      // Passamos o 'searchValue' como argumento para a função de busca
      const user = await fetchUserByEmailOrCpf(searchValue);

      if (user) {
        setUserData(user); // Se encontrar o usuário, define os dados
        setOpenModal(true); // Abre o modal
      } else {
        showSnackbar(
          "Usuário não encontrado com o dado fornecido. Tente novamente",
          "error"
        );

        setUserData(null); // Se não encontrar, reseta o estado
      }
    } catch (error) {
      showSnackbar("Erro ao buscar usuário. Tente novamente", "error");
    }
  };

  const handleCloseModal = () => {
    setOpenModal(false); // Fecha o modal
  };

  const handleUpdateUser = async (event) => {
    try {
      const success = await updateUser(event.id, event);
      if (success) {
        handleCloseModal();
        showSnackbar(
          "Dados atualizados com sucesso! Tente novamente",
          "success"
        );
        setSearchValue("");
        // Aqui você pode adicionar lógica para fechar o modal ou fazer outras atualizações necessárias
      }
    } catch {
      showSnackbar("Erro ao atualizar usuário. Tente novamente", "error");
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
          <Typography>Atualizar dados do usuário</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {/* Campo para digitar o CPF ou e-mail */}
          <TextField
            label="Digite o CPF ou E-mail"
            variant="outlined"
            fullWidth
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            style={{ marginBottom: "20px" }}
          />

          {/* Botão para buscar o usuário */}
          <Button
            variant="contained"
            color="primary"
            onClick={handleSearchUser}
            disabled={!searchValue} // Desativa o botão se o campo estiver vazio
          >
            Buscar
          </Button>
        </AccordionDetails>
      </Accordion>
      {/* Exibindo o Modal quando o estado openModal for true */}
      <ModalUpdateUser
        open={openModal}
        onClose={handleCloseModal}
        userData={userData}
        onUpdateUser={handleUpdateUser} // A função aqui
      />
    </>
  );
};

export default UpdateUser;
