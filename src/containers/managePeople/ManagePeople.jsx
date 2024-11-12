import "./managePeople.css";
import AddProfessional from "../../components/addProfessional/AddProfessional";
import EditProfessional from "../../components/editProfessional/EditProfessional";
import DeleteProfessional from "../../components/deleteProfessional/DeleteProfessional";
import GetProfesionals from "../../components/getProfessionals/GetProfessionals";

const ManagePeople = () => {
  return (
    <div className="peopleContainer">
      <GetProfesionals />
      <AddProfessional />
      <EditProfessional />
      <DeleteProfessional />
    </div>
  );
};

export default ManagePeople;
