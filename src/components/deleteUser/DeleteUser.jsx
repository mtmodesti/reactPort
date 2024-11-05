import * as React from "react";
import { Accordion, AccordionSummary, AccordionDetails, Typography, TextField, Button } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { removeUserByCpf, removeUserByEmail } from "../../services/firestoreService"; // Importando as funções do serviço
import { useSnackbar } from "../../utils/SnackbarProvider"; // Importando o hook do Snackbar
import './deleteUser.css';

const DeleteUser = () => {
  const [cpf, setCpf] = React.useState(""); // Estado para o CPF
  const [email, setEmail] = React.useState(""); // Estado para o email
  const showSnackbar = useSnackbar(); // Função para exibir mensagens

  // Função para lidar com o evento de remover CPF
  const handleRemoveCpf = async () => {
    try {
      const success = await removeUserByCpf(cpf);
      if (success) {
        showSnackbar("CPF removido com sucesso.", "success");
        setCpf(""); // Limpa o campo de CPF após a ação
        setEmail(""); // Limpa o campo de e-mail
      } else {
        showSnackbar("CPF não encontrado. Tente novamente.", "error");
      }
    } catch (error) {
      showSnackbar("Erro ao remover CPF. Tente novamente.", "error");
    }
  };

  // Função para lidar com o evento de remover e-mail
  const handleRemoveEmail = async () => {
    try {
      const success = await removeUserByEmail(email);
      if (success) {
        showSnackbar("E-mail removido com sucesso.", "success");
        setCpf(""); // Limpa o campo de CPF
        setEmail(""); // Limpa o campo de e-mail
      } else {
        showSnackbar("E-mail não encontrado. Tente novamente.", "error");
      }
    } catch (error) {
      showSnackbar("Erro ao remover E-mail. Tente novamente.", "error");
    }
  };

  return (
    <Accordion className="accordeon-line">
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography>Remover usuário</Typography>
      </AccordionSummary>
      <AccordionDetails style={{ maxHeight: "400px", overflowY: "auto" }}>
        {/* Container para o CPF */}
        <div className="inputsWrapper">
          <TextField
            label="Digite o CPF"
            variant="outlined"
            fullWidth
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            style={{
              marginTop: "10px",
              width: "fit-content",
              padding: "6px 16px",
            }}
            onClick={handleRemoveCpf}
            disabled={!cpf} // Desativa o botão se o campo estiver vazio
          >
            Remover CPF
          </Button>
        </div>

        {/* Container para o Email */}
        <div className="inputsWrapper">
          <TextField
            label="Digite o E-mail"
            variant="outlined"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleRemoveEmail}
            disabled={!email}
            style={{
              marginTop: "10px",
              width: "fit-content",
              padding: "6px 16px",
            }}
          >
            Remover E-mail
          </Button>
        </div>
      </AccordionDetails>
    </Accordion>
  );
};

export default DeleteUser;
