import React from "react";
import { Box, AppBar, Container, Toolbar, Typography } from "@mui/material";
import { app_style } from "./style";

const Footer = () => {
  return (
    <Box sx={app_style.footer}>
      <AppBar position="sticky" style={{ background: "#D3D3D3" }}>
        <Container maxWidth="xl">
          <Toolbar>
            <Box>
              <Typography
                sx={{
                  color: "black",
                  fontWeight: "bold",
                  fontSize: "17px",
                  ml: 55,
                }}
              >
                &copy;2023 MAGNA AUTOMOTIVE INDIA PVT LTD | All Rights Reserved
              </Typography>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
};

export default Footer;
