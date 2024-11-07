import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const GetProfesionals = () => {
  return (
    <Accordion className="accordeon-line">
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography>Listar profissionais</Typography>
      </AccordionSummary>
      <AccordionDetails style={{ maxHeight: "300px", overflowY: "auto" }}>
        delete
      </AccordionDetails>
    </Accordion>
  );
};

export default GetProfesionals;
