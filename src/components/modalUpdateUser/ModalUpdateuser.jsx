import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel,
} from "@mui/material";

const ModalUpdateUser = ({ open, onClose, userData, onUpdateUser }) => {
  // Inicializa o formData com valores padrão se userData for null ou undefined
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    contatos: '',
    endereco: '',
    gerente: '',
    active: false,
    servicos: 'option 4', // valor padrão com espaço
    tipo: 'option 1', // valor padrão com espaço
    ...userData, // Sobrescreve os valores com os dados recebidos
  });

  // Handle change for input fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle change for checkbox
  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: checked,
    }));
  };

  // Handle form submit (update user)
  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateUser(formData);
  };

  // Atualiza o formData com userData sempre que userData muda
  useEffect(() => {
    if (userData) {
      setFormData((prevData) => ({
        ...prevData,
        ...userData,
      }));
    }
  }, [userData]);

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Atualizar Unidade</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          {/* Checkbox para Active */}
          <FormControlLabel
            control={
              <Checkbox
                checked={formData.active}
                onChange={handleCheckboxChange}
                name="active"
              />
            }
            label="Ativo"
          />

          {/* Campo Nome */}
          <TextField
            label="Nome"
            name="nome"
            value={formData.nome || ""}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />

          {/* Campo E-mail */}
          <TextField
            label="E-mail"
            name="email"
            value={formData.email || ""}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />

          {/* Campo Contatos */}
          <TextField
            label="Contatos"
            name="contatos"
            value={formData.contatos || ""}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />

          {/* Campo Endereço */}
          <TextField
            label="Endereço"
            name="endereco"
            value={formData.endereco || ""}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />

          {/* Campo Gerente */}
          <TextField
            label="Gerente"
            name="gerente"
            value={formData.gerente || ""}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />

          {/* Select para Tipo */}
          <FormControl fullWidth margin="normal">
            <InputLabel id="tipo-label">Tipo</InputLabel>
            <Select
              labelId="tipo-label"
              label="Tipo"
              name="tipo"
              value={formData.tipo}
              onChange={handleChange}
            >
              <MenuItem value="option 1">Option 1</MenuItem>
              <MenuItem value="option 2">Option 2</MenuItem>
              <MenuItem value="option 3">Option 3</MenuItem>
            </Select>
          </FormControl>

          {/* Select para Serviços */}
          <FormControl fullWidth margin="normal">
            <InputLabel id="servicos-label">Serviços</InputLabel>
            <Select
              labelId="servicos-label"
              name="servicos"
              value={formData.servicos}
              onChange={handleChange}
              label="Serviços"
            >
              <MenuItem value="option 4">Option 4</MenuItem>
              <MenuItem value="option 5">Option 5</MenuItem>
              <MenuItem value="option 6">Option 6</MenuItem>
            </Select>
          </FormControl>
        </form>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={onClose} color="secondary">
          Cancelar
        </Button>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Atualizar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ModalUpdateUser;
