import * as React from "react";
import { useNavigation } from "../../context/NavigationContext";
import "./dashboard.css";

const Dashboard = () => {
  const { navigationSource } = useNavigation();

  return (
    <div>
      {(navigationSource === "dashboard" || navigationSource === null) && (
        <div>Conteúdo do Dashboard</div>
      )}
      {navigationSource === "relatorios" && <div>Conteúdo dos Relatórios</div>}
      {/* Renderiza o conteúdo do Dashboard se navigationSource for null ou undefined */}
    </div>
  );
};

export default Dashboard;
