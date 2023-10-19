import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import { AES } from "crypto-js";
import { useDispatch } from "react-redux";
import { app_style } from "./style";
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
  useFormControl,
  InputAdornment,
  Link,
  IconButton,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";
import EmailIcon from "@mui/icons-material/Email";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api from "../config";
import LinearProgress from "@mui/material/LinearProgress";
import VisibilityIcon1 from "@mui/icons-material/Visibility";
import VisibilityOffIcon1 from "@mui/icons-material/VisibilityOff";
import userlogin from "./userlogin.png";
import forgotPass from "./forgotPass.png";
import Header from "../Header";
import Footer from "../Footer";

const loginStyle = {
  height: "110vh",
  margin: 0,
  padding: 0,
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
};

const LoginPage = (props) => {
  const { onLogIn, onLogOut } = props;
  const dispatch = useDispatch();
  const cookies = new Cookies();
  const formControl = useFormControl();
  let navigate = useNavigate();
  const [forgotpass, Setforgotpass] = useState(false);
  const [userName, setUserName] = useState("");
  const forgotmail = useRef(null);
  const [password, setPassword] = useState({
    pass: "",
    showPassword: false,
  });
  const [token, setToken] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const handleClickShowPassword = () => {
    setPassword({ ...password, showPassword: !password.showPassword });
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    if (userName !== "" && JSON.stringify(password) !== "") {
      const formdata = new FormData();
      formdata.append("user", userName);
      formdata.append("pass", password.pass);
      await api
        .post("api/login", formdata, {
          "Content-Type": "text/plain",
        })
        .then((response) => {
          const recordset = response.data;
          if (recordset.success !== false) {
            if (recordset.data.length !== 0) {
              cookies.set("token", recordset.data.token);
              setToken(recordset.data.token);
              toast.success("Login Successfully!!!", {
                position: toast.POSITION.BOTTOM_RIGHT,
              });
              const cipherText = AES.encrypt(userName, "magna");
              const cipherData = AES.encrypt(recordset.data.deptDesc, "magna");
              const DataDept = AES.encrypt(recordset.data.dept, "magna");
              const DataEmp = AES.encrypt(recordset.data.emp, "magna");
              const DataEmpName = AES.encrypt(recordset.data.emp_name, "magna");
              const BomUserType = AES.encrypt(
                recordset.data.BOMuser.toString(),
                "magna"
              );
              const EcrUserType = AES.encrypt(
                recordset.data.ECRUser.toString(),
                "magna"
              );
              cookies.set("logged_user", cipherText.toString(), {
                path: "/",
              });
              cookies.set("logged_dept", cipherData.toString(), {
                path: "/",
              });
              cookies.set("Dept_logged", DataDept.toString(), { path: "/" });
              cookies.set("emp_logged", DataEmp.toString(), { path: "/" });
              cookies.set("emp_Name", DataEmpName.toString(), { path: "/" });
              cookies.set("BomUserType", BomUserType.toString(), { path: "/" });
              cookies.set("EcrUserType", EcrUserType.toString(), { path: "/" });

              dispatch({
                type: "logged_user",
                payload: userName,
              });
              dispatch({
                type: "logged_dept",
                payload: recordset.data.deptDesc,
              });
              dispatch({
                type: "Dept_logged",
                payload: recordset.data.dept,
              });
              dispatch({
                type: "emp_logged",
                payload: recordset.data.emp,
              });
              dispatch({
                type: "Bom_UserType",
                payload: recordset.data.BOMuser,
              });
              dispatch({
                type: "Ecr_UserType",
                payload: recordset.data.ECRUser,
              });
              onLogIn();
              navigate("/DASHBOARD");
            } else {
              toast.error(recordset.message, {
                position: toast.POSITION.BOTTOM_RIGHT,
              });
              onLogOut();
            }
          } else {
            toast.error(recordset.message, {
              position: toast.POSITION.BOTTOM_RIGHT,
            });
            setPassword({ pass: "" });
            setUserName("");
          }
          setIsLoading(false);
        })
        .catch((error) => {
          throw error;
        });
    } else {
      toast.error("Please Enter UserName and Password !", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      onLogOut();
    }
  };

  const handleClickforgotPassword = () => {
    Setforgotpass(true);
  };
  const handleClicklogin = () => {
    Setforgotpass(false);
  };
  const handleGetLink = async () => {
    if (!forgotmail.current.value == "") {
      const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      if (emailRegex.test(forgotmail.current.value)) {
        const formdata = new FormData();
        formdata.append("mail", forgotmail.current.value);
        await api
          .post("api/forgotpassword", formdata, {
            "Content-Type": "text/plain",
          })
          .then((res) => {
            const recordset = res.data;
            if (recordset.success !== false) {
              toast.success(recordset.message, {
                position: toast.POSITION.BOTTOM_RIGHT,
              });
              Setforgotpass(false);
            } else {
              toast.error(recordset.message, {
                position: toast.POSITION.BOTTOM_RIGHT,
              });
            }
          });
      } else {
        toast.error("Please Enter Valid E-Mail", {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      }
    } else {
      toast.error("Please Enter Mail", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    }
  };

  return (
    <Box style={{ loginStyle }}>
      <Header />
      <Box
        sx={{
          height: "100vh",
          overflow: "hidden",
          justifyContent: "center",
          alignItems: "center",
          display: forgotpass === false ? "flex" : "none",
        }}
      >
        <Card sx={app_style.cardSx}>
          <Box sx={{ mt: -2, textAlign: "center" }}>
            <img
              src={userlogin}
              style={{ width: "100px", height: "105px" }}
              alt="Magna_Logo"
            />
          </Box>
          <CardContent>
            <Box>
              <Box>
                <PersonIcon sx={{ textAlign: "center", fontSize: 40 }} />
                <TextField
                  placeholder="Username"
                  size="small"
                  sx={app_style.inputSx}
                  inputProps={{ autoComplete: "off" }}
                  {...formControl}
                  onInput={(e) => setUserName(e.target.value.trim())}
                  value={userName}
                />
              </Box>
              <Box sx={{ mt: 2 }}>
                <LockIcon sx={{ textAlign: "center", fontSize: 40 }} />
                <TextField
                  placeholder="Password"
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
              <Box textAlign={"right"} sx={{ pr: 1, pt: 1 }}>
                <Link
                  sx={{ textDecoration: "none", cursor: "pointer" }}
                  onClick={handleClickforgotPassword}
                >
                  Forgot Password
                </Link>
              </Box>
              <Box textAlign="center">
                <Button
                  type="submit"
                  variant="contained"
                  sx={{ mt: 3, backgroundColor: "#808080" }}
                  onClick={handleSubmit}
                >
                  Login
                </Button>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Box>
      <Box
        sx={{
          height: "100vh",
          overflow: "hidden",
          justifyContent: "center",
          alignItems: "center",
          display: forgotpass === true ? "flex" : "none",
        }}
      >
        <Card sx={app_style.cardSx}>
          <Box sx={{ mt: -2, textAlign: "center" }}>
            <img
              src={forgotPass}
              style={{ width: "120px", height: "115px" }}
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
                Forgot Password
              </Typography>
            </Box>
            <Box sx={{ mt: 2 }}>
              <EmailIcon
                sx={{ textAlign: "center", fontSize: 35, width: 35, ml: -1 }}
              />
              <TextField
                placeholder="Email"
                size="small"
                sx={app_style.inputSx}
                style={{ marginLeft: "10px" }}
                inputRef={forgotmail}
              />
            </Box>
            <Box textAlign={"right"} sx={{ pr: 1, pt: 1 }}>
              <Link
                sx={{ textDecoration: "none", cursor: "pointer" }}
                onClick={handleClicklogin}
              >
                Go to Login
              </Link>
            </Box>
            <Box textAlign="center">
              <Button
                type="submit"
                variant="contained"
                sx={{ mt: 3, backgroundColor: "#808080" }}
                onClick={handleGetLink}
              >
                Get Link
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Box>

      {isLoading && (
        <Box style={{ position: "fixed", top: 0, width: "100%" }}>
          <LinearProgress />
        </Box>
      )}
      <ToastContainer />
      <Footer />
    </Box>
  );
};

export default LoginPage;
