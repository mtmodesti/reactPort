import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  List,
  ListItem,
  Divider,
  Typography,
} from "@mui/material";
import { fetchItems } from "../../services/firestoreService"; // Certifique-se de importar sua função de busca
import { useSnackbar } from "../../utils/SnackbarProvider"; // Importando o hook do Snackbar

const ListUsersModal = ({ open, onClose }) => {
  const [users, setUsers] = useState([]);
  const showSnackbar = useSnackbar(); // Função para exibir mensagens

  // Carrega os usuários quando o modal for aberto
  useEffect(() => {
    if (open) {
      const getUsers = async () => {
        try {
          const usersList = await fetchItems(); // Recupera os usuários
          setUsers(usersList);
        } catch (error) {
          // Se ocorrer um erro, exibe a mensagem de erro no snackbar
          showSnackbar("Erro ao carregar usuários. Tente novamente.", "error");
          onClose(); // Fecha o modal em caso de erro
        }
      };
      getUsers();
    } else {
      // Limpa a lista de usuários quando o modal for fechado
      setUsers([]);
    }
  }, [open, showSnackbar, onClose]); // Adiciona showSnackbar e onClose como dependências

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Lista de Usuários</DialogTitle>
      <DialogContent>
        <List>
          {users.length === 0 ? (
            <Typography variant="body1">Nenhum usuário encontrado.</Typography>
          ) : (
            users.map((user) => (
              <div key={user.id}>
                <ListItem>
                  <div>
                    <Typography variant="h6">{user.userName}</Typography>
                    <Typography variant="body2">
                      Email: {user.userEmail}
                    </Typography>
                    <Typography variant="body2">
                      CPF: {user.document}
                    </Typography>
                    <Typography variant="body2">
                      Endereço: {user.address}
                    </Typography>
                    <Typography variant="body2">Perfil: {user.role}</Typography>
                    {user.obs && (
                      <Typography variant="body2">
                        Observações: {user.obs}
                      </Typography>
                    )}
                  </div>
                </ListItem>
                <Divider />
              </div>
            ))
          )}
        </List>
      </DialogContent>
      <DialogActions style={{ justifyContent: "flex-start" }}>
        <Button
          variant="contained"
          color="primary"
          onClick={onClose} // Fechar o modal ao clicar no botão
        >
          Fechar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ListUsersModal;
