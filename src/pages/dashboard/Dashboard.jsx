import * as React from "react";
import { useNavigation } from "../../context/NavigationContext";
import "./dashboard.css";
import AddUser from "../../components/addUser/Adduser";

const Dashboard = () => {
  const { navigationSource } = useNavigation();

  return (
    <div>
      {(navigationSource === "dashboard" || navigationSource === null) && (
        <AddUser></AddUser>
      )}
      {navigationSource === "relatorios" && <div>Conteúdo dos Relatórios</div>}
    </div>
  );
};

export default Dashboard;
