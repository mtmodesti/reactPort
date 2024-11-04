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
import {
  userExists,
  emailExists,
  addUser,
} from "../../services/firestoreService";
import { useSnackbar } from "../../utils/SnackbarProvider";

const AddUser = () => {
  const showSnackbar = useSnackbar();

  const [formData, setFormData] = React.useState({
    userName: "",
    document: "",
    userEmail: "",
    address: "",
    role: "user",
    obs: "",
    password: "", // Novo campo para a senha
  });

  const [errors, setErrors] = React.useState({
    userName: false,
    document: false,
    userEmail: false,
    address: false,
    password: false, // Adicionando validação de erro para senha
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: false });
  };

  const validateForm = () => {
    return (
      formData.userName &&
      formData.document &&
      formData.userEmail &&
      formData.address &&
      formData.password // Validação para incluir o campo de senha
    );
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newErrors = {
      userName: !formData.userName,
      document: !formData.document,
      userEmail: !formData.userEmail,
      address: !formData.address,
      password: !formData.password,
    };

    setErrors(newErrors);

    if (!Object.values(newErrors).includes(true)) {
      const isValidUser = await userExists(formData.userEmail, false);
      if (isValidUser) {
        showSnackbar("E-mail já cadastrado", "error");
        return;
      } else {
        try {
          const isEmailRegistered = await emailExists(formData.userEmail);
          if (isEmailRegistered) {
            showSnackbar("E-mail já cadastrado", "error");
          } else {
            addUser(formData);
            showSnackbar("Usuário adicionado com sucesso.", "success");
          }
        } catch {
          showSnackbar("Erro durante o cadastro. Tente novamente.", "error");
        }
      }
    }
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
          <form onSubmit={handleSubmit} noValidate>
            <TextField
              label="Nome completo"
              name="userName"
              value={formData.userName}
              onChange={handleChange}
              required
              fullWidth
              margin="normal"
              error={errors.userName}
              helperText={errors.userName ? "Campo obrigatório" : ""}
            />
            <TextField
              label="Documento"
              name="document"
              value={formData.document}
              onChange={handleChange}
              required
              fullWidth
              margin="normal"
              error={errors.document}
              helperText={errors.document ? "Campo obrigatório" : ""}
            />
            <TextField
              label="Email"
              name="userEmail"
              value={formData.userEmail}
              onChange={handleChange}
              required
              fullWidth
              margin="normal"
              type="email"
              error={errors.userEmail}
              helperText={errors.userEmail ? "Campo obrigatório" : ""}
            />
            <TextField
              label="Endereço completo"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              fullWidth
              margin="normal"
              error={errors.address}
              helperText={errors.address ? "Campo obrigatório" : ""}
            />
            <TextField
              label="Senha"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              fullWidth
              margin="normal"
              type="password" // Campo para senha
              error={errors.password}
              helperText={errors.password ? "Campo obrigatório" : ""}
            />
            <FormControl component="fieldset" margin="normal" required>
              <Typography variant="subtitle1" gutterBottom>
                Selecione o perfil do usuário:
              </Typography>
              <RadioGroup
                name="role"
                value={formData.role}
                onChange={handleChange}
                row
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
              name="obs"
              value={formData.obs}
              onChange={handleChange}
              multiline
              maxRows={5}
              fullWidth
              variant="outlined"
              margin="normal"
            />
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
    </div>
  );
};

export default AddUser;
