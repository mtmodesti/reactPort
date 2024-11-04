import React from "react";
import "./loginForm.css";
import { userExists } from "../../services/firestoreService";
import { TextField, Button, Container, Typography } from "@mui/material";
import { useSnackbar } from "../../utils/SnackbarProvider";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");
  const showSnackbar = useSnackbar();
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    setError("");
    if (!email || !password) {
      setError("Todos os campos são obrigatórios.");
      return;
    } else {
      handleUser({ email, password });
    }
  };

  const handleUser = async ({ email, password }) => {
    try {
      const isValidUser = await userExists(email, password, true);
      if (isValidUser) {
        showSnackbar("Login realizado com sucesso", "success");
        navigate("/dashboard");
      } else {
        showSnackbar("Credenciais inválidas", "error");
      }
    } catch {
      showSnackbar(
        "Erro no processo de validação. Tente novamente ou entre em contato com o administrador",
        "error"
      );
    }
  };

  const isEmailValid = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const isButtonDisabled = !email || !password || !isEmailValid(email);

  return (
    <Container sx={{ width: "300px" }} className="elevated">
      <form onSubmit={handleSubmit}>
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          margin="normal"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={!isEmailValid(email) && email.length > 0}
          helperText={
            !isEmailValid(email) && email.length > 0 ? "Email inválido" : " "
          }
          sx={{ marginBottom: 2 }}
        />
        <TextField
          label="Senha"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={{ marginBottom: 2 }}
        />
        {error && <Typography color="error">{error}</Typography>}
        <Button
          variant="contained"
          color="primary"
          type="submit"
          fullWidth
          disabled={isButtonDisabled}
          sx={{ marginBottom: 2 }}
        >
          Entrar
        </Button>
      </form>
    </Container>
  );
};

export default LoginForm;
