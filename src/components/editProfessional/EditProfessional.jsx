import React, { useState, useEffect } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Select,
  MenuItem,
  Checkbox,
  ListItemText,
  FormControl,
  InputLabel,
  OutlinedInput,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  getProfessionalById,
  getProfessionalsFunctions,
  updateProfessionalById,
} from "../../services/ProfessionalService";
import { useSnackbar } from "../../utils/SnackbarProvider";
import { fetchItems } from "../../services/UnitsService";

const EditProfessional = () => {
  const showSnackbar = useSnackbar();

  const [id, setId] = useState("");
  const [professional, setProfessional] = useState(null);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [registroProfissional, setRegistroProfissional] = useState("");
  const [cpf, setCpf] = useState("");
  const [email, setEmail] = useState("");
  const [login, setLogin] = useState("");
  const [observacoes, setObservacoes] = useState("");
  const [inicioExercicio, setInicioExercicio] = useState("");
  const [active, setActive] = useState(true);
  const [professions, setProfessions] = useState([]);
  const [units, setUnits] = useState([]);
  const [selectedProfessions, setSelectedProfessions] = useState([]);
  const [selectedUnits, setSelectedUnits] = useState([]);
  const [isSaveDisabled, setIsSaveDisabled] = useState(true);

  useEffect(() => {
    const validateForm = () => {
      const requiredFieldsFilled =
        name &&
        registroProfissional &&
        cpf &&
        email &&
        login &&
        inicioExercicio &&
        selectedProfessions.length > 0 &&
        selectedUnits.length > 0;
      const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

      setIsSaveDisabled(!(requiredFieldsFilled && isEmailValid));
    };

    validateForm();
  }, [
    name,
    registroProfissional,
    cpf,
    email,
    login,
    inicioExercicio,
    selectedProfessions,
    selectedUnits,
  ]);

  const handleEditClick = async () => {
    try {
      const fetchedProfessional = await getProfessionalById(id);
      if (fetchedProfessional) {
        setProfessional(fetchedProfessional);
        setName(fetchedProfessional.nomeCompleto);
        setRegistroProfissional(fetchedProfessional.registroProfissional);
        setCpf(fetchedProfessional.cpf);
        setEmail(fetchedProfessional.email);
        setLogin(fetchedProfessional.login);
        setObservacoes(fetchedProfessional.observacoes);
        setInicioExercicio(fetchedProfessional.inicioExercicio || "");
        setActive(fetchedProfessional.active);

        const professionalsFunctions = await getProfessionalsFunctions();
        const items = await fetchItems();

        setProfessions(professionalsFunctions);
        setUnits(items.filter((item) => item.active === true));

        setSelectedProfessions(
          (fetchedProfessional.funcao || []).map((func) => func.id)
        );
        setSelectedUnits(
          (fetchedProfessional.unidades || []).map((unit) => unit.id)
        );
        setOpen(true);
      } else {
        showSnackbar("Profissional não encontrado", "error");
      }
    } catch (error) {
      console.error(
        "Erro ao buscar o profissional ou capturar informações adicionais:",
        error
      );
      showSnackbar(
        "Erro ao buscar o profissional ou informações adicionais",
        "error"
      );
    }
  };

  const handleInputChange = (event) => setId(event.target.value);
  const handleNameChange = (event) => setName(event.target.value);
  const handleRegistroProfissionalChange = (event) =>
    setRegistroProfissional(event.target.value);
  const handleCpfChange = (event) => setCpf(event.target.value);
  const handleEmailChange = (event) => setEmail(event.target.value);
  const handleLoginChange = (event) => setLogin(event.target.value);
  const handleObservacoesChange = (event) => setObservacoes(event.target.value);
  const handleInicioExercicioChange = (event) =>
    setInicioExercicio(event.target.value);
  const handleActiveChange = (event) =>
    setActive(event.target.value === "true");
  const handleProfessionSelect = (event) => {
    const selected = event.target.value;
    setSelectedProfessions(selected);
  };
  const handleUnitSelect = (event) => {
    const selected = event.target.value;
    setSelectedUnits(selected);
  };

  const handleClose = async () => {
    const selectedProfessionObjects = selectedProfessions.map((id) =>
      professions.find((profession) => profession.id === id)
    );
    const selectedUnitObjects = selectedUnits.map((id) =>
      units.find((unit) => unit.id === id)
    );

    const updatedData = {
      active,
      cpf,
      email,
      funcao: selectedProfessionObjects,
      inicioExercicio,
      login,
      nomeCompleto: name,
      observacoes,
      registroProfissional,
      unidades: selectedUnitObjects,
    };

    setOpen(false);
    await updateProfessionalById(id, updatedData);
    console.log("att com sucesso");
    showSnackbar("Profissional editado com sucesso", "success");
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
        <TextField
          label="ID do Profissional"
          variant="outlined"
          fullWidth
          value={id}
          onChange={handleInputChange}
          style={{ marginBottom: "16px" }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleEditClick}
          disabled={!id}
        >
          Editar profissional
        </Button>
      </AccordionDetails>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Editar Profissional</DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="textSecondary" gutterBottom>
            <strong>Identificador do Usuário:</strong> {professional?.id}
          </Typography>

          <FormControl component="fieldset" margin="normal">
            <RadioGroup
              row
              value={active ? "true" : "false"}
              onChange={handleActiveChange}
            >
              <FormControlLabel
                value="true"
                control={<Radio />}
                label="Ativo"
              />
              <FormControlLabel
                value="false"
                control={<Radio />}
                label="Inativo"
              />
            </RadioGroup>
          </FormControl>

          <TextField
            label="Nome Completo"
            variant="outlined"
            fullWidth
            value={name}
            onChange={handleNameChange}
            style={{ marginTop: "16px", marginBottom: "16px" }}
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
            onChange={handleInicioExercicioChange}
            style={{ marginBottom: "16px" }}
          />

          <TextField
            label="CPF"
            variant="outlined"
            fullWidth
            value={cpf}
            onChange={handleCpfChange}
            style={{ marginBottom: "16px" }}
          />

          <TextField
            label="Registro Profissional"
            variant="outlined"
            fullWidth
            value={registroProfissional}
            onChange={handleRegistroProfissionalChange}
            style={{ marginBottom: "16px" }}
          />

          <FormControl fullWidth margin="normal">
            <InputLabel>Funções</InputLabel>
            <Select
              multiple
              value={selectedProfessions}
              onChange={handleProfessionSelect}
              input={<OutlinedInput label="Funções" />}
              renderValue={(selected) =>
                selected
                  .map(
                    (id) =>
                      professions.find((profession) => profession.id === id)
                        ?.type
                  )
                  .join(", ")
              }
            >
              {professions.map((profession) => (
                <MenuItem key={profession.id} value={profession.id}>
                  <Checkbox
                    checked={selectedProfessions.includes(profession.id)}
                  />
                  <ListItemText primary={profession.type} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth margin="normal">
            <InputLabel>Unidade de Trabalho</InputLabel>
            <Select
              multiple
              value={selectedUnits}
              onChange={handleUnitSelect}
              input={<OutlinedInput label="Unidade de Trabalho" />}
              renderValue={(selected) =>
                selected
                  .map((id) => units.find((unit) => unit.id === id)?.endereco)
                  .join(", ")
              }
            >
              {units.map((unit) => (
                <MenuItem key={unit.id} value={unit.id}>
                  <Checkbox checked={selectedUnits.includes(unit.id)} />
                  <ListItemText primary={unit.endereco} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            value={email}
            onChange={handleEmailChange}
            style={{ marginBottom: "16px" }}
          />

          <TextField
            label="Login"
            variant="outlined"
            fullWidth
            value={login}
            onChange={handleLoginChange}
            style={{ marginBottom: "16px" }}
          />

          <TextField
            label="Observações"
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            value={observacoes}
            onChange={handleObservacoesChange}
            style={{ marginBottom: "16px" }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="primary">
            Cancelar
          </Button>
          <Button
            onClick={handleClose}
            variant="contained"
            color="primary"
            disabled={isSaveDisabled}
          >
            Salvar
          </Button>
        </DialogActions>
      </Dialog>
    </Accordion>
  );
};

export default EditProfessional;
