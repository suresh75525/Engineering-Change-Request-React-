import * as React from "react";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Container,
  Menu,
  MenuItem,
  Button,
  Tooltip,
  Avatar,
  Fade,
} from "@mui/material";
import Cookies from "universal-cookie";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import mainLogo from "./Magna-Logo-HR-V1.0.png";
import MenuIcon from "@mui/icons-material/Menu";
import * as CryptoJS from "crypto-js";

// const pages = ["Dashboard", "ECR", "My Task"];
const Userpage = ["Dashboard", "ECR", "BOM", "My Task"];
// const Adminpage = ["Dashboard", "ECR", "BOM", "My Task", "DB BackUp"];
const SuperAdminpage = ["Dashboard", "ECR", "BOM", "My Task"];
const settings = ["Change Password", "Logout"];
const superadsetting = [
  "Customer Master",
  "Employee Master",
  "Change Password",
  "Logout",
];

const ResponsiveAppBar = (props) => {
  const { onLogOut = () => {} } = props;
  const cookies = new Cookies();
  const store = useSelector((state) => state.auth);
  let navigate = useNavigate();
  const decrypted = store.logged_user;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorEl1, setAnchorEl1] = React.useState(null);
  const [anchorEl2, setAnchorEl2] = React.useState(null);
  const open = Boolean(anchorEl);
  const open1 = Boolean(anchorEl1);
  const open2 = Boolean(anchorEl2);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClick1 = (event) => {
    setAnchorEl1(event.currentTarget);
  };
  const handleClick2 = (event) => {
    setAnchorEl2(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
    let page = "/" + event.target.innerText;
    navigate(page);
  };
  const handleClose1 = () => {
    setAnchorEl1(null);
    let page = "/" + event.target.innerText;
    navigate(page);
  };
  const handleClose2 = () => {
    setAnchorEl2(null);
    let page = "/" + event.target.innerText;
    navigate(page);
  };
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = (event) => {
    setAnchorElNav(null);
    let page = "/" + event.target.innerText;
    navigate(page);
  };

  // const logoutpage = () => {
  //   clearInterval(interval);
  // };
  const EncbomUsertype = cookies.get("BomUserType");

  const Bomusertype = CryptoJS.AES.decrypt(EncbomUsertype, "magna").toString(
    CryptoJS.enc.Utf8
  );
  const EncecrUsertype = cookies.get("EcrUserType");

  const Ecrusertype = CryptoJS.AES.decrypt(EncecrUsertype, "magna").toString(
    CryptoJS.enc.Utf8
  );

  const handleCloseUserMenu = (e) => {
    if (e.target.innerText === "Logout") {
      cookies.remove("logged_user");
      cookies.remove("emp_logged");
      cookies.remove("Dept_logged");
      cookies.remove("emp_logged");
      onLogOut();
      let page = "/";
      navigate(page);
      // interval = setInterval(() => {
      //   logoutpage(page);
      // }, 500);
    } else if (e.target.innerText !== "") {
      let page = "/" + e.target.innerText.trim();
      navigate(page);
      if (page === "/Employee Master") {
        // window.location.reload();
      }
    }
    setAnchorElUser(null);
  };

  return (
    <AppBar position="sticky" style={{ background: "#2E3B55", height: "65px" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box
            sx={{
              justifyContent: "flex-start",
              marginLeft: 0,
              display: { xs: "none", lg: "flex" },
              mr: 3,
              mb: 1,
            }}
          >
            <img src={mainLogo} style={{ width: "150px" }} alt="Magna_Logo" />
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {Userpage.map((page, index) => (
                <MenuItem key={index} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Box
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            <img src={mainLogo} style={{ width: "150px" }} alt="Magna_Logo" />
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {/* {Bomusertype === "0" && Ecrusertype === "1"
              ? Adminpage.map((page, index) =>
                  page === "ECR" ? (
                    <>
                      <Button
                        id="fade-button"
                        aria-controls={open ? "fade-menu" : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? "true" : undefined}
                        onClick={handleClick}
                        sx={{ color: "white" }}
                      >
                        ECR
                      </Button>
                      <Menu
                        id="fade-menu"
                        MenuListProps={{
                          "aria-labelledby": "fade-button",
                        }}
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        TransitionComponent={Fade}
                      >
                        <MenuItem key={index} onClick={handleClose}>
                          ECR Tracker
                        </MenuItem>
                        <MenuItem key={index} onClick={handleClose}>
                          Create ECR
                        </MenuItem>
                      </Menu>
                    </>
                  ) : page === "BOM" ? (
                    <>
                      <Button
                        id="fade-button1"
                        aria-controls={open1 ? "fade-menu1" : undefined}
                        aria-haspopup="true"
                        aria-expanded={open1 ? "true" : undefined}
                        onClick={handleClick1}
                        sx={{ color: "white" }}
                      >
                        BOM
                      </Button>
                      <Menu
                        id="fade-menu1"
                        MenuListProps={{
                          "aria-labelledby": "fade-button1",
                        }}
                        anchorEl={anchorEl1}
                        open={open1}
                        onClose={handleClose1}
                        TransitionComponent={Fade}
                      >
                        <MenuItem key={index} onClick={handleClose1}>
                          Summary
                        </MenuItem>
                        <MenuItem key={index} onClick={handleClose1}>
                          New Request
                        </MenuItem>
                      </Menu>
                    </>
                  ) : ""
                ) */}
            {SuperAdminpage.map((page, index) =>
              page === "ECR" ? (
                <>
                  <Button
                    id="fade-button"
                    aria-controls={open ? "fade-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                    onClick={handleClick}
                    sx={{ color: "white" }}
                  >
                    ECR
                  </Button>
                  <Menu
                    id="fade-menu"
                    MenuListProps={{
                      "aria-labelledby": "fade-button",
                    }}
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    TransitionComponent={Fade}
                  >
                    <MenuItem key={index} onClick={handleClose}>
                      ECR Tracker
                    </MenuItem>
                    <MenuItem key={index} onClick={handleClose}>
                      Create ECR
                    </MenuItem>
                  </Menu>
                </>
              ) : page === "BOM" ? (
                <>
                  <Button
                    id="fade-button1"
                    aria-controls={open1 ? "fade-menu1" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open1 ? "true" : undefined}
                    onClick={handleClick1}
                    sx={{ color: "white" }}
                  >
                    BOM
                  </Button>
                  <Menu
                    id="fade-menu1"
                    MenuListProps={{
                      "aria-labelledby": "fade-button1",
                    }}
                    anchorEl={anchorEl1}
                    open={open1}
                    onClose={handleClose1}
                    TransitionComponent={Fade}
                  >
                    <MenuItem key={index} onClick={handleClose1}>
                      Summary
                    </MenuItem>
                    <MenuItem key={index} onClick={handleClose1}>
                      New Request
                    </MenuItem>
                  </Menu>
                </>
              ) : (
                <Button
                  key={page}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  {page}
                </Button>
              )
            )}
          </Box>

          <Box
            sx={{
              flexGrow: 0,
              alignItems: "center", // Change this to "center" if you want to center-align items vertically
              justifyContent: "flex-end", // This moves the content to the right
              marginLeft: "auto", // This pushes the content to the right edge
            }}
          >
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar
                  alt={decrypted}
                  src="/static/images/avatar/person.jpg"
                />
              </IconButton>
            </Tooltip>
            {Bomusertype === "0" || Ecrusertype === "1" ? (
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {superadsetting.map((setting, index) => (
                  <MenuItem key={index} onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            ) : (
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting, index) => (
                  <MenuItem key={index} onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;
