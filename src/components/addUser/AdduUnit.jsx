import React, { useState, useEffect } from "react";
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
import {
  addUnit,
  fetchUnitsServiceItems,
  fetchUnitTypesCollection,
} from "../../services/UnitsService"; // Importa a função de buscar tipos
import { useSnackbar } from "../../utils/SnackbarProvider";
import "./addUnit.css";

const AddUnit = () => {
  const showSnackbar = useSnackbar();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    nome: "",
    tipo: [], // Inicializa como array para conter objetos de tipos
    endereco: "",
    contatos: "",
    email: "",
    gerente: "",
    servicos: [], // Aqui será armazenado um array de objetos de serviços selecionados
  });

  const [errors, setErrors] = useState({
    nome: false,
    tipo: false,
    endereco: false,
    contatos: false,
    email: false,
    gerente: false,
    servicos: false,
  });

  // Estado para armazenar os serviços
  const [serviceOptions, setServiceOptions] = useState([]);
  const [serviceLoading, setServiceLoading] = useState(true);

  // Estado para armazenar os tipos de unidades
  const [unitTypes, setUnitTypes] = useState([]);
  const [unitTypesLoading, setUnitTypesLoading] = useState(true);

  const validateEmail = (email) => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
  };

  const fetchServices = async () => {
    try {
      const services = await fetchUnitsServiceItems();
      setServiceOptions(services);
    } catch (error) {
      showSnackbar("Erro ao carregar os serviços.", "error");
    } finally {
      setServiceLoading(false);
    }
  };

  const fetchUnitTypes = async () => {
    try {
      const types = await fetchUnitTypesCollection();
      setUnitTypes(types);
    } catch (error) {
      showSnackbar("Erro ao carregar os tipos de unidades.", "error");
    } finally {
      setUnitTypesLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
    fetchUnitTypes();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === "tipo") {
      // Para seleção múltipla, armazenamos um array de objetos completos
      const selectedTypes = unitTypes.filter((type) => value.includes(type.id));
      setFormData({ ...formData, tipo: selectedTypes });
    } else if (name === "servicos") {
      const selectedServices = serviceOptions.filter((service) =>
        value.includes(service.serviceName)
      );
      setFormData({ ...formData, servicos: selectedServices });
    } else {
      setFormData({ ...formData, [name]: value });
    }

    if (name === "email" && value && !validateEmail(value)) {
      setErrors({ ...errors, email: true });
    } else {
      setErrors({ ...errors, [name]: false });
    }
  };

  const validateForm = () => {
    return (
      formData.nome &&
      formData.tipo.length > 0 && // Certifique-se de que há pelo menos um tipo selecionado
      formData.endereco &&
      formData.contatos &&
      formData.email &&
      formData.gerente &&
      formData.servicos.length > 0 &&
      !errors.email
    );
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      await addUnit(formData);
      showSnackbar("Unidade adicionada com sucesso.", "success");
    } catch (error) {
      showSnackbar("Erro durante o cadastro. Tente novamente.", "error");
    } finally {
      setLoading(false);
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
              zIndex: 1000,
            }}
          >
            <CircularProgress size={80} />
          </Box>
        </Modal>

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
            
              value={formData.tipo.map((type) => type.id)} // Mapeia para IDs dos tipos
              onChange={handleChange}
              error={errors.tipo}
            >
              {unitTypesLoading ? (
                <MenuItem disabled>Aguarde, carregando tipos...</MenuItem>
              ) : unitTypes.length > 0 ? (
                unitTypes.map((type) => (
                  <MenuItem key={type.id} value={type.id}>
                    {type.tipo}
                  </MenuItem>
                ))
              ) : (
                <MenuItem disabled>Nenhum tipo de unidade encontrado.</MenuItem>
              )}
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
              multiple
              value={formData.servicos.map((service) => service.serviceName)}
              onChange={handleChange}
              error={errors.servicos}
            >
              {serviceLoading ? (
                <MenuItem disabled>Aguarde, carregando serviços...</MenuItem>
              ) : (
                serviceOptions.map((service) => (
                  <MenuItem key={service.id} value={service.serviceName}>
                    {service.serviceName}
                  </MenuItem>
                ))
              )}
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
