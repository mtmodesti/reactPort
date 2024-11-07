import * as React from "react";
import { useNavigation } from "../../context/NavigationContext";
import "./dashboard.css";
import ManagePeople from "../../containers/managePeople/ManagePeople";
import ManageUnits from "../../containers/manageUnits/ManageUnits";

const Dashboard = () => {
  const { navigationSource } = useNavigation();
  const userRole = sessionStorage.getItem("role");

  return (
    <div className="dashboardWrapper">
      {/* {navigationSource === "dashboard" && <UserMaintenance></UserMaintenance>} */}
      {(navigationSource === "profissionais" || navigationSource === null) &&
        userRole === "admin" && <ManageUnits />}
      {navigationSource === "unidades" && userRole === "admin" && (
        <ManagePeople />
      )}
    </div>
  );
};

export default Dashboard;
