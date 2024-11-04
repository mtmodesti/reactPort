import React from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Home from "../pages/home/Home";
import ProtectedRoute from "./ProtectedRoutes";
import Dashboard from "../pages/dashboard/Dashboard";
import Contact from "../pages/contact/Contact";
import DrawerSidenavMenu from "../components/drawer/Drawer";
import About from "../pages/about/About";

const AppRoutes = () => {
  const location = useLocation();
  // Verifica se a rota atual é a página inicial
  const showMenu = location.pathname !== "/";

  return (
    <>
      {showMenu && <DrawerSidenavMenu />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/dashboard"
          element={<ProtectedRoute element={<Dashboard />} />}
        />
        <Route path="/contact" element={<Contact to="/" replace />} />
        <Route path="/about" element={<About to="/" replace />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
};

export default AppRoutes;
