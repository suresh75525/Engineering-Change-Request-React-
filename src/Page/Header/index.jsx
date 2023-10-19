import React from "react";
import { AppBar, Box, Container, Toolbar } from "@mui/material";
import mainLogo from "./Magna-Logo-HR-V1.0.png";

const Header = () => {
  return (
    <Box>
      <AppBar
        position="sticky"
        style={{ background: "#2E3B55", height: "65px", position: "fixed" }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Box sx={{ display: { xs: "none", md: "flex" }, mb: 1 }}>
              <img src={mainLogo} style={{ width: "170px" }} alt="Magna_Logo" />
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
};

export default Header;
