import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  Divider,
  List,
  ListItem,
  DialogActions,
  Button,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import React, { useState } from "react";
import { getProfessionals } from "../../services/ProfessionalService";

const GetProfesionals = () => {
  //hooks

  //use state
  const [professionalsList, setProfessionalsList] = useState([]);
  const [open, setOpen] = useState(false);

  // functions
  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpen = () => {
    fetchData();
  };

  // Função para buscar a lista de profissionais
  const fetchData = async () => {
    try {
      const professionalsListData = await getProfessionals();
      setProfessionalsList(professionalsListData);
      setOpen(true); // Abre o modal após o carregamento dos dados
    } catch (error) {
      console.error("Erro ao buscar funções de profissionais:", error);
    }
  };

  return (
    <>
      <Accordion className="accordeon-line">
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Listar profissionais</Typography>
        </AccordionSummary>
        <AccordionDetails style={{ maxHeight: "300px", overflowY: "auto" }}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleClickOpen}
            style={{ marginTop: "16px", width: "auto", padding: "6px 16px" }}
          >
            Listar profissionais
          </Button>
        </AccordionDetails>
      </Accordion>
      {/* Modal */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Profissionais cadastrados no sistema</DialogTitle>
        <DialogContent>
          <List>
            {professionalsList.map((professional) => (
              <React.Fragment key={professional.id}>
                <ListItem style={{ display: "block" }}>
                  <Typography>
                    <strong>Nome Completo:</strong> {professional.nomeCompleto}
                  </Typography>
                  <Typography>
                    <strong>Identificador:</strong> {professional.id}
                  </Typography>
                  <Typography>
                    <strong>Ativo:</strong>{" "}
                    {professional.active ? "Sim" : "Não"}
                  </Typography>
                  <Typography>
                    <strong>Email:</strong> {professional.email}
                  </Typography>
                  <Typography>
                    <strong>Login:</strong> {professional.login}
                  </Typography>
                  <Typography>
                    <strong>CPF:</strong> {professional.cpf}
                  </Typography>
                  <Typography>
                    <strong>Início de Exercício:</strong>{" "}
                    {professional.inicioExercicio}
                  </Typography>
                  <Typography>
                    <strong>Registro Profissional:</strong>{" "}
                    {professional.registroProfissional}
                  </Typography>
                  <Typography>
                    <strong>Observações:</strong> {professional.observacoes}
                  </Typography>

                  {/* Renderiza Função */}
                  <Typography>
                    <strong>Funções:</strong>{" "}
                    {Array.isArray(professional.funcao) &&
                      professional.funcao
                        .map((funcao, index) =>
                          typeof funcao === "object" ? `${funcao.tipo}` : funcao
                        )
                        .join(", ")}
                  </Typography>

                  {/* Renderiza Unidades */}
                  <Typography>
                    <strong>Unidades:</strong>{" "}
                    {Array.isArray(professional.unidades) &&
                      professional.unidades
                        .map((unidade) => unidade.endereco)
                        .join(", ")}
                  </Typography>
                </ListItem>
                <Divider /> {/* Divider abaixo de cada item */}
              </React.Fragment>
            ))}
          </List>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleClose} color="primary">
            Fechar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default GetProfesionals;
