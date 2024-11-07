import * as React from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  TextField,
  Button,
  CircularProgress,
  Modal,
  Box,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { toggleUnityActivity } from "../../services/UnitsService"; // Função de serviço para desativar unidade
import { useSnackbar } from "../../utils/SnackbarProvider"; // Hook para mostrar mensagens de sucesso/erro
import "./deleteUnit.css";

const DisableUnit = () => {
  const [id, setId] = React.useState(""); // Estado para o identificador da unidade
  const [loading, setLoading] = React.useState(false); // Estado para controlar o loading
  const showSnackbar = useSnackbar(); // Função para mostrar mensagens de sucesso/erro

  // Função para lidar com o evento de desativar a unidade
  const handleDisableUnit = async () => {
    setLoading(true); // Ativa o loading
    try {
      const success = await toggleUnityActivity(id, false); // Chama a função para desativar a unidade
      if (success) {
        showSnackbar("Unidade desativada com sucesso.", "success");
        setId(""); // Limpa o campo após a ação
      } else {
        showSnackbar("Identificador não encontrado. Tente novamente.", "error");
      }
    } catch (error) {
      showSnackbar("Erro ao alterar unidade. Tente novamente.", "error");
    } finally {
      setLoading(false); // Desativa o loading, seja sucesso ou erro
    }
  };

  return (
    <Accordion className="accordeon-line">
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography>Desativar unidade</Typography>
      </AccordionSummary>
      <AccordionDetails style={{ maxHeight: "400px", overflowY: "auto" }}>
        <div className="inputsWrapper">
          <TextField
            label="Identificador da unidade"
            variant="outlined"
            fullWidth
            value={id}
            onChange={(e) => setId(e.target.value)} // Atualiza o estado com o identificador
          />
          <Button
            variant="contained"
            color="primary"
            style={{
              marginTop: "10px",
              width: "fit-content",
              padding: "6px 16px",
            }}
            onClick={handleDisableUnit} // Chama a função para desativar a unidade
            disabled={!id || loading} // Desativa o botão se o campo de identificador estiver vazio ou se o loading estiver ativo
          >
            Desativar unidade
          </Button>
        </div>
      </AccordionDetails>

      {/* Modal de Loading */}
      <Modal
        open={loading}
        onClose={() => {}}
        aria-labelledby="loading-modal-title"
        aria-describedby="loading-modal-description"
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            width: "100vw",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 1000, // Garante que o modal fique acima de outros elementos
          }}
        >
          <CircularProgress size={80} />
        </Box>
      </Modal>
    </Accordion>
  );
};

export default DisableUnit;
