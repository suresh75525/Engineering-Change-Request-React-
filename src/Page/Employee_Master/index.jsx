import React, { useState, useEffect, useReducer, useRef } from "react";
import {
  CardContent,
  CardHeader,
  Box,
  Card,
  Button,
  Grid,
  TextField,
  Typography,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";
import { app_style } from "./style";
import { INITIAL_STATE, postReducer } from "../../reducers/postReducer";
import { ACTION_TYPES } from "../../reducers/postActionType";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api from "../config";
import SearchBar from "../../Component/SeachBar_component";
import EmployeeDetailTable from "../../Component/Employee_Detail";

const EmployeeMasterPage = () => {
  // const [Employeelist, setEmployeeList] = useState([]);
  // const [Departmentlist, setDepartmentList] = useState([]);
  const [SelRow, SetSelRow] = useState([]);
  const [Deptcode, SetDeptCode] = useState("");
  const StatusList = [
    {
      id: 1,
      code: 1,
      value: "Active",
    },
    {
      id: 2,
      code: 2,
      value: "Block",
    },
  ];
  const [Statuscode, SetStatusCode] = useState("");
  const [Ecrcode, SetECRCode] = useState("");
  const [Bomcode, SetBOMCode] = useState("");
  const [Name, SetName] = useState("");
  const username = useRef(null);
  const [Empcode, SetEmpcode] = useState("Auto Generated");
  const [Email, SetEmail] = useState("");
  const email = useRef(null);
  const [SearhValue, setSearchValue] = useState("");
  const [isactive, SetIsActive] = useState(0);
  const [state, dispatch] = useReducer(postReducer, INITIAL_STATE);
  const [deptListstate, deptListdispatch] = useReducer(
    postReducer,
    INITIAL_STATE
  );
  const [insertSuccess, Setinsertsuccess] = useState(0);

  const Employeelist = state.post && state.post;
  const Departmentlist = deptListstate.post && deptListstate.post;
  // Employeelist.push(state.post);

  const BomUsertype = [
    {
      id: 1,
      code: 2,
      value: "User",
    },
    {
      id: 2,
      code: 0,
      value: "Admin",
    },
    {
      id: 3,
      code: 1,
      value: "Super Admin",
    },
  ];

  const EcrUserType = [
    {
      id: 1,
      code: 2,
      value: "User",
    },
    {
      id: 2,
      code: 1,
      value: "Admin",
    },
    {
      id: 3,
      code: 0,
      value: "Super Admin",
    },
    {
      id: 4,
      code: 3,
      value: "Cost Controller Admin",
    },
  ];

  const getEmployeeListDropdown = async () => {
    dispatch({ type: ACTION_TYPES.FETCH_START });
    await api
      .post("api/getEmployeeListDropdown")
      .then((response) => {
        const recordset = response.data;
        if (recordset.success !== false) {
          if (recordset.data.length !== 0) {
            // setEmployeeList(recordset.data);
            dispatch({
              type: ACTION_TYPES.FETCH_SUCCESS,
              payload: recordset.data,
            });
          } else {
            // setEmployeeList([]);
            dispatch({ type: ACTION_TYPES.FETCH_EMPTY });
          }
        } else {
          // setEmployeeList([]);
          dispatch({ type: ACTION_TYPES.FETCH_EMPTY });
        }
      })
      .catch((error) => {
        dispatch({ type: ACTION_TYPES.FETCH_ERROR, payload: error });
      });
  };
  const getDeptListDropdown = async () => {
    deptListdispatch({ type: ACTION_TYPES.FETCH_START });
    await api
      .post("api/deptListDropDown")
      .then((response) => {
        const recordset = response.data;
        if (recordset.success !== false) {
          if (recordset.data.length !== 0) {
            // setDepartmentList(recordset.data);
            deptListdispatch({
              type: ACTION_TYPES.FETCH_SUCCESS,
              payload: recordset.data,
            });
          } else {
            // setDepartmentList([]);
            deptListdispatch({ type: ACTION_TYPES.FETCH_EMPTY });
          }
        } else {
          // setDepartmentList([]);
          deptListdispatch({ type: ACTION_TYPES.FETCH_EMPTY });
        }
      })
      .catch((error) => {
        if (error) {
          dispatch({ type: ACTION_TYPES.FETCH_ERROR, payload: error });
        }
      });
  };
  useEffect(() => {
    getEmployeeListDropdown();
    getDeptListDropdown();
  }, [insertSuccess]);

  const handleRowClick = (e) => {
    Employeelist &&
      Employeelist.map((emp) => {
        if (emp.Emp_Code === e.target.innerHTML) {
          SetDeptCode(emp.Department);
          SetEmail(emp.Emp_Mail);
          SetName(emp.Emp_Name);
          SetStatusCode(emp.is_active);
          SetSelRow(emp);
          SetEmpcode(emp.Emp_Code);
          return emp;
        }
      });

    window.scrollTo(0, document.documentElement.scrollHeight);
    SetIsActive(1);
    setTimeout(() => {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: "smooth",
      });
    }, 0);
  };

  const onSearchChange = (e) => {
    setSearchValue(e);
  };

  const filteredData =
    Employeelist &&
    Employeelist.filter((item) =>
      Object.values(item).some((value) =>
        value.toString().toLowerCase().includes(SearhValue.toLowerCase())
      )
    );

  const handleSubmit = async (code) => {
    let fieldsToCheck = [];
    if (code === 0) {
      fieldsToCheck = [
        username.current.value,
        Email,
        Deptcode,
        Statuscode,
        Bomcode,
        Ecrcode,
      ];
    } else {
      fieldsToCheck = [username.current.value, Email, Deptcode, Statuscode];
    }
    const emptyField = fieldsToCheck.filter((val) => {
      return val === "";
    });
    if (emptyField.length === 0) {
      //insert code === 0
      const formdata = new FormData();
      formdata.append("code", code);
      formdata.append("name", username.current.value);
      formdata.append("email", Email);
      formdata.append("Deptcode", Deptcode);
      formdata.append("Statuscode", Statuscode);
      formdata.append("Empcode", Empcode);
      formdata.append("Bomcode", Bomcode);
      formdata.append("Ecrcode", Ecrcode);

      await api
        .post("api/employeeInsertAndUpdate", formdata, {
          "Content-Type": "text/plain",
        })
        .then((response) => {
          if (response.data.success === true) {
            Setinsertsuccess((prev) => {
              return {
                ...prev,
                prev: prev + 1,
              };
            });
            toast.success(
              code === 0
                ? "New Employee Created Successfully!!!"
                : "Updated Successfully!!!",
              {
                position: toast.POSITION.BOTTOM_RIGHT,
              }
            );
            // SetName("");
            username.current.value = "";
            SetDeptCode("");
            // SetEmail("");
            email.current.value = "";
            SetEmpcode("Auto Generated");
            SetStatusCode("");
            SetBOMCode("");
            SetECRCode("");
            SetIsActive(0);
            setTimeout(() => {
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              });
            }, 0);
          } else {
            toast.error("Something Went Wrong, Try again later", {
              position: toast.POSITION.BOTTOM_RIGHT,
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      toast.error("Fields Should not be Empty!!!", {
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
                Employee Master
              </Typography>
            }
          ></CardHeader>
          <CardContent>
            <Box>
              <Grid container xs={12} md={12} sm={12} xl={12}>
                <Grid item={true} xs={10.5} md={10.5} l={10.5} xl={10.5}>
                  <SearchBar
                    sx={{ width: "300px" }}
                    value={SearhValue}
                    onSearch={onSearchChange}
                    onCancelSearch={() => {
                      setSearchValue("");
                    }}
                  />
                </Grid>
                <Grid item={true} xs={1.5} md={1.5} l={1.5} xl={1.5}>
                  <Button
                    variant="contained"
                    sx={{ mt: 3 }}
                    onClick={() => {
                      // window.scrollTo(0, document.documentElement.scrollHeight);
                      SetSelRow([]);
                      // SetName("");
                      username.current.value = "";
                      SetDeptCode("");
                      // SetEmail("");
                      email.current.value = "";
                      SetEmpcode("Auto Generated");
                      SetStatusCode(SetStatusCode);
                      SetIsActive(1);
                      setTimeout(() => {
                        window.scrollTo({
                          top: document.documentElement.scrollHeight,
                          behavior: "smooth",
                        });
                      }, 0);
                    }}
                  >
                    New Employee
                  </Button>
                </Grid>
              </Grid>
            </Box>

            <EmployeeDetailTable
              filteredData={filteredData}
              isLoading={state.loading}
              handleRowClick={handleRowClick}
            />
          </CardContent>
        </Card>
      </Box>
      <Box sx={{ m: 3 }} style={{ display: isactive === 1 ? "block" : "none" }}>
        <Card raised={true} sx={app_style.cardSxT}>
          <CardHeader
            sx={{ backgroundColor: "#5A5A5A", color: "white" }}
            title={
              <Typography sx={app_style.cardHeading}>
                Employee Detail
              </Typography>
            }
          ></CardHeader>
          <CardContent>
            <Box>
              <Grid
                container
                justify="center"
                alignItems="center"
                spacing={1}
                direction="row"
                sx={{ mt: 2 }}
              >
                <Grid item xs={12} sm={6} md={4} lg={2.35} xl={2.35}>
                  <Typography sx={{ fontWeight: "bold" }}>
                    Employee Code
                  </Typography>
                  {Object.keys(SelRow).length > 0 ? (
                    <TextField
                      size="small"
                      variant="outlined"
                      disabled={true}
                      sx={{ width: 230, opacity: 0.9 }}
                      value={SelRow.Emp_Code}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  ) : (
                    <TextField
                      size="small"
                      variant="outlined"
                      placeholder="Auto Generated"
                      disabled={true}
                      sx={{ width: 230, opacity: 0.9 }}
                      // value={user}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  )}
                </Grid>

                <Grid item xs={12} sm={6} md={4} lg={2.35} xl={2.35}>
                  <Typography sx={{ fontWeight: "bold" }}>Name</Typography>
                  {Object.keys(SelRow).length > 0 ? (
                    <TextField
                      size="small"
                      variant="outlined"
                      sx={{ width: 230 }}
                      inputRef={username}
                      value={Name}
                      onChange={(e) => {
                        SetName(e.target.value);
                        username.current.value = e.target.value;
                      }}
                    />
                  ) : (
                    <TextField
                      size="small"
                      variant="outlined"
                      sx={{ width: 230 }}
                      inputRef={username}
                    />
                  )}
                </Grid>

                <Grid item xs={12} sm={6} md={4} lg={2.35} xl={2.35}>
                  <Typography sx={{ fontWeight: "bold" }}>Email</Typography>
                  {Object.keys(SelRow).length > 0 ? (
                    <TextField
                      size="small"
                      variant="outlined"
                      sx={{ width: 230 }}
                      inputRef={email}
                      value={Email}
                      onChange={(e) => {
                        SetEmail(e.target.value);
                        email.current.value = e.target.value;
                      }}
                    />
                  ) : (
                    <TextField
                      size="small"
                      variant="outlined"
                      sx={{ width: 230 }}
                      inputRef={email}
                    />
                  )}
                </Grid>

                <Grid item xs={12} sm={6} md={4} lg={2.35} xl={2.35}>
                  <Typography sx={{ fontWeight: "bold" }}>
                    Department
                  </Typography>
                  <FormControl sx={{ minWidth: 160 }} size="small">
                    <InputLabel>Department</InputLabel>
                    {Object.keys(SelRow).length > 0 ? (
                      <Select
                        required
                        // sx={{ backgroundColor: "white", fontSize: 14 }}
                        sx={{ width: 230 }}
                        label="Manufacturing"
                        value={Deptcode !== "" ? Deptcode : SelRow.Department}
                        onChange={(e) => {
                          SetDeptCode(e.target.value);
                        }}
                      >
                        {Departmentlist &&
                          Departmentlist.map((emp, index) => (
                            <MenuItem key={index} value={emp.Department}>
                              {emp.Dept_code}
                            </MenuItem>
                          ))}
                      </Select>
                    ) : (
                      <Select
                        required
                        // sx={{ backgroundColor: "white", fontSize: 14 }}
                        sx={{ width: 230 }}
                        label="Manufacturing"
                        value={Deptcode}
                        onChange={(e) => {
                          SetDeptCode(e.target.value);
                        }}
                      >
                        {Departmentlist &&
                          Departmentlist.map((emp, index) => (
                            <MenuItem key={index} value={emp.Department}>
                              {emp.Dept_code}
                            </MenuItem>
                          ))}
                      </Select>
                    )}
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6} md={4} lg={2.35} xl={2.35}>
                  <Typography sx={{ fontWeight: "bold" }}>Status</Typography>
                  <FormControl sx={{ minWidth: 160 }} size="small">
                    <InputLabel>Status</InputLabel>
                    {Object.keys(SelRow).length > 0 ? (
                      <Select
                        required
                        sx={{ width: 230 }}
                        disabled={false}
                        label="Status"
                        value={
                          Statuscode !== "" ? Statuscode : SelRow.is_active
                        }
                        onChange={(e) => {
                          SetStatusCode(e.target.value);
                        }}
                      >
                        {StatusList &&
                          StatusList.map((status, index) => (
                            <MenuItem key={index} value={status.code}>
                              {status.value}
                            </MenuItem>
                          ))}
                      </Select>
                    ) : (
                      <Select
                        required
                        sx={{ width: 230 }}
                        // disabled={true}
                        label="Status"
                        defaultValue={StatusList[0].code}
                        value={Statuscode}
                        onChange={(e) => {
                          SetStatusCode(e.target.value);
                        }}
                      >
                        {StatusList &&
                          StatusList.map((status, index) => (
                            <MenuItem key={index} value={status.code}>
                              {status.value}
                            </MenuItem>
                          ))}
                      </Select>
                    )}
                  </FormControl>
                </Grid>

                {SelRow.length === 0 ? (
                  <Grid item xs={12} sm={6} md={4} lg={2.35} xl={2.35}>
                    <Typography sx={{ fontWeight: "bold" }}>
                      BOM User Type
                    </Typography>
                    <FormControl sx={{ minWidth: 160 }} size="small">
                      <InputLabel>BOM</InputLabel>
                      <Select
                        required
                        sx={{ width: 230 }}
                        label="BOM"
                        value={Bomcode}
                        onChange={(e) => {
                          SetBOMCode(e.target.value);
                        }}
                      >
                        {BomUsertype &&
                          BomUsertype.map((status, index) => (
                            <MenuItem key={index} value={status.code}>
                              {status.value}
                            </MenuItem>
                          ))}
                      </Select>
                    </FormControl>
                  </Grid>
                ) : (
                  ""
                )}

                {SelRow.length === 0 ? (
                  <Grid item xs={12} sm={6} md={4} lg={2.35} xl={2.35}>
                    <Typography sx={{ fontWeight: "bold" }}>
                      ECR User Type
                    </Typography>
                    <FormControl sx={{ minWidth: 160 }} size="small">
                      <InputLabel>ECR</InputLabel>
                      <Select
                        required
                        sx={{ width: 230 }}
                        label="ECR"
                        value={Ecrcode}
                        onChange={(e) => {
                          SetECRCode(e.target.value);
                        }}
                      >
                        {EcrUserType &&
                          EcrUserType.map((status, index) => (
                            <MenuItem key={index} value={status.code}>
                              {status.value}
                            </MenuItem>
                          ))}
                      </Select>
                    </FormControl>
                  </Grid>
                ) : (
                  ""
                )}
              </Grid>

              <Grid
                container
                alignItems={"center"}
                justifyContent={"center"}
                spacing={1}
                direction="row"
                sx={{ mt: 5 }}
                xs={12}
              >
                <Grid item>
                  {Object.keys(SelRow).length > 0 ? (
                    <Button
                      variant="contained"
                      color="success"
                      sx={{
                        "&:hover": {
                          backgroundColor: "transparent",
                          variant: "none",
                          color: "#157DEC",
                        },
                      }}
                      onClick={() => {
                        handleSubmit(1);
                      }}
                    >
                      Update
                    </Button>
                  ) : (
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
                        handleSubmit(0);
                      }}
                    >
                      Submit
                    </Button>
                  )}
                </Grid>
                <Grid item>
                  <Button
                    variant="outlined"
                    sx={{
                      "&:hover": {
                        backgroundColor: "#157DEC",
                        color: "white",
                      },
                    }}
                    onClick={() => {
                      SetIsActive(0);
                    }}
                  >
                    Cancel
                  </Button>
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

export default EmployeeMasterPage;
