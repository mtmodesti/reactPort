import * as React from "react";
import { useNavigation } from "../../context/NavigationContext";
import "./dashboard.css";
import UserMaintenance from "../../containers/userMaintenance/UserMaintenance";

const Dashboard = () => {
  const { navigationSource } = useNavigation();
  const userRole = sessionStorage.getItem("role");

  return (
    <div className="dashboardWrapper">
      {(navigationSource === "dashboard" || navigationSource === null) &&
        userRole === "admin" && <UserMaintenance></UserMaintenance>}
      {navigationSource === "relatorios" && <div>Conteúdo dos Relatórios</div>}
    </div>
  );
};

export default Dashboard;
