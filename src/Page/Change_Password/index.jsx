import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  CardContent,
  CardHeader,
  Box,
  Card,
  Typography,
  Grid,
  TextField,
  Button,
  InputAdornment,
  IconButton,
  useFormControl,
} from "@mui/material";
import { app_style } from "./style";
import background from "./chpword.png";
import CardMedia from "@mui/material/CardMedia";
import Cookies from "universal-cookie";
import * as CryptoJS from "crypto-js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AES } from "crypto-js";
import VisibilityIcon1 from "@mui/icons-material/Visibility";
import VisibilityOffIcon1 from "@mui/icons-material/VisibilityOff";
import VisibilityIcon2 from "@mui/icons-material/Visibility";
import VisibilityOffIcon2 from "@mui/icons-material/VisibilityOff";
import VisibilityIcon3 from "@mui/icons-material/Visibility";
import VisibilityOffIcon3 from "@mui/icons-material/VisibilityOff";
import api from "../config";

const ChangePassword = () => {
  const formControl = useFormControl();
  const [password, setPassword] = useState({
    pass: "",
    showPassword: false,
  });
  const [confirmpassword, setConfirmPassword] = useState({
    pass: "",
    showPassword: false,
  });
  const [currentpassword, setCurrentPassword] = useState({
    pass: "",
    showPassword: false,
  });
  const cookies = new Cookies();

  // const EncBomUserType = cookies.get("BomUserType");
  // const EncEcrUserType = cookies.get("EcrUserType");

  const bomusertype = useSelector((state) => state.auth.BomUserType);
  const ecrusertype = useSelector((state) => state.auth.EcrUserType);
  const empCode = useSelector((state) => state.auth.emp_logged);

  const handleCancel = () => {
    setPassword({ pass: "" });
    setConfirmPassword({ pass: "" });
    setCurrentPassword({ pass: "" });
  };
  const handleClickShowPassword = () => {
    setPassword({ ...password, showPassword: !password.showPassword });
  };
  const handleClickShowConPassword = () => {
    setConfirmPassword({
      ...confirmpassword,
      showPassword: !confirmpassword.showPassword,
    });
  };

  const handleClickShowCurrentPassword = () => {
    setCurrentPassword({
      ...currentpassword,
      showPassword: !currentpassword.showPassword,
    });
  };

  const handleChangepword = async () => {
    const formdata = new FormData();
    if (
      password.pass != "" &&
      confirmpassword.pass != "" &&
      currentpassword.pass !== ""
    ) {
      if (password.pass === confirmpassword.pass) {
        formdata.append("password", password.pass);
        formdata.append("bomusertype", bomusertype);
        formdata.append("ecrusertype", ecrusertype);
        formdata.append("currentpassword", currentpassword.pass);
        formdata.append("empCode", empCode);

        await api
          .post("api/changePassword", formdata, {
            "Content-Type": "text/plain",
          })
          .then((response) => {
            const res = response.data.success;
            if (res) {
              toast.success(response.data.message, {
                position: toast.POSITION.BOTTOM_RIGHT,
              });
              handleCancel();
            } else if (res === false) {
              toast.error(response.data.message, {
                position: toast.POSITION.BOTTOM_RIGHT,
              });
            } else {
              toast.error("Password not changed...!", {
                position: toast.POSITION.BOTTOM_RIGHT,
              });
            }
          });
      } else {
        toast.error("Password and Confirm Password is not Matched!", {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      }
    } else {
      toast.error("Fields are Empty!", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    }
  };

  return (
    <Box>
      <Box sx={{ m: 3 }}>
        <Card raised={true} sx={app_style.cardSxT}>
          <CardHeader
            sx={{ backgroundColor: "#5A5A5A", color: "white" }}
            title={
              <Typography sx={app_style.cardHeading}>
                Change Password
              </Typography>
            }
          ></CardHeader>
          <CardContent>
            <Box>
              <Grid
                container
                spacing={2}
                justifyContent="center"
                alignItems="center"
              >
                <Grid item sx={6}>
                  <CardMedia
                    component="img"
                    alt="Example Image"
                    height="350"
                    width="150"
                    image={background}
                  />
                </Grid>
                <Grid item sx={6}>
                  {/* <Grid container>
                    <Grid item>
                      <Typography sx={{ mt: 1, fontWeight: "bold" }}>
                        User Name{" "}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <TextField
                        size="small"
                        variant="outlined"
                        sx={{ m: 1, ml: 8, width: 270 }}
                        value={user}
                        InputProps={{
                          readOnly: true,
                        }}
                      />
                    </Grid>
                  </Grid> */}

                  <Grid container>
                    <Grid item>
                      <Typography sx={{ mt: 2, fontWeight: "bold" }}>
                        Current Password{" "}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <TextField
                        size="small"
                        variant="outlined"
                        type={
                          currentpassword.showPassword ? "text" : "password"
                        }
                        value={currentpassword.pass}
                        onInput={(e) =>
                          setCurrentPassword({ pass: e.target.value })
                        }
                        placeholder="Current Password"
                        sx={{ m: 1, ml: 1 }}
                        inputProps={{ autoComplete: "off" }}
                        {...formControl}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowCurrentPassword}
                              >
                                {currentpassword.showPassword ? (
                                  <VisibilityIcon3 />
                                ) : (
                                  <VisibilityOffIcon3 />
                                )}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>
                  </Grid>

                  <Grid container>
                    <Grid item>
                      <Typography sx={{ mt: 2, fontWeight: "bold" }}>
                        New Password{" "}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <TextField
                        size="small"
                        variant="outlined"
                        type={password.showPassword ? "text" : "password"}
                        value={password.pass}
                        onInput={(e) => setPassword({ pass: e.target.value })}
                        placeholder="New Password"
                        sx={{ m: 1, ml: 4.5 }}
                        inputProps={{ autoComplete: "off" }}
                        {...formControl}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                              >
                                {password.showPassword ? (
                                  <VisibilityIcon1 />
                                ) : (
                                  <VisibilityOffIcon1 />
                                )}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>
                  </Grid>

                  <Grid container>
                    <Grid item>
                      <Typography sx={{ mt: 2, fontWeight: "bold" }}>
                        Confirm Password{" "}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <TextField
                        size="small"
                        variant="outlined"
                        type={
                          confirmpassword.showPassword ? "text" : "password"
                        }
                        value={confirmpassword.pass}
                        placeholder="Confirm Password"
                        onInput={(e) =>
                          setConfirmPassword({ pass: e.target.value })
                        }
                        sx={{ m: 1, ml: 1 }}
                        inputProps={{ autoComplete: "off" }}
                        {...formControl}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowConPassword}
                              >
                                {confirmpassword.showPassword ? (
                                  <VisibilityIcon2 />
                                ) : (
                                  <VisibilityOffIcon2 />
                                )}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>
                  </Grid>

                  <Grid container spacing={2} sx={{ mt: 0.5 }}>
                    <Grid item sx={6}>
                      <Button
                        variant="outlined"
                        sx={{
                          "&:hover": {
                            backgroundColor: "#157DEC",
                            color: "white",
                          },
                        }}
                        onClick={() => {
                          handleCancel();
                        }}
                      >
                        {" "}
                        Clear{" "}
                      </Button>
                    </Grid>
                    <Grid item sx={6}>
                      <Button
                        variant="contained"
                        sx={{
                          "&:hover": {
                            backgroundColor: "transparent",
                            color: "#157DEC",
                            variant: "none",
                          },
                        }}
                        onClick={() => {
                          handleChangepword();
                        }}
                      >
                        {" "}
                        Submit{" "}
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Box>
          </CardContent>
        </Card>
      </Box>
      <ToastContainer />
    </Box>
  );
};

export default ChangePassword;
