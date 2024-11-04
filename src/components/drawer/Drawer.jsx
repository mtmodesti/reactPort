import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Fab from "@mui/material/Fab";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListIcon from "@mui/icons-material/List"; // Ícone para "Menu"
import InfoIcon from "@mui/icons-material/Info";
import ContactsIcon from "@mui/icons-material/Contacts";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { Collapse } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard"; // Ícone para "Dashboard"
import AssessmentIcon from "@mui/icons-material/Assessment"; // Ícone para "Relatórios"
import { useNavigate } from "react-router-dom";
import { useNavigation } from "../../context/NavigationContext";

const DrawerSidenavMenu = () => {
  const { setNavigationSource } = useNavigation();
  const [open, setOpen] = React.useState(false);
  const [submenuOpen, setSubmenuOpen] = React.useState(false);
  const navigate = useNavigate();
  const [activeItem, setActiveItem] = React.useState("");

  const menuList = [
    {
      title: "Menu",
      icon: <ListIcon />,
      submenu: [
        {
          title: "Gerenciamento",
          icon: <DashboardIcon />,
          action: () => {
            setNavigationSource("dashboard");
            setActiveItem("dashboard");
            navigate("/dashboard");
          },
        },
        {
          title: "Relatórios",
          icon: <AssessmentIcon />,
          action: () => {
            setNavigationSource("relatorios");
            setActiveItem("relatorios");
            navigate("/dashboard");
          },
        },
      ],
    },
    {
      title: "Sobre nós",
      icon: <InfoIcon />,
      action: () => {
        setActiveItem("sobre_nos");
        navigate("/about");
      },
    },
    {
      title: "Contato",
      icon: <ContactsIcon />,
      action: () => {
        setActiveItem("contato");
        navigate("/contact");
      },
    },
    {
      title: "Logout",
      icon: <ExitToAppIcon />,
      action: () => {
        setActiveItem("logout");
        navigate("/");
      },
    },
  ];

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const handleSubmenuToggle = (event) => {
    event.stopPropagation();
    setSubmenuOpen(!submenuOpen);
  };

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        {menuList.map((object, index) => (
          <div key={object.title}>
            {index > 0 && <Divider />}
            <ListItem disablePadding>
              <ListItemButton
                onClick={
                  object.submenu
                    ? handleSubmenuToggle
                    : () => {
                        object.action();
                        setActiveItem(
                          object.title.toLowerCase().replace(" ", "_")
                        ); // Define o item ativo
                      }
                }
                sx={{
                  backgroundColor:
                    object.title === "Menu" && submenuOpen
                      ? "rgba(0, 0, 255, 0.1)"
                      : activeItem ===
                        object.title.toLowerCase().replace(" ", "_")
                      ? "rgba(0, 0, 255, 0.1)"
                      : "transparent",
                  "&:hover": {
                    backgroundColor: "rgba(0, 0, 255, 0.1)",
                  },
                }}
              >
                <ListItemIcon>{object.icon}</ListItemIcon>
                <ListItemText primary={object.title} />
                {object.submenu ? (
                  submenuOpen ? (
                    <ExpandLess />
                  ) : (
                    <ExpandMore />
                  )
                ) : null}
              </ListItemButton>
            </ListItem>
            {object.submenu && (
              <Collapse in={submenuOpen} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {object.submenu.map((subitem) => (
                    <ListItem key={subitem.title} disablePadding>
                      <ListItemButton
                        onClick={() => {
                          subitem.action();
                          setActiveItem(subitem.title.toLowerCase()); // Define o item ativo
                        }}
                        sx={{
                          backgroundColor:
                            activeItem === subitem.title.toLowerCase()
                              ? "rgba(0, 0, 255, 0.1)"
                              : "transparent",
                          "&:hover": {
                            backgroundColor: "rgba(0, 0, 255, 0.1)",
                          },
                        }}
                      >
                        <ListItemIcon sx={{ minWidth: 0, mr: 1 }}>
                          {React.cloneElement(subitem.icon, {
                            fontSize: "small",
                          })}
                        </ListItemIcon>
                        <ListItemText primary={subitem.title} sx={{ pl: 4 }} />
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>
              </Collapse>
            )}
          </div>
        ))}
      </List>
    </Box>
  );

  return (
    <div>
      <Fab
        color="primary"
        aria-label="menu"
        onClick={toggleDrawer(true)}
        sx={{
          position: "fixed",
          top: 16,
          left: 16,
        }}
      >
        <ListIcon />
      </Fab>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  );
};

export default DrawerSidenavMenu;
