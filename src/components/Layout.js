import React, { useState } from "react";
import { Box } from "@mui/material";
import Header from "../pages/Header";
import Sidebar from "../pages/Sidebar";

export default function Layout({ children, toggleMode, mode }) {
  const [openSidebar, setOpenSidebar] = useState(true);

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      <Sidebar open={openSidebar} /> 
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          transition: "margin-left 0.3s",
          // ml: openSidebar ? "0px" : "60px",
        }}
      >
        <Header
          toggleSidebar={() => setOpenSidebar(!openSidebar)}
          toggleMode={toggleMode}
          mode={mode}
        />
        <Box sx={{ p: 3, flex: 1, overflow: "auto" }}>{children}</Box>
      </Box>
    </Box>
  );
}
