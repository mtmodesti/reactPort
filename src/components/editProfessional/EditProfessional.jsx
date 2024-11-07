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

const EditProfessional = () => {
  const [formData, setFormData] = useState({
    nome: "",
    tipo: "",
    endereco: "",
    contatos: "",
    email: "",
    gerente: "",
    servicos: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <Accordion className="accordeon-line">
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography>Editar profissional</Typography>
      </AccordionSummary>
      <AccordionDetails style={{ maxHeight: "300px", overflowY: "auto" }}>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Nome"
            name="nome"
            variant="outlined"
            fullWidth
            required
            margin="normal"
            value={formData.nome}
            onChange={handleChange}
          />
          <TextField
            label="Tipo"
            name="tipo"
            variant="outlined"
            fullWidth
            required
            margin="normal"
            select
            value={formData.tipo}
            onChange={handleChange}
          >
            <MenuItem value="tipo1">Tipo 1</MenuItem>
            <MenuItem value="tipo2">Tipo 2</MenuItem>
            <MenuItem value="tipo3">Tipo 3</MenuItem>
          </TextField>
          <TextField
            label="Endereço"
            name="endereco"
            variant="outlined"
            fullWidth
            required
            margin="normal"
            value={formData.endereco}
            onChange={handleChange}
          />
          <TextField
            label="Contatos"
            name="contatos"
            variant="outlined"
            fullWidth
            required
            margin="normal"
            value={formData.contatos}
            onChange={handleChange}
          />
          <TextField
            label="Email"
            name="email"
            type="email"
            variant="outlined"
            fullWidth
            required
            margin="normal"
            value={formData.email}
            onChange={handleChange}
          />
          <TextField
            label="Gerente"
            name="gerente"
            variant="outlined"
            fullWidth
            required
            margin="normal"
            value={formData.gerente}
            onChange={handleChange}
          />
          <TextField
            label="Serviços"
            name="servicos"
            variant="outlined"
            fullWidth
            required
            margin="normal"
            select
            value={formData.servicos}
            onChange={handleChange}
          >
            <MenuItem value="servico1">Serviço 1</MenuItem>
            <MenuItem value="servico2">Serviço 2</MenuItem>
            <MenuItem value="servico3">Serviço 3</MenuItem>
          </TextField>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            style={{ marginTop: "16px" }}
          >
            Adicionar
          </Button>
        </form>
      </AccordionDetails>
    </Accordion>
  );
};

export default EditProfessional;
