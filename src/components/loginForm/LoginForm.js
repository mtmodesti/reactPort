import React from "react";
import "./LoginForm.css";
import { TextField, Button, Container, Typography } from "@mui/material";
import { Link } from "react-router-dom"; // Importando Link

const LoginForm = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    setError("");
    if (!email || !password) {
      setError("Todos os campos são obrigatórios.");
      return;
    }
    console.log("Email:", email);
    console.log("Senha:", password);
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
          } // espaço para manter a altura
          sx={{ marginBottom: 2 }} // Espaço uniforme
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
          sx={{ marginBottom: 2 }} // Espaço uniforme
        />
        {error && <Typography color="error">{error}</Typography>}
        <Button
          variant="contained"
          color="primary"
          type="submit"
          fullWidth
          disabled={isButtonDisabled}
          sx={{ marginBottom: 2 }} // Espaço uniforme
        >
          Entrar
        </Button>
      </form>
      <Typography variant="body2" align="center">
        Não tem uma conta?{" "}
        <Link
          to="/cadastro"
          style={{ textDecoration: "none", color: "#1c0b19" }}
        >
          Cadastre-se
        </Link>
      </Typography>
    </Container>
  );
};

export default LoginForm;
