import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Header";
import Footer from "../Footer";
import LockIcon from "@mui/icons-material/Lock";
import resetPass from "./resetPass.png";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api from "../config";
import VisibilityIcon1 from "@mui/icons-material/Visibility";
import VisibilityOffIcon1 from "@mui/icons-material/VisibilityOff";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  InputAdornment,
  IconButton,
  TextField,
  useFormControl,
} from "@mui/material";
import { app_style } from "./style";

const ResetPassword = () => {
  const formControl = useFormControl();
  const { id, token } = useParams();
  const [password, setPassword] = useState({
    pass: "",
    showPassword: false,
  });
  let navigate = useNavigate();
  const handleClickShowPassword = () => {
    setPassword({ ...password, showPassword: !password.showPassword });
  };

  const handleSubmit = async () => {
    if (password.pass !== "") {
      const formdata = new FormData();
      formdata.append("password", password.pass);
      await api
        .post(`api/resetpassword/${id}/${token}`, formdata, {
          "Content-Type": "text/plain",
        })
        .then((res) => {
          const recordset = res.data;
          if (recordset.success !== false) {
            toast.success(recordset.message, {
              position: toast.POSITION.BOTTOM_RIGHT,
            });
            setPassword({ pass: "", showPassword: false });
            navigate("/");
          } else {
            toast.error("Something went wrong, Please try again!!!", {
              position: toast.POSITION.BOTTOM_RIGHT,
            });
          }
        })
        .catch((error) => {
          if (error) {
            console.log(error);
          }
        });
    } else {
      toast.error("Field Should not be Empty!!!", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    }
  };

  return (
    <>
      <Header />
      <Box
        sx={{
          height: "100vh",
          overflow: "hidden",
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
        }}
      >
        <Card sx={app_style.cardSx}>
          <Box sx={{ mt: -2, textAlign: "center" }}>
            <img
              src={resetPass}
              style={{ width: "125px", height: "115px" }}
              alt="Magna_Logo"
            />
          </Box>
          <CardContent>
            <Box>
              <Typography
                sx={{
                  textAlign: "center",
                  fontWeight: "bold",
                  fontSize: "25px",
                  mt: -2,
                }}
              >
                Reset Password
              </Typography>
            </Box>
            <Box sx={{ mt: 2 }}>
              <LockIcon sx={{ textAlign: "center", fontSize: 40 }} />
              <TextField
                placeholder="New Password"
                size="small"
                sx={app_style.inputSx}
                {...formControl}
                onInput={(e) => setPassword({ pass: e.target.value })}
                onKeyDown={(e) => (e.key === "Enter" ? handleSubmit() : "")}
                type={password.showPassword ? "text" : "password"}
                value={password.pass}
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
            </Box>

            <Box textAlign="center">
              <Button
                type="submit"
                variant="contained"
                sx={{ mt: 3, backgroundColor: "#808080" }}
                onClick={handleSubmit}
              >
                Reset Password
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Box>
      <Footer />
      <ToastContainer />
    </>
  );
};

export default ResetPassword;
