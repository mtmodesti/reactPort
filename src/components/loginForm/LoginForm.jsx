import React, { useState } from "react";
import "./loginForm.css";
import { TextField, Button, Container, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { fetchItems, addItem } from "../../services/firestoreService";

const LoginForm = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ nome: "", password: "" });

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

  // Função para buscar os usuários
  const handleGetUsers = async () => {
    try {
      const usersData = await fetchItems(); // Chama a função para buscar os usuários
      console.log("---");
      console.log(usersData);

      setUsers(usersData); // Armazena os usuários no estado
    } catch (error) {
      setError("Erro ao buscar usuários."); // Trata o erro
    }
  };

  // Função para adicionar um novo usuário
  const handleAddUser = async () => {
    console.log("a");
    try {
      await addItem({ name: "a", pass: "b" }); // Chama a função para adicionar um novo usuário
      console.log("b");
    } catch (error) {
      console.log("bosta");
      setError("Erro ao adicionar usuário."); // Trata o erro
    }
  };

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
        <Button
          variant="contained"
          color="primary"
          type="button"
          fullWidth
          disabled={false}
          onClick={handleAddUser}
          sx={{ marginBottom: 2 }}
        >
          Get Users
        </Button>
      </form>
      <Typography variant="body2" align="center">
        Não tem uma conta?{" "}
        <Link to="/register" className="link">
          Cadastre-se
        </Link>
      </Typography>
    </Container>
  );
};

export default LoginForm;
