import React, { useState, useEffect } from "react";
import "./addProfessional.css";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  TextField,
  Button,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Checkbox,
  ListItemText,
  OutlinedInput,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  getProfessionalsFunctions,
  addProfessional,
} from "../../services/ProfessionalService";
import { useSnackbar } from "../../utils/SnackbarProvider";
import { fetchItems } from "../../services/UnitsService";

const AddProfessional = () => {
  const showSnackbar = useSnackbar();
  const [nomeCompleto, setNomeCompleto] = useState("");
  const [cpf, setCpf] = useState("");
  const [registroProfissional, setRegistroProfissional] = useState("");
  const [email, setEmail] = useState("");
  const [login, setLogin] = useState("");
  const [inicioExercicio, setInicioExercicio] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [unidades, setUnidades] = useState([]);
  const [observacoes, setObservacoes] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [unidadesSelecionadas, setUnidadesSelecionadas] = useState([]);
  const [funcaoSelecionada, setFuncaoSelecionada] = useState([]);
  const [funcoes, setFuncoes] = useState([]);

  useEffect(() => {
    const fetchProfessionals = async () => {
      try {
        const professionals = await getProfessionalsFunctions();
        const tiposDeFuncoes = professionals.map((prof) => ({
          id: prof.id,
          tipo: prof.type,
        }));
        setFuncoes(tiposDeFuncoes);
      } catch (error) {
        console.error("Erro ao carregar funções:", error);
      }
    };
    fetchProfessionals();
  }, []);

  useEffect(() => {
    const fetchUnidades = async () => {
      try {
        const items = await fetchItems();
        setUnidades(items);
      } catch (error) {
        console.error("Erro ao carregar unidades:", error);
      }
    };
    fetchUnidades();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!isEmailValid(email)) {
      setEmailError(true);
      return;
    }

    const unidadesCompletas = unidades.filter((unidade) =>
      unidadesSelecionadas.includes(unidade.endereco)
    );
    const selectedFuncoes = funcoes.filter((func) =>
      funcaoSelecionada.includes(func.tipo)
    );

    if (funcaoSelecionada.length > 1) {
      showSnackbar("Selecione apenas uma função para o profissional.", "error");
      return;
    }

    if (unidadesCompletas.length > 1) {
      showSnackbar(
        "Selecione apenas uma unidade para o profissional.",
        "error"
      );
      return;
    }

    const data = {
      nomeCompleto,
      cpf,
      registroProfissional,
      funcao: selectedFuncoes,
      email,
      login,
      inicioExercicio,
      unidades: unidadesCompletas,
      observacoes,
    };

    setLoading(true);
    setError("");
    try {
      await addProfessional(data);
      showSnackbar("Profissional adicionado com sucesso.", "success");
      setNomeCompleto("");
      setCpf("");
      setRegistroProfissional("");
      setFuncaoSelecionada([]);
      setEmail("");
      setLogin("");
      setInicioExercicio("");
      setUnidadesSelecionadas([]);
      setObservacoes("");
    } catch (error) {
      showSnackbar("Erro ao adicionar profissional. Tente novamente", "error");
      setError("Erro ao adicionar profissional. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const isEmailValid = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (emailError) {
      setEmailError(!isEmailValid(e.target.value));
    }
  };

  const handleFuncaoChange = (e) => {
    const selectedValues = e.target.value;
    setFuncaoSelecionada(selectedValues);
  };

  const handleUnidadeChange = (e) => {
    const selectedValues = e.target.value;
    setUnidadesSelecionadas(selectedValues);
  };

  const isFormValid = () => {
    return (
      nomeCompleto.trim() &&
      cpf.trim() &&
      registroProfissional.trim() &&
      funcaoSelecionada.length > 0 &&
      email.trim() &&
      login.trim() &&
      inicioExercicio.trim() &&
      unidadesSelecionadas.length > 0 &&
      isEmailValid(email)
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
            label="Registro Profissional"
            variant="outlined"
            fullWidth
            required
            margin="normal"
            value={registroProfissional}
            onChange={(e) => setRegistroProfissional(e.target.value)}
          />

          {/* Campo de Seleção de Função */}
          <FormControl fullWidth margin="normal">
            <InputLabel>Função</InputLabel>
            <Select
              multiple
              value={funcaoSelecionada}
              onChange={handleFuncaoChange}
              input={<OutlinedInput label="Função" />}
              renderValue={(selected) => selected.join(", ")}
            >
              {funcoes.map((func) => (
                <MenuItem key={func.id} value={func.tipo}>
                  <Checkbox checked={funcaoSelecionada.includes(func.tipo)} />
                  <ListItemText primary={func.tipo} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Campo de Seleção de Unidade */}
          <FormControl fullWidth margin="normal">
            <InputLabel>Unidade de trabalho</InputLabel>
            <Select
              multiple
              value={unidadesSelecionadas}
              onChange={handleUnidadeChange}
              input={<OutlinedInput label="Unidade de trabalho" />}
              renderValue={(selected) => selected.join(", ")}
            >
              {unidades.map((unidade) => (
                <MenuItem key={unidade.id} value={unidade.endereco}>
                  <Checkbox
                    checked={unidadesSelecionadas.includes(unidade.endereco)}
                  />
                  <ListItemText primary={unidade.endereco} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Outros Campos */}
          <TextField
            label="Email"
            type="email"
            variant="outlined"
            fullWidth
            required
            margin="normal"
            value={email}
            onChange={handleEmailChange}
            error={emailError}
            helperText={emailError ? "Insira um endereço de email válido" : ""}
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
          <TextField
            label="Observações"
            variant="outlined"
            fullWidth
            margin="normal"
            multiline
            rows={4}
            value={observacoes}
            onChange={(e) => setObservacoes(e.target.value)}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            style={{ marginTop: "16px", width: "auto", padding: "6px 16px" }}
            disabled={!isFormValid() || loading}
          >
            {loading ? "Adicionando..." : "Adicionar"}
          </Button>
        </form>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </AccordionDetails>
    </Accordion>
  );
};

export default AddProfessional;
