import React, { useState } from "react";
import { Popconfirm, Radio, Table } from "antd";
import { app_style } from "./style";
import { AES, enc } from "crypto-js";
import { useSelector } from "react-redux";
import Paper from "@mui/material/Paper";
import moment from "moment";
import { styled } from "@mui/material/styles";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Tooltip,
  Typography,
  Divider,
} from "@mui/material";
import "./index.css";
import { ToastContainer, toast } from "react-toastify";
import RiskCheckTable from "../../Component/Task_Risk_Check";
import RiskListTable from "../../Component/Task_Risk_List";
import api from "../config";
import BOMNewRequest from "../BOM/New_Request";

const Item = styled(Paper)(({ theme }) => ({
  boxShadow: "none",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const AssignedTask = (props) => {
  const store = useSelector((state) => state.auth);
  const logged_dept = store.logged_dept;

  const [finalStatus, setFinalStatus] = useState("");
  const [masterId, setMasterId] = useState("");
  const [mstdtl, setMstDtl] = useState([]);
  const [listDisplay1, setListDisplay1] = useState(true);
  const [listDisplay2, setListDisplay2] = useState(false);
  const [tabDataRender, settabDataRender] = useState(false);
  const [feasibleTest, setFeasibleTest] = useState("");
  const [emptyHandle, setEmptyHandle] = useState(false);
  const [emptyAssesmentData, setEmptyAssesmentData] = useState(false);
  const [emptyvalue, setEmptyvalue] = useState("");
  const [alternateOption, setAlternateOption] = useState("");
  const [changesRecon, setChangesRecon] = useState("");
  const [priority, setPriority] = useState("");
  const [valueProcessed, setValueProcessed] = useState("");
  const [feasibleData, setFeasibleData] = useState("");
  const [feasibleSource, setFeasibleSource] = useState(Array(13).fill(""));
  const [feasibleCheck, setFeasibleCheck] = useState(Array(15).fill(""));
  const [riskList, setRiskList] = useState("");
  const [rankList, setRankList] = useState("");
  const [remarkList, setRemarkList] = useState("");
  const [isNewRequest, SetisNewRequest] = useState(false);
  const [bomMyTask, SetBOMMyTask] = useState([]);
  const [mbomMyTask, SetMBOMMyTask] = useState([]);
  const [mbomAppMyTask, SetMBOMAppMyTask] = useState([]);
  const [mbomNotMyTask, SetMBOMNotMyTask] = useState([]);
  const [tabArr, SetTableArr] = useState([]);
  const [base64code, Setbase64code] = useState([]);

  const getAssesmentData = (risk, rank, remark) => {
    setRiskList(risk);
    setRankList(rank);
    setRemarkList(remark);
  };
  const mstdate = mstdtl && mstdtl.length > 0 ? mstdtl[0].Created_date : null;
  const getDateDiffInDays = (day1, day2) => {
    const diffInMs = Math.abs(day1 - day2);
    const diffInDays = Math.ceil(diffInMs / (1000 * 60 * 60 * 24));
    return diffInDays;
  };
  const curDate = moment(new Date());
  const dayCount = getDateDiffInDays(moment(mstdate), curDate);

  const handleBOMClick = (tablearr, row) => {
    let rowArr = [];
    rowArr.mbom = "false";
    rowArr.push(row);
    setListDisplay1(false);
    setListDisplay2(false);
    SetisNewRequest(true);
    SetMBOMMyTask([]);
    SetMBOMAppMyTask([]);
    SetMBOMNotMyTask([]);
    SetBOMMyTask(rowArr);
    SetTableArr(tablearr);
    // onloadBase64File(rowArr);
  };
  const handleMBOMclick = (row) => {
    setListDisplay1(false);
    setListDisplay2(false);
    SetisNewRequest(true);
    SetBOMMyTask([]);
    SetMBOMAppMyTask([]);
    SetMBOMNotMyTask([]);
    let mbomrowArr = [];
    row.mbom = "true";
    mbomrowArr.push(row);
    SetMBOMMyTask(mbomrowArr);
  };

  const handleMBOMAppclick = (row) => {
    setListDisplay1(false);
    setListDisplay2(false);
    SetisNewRequest(true);
    SetMBOMMyTask([]);
    SetBOMMyTask([]);
    SetMBOMNotMyTask([]);
    let mbomApprowArr = [];
    row.mbom = "nuetral";
    mbomApprowArr.push(row);
    SetMBOMAppMyTask(mbomApprowArr);
    onloadBase64File(mbomApprowArr);
  };

  const handleMBOMNotclick = (row) => {
    setListDisplay1(false);
    setListDisplay2(false);
    SetisNewRequest(true);
    SetMBOMMyTask([]);
    SetBOMMyTask([]);
    SetMBOMAppMyTask([]);
    let mbomNotrowArr = [];
    row.mbom = "add";
    mbomNotrowArr.push(row);
    SetMBOMNotMyTask(mbomNotrowArr);
    onloadBase64File(mbomNotrowArr);
  };

  const onloadBase64File = async (id) => {
    let mstid = id && id[0] ? id[0].Mst_Id : "";

    if (mstid !== "") {
      const formdata = new FormData();

      formdata.append("id", mstid);

      await api
        .post("api/getBase64EncodedFile", formdata, {
          "Content-Type": "text/plain",
        })
        .then((res) => {
          if (res !== undefined && res !== null && res !== "") {
            const resdata = res.data;
            if (resdata.success !== false) {
              Setbase64code(resdata.data);
            } else {
              Setbase64code([]);
            }
          } else {
            Setbase64code([]);
          }
        })
        .catch((err) => {
          throw err;
        });
    }
  };

  const handleBack = () => {
    SetisNewRequest(false);
    setListDisplay1(true);
  };

  const handleCheck = (e, index) => {
    const newData = [...feasibleSource];
    const newDataCheck = [...feasibleCheck];
    newDataCheck[index] = e.target.value;
    if (index > 8) {
      if (index > 12) {
        newData[index - 2] = e.target.value;
      } else {
        newData[index - 1] = e.target.value;
      }
    } else {
      newData[index] = e.target.value;
    }
    setFeasibleSource(newData);
    setFeasibleCheck(newDataCheck);
    setPriority(newDataCheck);
    const validate = newData.every((item) => item !== "");
    if (validate) {
      setFeasibleData(newData);
    }
  };

  const columns = [
    {
      title: () => {
        return (
          <Typography sx={{ textAlign: "center" }}>
            Feasibility Check
          </Typography>
        );
      },
      dataIndex: "check",
      align: "center",
      key: "check",
      width: 200,
      render: (text, row, index) => {
        if (index === 8 || index === 12) {
          return {
            children: "",
            props: {
              colSpan: 0,
            },
          };
        }
        return (
          <Radio.Group
            value={priority[index]}
            onChange={(e) => {
              handleCheck(e, index);
            }}
            sx={{ fontSize: 13 }}
          >
            <Radio value={1}>YES</Radio>
            <Radio value={0}>NO</Radio>
            <Radio value={2}>NA</Radio>
          </Radio.Group>
        );
      },
    },
    {
      title: () => {
        return (
          <Typography sx={{ textAlign: "center" }}>Considaration</Typography>
        );
      },
      dataIndex: "Considaration",
      key: "Considaration",
      //   align: "center",
      render: (text, row, index) => {
        if (index === 8 || index === 12) {
          return {
            children: (
              <Typography
                fontWeight="bold"
                sx={{ fontSize: 14, textAlign: "center" }}
              >
                {text}
              </Typography>
            ),
            props: {
              colSpan: 2,
            },
          };
        }
        return {
          children: <Typography sx={{ fontSize: 14 }}>{text}</Typography>,
          props: {
            colSpan: 1,
          },
        };
      },
    },
  ];

  const data = [
    {
      key: 1,
      check: 3,
      Considaration:
        "Is product adequately defined (application requirements, etc. to enable feasibility evaluation?",
    },
    {
      key: 2,
      check: 3,
      Considaration:
        "Can Engineering Performance Specifications be met as written?",
    },
    {
      key: 3,
      check: 3,
      Considaration:
        "Can product be manufactured to tolerances specified on drawing?",
    },
    {
      key: 4,
      check: 3,
      Considaration:
        "Can product be manufactured with process capability that meet requirements?",
    },
    {
      key: 5,
      check: 3,
      Considaration: "Is there adequate capacity to produce product?",
    },
    {
      key: 6,
      check: 3,
      Considaration:
        "Does the design allow the use of efficient material handling techniques?",
    },
    {
      key: 7,
      check: 3,
      Considaration: "Is statistical process control required on the product?",
    },
    {
      key: 8,
      check: 3,
      Considaration:
        "Is statistical process control presently used on similar products?",
    },
    {
      key: 9,
      check: 3,
      Considaration:
        "Can the product be manufactured within normal cost parameters?  Abnormal cost considerations may include:",
    },
    {
      key: 10,
      check: 3,
      Considaration: "Costs for capital equipment?",
    },
    {
      key: 11,
      check: 3,
      Considaration: "Costs for tooling?",
    },
    {
      key: 12,
      check: 3,
      Considaration: "Alternative manufacturing methods?",
    },
    {
      key: 13,
      check: 3,
      Considaration:
        "Where statistical process control is used on similar products:",
    },
    {
      key: 14,
      check: 3,
      Considaration: "Are the processes in control and stable?",
    },
    {
      key: 15,
      check: 3,
      Considaration: "Does process capability meet customer requirements?",
    },
  ];

  const listDisplayTable = (bool) => {
    setListDisplay2(bool);
    setListDisplay1(false);
  };

  const handleCancel = () => {
    setEmptyAssesmentData(true);
    settabDataRender(true);
    setPriority("");
    setFeasibleData("");
    setFeasibleTest("");
    setValueProcessed("");
    setChangesRecon("");
    setEmptyvalue("");
    setFinalStatus("");
    setEmptyHandle(false);
    setAlternateOption("");
    setFeasibleCheck(Array(15).fill(""));
    setFeasibleSource(Array(13).fill(""));
    setListDisplay2(false);
  };

  const handleChangeEmptyHandle = (e) => {
    setValueProcessed("");
    setChangesRecon("");
    setEmptyvalue(e.target.value);
    setFeasibleTest(e.target.value);
    if (e.target.value === 0) {
      setEmptyHandle(true);
    } else {
      setEmptyHandle(false);
      setAlternateOption("");
    }
  };

  const handleChangerecon = (e) => {
    setEmptyvalue("");
    setValueProcessed("");
    setFeasibleTest(e.target.value);
    setChangesRecon(e.target.value);
    if (e.target.value === 0) {
      setEmptyHandle(true);
    } else {
      setEmptyHandle(false);
      setAlternateOption("");
    }
  };

  const handlevalueProcessed = (e) => {
    setEmptyvalue("");
    setChangesRecon("");
    setFeasibleTest(e.target.value);
    setValueProcessed(e.target.value);
    if (e.target.value === 0) {
      setEmptyHandle(true);
    } else {
      setEmptyHandle(false);
      setAlternateOption("");
    }
  };

  const insertFeasibleRiskDetails = async () => {
    const formdata = new FormData();
    formdata.append("feasibleData", feasibleData);
    formdata.append("riskList", riskList);
    formdata.append("rankList", rankList);
    formdata.append("remarkList", remarkList);
    formdata.append("feasibleTest", feasibleTest);
    formdata.append("finalStatus", finalStatus);
    formdata.append("alternateOption", alternateOption);
    formdata.append("mstID", masterId);
    formdata.append("dept", logged_dept);
    await api
      .post("api/insertRiskFeasibleDetails", formdata, {
        "Content-Type": "text/plain",
      })
      .then((response) => {
        const recordset = response.data;
        if (recordset.code === 200) {
          settabDataRender(true);
          setPriority("");
          setFeasibleData("");
          setFeasibleSource(Array(13).fill(""));
          setFeasibleCheck(Array(15).fill(""));
          setRiskList("");
          setRankList("");
          setValueProcessed("");
          setChangesRecon("");
          setEmptyvalue("");
          setFeasibleTest("");
          setFinalStatus("");
          setRemarkList("");
          setEmptyHandle(false);
          setEmptyAssesmentData(true);
          setListDisplay2(false);
          setAlternateOption("");
          toast.success("Request Submitted Successfuly!", {
            position: toast.POSITION.BOTTOM_RIGHT,
          });
        } else {
          toast.error("Request failed,. Try again!", {
            position: toast.POSITION.BOTTOM_RIGHT,
          });
        }
      });
  };

  const handleSubmit = () => {
    if (feasibleData !== "") {
      if (riskList !== "" && rankList !== "" && remarkList !== "") {
        if (feasibleTest !== "" && finalStatus !== "") {
          if (feasibleTest === 0) {
            if (alternateOption !== "") {
              insertFeasibleRiskDetails();
            } else {
              toast.error("Please Select Alternate Options!", {
                position: toast.POSITION.BOTTOM_RIGHT,
              });
            }
          } else {
            insertFeasibleRiskDetails();
          }
        } else {
          toast.error("Please fill all Final status Details!", {
            position: toast.POSITION.BOTTOM_RIGHT,
          });
        }
      } else {
        toast.error("Please fill all Risk Assesment Details!", {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      }
    } else {
      toast.error("Please fill all Feasibility Study Details!", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    }
  };

  const handleClickback = () => {
    setListDisplay2(false);
    setListDisplay1(true);
  };

  return (
    <Box>
      <Box
        sx={{ m: 3 }}
        style={{ display: listDisplay1 === true ? "block" : "none" }}
      >
        <Card raised={true} sx={app_style.cardSxT}>
          <CardHeader
            sx={{ backgroundColor: "#5A5A5A", color: "white" }}
            title={
              <Typography sx={app_style.cardHeading}>
                Assesment Request List
              </Typography>
            }
          ></CardHeader>
          <CardContent>
            <RiskListTable
              listDisplayTable={listDisplayTable}
              setMasterId={setMasterId}
              setMstDtl={setMstDtl}
              tabDataRender={tabDataRender}
              handleBOMClick={handleBOMClick}
              handleMBOMclick={handleMBOMclick}
              handleMBOMAppclick={handleMBOMAppclick}
              handleMBOMNotclick={handleMBOMNotclick}
              isNewRequest={isNewRequest}
              settabDataRender={settabDataRender}
            />
          </CardContent>
        </Card>
      </Box>

      <Box style={{ display: isNewRequest === true ? "block" : "none" }}>
        <BOMNewRequest
          bomMyTask={bomMyTask}
          mbomMyTask={mbomMyTask}
          mbomAppMyTask={mbomAppMyTask}
          mbomNotMyTask={mbomNotMyTask}
          handleBack={handleBack}
          tabArr={tabArr}
          base64code={base64code}
        />
      </Box>

      <Box
        sx={{ m: 3 }}
        style={{ display: listDisplay2 === true ? "block" : "none" }}
      >
        <Card raised={true} sx={app_style.cardSxT}>
          <CardHeader
            sx={{ backgroundColor: "#5A5A5A", color: "white" }}
            title={
              <Box>
                <Grid container xs={12}>
                  <Grid item xs={3}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleClickback()}
                    >
                      Back
                    </Button>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography sx={app_style.cardHeading}>
                      Feasibility & Risk Assessment
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
            }
          ></CardHeader>
          <CardContent>
            <Stack spacing={0}>
              <Grid container spacing={1} xs={12}>
                <Grid xs={12} item={true}>
                  <Item style={{ backgroundColor: "#F4F4F4" }}>
                    <Box>
                      <Card raised={true} sx={app_style.cardSxT}>
                        <CardHeader
                          sx={{ backgroundColor: "#5A5A5A", color: "white" }}
                          title={
                            <Typography sx={app_style.cardHeading}>
                              Engineering Change Request - ECR
                            </Typography>
                          }
                        ></CardHeader>
                        <CardContent>
                          <Grid container spacing={2} sx={{ mt: 1 }}>
                            <Grid item xs={6} sm={4} xl={3} lg={3} md={4}>
                              <Typography>
                                Employee Name :{" "}
                                <span style={{ fontWeight: "bold" }}>
                                  {mstdtl.length > 0 ? mstdtl[0].Emp_Name : ""}
                                </span>
                              </Typography>
                            </Grid>
                            <Grid item xs={6} sm={4} xl={3} lg={3} md={4}>
                              <Typography>
                                Created Date :{" "}
                                <span style={{ fontWeight: "bold" }}>
                                  {mstdtl.length > 0
                                    ? moment(mstdtl[0].Created_date).format(
                                        "DD-MMM-YYYY"
                                      )
                                    : ""}
                                </span>
                              </Typography>
                            </Grid>
                            <Grid item xs={6} sm={4} xl={3} lg={3} md={4}>
                              <Typography>
                                Initiated By :{" "}
                                <span style={{ fontWeight: "bold" }}>
                                  {mstdtl.length > 0
                                    ? mstdtl[0].Initiate_By
                                    : ""}
                                </span>
                              </Typography>
                            </Grid>
                            <Grid item xs={6} sm={4} xl={3} lg={3} md={4}>
                              <Typography>
                                Open Days :{" "}
                                <span style={{ fontWeight: "bold" }}>
                                  {dayCount}
                                </span>
                              </Typography>
                            </Grid>
                          </Grid>
                          <Grid container spacing={2} sx={{ mt: 1, mb: 2 }}>
                            <Grid item xs={6} sm={4} xl={3} lg={3} md={4}>
                              <Typography>
                                ECR SI.NO :{" "}
                                <span style={{ fontWeight: "bold" }}>
                                  {mstdtl.length > 0 ? mstdtl[0].ecr_no : ""}
                                </span>
                              </Typography>
                            </Grid>
                            <Grid item xs={6} sm={4} xl={3} lg={3} md={4}>
                              <Typography>
                                Description :{" "}
                                <span style={{ fontWeight: "bold" }}>
                                  {mstdtl.length > 0
                                    ? mstdtl[0].description
                                    : ""}
                                </span>
                              </Typography>
                            </Grid>
                            <Grid item xs={6} sm={4} xl={3} lg={3} md={4}>
                              <Typography>
                                Reason :{" "}
                                <span style={{ fontWeight: "bold" }}>
                                  {mstdtl.length > 0 ? mstdtl[0].reason : ""}
                                </span>
                              </Typography>
                            </Grid>
                            <Grid item xs={6} sm={4} xl={3} lg={3} md={4}>
                              <Typography>
                                Customer :{" "}
                                <span style={{ fontWeight: "bold" }}>
                                  {mstdtl.length > 0 ? mstdtl[0].Cust_Name : ""}
                                </span>
                              </Typography>
                            </Grid>
                          </Grid>
                         
                        </CardContent>
                      </Card>
                    </Box>
                  </Item>
                </Grid>
              </Grid>
              <Grid container spacing={1} xs={12}>
                <Grid xs={6} item={true}>
                  <Item style={{ backgroundColor: "#F4F4F4" }}>
                    <Box>
                      <Card raised={true} sx={app_style.cardTaskSx}>
                        <CardHeader
                          sx={{
                            backgroundColor: "#5A5A5A",
                            color: "white",
                            padding: "5px",
                          }}
                          title={
                            <Typography sx={app_style.cardHeading}>
                              Feasibility Study
                            </Typography>
                          }
                        ></CardHeader>
                        <CardContent>
                          <Table
                            bordered
                            columns={columns}
                            dataSource={data}
                            pagination={false}
                          />
                        </CardContent>
                      </Card>
                    </Box>
                  </Item>
                  <Box>
                    <Card raised={true} sx={app_style.cardTaskSx}>
                      <CardHeader
                        sx={{
                          backgroundColor: "#5A5A5A",
                          color: "white",
                          padding: "5px",
                        }}
                        title={
                          <Typography sx={app_style.cardHeading}>
                            Final Feasibility & Risk Assesment Status
                          </Typography>
                        }
                      ></CardHeader>
                      <CardContent>
                        <Stack spacing={0}>
                          <Grid container spacing={1} xs={12}>
                            <Grid xs={4} item={true}>
                              <Item
                                style={{
                                  backgroundColor: "#F4F4F4",
                                  padding: 0,
                                }}
                              >
                                <FormControl
                                  sx={{ m: 1, minWidth: 210 }}
                                  size="small"
                                >
                                  <InputLabel id="demo-select-small">
                                    Select
                                  </InputLabel>
                                  <Select
                                    required
                                    labelId="demo-select-small"
                                    id="demo-select-small"
                                    sx={{ backgroundColor: "white" }}
                                    label="Select"
                                    value={valueProcessed}
                                    onChange={handlevalueProcessed}
                                  >
                                    <MenuItem value={0}>Not Feasible</MenuItem>
                                    <MenuItem value={1}>Yes Feasible</MenuItem>
                                    <MenuItem value={2}>
                                      Feasible with changes
                                    </MenuItem>
                                  </Select>
                                </FormControl>
                              </Item>
                            </Grid>
                            <Grid xs={8} item={true}>
                              <Item
                                style={{
                                  backgroundColor: "#F4F4F4",
                                  padding: 0,
                                  textAlign: "left",
                                  paddingTop: 17,
                                }}
                              >
                                <Typography>
                                  Product can be produced as specified with no
                                  revisions.
                                </Typography>
                              </Item>
                            </Grid>
                            <Grid xs={4} item={true}>
                              <Item
                                style={{
                                  backgroundColor: "#F4F4F4",
                                  padding: 0,
                                }}
                              >
                                <FormControl
                                  sx={{ m: 1, minWidth: 210 }}
                                  size="small"
                                >
                                  <InputLabel id="demo-select-small">
                                    Select
                                  </InputLabel>
                                  <Select
                                    required
                                    labelId="demo-select-small"
                                    id="demo-select-small"
                                    sx={{ backgroundColor: "white" }}
                                    label="Select"
                                    value={changesRecon}
                                    onChange={handleChangerecon}
                                  >
                                    <MenuItem value={0}>Not Feasible</MenuItem>
                                    <MenuItem value={1}>Yes Feasible</MenuItem>
                                    <MenuItem value={2}>
                                      Feasible with changes
                                    </MenuItem>
                                  </Select>
                                </FormControl>
                              </Item>
                            </Grid>
                            <Grid xs={8} item={true}>
                              <Item
                                style={{
                                  backgroundColor: "#F4F4F4",
                                  padding: 0,
                                  textAlign: "left",
                                  paddingTop: 17,
                                }}
                              >
                                <Typography>Changes recommended</Typography>
                              </Item>
                            </Grid>
                            <Grid xs={3} item={true}>
                              <Item
                                style={{
                                  backgroundColor: "#F4F4F4",
                                  padding: 0,
                                }}
                              >
                                <FormControl
                                  sx={{ m: 1, minWidth: 210 }}
                                  size="small"
                                >
                                  <InputLabel id="demo-select-small">
                                    Select
                                  </InputLabel>
                                  <Select
                                    required
                                    labelId="demo-select-small"
                                    id="demo-select-small"
                                    sx={{ backgroundColor: "white" }}
                                    label="Select"
                                    value={emptyvalue}
                                    onChange={handleChangeEmptyHandle}
                                  >
                                    <MenuItem value={0}>Not Feasible</MenuItem>
                                    <MenuItem value={1}>Yes Feasible</MenuItem>
                                    <MenuItem value={2}>
                                      Feasible with changes
                                    </MenuItem>
                                  </Select>
                                </FormControl>
                              </Item>
                            </Grid>
                            <Grid xs={9} item={true}>
                              <Item
                                style={{
                                  backgroundColor: "#F4F4F4",
                                  padding: 0,
                                  textAlign: "right",
                                  paddingTop: 17,
                                }}
                              >
                                <Typography></Typography>
                              </Item>
                            </Grid>
                            <Grid xs={4} item={true}>
                              <Item
                                style={{
                                  backgroundColor: "#F4F4F4",
                                  padding: 0,
                                }}
                              >
                                <FormControl
                                  sx={{ m: 1, minWidth: 120 }}
                                  size="small"
                                >
                                  <InputLabel id="demo-select-small">
                                    Select
                                  </InputLabel>
                                  <Select
                                    required
                                    disabled={
                                      emptyHandle === false ? true : false
                                    }
                                    labelId="demo-select-small"
                                    id="demo-select-small"
                                    sx={{ backgroundColor: "white" }}
                                    label="Select"
                                    value={alternateOption}
                                    onChange={(e) =>
                                      setAlternateOption(e.target.value)
                                    }
                                  >
                                    <MenuItem value={1}>Yes</MenuItem>
                                    <MenuItem value={0}>No</MenuItem>
                                  </Select>
                                </FormControl>
                              </Item>
                            </Grid>
                            <Grid xs={8} item={true}>
                              <Item
                                style={{
                                  backgroundColor: "#F4F4F4",
                                  padding: 0,
                                  textAlign: "left",
                                  paddingTop: 17,
                                }}
                              >
                                <Typography color={emptyHandle ? "red" : ""}>
                                  Alternative options were explored and found to
                                  be infeasible.
                                </Typography>
                              </Item>
                            </Grid>
                            <Grid xs={4} item={true}>
                              <Item
                                style={{
                                  backgroundColor: "#F4F4F4",
                                  padding: 0,
                                }}
                              >
                                <FormControl
                                  sx={{ m: 1, minWidth: 120 }}
                                  size="small"
                                >
                                  <InputLabel id="demo-select-small">
                                    Select
                                  </InputLabel>
                                  <Select
                                    required
                                    labelId="demo-select-small"
                                    id="demo-select-small"
                                    sx={{ backgroundColor: "white" }}
                                    label="Select"
                                    value={finalStatus}
                                    onChange={(e) => {
                                      setFinalStatus(e.target.value);
                                    }}
                                  >
                                    <MenuItem value={1}>Approved</MenuItem>
                                    <MenuItem value={0}>Rejected</MenuItem>
                                  </Select>
                                </FormControl>
                              </Item>
                            </Grid>
                            <Grid xs={8} item={true}>
                              <Item
                                style={{
                                  backgroundColor: "#F4F4F4",
                                  padding: 0,
                                  textAlign: "left",
                                  paddingTop: 16,
                                }}
                              >
                                <Typography>
                                  Final Status , Risk Assesment
                                </Typography>
                              </Item>
                            </Grid>
                          </Grid>
                        </Stack>
                        <Box sx={{ textAlign: "center" }}>
                          <Tooltip
                            open={alternateOption !== 0 ? false : true}
                            onClose={true}
                            title="Must have Alternate Options"
                            placement="top"
                          >
                            <Button
                              variant="contained"
                              sx={{ m: 1 }}
                              disabled={alternateOption !== 0 ? false : true}
                              onClick={handleSubmit}
                            >
                              Submit
                            </Button>
                          </Tooltip>
                          <Popconfirm
                            title="Sure to Cancel?"
                            onConfirm={handleCancel}
                          >
                            <Button variant="contained" sx={{ m: 1 }}>
                              Cancel
                            </Button>
                          </Popconfirm>
                        </Box>
                      </CardContent>
                    </Card>
                  </Box>
                </Grid>
                <Grid xs={6} item={true}>
                  <Item style={{ backgroundColor: "#F4F4F4" }}>
                    <Box>
                      <Card raised={true} sx={app_style.cardTaskSx}>
                        <CardHeader
                          sx={{
                            backgroundColor: "#5A5A5A",
                            color: "white",
                            padding: "5px",
                          }}
                          title={
                            <Typography sx={app_style.cardHeading}>
                              Risk Assessment
                            </Typography>
                          }
                        ></CardHeader>
                        <CardContent>
                          <RiskCheckTable
                            getAssesmentData={getAssesmentData}
                            emptyAssesmentData={emptyAssesmentData}
                            setEmptyAssesmentData={setEmptyAssesmentData}
                          />
                        </CardContent>
                      </Card>
                    </Box>
                  </Item>
                </Grid>
              </Grid>
            </Stack>
          </CardContent>
        </Card>
      </Box>
      <ToastContainer />
    </Box>
  );
};

export default AssignedTask;
