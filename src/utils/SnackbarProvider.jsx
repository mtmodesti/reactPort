import React, { createContext, useContext, useState } from "react";
import { Snackbar, Button } from "@mui/material";
import { green, red } from "@mui/material/colors";

// Cria um contexto para o Snackbar
const SnackbarContext = createContext();

export const SnackbarProvider = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("success"); // "success" ou "error"

  const showSnackbar = (msg, type = "success") => {
    setMessage(msg);
    setSeverity(type);
    setOpen(true);

    // Fecha o Snackbar automaticamente após 4 segundos
    setTimeout(() => {
      setOpen(false);
    }, 3000);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <SnackbarContext.Provider value={showSnackbar}>
      {children}
      <Snackbar
        open={open}
        onClose={handleClose}
        message={message}
        action={
          <Button color="inherit" onClick={handleClose}>
            Fechar
          </Button>
        }
        anchorOrigin={{ vertical: "top", horizontal: "left" }}
        sx={{
          backgroundColor: severity === "success" ? green[600] : red[600],
          "& .MuiSnackbarContent-root": {
            backgroundColor: severity === "success" ? green[600] : red[600],
          },
        }}
      />
    </SnackbarContext.Provider>
  );
};

// Hook para usar o Snackbar em qualquer lugar
export const useSnackbar = () => {
  return useContext(SnackbarContext);
};
