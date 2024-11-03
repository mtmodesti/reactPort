import React from "react";
import "./registerForm.css";
import { TextField, Button, Container, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const RegisterForm = () => {
  const [email, setEmail] = React.useState("");
  const [fullName, setFullName] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [error, setError] = React.useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    setError("");

    if (!email || !fullName || !password || !confirmPassword) {
      setError("Todos os campos são obrigatórios.");
      return;
    }

    if (password !== confirmPassword) {
      setError("A confirmação de senha não corresponde à senha.");
      return;
    }

    console.log("Email:", email);
    console.log("Nome completo:", fullName);
    console.log("Senha:", password);
  };

  const isEmailValid = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const isButtonDisabled =
    !email ||
    !fullName ||
    !password ||
    !confirmPassword ||
    !isEmailValid(email);

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
          label="Nome Completo"
          variant="outlined"
          fullWidth
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          sx={{ marginBottom: 2 }}
        />
        <TextField
          label="Senha"
          type="passworda"
          variant="outlined"
          fullWidth
          margin="normal"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={{ marginBottom: 2 }}
        />
        <TextField
          label="Confirmação de Senha"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          required
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
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
          Registrar
        </Button>
      </form>
      <Typography variant="body2" align="center">
        Já tem uma conta?{" "}
        <Link to="/" className="link">
          Entre
        </Link>
      </Typography>
    </Container>
  );
};

export default RegisterForm;
