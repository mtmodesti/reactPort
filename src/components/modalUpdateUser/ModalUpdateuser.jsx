import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";

const ModalUpdateUser = ({ open, onClose, userData, onUpdateUser }) => {
  // Inicializa o formData com valores padrão se userData for null ou undefined
  const [formData, setFormData] = useState({
    userName: '',
    userEmail: '',
    document: '',
    address: '',
    obs: '',
    role: 'viewer', // valor padrão para role
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

  // Handle form submit (update user)
  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateUser(formData);
  };

  // Effect to log the userData whenever it changes
  useEffect(() => {
    // Se userData for válido, atualizar formData com ele
    if (userData) {
      setFormData((prevData) => ({
        ...prevData,
        ...userData,
      }));
    }
  }, [userData]);

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Atualizar Usuário</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <RadioGroup
            name="role"
            value={formData.role || "viewer"} // Define o valor inicial
            onChange={handleChange}
            row
          >
            <FormControlLabel value="viewer" control={<Radio />} label="Visualizador" />
            <FormControlLabel value="admin" control={<Radio />} label="Administrador" disabled />
            <FormControlLabel value="user" control={<Radio />} label="Usuário" />
          </RadioGroup>

          <TextField
            label="Nome"
            name="userName"
            value={formData.userName || ""}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="E-mail"
            name="userEmail"
            value={formData.userEmail || ""}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="CPF"
            name="document"
            value={formData.document || ""}
            onChange={handleChange}
            fullWidth
            margin="normal"
            disabled  // Desabilita o campo CPF
            InputProps={{
              style: { cursor: "not-allowed" },  // Exibe o cursor de bloqueio
            }}
          />
          <TextField
            label="Endereço"
            name="address"
            value={formData.address || ""}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />

          {/* Campo de Observações */}
          <TextField
            label="Observações"
            name="obs"
            value={formData.obs || ""}
            onChange={handleChange}
            multiline
            maxRows={5}
            fullWidth
            variant="outlined"
            margin="normal"
          />
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
