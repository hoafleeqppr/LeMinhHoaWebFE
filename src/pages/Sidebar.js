import React from "react";
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Divider, Tooltip } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";

export default function Sidebar({ open }) {
  const menuItems = [
    { text: "Dashboard", icon: <DashboardIcon /> },
    { text: "Users", icon: <PeopleIcon /> },
  ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: open ? 250 : 80, 
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: open ? 250 : 80,
          transition: "width 0.3s",
          overflowX: "hidden",
        },
      }}
    >
      <List>
        {menuItems.map((item) => (
          <Tooltip key={item.text} title={!open ? item.text : ""} placement="right">
            <ListItem button>
              <ListItemIcon sx={{ minWidth: 0, justifyContent: "center" }}>
                {item.icon}
              </ListItemIcon>
              {open && <ListItemText primary={item.text} sx={{ ml: 2 }} />}
            </ListItem>
          </Tooltip>
        ))}
      </List>
      <Divider />
    </Drawer>
  );
}
