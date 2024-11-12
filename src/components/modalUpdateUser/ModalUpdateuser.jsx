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
import {
  fetchUnitsServiceItems,
  fetchUnitTypesCollection,
} from "../../services/UnitsService";

const ModalUpdateUser = ({ open, onClose, userData, onUpdateUser }) => {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    contatos: "",
    endereco: "",
    gerente: "",
    active: false,
    servicos: [],
    tipo: [],
    ...userData,
  });
  const [emailError, setEmailError] = useState(false); // Estado para erro de e-mail

  const [serviceOptions, setServiceOptions] = useState([]);
  const [typeOptions, setTypeOptions] = useState([]);

  // Fetch options for services and types
  useEffect(() => {
    fetchUnitsServiceItems().then((services) => setServiceOptions(services));
    fetchUnitTypesCollection().then((types) => setTypeOptions(types));
  }, []);

  // Update formData with userData when modal is opened or userData changes
  useEffect(() => {
    if (userData) {
      setFormData({
        ...userData,
        tipo: Array.isArray(userData.tipo) ? userData.tipo : [userData.tipo], // Certifique-se de que tipo é um array
        servicos: userData.servicos || [],
      });
    }
  }, [userData]);

  // Função de validação de e-mail
  const validateEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  // Verifica se todos os campos obrigatórios estão preenchidos
  const isFormValid = () => {
    const { nome, email, contatos, endereco, gerente, servicos, tipo } =
      formData;
    return (
      nome &&
      email &&
      validateEmail(email) && // Verifica se o e-mail é válido
      contatos &&
      endereco &&
      gerente &&
      servicos.length > 0 && // Verifica se pelo menos um serviço foi selecionado
      tipo.length > 0 // Verifica se pelo menos um tipo foi selecionado
    );
  };

  // Handle change for input fields
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Valida o e-mail em tempo real
    if (name === "email") {
      setEmailError(!validateEmail(value));
    }

    setFormData((prevData) => {
      if (name === "tipo") {
        // Seleciona o(s) tipo(s) completo(s) a partir das opções disponíveis
        const selectedTypes = typeOptions.filter((type) =>
          value.includes(type.id)
        );
        return {
          ...prevData,
          tipo: selectedTypes,
        };
      }
      return {
        ...prevData,
        [name]: value,
      };
    });
  };

  // Handle change for checkbox
  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: checked,
    }));
  };

  // Handle change for multiselect field
  const handleMultiSelectChange = (e) => {
    const { value } = e.target;

    setFormData((prevData) => {
      // Seleciona os objetos completos dos serviços com base nos nomes
      const selectedServices = serviceOptions.filter((service) =>
        value.includes(service.serviceName)
      );
      return {
        ...prevData,
        servicos: selectedServices,
      };
    });
  };

  // Handle form submit (update user)
  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateUser(formData);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Atualizar Unidade</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
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

          <TextField
            label="Nome"
            name="nome"
            value={formData.nome || ""}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />

          <TextField
            label="E-mail"
            name="email"
            value={formData.email || ""}
            onChange={handleChange}
            fullWidth
            margin="normal"
            error={emailError}
            helperText={emailError ? "Formato de e-mail inválido" : ""}
          />

          <TextField
            label="Contatos"
            name="contatos"
            value={formData.contatos || ""}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />

          <TextField
            label="Endereço"
            name="endereco"
            value={formData.endereco || ""}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />

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
              value={formData.tipo.map((type) => type.id)} // Mapeia para IDs dos tipos
              onChange={handleChange}
            >
              {typeOptions.map((type) => (
                <MenuItem key={type.id} value={type.id}>
                  {type.tipo}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Multiselect para Serviços */}
          <FormControl fullWidth margin="normal">
            <InputLabel id="servicos-label">Serviços</InputLabel>
            <Select
              labelId="servicos-label"
              name="servicos"
              multiple
              value={formData.servicos.map((service) => service.serviceName)} // Mapeia para nomes dos serviços
              onChange={handleMultiSelectChange}
              label="Serviços"
            >
              {serviceOptions.map((service) => (
                <MenuItem key={service.id} value={service.serviceName}>
                  {service.serviceName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </form>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={onClose} color="secondary">
          Cancelar
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          disabled={!isFormValid()} // Desabilita o botão se o formulário estiver inválido
        >
          Atualizar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ModalUpdateUser;
