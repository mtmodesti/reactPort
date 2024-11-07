import React, { useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  TextField,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  CircularProgress,
  Modal,
  Box,
} from "@mui/material";
import { addUnit } from "../../services/UnitsService";
import { useSnackbar } from "../../utils/SnackbarProvider";
import "./addUnit.css";

const AddUnit = () => {
  const showSnackbar = useSnackbar();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = React.useState({
    nome: "",
    tipo: "",
    endereco: "",
    contatos: "",
    email: "",
    gerente: "",
    servicos: "",
  });

  const [errors, setErrors] = React.useState({
    nome: false,
    tipo: false,
    endereco: false,
    contatos: false,
    email: false,
    gerente: false,
    servicos: false,
  });

  // Função para validar o formato do email
  const validateEmail = (email) => {
    // Regex para verificar se o formato do email é válido
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
    // Validação de email
    if (name === "email" && value && !validateEmail(value)) {
      setErrors({ ...errors, email: true });
    } else {
      setErrors({ ...errors, [name]: false });
    }
  };

  const validateForm = () => {
    return (
      formData.nome &&
      formData.tipo &&
      formData.endereco &&
      formData.contatos &&
      formData.email &&
      formData.gerente &&
      formData.servicos &&
      !errors.email // Asegura que o email está válido
    );
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true); // Ativa o loading
    try {
      console.log(formData);
      await addUnit(formData); // Chama o serviço para adicionar a unidade
      showSnackbar("Unidade adicionada com sucesso.", "success");
    } catch (error) {
      showSnackbar("Erro durante o cadastro. Tente novamente.", "error");
    } finally {
      setLoading(false); // Desativa o loading, seja sucesso ou erro
    }
  };

  return (
    <Accordion className="accordeon-line">
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography>Adicionar unidade</Typography>
      </AccordionSummary>
      <AccordionDetails style={{ maxHeight: "300px", overflowY: "auto" }}>
        {/* Modal de Loading */}
        <Modal
          open={loading}
          onClose={() => {}}
          aria-labelledby="loading-modal-title"
          aria-describedby="loading-modal-description"
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100vh",
              width: "100vw",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              zIndex: 1000, // Garante que o modal fique acima de outros elementos
            }}
          >
            <CircularProgress size={80} />
          </Box>
        </Modal>

        {/* Formulário de Adição de Unidade */}
        <form onSubmit={handleSubmit} noValidate>
          <TextField
            label="Nome"
            name="nome"
            value={formData.nome}
            onChange={handleChange}
            required
            fullWidth
            margin="normal"
            error={errors.nome}
            helperText={errors.nome ? "Campo obrigatório" : ""}
          />

          <FormControl fullWidth margin="normal" required>
            <InputLabel id="tipo-label">Tipo</InputLabel>
            <Select
              labelId="tipo-label"
              label="Tipo"
              name="tipo"
              value={formData.tipo}
              onChange={handleChange}
              error={errors.tipo}
            >
              <MenuItem value="option 1">Option 1</MenuItem>
              <MenuItem value="option 2">Option 2</MenuItem>
              <MenuItem value="option 3">Option 3</MenuItem>
            </Select>
          </FormControl>

          <TextField
            label="Endereço"
            name="endereco"
            value={formData.endereco}
            onChange={handleChange}
            required
            fullWidth
            margin="normal"
            error={errors.endereco}
            helperText={errors.endereco ? "Campo obrigatório" : ""}
          />

          <TextField
            label="Contato(s)"
            name="contatos"
            value={formData.contatos}
            onChange={handleChange}
            required
            fullWidth
            margin="normal"
            error={errors.contatos}
            helperText={errors.contatos ? "Campo obrigatório" : ""}
          />

          <TextField
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            fullWidth
            margin="normal"
            type="email"
            error={errors.email}
            helperText={errors.email ? "Formato de email inválido" : ""}
          />

          <TextField
            label="Gerente"
            name="gerente"
            value={formData.gerente}
            onChange={handleChange}
            required
            fullWidth
            margin="normal"
            error={errors.gerente}
            helperText={errors.gerente ? "Campo obrigatório" : ""}
          />

          <FormControl fullWidth margin="normal" required>
            <InputLabel id="servicos-label">Serviços</InputLabel>
            <Select
              labelId="servicos-label"
              label="Serviços"
              name="servicos"
              value={formData.servicos}
              onChange={handleChange}
              error={errors.servicos}
            >
              <MenuItem value="option 4">Option 4</MenuItem>
              <MenuItem value="option 5">Option 5</MenuItem>
              <MenuItem value="option 6">Option 6</MenuItem>
            </Select>
          </FormControl>

          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={!validateForm()}
          >
            Adicionar
          </Button>
        </form>
      </AccordionDetails>
    </Accordion>
  );
};

export default AddUnit;
