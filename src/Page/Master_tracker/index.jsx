import React, { useState, useRef, useEffect, useReducer } from "react";
import { useSelector } from "react-redux";
import { app_style } from "./style";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Typography,
  TextField,
} from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Master_list_Detail from "../../Component/Master_List_Detail";
import ReportMaster from "../../Component/Master_Report";
import Cookies from "universal-cookie";
import { INITIAL_STATE, postReducer } from "../../reducers/postReducer";
import { ACTION_TYPES } from "../../reducers/postActionType";
import Paper from "@mui/material/Paper";
import * as CryptoJS from "crypto-js";
import api from "../config";
import moment from "moment";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { styled } from "@mui/material/styles";
import { Modal } from "antd";

const MasterScreen = () => {
  const cookies = new Cookies();
  const curDate = moment(new Date());

  const [isLoading, setIsLoading] = useState(false);
  const store = useSelector((state) => state.auth);
  const [reportView, setReportView] = useState(true);
  const [reportDetail, setReportDetail] = useState();
  const [isApproved, Setisapproved] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [rejrow, setRejrow] = useState([]);
  const reason = useRef(null);
  // const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [ecostatus, setecostatus] = useState(0);
  // const [ecorecord, setECORecord] = useState([]);
  const [ecodtlstate, ECOdtldispatch] = useReducer(postReducer, INITIAL_STATE);
  const [mstdtlstate, MstDtldispatch] = useReducer(postReducer, INITIAL_STATE);
  const ECODtllist =
    ecodtlstate.post && ecodtlstate.post.length > 0 && ecodtlstate.post;
  const MstDtlList =
    mstdtlstate.post && mstdtlstate.post.length > 0 && mstdtlstate.post;
  const EncecruserType = cookies.get("EcrUserType");

  const ecrusertype = CryptoJS.AES.decrypt(EncecruserType, "magna").toString(
    CryptoJS.enc.Utf8
  );

  const Item = styled(Paper)(({ theme }) => ({
    boxShadow: "none",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  const handleClickEscalation = async (row) => {
    const rowdate = row.Created_date;

    const date = rowdate !== "" && rowdate !== null ? rowdate.split("T") : "";
    const escalationdata = new FormData();

    escalationdata.append("createddate", moment(date[0]).format("DD-MMM-YYYY"));
    escalationdata.append("empname", row.Emp_Name);
    escalationdata.append("initiateby", row.Initiate_By);
    escalationdata.append("ecrno", row.ecr_no);
    escalationdata.append("custname", row.Cust_Name);
    setIsLoading(true);
    await api
      .post("api/escalationMail", escalationdata, {
        "Content-Type": "text/plain",
      })
      .then((res) => {
        if (res.data.success === true) {
          setIsLoading(false);
          toast.success("Approved and Mail Sent Successfully!!!", {
            position: toast.POSITION.BOTTOM_RIGHT,
          });
        }
      })
      .catch((err) => {
        throw err;
      });
  };

  const getMasterDetailslist = async () => {
    MstDtldispatch({ type: ACTION_TYPES.FETCH_START });
    await api
      .post("api/getMasterDetailsList")
      .then((response) => {
        const recordset = response.data;
        if (recordset.success !== false) {
          if (recordset.data.length !== 0) {
            // setData(recordset.data);
            MstDtldispatch({
              type: ACTION_TYPES.FETCH_SUCCESS,
              payload: recordset.data,
            });
          } else {
            // setData([]);
            MstDtldispatch({ type: ACTION_TYPES.FETCH_EMPTY });
          }
        } else {
          // setData([]);
          MstDtldispatch({ type: ACTION_TYPES.FETCH_EMPTY });
        }
      })
      .catch((error) => {
        MstDtldispatch({ type: ACTION_TYPES.FETCH_ERROR, payload: error });
      });
  };
  useEffect(() => {
    getMasterDetailslist();
  }, [isApproved, ecostatus]);

  async function handleClickApprove(row) {
    const rowdate = row.Created_date;

    const date = rowdate !== "" && rowdate !== null ? rowdate.split("T") : "";
    const approvedata = new FormData();
    approvedata.append("id", row.ID);
    approvedata.append("createddate", moment(date[0]).format("DD-MMM-YYYY"));
    approvedata.append("empname", row.Emp_Name);
    approvedata.append("empMail", row.Emp_Mail);
    approvedata.append("initiateby", row.Initiate_By);
    approvedata.append("ecrno", row.ecr_no);
    approvedata.append("custname", row.Cust_Name);
    approvedata.append("usertype", ecrusertype);
    approvedata.append("deptName", row.Dept_code);

    if (ecrusertype === "0") {
      approvedata.append("approvestatus", 2);
    } else if (ecrusertype === "1") {
      approvedata.append("approvestatus", 1);
    } else if (ecrusertype === "3") {
      approvedata.append("approvestatus", 5);
      approvedata.append("closedata", moment(curDate).format("YYYY-MM-DD"));
      approvedata.append("isactive", 0);
    }

    setIsLoading(true);
    await api
      .post("api/approveStatus", approvedata, {
        "Content-Type": "text/plain",
      })
      .then((response) => {
        if (response.data.success === true) {
          let idle = isApproved + 1;
          Setisapproved(idle);
          toast.success("Approved and Mail Sent Successfully!!!", {
            position: toast.POSITION.BOTTOM_RIGHT,
          });
        }
        setIsLoading(false);
      })
      .catch((error) => {
        if (error) {
          console.log(error);
        }
      });
  }

  const getEcodetails = async (row) => {
    const ecrno = row.ecr_no;
    if (ecrno !== "") {
      const getecoformdata = new FormData();
      getecoformdata.append("ecrno", ecrno);
      ECOdtldispatch({ type: ACTION_TYPES.FETCH_START });
      await api
        .post("api/getECODetails", getecoformdata, {
          "Content-Type": "text/plain",
        })
        .then((response) => {
          const recordset = response.data;
          if (recordset.success !== false) {
            if (recordset.data.length !== 0) {
              ECOdtldispatch({
                type: ACTION_TYPES.FETCH_SUCCESS,
                payload: recordset.data,
              });
            } else {
              ECOdtldispatch({ type: ACTION_TYPES.FETCH_EMPTY });
            }
          } else {
            ECOdtldispatch({ type: ACTION_TYPES.FETCH_EMPTY });
          }
        })
        .catch((error) => {
          ECOdtldispatch({ type: ACTION_TYPES.FETCH_ERROR, payload: error });
        });
    }
  };

  const handleClickRej = (row) => {
    setRejrow(row);
    setModalOpen(true);
  };

  const handleClickRejModal = async () => {
    if (reason.current.value !== "") {
      setModalOpen(false);
      let rejstatus = ecrusertype === "1" ? 3 : ecrusertype === "0" ? 4 : 6;
      let rejmaildata =
        ecrusertype === "1"
          ? "Your ECR Request has been Rejected by Change Initiator 1"
          : ecrusertype === "0"
          ? "Your ECR Request has been Rejected by Change Initiator 2"
          : "Your ECR Request has been Rejected by Change Initiator 3";
      const rowdate = rejrow.Created_date;
      const date = rowdate !== "" && rowdate !== null ? rowdate.split("T") : "";
      const rejecteddata = new FormData();
      rejecteddata.append("id", rejrow.ID);
      rejecteddata.append("createddate", moment(date[0]).format("DD-MMM-YYYY"));
      rejecteddata.append("empname", rejrow.Emp_Name);
      rejecteddata.append("ecrno", rejrow.ecr_no);
      rejecteddata.append("custname", rejrow.Cust_Name);
      rejecteddata.append("reason", reason.current.value);
      rejecteddata.append("usertype", ecrusertype);
      rejecteddata.append("deptName", rejrow.Dept_code);
      rejecteddata.append("rejectstatus", rejstatus);
      rejecteddata.append("isactive", 2);
      rejecteddata.append("maildata", rejmaildata);
      rejecteddata.append("empMail", rejrow.Emp_Mail);
      setIsLoading(true);
      await api
        .post("api/rejectedStatus", rejecteddata, {
          "Content-Type": "text/plain",
        })
        .then((response) => {
          if (response.data.success === true) {
            let idle = isApproved + 1;
            Setisapproved(idle);
            toast.success("Rejected and Mail Sent Successfully!!!", {
              position: toast.POSITION.BOTTOM_RIGHT,
            });
          }
          setIsLoading(false);
        })
        .catch((error) => {
          throw error;
        });
    } else {
      toast.error("Reason field is Mandatory!!!", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    }
  };

  const handleClickECR = (row) => {
    getEcodetails(row);
    setReportDetail(row);
    setReportView(false);
  };

  const handlecancelModal = () => {
    reason.current.value = "";
    setModalOpen(false);
  };

  const handleClickBack = () => {
    setReportView(true);
  };

  const handleEcostatus = () => {
    let status = ecostatus + 1;
    setecostatus(status);
  };

  return (
    <Box>
      {reportView ? (
        <Box sx={{ m: 3 }}>
          <Card raised={true} sx={app_style.cardSxT}>
            <CardHeader
              sx={{ backgroundColor: "#5A5A5A", color: "white" }}
              title={
                <Typography sx={app_style.cardHeading}>
                  Engineering Changes Master Tracker (Product)
                </Typography>
              }
            ></CardHeader>
            <CardContent>
              <Master_list_Detail
                handleClickEscalation={handleClickEscalation}
                handleClickECR={handleClickECR}
                handleClickApprove={handleClickApprove}
                handleClickRej={handleClickRej}
                isApproved={isApproved}
                data={MstDtlList}
                loading={loading}
              />
            </CardContent>
          </Card>
        </Box>
      ) : (
        <Box>
          <ReportMaster
            reportDetail={reportDetail}
            handleClickBack={handleClickBack}
            handleEcostatus={handleEcostatus}
            ecorecord={ECODtllist}
          />
        </Box>
      )}
      <ToastContainer />
      <Modal
        title={
          <Typography sx={{ fontWeight: "bold", fontSize: "20px" }}>
            Reason for Rejection
          </Typography>
        }
        style={{
          top: 70,
        }}
        open={modalOpen}
        onOk={handleClickRejModal}
        onCancel={handlecancelModal}
      >
        <TextField
          sx={{
            backgroundColor: "white",
            mt: 2,
            "& .MuiInputBase-input": {
              height: "50px",
              width: 430,
            },
          }}
          inputRef={reason}
          id="reason"
          placeholder="Enter Reason Here..."
          variant="outlined"
        />
      </Modal>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Box>
  );
};
export default MasterScreen;
