import "./manageUnits.css";
import GetUnits from "../../components/getUnits/GetUnits";
import UpdateUnits from "../../components/updateUnits/UpdateUnits";
import AddUnit from "../../components/addUser/AdduUnit";
import DisableUnit from "../../components/disableUnit/DisableUnit";

const ManageUnits = () => {
  return (
    <div className="wrapper">
      <AddUnit />
      <DisableUnit />
      <GetUnits />
      <UpdateUnits />
    </div>
  );
};

export default ManageUnits;
