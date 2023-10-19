import React, { useState, useEffect, useReducer } from "react";
import ReactFileReader from "react-file-reader";
import { useSelector } from "react-redux";
import moment from "moment";
import Backdrop from "@mui/material/Backdrop";
import * as CryptoJS from "crypto-js";
import CircularProgress from "@mui/material/CircularProgress";
import {
  Box,
  Typography,
  Button,
  Grid,
  CardMedia,
  Card,
  CardContent,
  CardHeader,
  Stack,
  TextField,
  MenuItem,
  FormControl,
  Select,
  InputLabel,
} from "@mui/material";
import "./index.css";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { INITIAL_STATE, postReducer } from "../../reducers/postReducer";
import { ACTION_TYPES } from "../../reducers/postActionType";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { app_style } from "./style";
import api from "../config";
import Cookies from "universal-cookie";
import background from "./img.png";
import EditableTable from "../../Component/ECR_component";
import { Popconfirm } from "antd";

const Item = styled(Paper)(({ theme }) => ({
  boxShadow: "none",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const ECR = () => {
  const store = useSelector((state) => state.auth);
  const decrypted = store.emp_logged;

  const newDate = new Date();
  const cookies = new Cookies();

  const [beforepic, setBeforepic] = useState(background);
  // const [customerList, setCustomerList] = useState([]);
  // const [employeeList, setEmployeeList] = useState([]);
  const [afterpic, setAfterpic] = useState(background);
  const [datevalue, setDateValue] = useState(
    moment(newDate).format("YYYY-MM-DD")
  );
  const [tardatevalue, setTarDateValue] = useState(
    moment(newDate).format("YYYY-MM-DD")
  );

  const [customerliststate, CustomerListdispatch] = useReducer(
    postReducer,
    INITIAL_STATE
  );
  const [employeeliststate, EmployeeListdispatch] = useReducer(
    postReducer,
    INITIAL_STATE
  );
  const customerList =
    customerliststate.post &&
    customerliststate.post.length > 0 &&
    customerliststate.post;
  const employeeList =
    employeeliststate.post &&
    employeeliststate.post.length > 0 &&
    employeeliststate.post;

  let Encempname = cookies.get("emp_Name");
  const empName = CryptoJS.AES.decrypt(Encempname, "magna").toString(
    CryptoJS.enc.Utf8
  );
  let Encdptname = cookies.get("logged_dept");
  const dptName = CryptoJS.AES.decrypt(Encdptname, "magna").toString(
    CryptoJS.enc.Utf8
  );
  let Encdptcode = cookies.get("Dept_logged");
  const dptCode = CryptoJS.AES.decrypt(Encdptname, "magna").toString(
    CryptoJS.enc.Utf8
  );

  const [isLoading, setIsLoading] = useState(false);
  const [customerSelect, setCustomerSelect] = useState("");
  const [empSDE, setEmpSDE] = useState("");
  const [empQuality, setEmpQuality] = useState("");
  const [empEng, setEmpEng] = useState("");
  const [empManufacture, setEmpManufacture] = useState("");
  const [empProduction, setEmpProduction] = useState("");
  const [empPurchase, setEmpPurchase] = useState("");
  const [empProgram, setEmpProgram] = useState("");
  const [initiatedBy, setInitiatedBy] = useState("");
  const [changeType, setChangeType] = useState("");
  const [changeReason, setChangeReason] = useState("");
  const [changeDesc, setChangeDesc] = useState("");
  const [tableVal, setTableVal] = useState("");
  const [tableData, setTableData] = useState(false);

  const getTavVal = (data) => {
    setTableVal(data);
  };
  const handleChangeDate = (newValue) => {
    setDateValue(newValue);
  };
  const handleChangeTarDate = (newValue) => {
    setTarDateValue(newValue);
  };

  const handleChangeSDE = (event) => {
    setEmpSDE(event.target.value);
  };

  const handleChangeCustomer = (event) => {
    setCustomerSelect(event.target.value);
  };

  const handleChangeInitiate = (event) => {
    setInitiatedBy(event.target.value);
  };

  const handleChangeType = (event) => {
    setChangeType(event.target.value);
  };

  const handleChangeDesc = (event) => {
    setChangeDesc(event.target.value);
  };

  const handleChangeReason = (event) => {
    setChangeReason(event.target.value);
  };

  const handleFilesBefore = (files) => {
    setBeforepic(files.base64.toString());
  };

  const handleChangeEngg = (event) => {
    setEmpEng(event.target.value);
  };

  const handleChangeQuality = (event) => {
    setEmpQuality(event.target.value);
  };

  const handleChangeManufacture = (event) => {
    setEmpManufacture(event.target.value);
  };

  const handleChangePurchase = (event) => {
    setEmpPurchase(event.target.value);
  };

  const handleChangeProduction = (event) => {
    setEmpProduction(event.target.value);
  };

  const handleChangeProgram = (event) => {
    setEmpProgram(event.target.value);
  };

  const handleFilesAfter = (files) => {
    setAfterpic(files.base64.toString());
  };

  const getCustomerList = async () => {
    CustomerListdispatch({ type: ACTION_TYPES.FETCH_START });
    await api
      .post("api/getCustomerList")
      .then((response) => {
        const recordset = response.data;
        if (recordset.success !== false) {
          if (recordset.data.length !== 0) {
            CustomerListdispatch({
              type: ACTION_TYPES.FETCH_SUCCESS,
              payload: recordset.data,
            });
            // setCustomerList(recordset.data);
          } else {
            // setCustomerList([]);
            CustomerListdispatch({ type: ACTION_TYPES.FETCH_EMPTY });
          }
        } else {
          // setCustomerList([]);
          CustomerListdispatch({ type: ACTION_TYPES.FETCH_EMPTY });
        }
      })
      .catch((error) => {
        CustomerListdispatch({
          type: ACTION_TYPES.FETCH_ERROR,
          payload: error,
        });
      });
  };
  const getEmployeeList = async () => {
    EmployeeListdispatch({ type: ACTION_TYPES.FETCH_START });
    await api
      .post("api/getEmployeeListDropdown")
      .then((response) => {
        const recordset = response.data;
        if (recordset.success !== false) {
          if (recordset.data.length !== 0) {
            EmployeeListdispatch({
              type: ACTION_TYPES.FETCH_SUCCESS,
              payload: recordset.data,
            });
            // setEmployeeList(recordset.data);
          } else {
            // setEmployeeList([]);
            EmployeeListdispatch({ type: ACTION_TYPES.FETCH_EMPTY });
          }
        } else {
          // setEmployeeList([]);
          EmployeeListdispatch({ type: ACTION_TYPES.FETCH_EMPTY });
        }
      })
      .catch((error) => {
        EmployeeListdispatch({
          type: ACTION_TYPES.FETCH_ERROR,
          payload: error,
        });
      });
  };
  useEffect(() => {
    getCustomerList();
    getEmployeeList();
  }, []);

  const handleCancel = () => {
    toast.error("Cancelled Successfully!", {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
    setDateValue(moment(newDate).format("YYYY-MM-DD"));
    setTarDateValue(moment(newDate).format("YYYY-MM-DD"));
    setBeforepic(background);
    setAfterpic(background);
    setCustomerSelect("");
    setInitiatedBy("");
    setChangeType("");
    setChangeReason("");
    setChangeDesc("");
    setTableVal("");
    setTableData(tableData ? false : true);
    setEmpSDE("");
    setEmpQuality("");
    setEmpEng("");
    setEmpManufacture("");
    setEmpProduction("");
    setEmpPurchase("");
    setEmpProgram("");
  };

  const handleSubmit = async () => {
    if (
      customerSelect !== "" &&
      initiatedBy !== "" &&
      changeType !== "" &&
      changeReason !== "" &&
      changeDesc !== ""
    ) {
      if (tableVal !== undefined && tableVal !== "" && tableVal.length > 0) {
        if (
          empSDE !== "" &&
          empQuality !== "" &&
          empEng !== "" &&
          empManufacture !== "" &&
          empProduction !== "" &&
          empPurchase !== "" &&
          empProgram !== ""
        ) {
          if (beforepic !== background && afterpic !== background) {
            setIsLoading(true);
            const revisionData = [...tableVal];
            const formdata = new FormData();
            formdata.append("ReqDate", moment(datevalue).format("YYYY-MM-DD"));
            formdata.append(
              "TarDate",
              moment(tardatevalue).format("YYYY-MM-DD")
            );
            formdata.append("CurDate", moment(newDate).format("YYYY-MM-DD"));
            formdata.append("Customer", customerSelect);
            formdata.append("Initiate", initiatedBy);
            formdata.append("PartType", changeType);
            formdata.append("Desc", changeDesc);
            formdata.append("Reason", changeReason);
            formdata.append("revision", JSON.stringify(revisionData));
            formdata.append("before", beforepic);
            formdata.append("after", afterpic);
            formdata.append("empSDE", empSDE);
            formdata.append("empQuality", empQuality);
            formdata.append("empEng", empEng);
            formdata.append("empManufacture", empManufacture);
            formdata.append("empProduction", empProduction);
            formdata.append("empPurchase", empPurchase);
            formdata.append("empProgram", empProgram);
            formdata.append("created", decrypted);
            formdata.append("empName", empName);
            formdata.append("dptName", dptCode);

            await api
              .post("api/insertEcrRequestDetails", formdata, {
                "Content-Type": "text/plain",
              })
              .then((response) => {
                const recordset = response.data;
                setIsLoading(false);
                if (recordset.success !== false) {
                  toast.success("Request Submitted Successfuly!", {
                    position: toast.POSITION.BOTTOM_RIGHT,
                  });
                  setDateValue(moment(newDate).format("YYYY-MM-DD"));
                  setBeforepic(background);
                  setAfterpic(background);
                  setCustomerSelect("");
                  setInitiatedBy("");
                  setChangeType("");
                  setChangeReason("");
                  setChangeDesc("");
                  setTableVal("");
                  setTableData(tableData ? false : true);
                  setEmpSDE("");
                  setEmpQuality("");
                  setEmpEng("");
                  setEmpManufacture("");
                  setEmpProduction("");
                  setEmpPurchase("");
                  setEmpProgram("");
                } else {
                  toast.error("Request failed,. Try again!", {
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
            toast.error("Before & After image Mandatory!", {
              position: toast.POSITION.BOTTOM_RIGHT,
            });
          }
        } else {
          toast.error("Feasibility and Risk Assesment Details Mandatory!", {
            position: toast.POSITION.BOTTOM_RIGHT,
          });
        }
      } else {
        toast.error("Affected Part Details Mandatory!", {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      }
    } else {
      toast.error("Initiate Request Details Mandatory!", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    }
  };

  return (
    <Box>
      <Box sx={{ m: 3 }}>
        <Card raised={true} sx={{ backgroundColor: "#2E3B55", color: "white" }}>
          <Typography variant="h6" align="center" sx={{ m: 2 }}>
            Engineering Change Request
          </Typography>
        </Card>
        <Box sx={{ flexGrow: 1, mt: 2 }}>
          <Card raised={true} sx={app_style.cardSx}>
            <CardHeader
              sx={{ backgroundColor: "#5A5A5A", color: "white" }}
              title={
                <Typography sx={app_style.cardHeading1}>
                  Request Details
                </Typography>
              }
            ></CardHeader>
            <CardContent>
              <Stack spacing={2}>
                <Grid container spacing={2}>
                  <Grid item lg={1.71} xl={1.71} md={4} sm={4} xs={12}>
                    <Item style={{ backgroundColor: "#F4F4F4" }}>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <Typography sx={{ m: 1, fontSize: 14 }}>
                          Request Date
                        </Typography>
                        <DesktopDatePicker
                          required
                          minDate={new Date()}
                          // label="Request Date"
                          inputFormat="DD/MM/YYYY"
                          value={datevalue}
                          onChange={handleChangeDate}
                          renderInput={(params) => (
                            <TextField
                              sx={{
                                backgroundColor: "white",
                                "& .MuiInputBase-input": {
                                  height: "5px",
                                  width: 100,
                                },
                              }}
                              {...params}
                            />
                          )}
                        />
                      </LocalizationProvider>
                    </Item>
                  </Grid>
                  <Grid item lg={1.71} xl={1.71} md={4} sm={4} xs={12}>
                    <Item style={{ backgroundColor: "#F4F4F4" }}>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <Typography sx={{ m: 1, fontSize: 14 }}>
                          Target Date
                        </Typography>
                        <DesktopDatePicker
                          required
                          minDate={new Date()}
                          // label="Request Date"
                          inputFormat="DD/MM/YYYY"
                          value={tardatevalue}
                          onChange={handleChangeTarDate}
                          renderInput={(params) => (
                            <TextField
                              sx={{
                                backgroundColor: "white",
                                "& .MuiInputBase-input": {
                                  height: "5px",
                                  width: 100,
                                },
                              }}
                              {...params}
                            />
                          )}
                        />
                      </LocalizationProvider>
                    </Item>
                  </Grid>
                  <Grid item lg={1.71} xl={1.71} md={4} sm={4} xs={12}>
                    <Item style={{ backgroundColor: "#F4F4F4" }}>
                      <Typography sx={{ m: 1, fontSize: 14 }}>
                        Customer
                      </Typography>
                      <FormControl sx={{ minWidth: 160 }} size="small">
                        <InputLabel>Customer</InputLabel>
                        <Select
                          required
                          sx={{ backgroundColor: "white", fontSize: 14 }}
                          label="Customer"
                          value={customerSelect}
                          onChange={handleChangeCustomer}
                        >
                          {customerList
                            ? customerList.map((cust, index) => (
                                <MenuItem key={index} value={cust.Cust_Code}>
                                  {cust.Cust_Name}
                                </MenuItem>
                              ))
                            : null}
                        </Select>
                      </FormControl>
                    </Item>
                  </Grid>
                  <Grid item lg={1.71} xl={1.71} md={4} sm={4} xs={12}>
                    <Item style={{ backgroundColor: "#F4F4F4" }}>
                      <Typography sx={{ m: 1, fontSize: 14 }}>
                        Initiated by
                      </Typography>
                      <FormControl sx={{ minWidth: 160 }} size="small">
                        <InputLabel>Initiated by</InputLabel>
                        <Select
                          required
                          sx={{ backgroundColor: "white", fontSize: 14 }}
                          label="Customer"
                          value={initiatedBy}
                          onChange={handleChangeInitiate}
                        >
                          <MenuItem value="Customer">Customer</MenuItem>
                          <MenuItem value="Magna">Magna</MenuItem>
                          <MenuItem value="Supplier">Supplier</MenuItem>
                        </Select>
                      </FormControl>
                    </Item>
                  </Grid>
                  <Grid item lg={1.71} xl={1.71} md={4} sm={4} xs={12}>
                    <Item style={{ backgroundColor: "#F4F4F4" }}>
                      <Typography sx={{ m: 1, fontSize: 14 }}>
                        Change Part Type
                      </Typography>
                      <FormControl sx={{ minWidth: 160 }} size="small">
                        <InputLabel>Part Type</InputLabel>
                        <Select
                          required
                          sx={{ backgroundColor: "white", fontSize: 14 }}
                          label="Customer"
                          value={changeType}
                          onChange={handleChangeType}
                        >
                          <MenuItem value={0}>New-Part</MenuItem>
                          <MenuItem value={1}>Existing-Part</MenuItem>
                        </Select>
                      </FormControl>
                    </Item>
                  </Grid>
                  <Grid item lg={1.71} xl={1.71} md={4} sm={4} xs={12}>
                    <Item style={{ backgroundColor: "#F4F4F4" }}>
                      <Typography sx={{ m: 1, fontSize: 14 }}>
                        Change Description
                      </Typography>
                      <TextField
                        sx={{ backgroundColor: "white", fontSize: 14 }}
                        value={changeDesc}
                        onChange={handleChangeDesc}
                        required
                        fullWidth
                        id="outlined-multiline-static"
                        label="Description"
                        multiline
                        rows={1}
                      />
                    </Item>
                  </Grid>
                  <Grid item lg={1.71} xl={1.71} md={4} sm={4} xs={12}>
                    <Item style={{ backgroundColor: "#F4F4F4" }}>
                      <Typography sx={{ m: 1, fontSize: 14 }}>
                        Reason for Changing
                      </Typography>
                      <TextField
                        sx={{ backgroundColor: "white", fontSize: 14 }}
                        value={changeReason}
                        onChange={handleChangeReason}
                        required
                        fullWidth
                        id="outlined-multiline-static"
                        label="Reason"
                        multiline
                        rows={1}
                      />
                    </Item>
                  </Grid>
                </Grid>
              </Stack>
            </CardContent>
          </Card>
        </Box>

        <Box sx={{ flexGrow: 1, mt: 2 }}>
          <Card raised={true} sx={app_style.cardSxT}>
            <CardHeader
              sx={{ backgroundColor: "#5A5A5A", color: "white" }}
              title={
                <Typography sx={app_style.cardHeading}>
                  Affected Part Details
                </Typography>
              }
            ></CardHeader>
            <CardContent>
              <Box className="table-container">
                <EditableTable getTavVal={getTavVal} tableData={tableData} />
              </Box>
            </CardContent>
          </Card>
        </Box>
        <Box sx={{ flexGrow: 1, mt: 2 }}>
          <Card raised={true} sx={app_style.cardSx}>
            <CardHeader
              sx={{ backgroundColor: "#5A5A5A", color: "white" }}
              title={
                <Typography sx={app_style.cardHeading1}>
                  Feasibility and Risk Assesment
                </Typography>
              }
            ></CardHeader>
            <CardContent>
              <Stack spacing={1}>
                <Grid container spacing={2}>
                  <Grid item lg={1.65} xl={1.65} md={4} sm={4} xs={12}>
                    <Item style={{ backgroundColor: "#F4F4F4" }}>
                      <Typography sx={{ m: 1, fontSize: 14 }}>
                        Engineering
                      </Typography>
                      <FormControl sx={{ minWidth: 160 }} size="small">
                        <InputLabel>Engineering</InputLabel>
                        <Select
                          required
                          sx={{ backgroundColor: "white", fontSize: 14 }}
                          label="Engineering"
                          value={empEng}
                          onChange={handleChangeEngg}
                        >
                          {employeeList
                            ? employeeList.map((emp, index) =>
                                emp.Dept_code === "Engineering" ? (
                                  <MenuItem key={index} value={emp.Emp_Code}>
                                    {emp.Emp_Name}
                                  </MenuItem>
                                ) : null
                              )
                            : null}
                        </Select>
                      </FormControl>
                    </Item>
                  </Grid>
                  <Grid item lg={1.65} xl={1.65} md={4} sm={4} xs={12}>
                    <Item style={{ backgroundColor: "#F4F4F4" }}>
                      <Typography sx={{ m: 1, fontSize: 14 }}>
                        Quality
                      </Typography>
                      <FormControl sx={{ minWidth: 160 }} size="small">
                        <InputLabel>Quality</InputLabel>
                        <Select
                          required
                          sx={{ backgroundColor: "white", fontSize: 14 }}
                          label="Quality"
                          value={empQuality}
                          onChange={handleChangeQuality}
                        >
                          {employeeList
                            ? employeeList.map((emp, index) =>
                                emp.Dept_code === "Quality" ? (
                                  <MenuItem key={index} value={emp.Emp_Code}>
                                    {emp.Emp_Name}
                                  </MenuItem>
                                ) : null
                              )
                            : null}
                        </Select>
                      </FormControl>
                    </Item>
                  </Grid>
                  <Grid item lg={1.65} xl={1.65} md={4} sm={4} xs={12}>
                    <Item style={{ backgroundColor: "#F4F4F4" }}>
                      <Typography sx={{ m: 1, fontSize: 14 }}>
                        Manufacturing
                      </Typography>
                      <FormControl sx={{ minWidth: 160 }} size="small">
                        <InputLabel>Manufacturing</InputLabel>
                        <Select
                          required
                          sx={{ backgroundColor: "white", fontSize: 14 }}
                          label="Manufacturing"
                          value={empManufacture}
                          onChange={handleChangeManufacture}
                        >
                          {employeeList
                            ? employeeList.map((emp, index) =>
                                emp.Dept_code === "Manufacturing" ? (
                                  <MenuItem key={index} value={emp.Emp_Code}>
                                    {emp.Emp_Name}
                                  </MenuItem>
                                ) : null
                              )
                            : null}
                        </Select>
                      </FormControl>
                    </Item>
                  </Grid>
                  <Grid item lg={1.65} xl={1.65} md={3} sm={6} xs={12}>
                    <Item style={{ backgroundColor: "#F4F4F4" }}>
                      <Typography sx={{ m: 1, fontSize: 14 }}>
                        Purchase
                      </Typography>
                      <FormControl sx={{ minWidth: 160 }} size="small">
                        <InputLabel>Purchase</InputLabel>
                        <Select
                          required
                          sx={{ backgroundColor: "white", fontSize: 14 }}
                          label="Purchase"
                          value={empPurchase}
                          onChange={handleChangePurchase}
                        >
                          {employeeList
                            ? employeeList.map((emp, index) =>
                                emp.Dept_code === "Purchase" ? (
                                  <MenuItem key={index} value={emp.Emp_Code}>
                                    {emp.Emp_Name}
                                  </MenuItem>
                                ) : null
                              )
                            : null}
                        </Select>
                      </FormControl>
                    </Item>
                  </Grid>
                  <Grid item lg={1.65} xl={1.65} md={3} sm={6} xs={12}>
                    <Item style={{ backgroundColor: "#F4F4F4" }}>
                      <Typography sx={{ m: 1, fontSize: 14 }}>SDE</Typography>
                      <FormControl sx={{ minWidth: 160 }} size="small">
                        <InputLabel>SDE</InputLabel>
                        <Select
                          required
                          sx={{ backgroundColor: "white", fontSize: 14 }}
                          label="SDE"
                          value={empSDE}
                          onChange={handleChangeSDE}
                        >
                          {employeeList
                            ? employeeList.map((emp, index) =>
                                emp.Dept_code === "SDE" ? (
                                  <MenuItem key={index} value={emp.Emp_Code}>
                                    {emp.Emp_Name}
                                  </MenuItem>
                                ) : null
                              )
                            : null}
                        </Select>
                      </FormControl>
                    </Item>
                  </Grid>
                  <Grid item lg={1.65} xl={1.65} md={3} sm={6} xs={12}>
                    <Item style={{ backgroundColor: "#F4F4F4" }}>
                      <Typography sx={{ m: 1, fontSize: 14 }}>
                        Production
                      </Typography>
                      <FormControl sx={{ minWidth: 160 }} size="small">
                        <InputLabel>Production</InputLabel>
                        <Select
                          required
                          sx={{ backgroundColor: "white", fontSize: 14 }}
                          label="Production"
                          value={empProduction}
                          onChange={handleChangeProduction}
                        >
                          {employeeList
                            ? employeeList.map((emp, index) =>
                                emp.Dept_code === "Production" ? (
                                  <MenuItem key={index} value={emp.Emp_Code}>
                                    {emp.Emp_Name}
                                  </MenuItem>
                                ) : null
                              )
                            : null}
                        </Select>
                      </FormControl>
                    </Item>
                  </Grid>
                  <Grid item lg={1.65} xl={1.65} md={3} sm={6} xs={12}>
                    <Item style={{ backgroundColor: "#F4F4F4" }}>
                      <Typography sx={{ m: 1, fontSize: 14 }}>PM</Typography>
                      <FormControl sx={{ minWidth: 180 }} size="small">
                        <InputLabel>Program Management</InputLabel>
                        <Select
                          required
                          sx={{ backgroundColor: "white", fontSize: 14 }}
                          label="Program Management"
                          value={empProgram}
                          onChange={handleChangeProgram}
                        >
                          {employeeList
                            ? employeeList.map((emp, index) =>
                                emp.Dept_code === "Program_Management" ? (
                                  <MenuItem key={index} value={emp.Emp_Code}>
                                    {emp.Emp_Name}
                                  </MenuItem>
                                ) : null
                              )
                            : null}
                        </Select>
                      </FormControl>
                    </Item>
                  </Grid>
                </Grid>
              </Stack>
            </CardContent>
          </Card>
        </Box>
        <Box sx={{ flexGrow: 1, mt: 2 }}>
          <Card raised={true} sx={app_style.cardSxT}>
            <CardHeader
              sx={{ backgroundColor: "#5A5A5A", color: "white" }}
              title={
                <Typography sx={app_style.cardHeading}>
                  Change Details
                </Typography>
              }
            ></CardHeader>
            <CardContent>
              <Grid container spacing={1} xs={12}>
                <Grid xs={12} sm={12} md={6} lg={6} xl={6} item>
                  <Card style={{ height: 400 }}>
                    <Item>
                      <ReactFileReader
                        fileTypes={[".jpg", ".png"]}
                        base64={true}
                        multipleFiles={true}
                        value={beforepic}
                        handleFiles={handleFilesBefore}
                      >
                        <Button variant="contained" sx={{ m: 1 }}>
                          Upload
                        </Button>
                      </ReactFileReader>
                      <Box>
                        <CardMedia
                          sx={{ display: "inline-flex" }}
                          component="img"
                          style={{
                            width: beforepic === background ? "30%" : "80%",
                            marginTop: beforepic === background ? "6%" : "",
                          }}
                          src={beforepic}
                        />
                      </Box>
                    </Item>
                  </Card>
                </Grid>
                <Grid xs={12} sm={12} md={6} lg={6} xl={6} item>
                  <Card style={{ height: 400 }}>
                    <Item>
                      <ReactFileReader
                        fileTypes={[".jpg", ".png"]}
                        base64={true}
                        multipleFiles={true}
                        value={afterpic}
                        handleFiles={handleFilesAfter}
                      >
                        <Button variant="contained" sx={{ m: 1 }}>
                          Upload
                        </Button>
                      </ReactFileReader>
                      <Box>
                        <CardMedia
                          sx={{ display: "inline-flex" }}
                          component="img"
                          style={{
                            width: afterpic === background ? "30%" : "80%",
                            marginTop: afterpic === background ? "6%" : "",
                          }}
                          src={afterpic}
                        />
                      </Box>
                    </Item>
                  </Card>
                </Grid>
              </Grid>
              <Box sx={{ textAlign: "center" }}>
                <Button
                  variant="contained"
                  sx={{
                    "&:hover": {
                      backgroundColor: "transparent",
                      color: "#157DEC",
                      variant: "none",
                    },
                    m: 1,
                  }}
                  onClick={handleSubmit}
                >
                  Submit
                </Button>
                <Popconfirm title="Sure to Cancel?" onConfirm={handleCancel}>
                  <Button
                    variant="outlined"
                    sx={{
                      "&:hover": {
                        backgroundColor: "#157DEC",
                        color: "white",
                      },
                      m: 1,
                    }}
                  >
                    Clear
                  </Button>
                </Popconfirm>
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Box>
      <ToastContainer />
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Box>
  );
};

export default ECR;
