import React, { useState } from "react";
import "./addProfessional.css";
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

const AddProfessional = () => {
  const [nomeCompleto, setNomeCompleto] = useState("");
  const [cpf, setCpf] = useState("");
  const [funcao, setFuncao] = useState("");
  const [email, setEmail] = useState("");
  const [login, setLogin] = useState("");
  const [inicioExercicio, setInicioExercicio] = useState("");
  const [emailError, setEmailError] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!isEmailValid(email)) {
      setEmailError(true);
      return;
    }
    const data = {
      nomeCompleto,
      cpf,
      funcao,
      email,
      login,
      inicioExercicio,
    };
    console.log(data);
  };

  const isEmailValid = (email) => {
    // Validação básica de email usando regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (emailError) {
      setEmailError(!isEmailValid(e.target.value));
    }
  };

  const isFormValid = () => {
    return (
      nomeCompleto.trim() &&
      cpf.trim() &&
      funcao.trim() &&
      email.trim() &&
      login.trim() &&
      inicioExercicio.trim() &&
      isEmailValid(email) // Verifica se o email é válido
    );
  };

  return (
    <Accordion className="accordeon-line">
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography>Adicionar profissional</Typography>
      </AccordionSummary>
      <AccordionDetails style={{ maxHeight: "300px", overflowY: "auto" }}>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Nome Completo"
            variant="outlined"
            fullWidth
            required
            margin="normal"
            value={nomeCompleto}
            onChange={(e) => setNomeCompleto(e.target.value)}
          />
          <TextField
            label="CPF"
            variant="outlined"
            fullWidth
            required
            margin="normal"
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
          />
          <TextField
            label="Função"
            variant="outlined"
            fullWidth
            required
            margin="normal"
            select
            value={funcao}
            onChange={(e) => setFuncao(e.target.value)}
          >
            <MenuItem value="Assistente Social">Assistente Social</MenuItem>
            <MenuItem value="Psicólogo">Psicólogo</MenuItem>
            <MenuItem value="Auxiliar Administrativo">
              Auxiliar Administrativo
            </MenuItem>
          </TextField>
          <TextField
            label="Email"
            type="email"
            variant="outlined"
            fullWidth
            required
            margin="normal"
            value={email}
            onChange={handleEmailChange}
            error={emailError} // Mostra o erro visualmente
            helperText={emailError ? "Insira um endereço de email válido" : ""} // Mensagem de erro personalizada
          />
          <TextField
            label="Login"
            variant="outlined"
            fullWidth
            required
            margin="normal"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
          />
          <TextField
            label="Início do Exercício"
            type="date"
            variant="outlined"
            fullWidth
            required
            margin="normal"
            InputLabelProps={{ shrink: true }}
            value={inicioExercicio}
            onChange={(e) => setInicioExercicio(e.target.value)}
          />
          {/* 
            192.168.15.100
            */}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            style={{ marginTop: "16px", width: "auto", padding: "6px 16px" }}
            disabled={!isFormValid()}
          >
            Adicionar
          </Button>
        </form>
      </AccordionDetails>
    </Accordion>
  );
};

export default AddProfessional;
