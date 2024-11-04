import * as React from "react";
import { useNavigation } from "../../context/NavigationContext";
import "./dashboard.css";
import AddUser from "../../components/addUser/Adduser";

const Dashboard = () => {
  const { navigationSource } = useNavigation();
  const userRole = sessionStorage.getItem("role");

  return (
    <div>
      {(navigationSource === "dashboard" || navigationSource === null) &&
        userRole === "admin" && <AddUser />}
      {navigationSource === "relatorios" && <div>Conteúdo dos Relatórios</div>}
    </div>
  );
};

export default Dashboard;
