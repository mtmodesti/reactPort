import * as React from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  TextField,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Button,
} from "@mui/material";

const AddUser = () => {
  const [formData, setFormData] = React.useState({
    nome: "",
    cpf: "",
    email: "",
    endereco: "", // Adicionado o campo de endereço
    perfil: "user", // Começando com "user" selecionado
    observacoes: "", // Campo de observações
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData);
  };

  return (
    <div className="wrapper">
      <Accordion className="accordeon-line">
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Adicionar usuário</Typography>
        </AccordionSummary>
        <AccordionDetails style={{ maxHeight: "300px", overflowY: "auto" }}>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Nome completo"
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              required
              fullWidth
              margin="normal"
            />
            <TextField
              label="CPF"
              name="cpf"
              value={formData.cpf}
              onChange={handleChange}
              required
              fullWidth
              margin="normal"
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
            />
            <TextField
              label="Endereço completo"
              name="endereco"
              value={formData.endereco}
              onChange={handleChange}
              required
              fullWidth
              margin="normal"
            />
            <FormControl component="fieldset" margin="normal" required>
              <Typography variant="subtitle1" gutterBottom>
                Selecione o perfil do usuário:
              </Typography>
              <RadioGroup
                name="perfil"
                value={formData.perfil}
                onChange={handleChange}
                row // Adicionado para colocar os botões em linha
              >
                <FormControlLabel
                  value="user"
                  control={<Radio />}
                  label="Usuário"
                />
                <FormControlLabel
                  value="viewer"
                  control={<Radio />}
                  label="Visualizador"
                />
                <FormControlLabel
                  value="admin"
                  control={<Radio />}
                  label="Administrador"
                  disabled
                />
              </RadioGroup>
            </FormControl>
            <TextField
              label="Observações"
              name="observacoes"
              value={formData.observacoes}
              onChange={handleChange}
              multiline
              maxRows={5}
              fullWidth
              variant="outlined"
              margin="normal"
            />
            <Button type="submit" variant="contained" color="primary">
              Adicionar
            </Button>
          </form>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default AddUser;
