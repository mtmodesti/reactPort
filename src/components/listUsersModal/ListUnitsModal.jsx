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
import { fetchItems } from "../../services/UnitsService";
import { useSnackbar } from "../../utils/SnackbarProvider";

const ListUnitsModal = ({ open, onClose }) => {
  const [units, setUnits] = useState([]);
  const showSnackbar = useSnackbar();

  useEffect(() => {
    if (open) {
      const getUnits = async () => {
        try {
          const unitsList = await fetchItems();
          setUnits(unitsList);
        } catch (error) {
          showSnackbar("Erro ao carregar itens. Tente novamente.", "error");
          onClose();
        }
      };
      getUnits();
    } else {
      setUnits([]);
    }
  }, [open, showSnackbar, onClose]);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Lista de Unidades</DialogTitle>
      <DialogContent>
        <List>
          {units.length === 0 ? (
            <Typography variant="body1">Nenhuma unidade encontrada.</Typography>
          ) : (
            units.map((unit) => (
              <div key={unit.id}>
                <ListItem>
                  <div>
                    <Typography variant="h6">{unit.nome}</Typography>
                    <Typography variant="caption" color="textSecondary">
                      Identificador: {unit.id}
                    </Typography>
                    <Typography variant="body2">Email: {unit.email}</Typography>
                    <Typography variant="body2">
                      Contatos: {unit.contatos}
                    </Typography>
                    <Typography variant="body2">
                      Endereço: {unit.endereco}
                    </Typography>
                    <Typography variant="body2">
                      Gerente: {unit.gerente}
                    </Typography>
                    <Typography variant="body2">
                      Ativo: {unit.active ? "Sim" : "Não"}
                    </Typography>
                    <Typography variant="body2">Tipo: {unit.tipo}</Typography>
                    <Typography variant="body2">
                      Serviços: {unit.servicos}
                    </Typography>
                  </div>
                </ListItem>
                <Divider />
              </div>
            ))
          )}
        </List>
      </DialogContent>
      <DialogActions style={{ justifyContent: "flex-start" }}>
        <Button variant="contained" color="primary" onClick={onClose}>
          Fechar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ListUnitsModal;
