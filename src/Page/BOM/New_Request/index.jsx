import React, { useState, useEffect, useRef, useReducer } from "react";
import moment from "moment";
import {
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardHeader,
  FormControlLabel,
  Checkbox,
  Stack,
  TextField,
  MenuItem,
  FormControl,
  Select,
  InputLabel,
  Table,
  TableContainer,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import ReactFileReader from "react-file-reader";
import { useNavigate } from "react-router-dom";
import { app_style } from "./style";
import Paper from "@mui/material/Paper";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import EditableTable from "../../../Component/BOM_component/index";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { styled } from "@mui/material/styles";
import api from "../../config";
import background from "./img.png";
import Cookies from "universal-cookie";
import * as CryptoJS from "crypto-js";
import VerifiedIcon from "@mui/icons-material/Verified";
import Base64Downloader from "common-base64-downloader-react";
import { INITIAL_STATE, postReducer } from "../../../reducers/postReducer";
import { ACTION_TYPES } from "../../../reducers/postActionType";

const Item = styled(Paper)(({ theme }) => ({
  boxShadow: "none",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const BOMNewRequest = (props) => {
  const newDate = new Date();
  const cookies = new Cookies();

  const {
    bomMyTask = [],
    mbomMyTask = [],
    mbomAppMyTask = [],
    mbomNotMyTask = [],
    handleBack = () => {},
    tabArr,
    base64code,
  } = props;

  const [isLoading, setIsLoading] = useState(false);
  // const [userList, setUserList] = useState([]);
  const [state, dispatch] = useReducer(postReducer, INITIAL_STATE);
  const [beforepic, setBeforepic] = useState(background);
  const [checkimage, setCheckImage] = useState("data:image");
  const [tableVal, setTableVal] = useState([]);
  const [tableData, setTableData] = useState(false);
  const [retrieveEmpCode, SetretrieveEmpCode] = useState(null);
  const [insertComplete, SetinsertComplete] = useState(false);
  const userList = state.post && state.post;

  let mbomT = mbomMyTask && mbomMyTask.length > 0 && mbomMyTask[0].mbom;
  let mbomF = bomMyTask && bomMyTask.length > 0 && bomMyTask[0].mbom;
  let mbomN =
    mbomAppMyTask && mbomAppMyTask.length > 0 && mbomAppMyTask[0].mbom;
  let mbomA =
    mbomNotMyTask && mbomNotMyTask.length > 0 && mbomNotMyTask[0].mbom;

  let bomtaskinner =
    bomMyTask !== undefined && bomMyTask.length > 0
      ? bomMyTask[0].BOMInnerArr
      : "";
  let bomtask =
    bomMyTask !== undefined && bomMyTask.length > 0 ? bomMyTask[0] : "";
  let mbomtask =
    mbomMyTask !== undefined && mbomMyTask.length > 0 ? mbomMyTask[0] : "";
  let mbomApptask =
    mbomAppMyTask !== undefined && mbomAppMyTask.length > 0
      ? mbomAppMyTask[0]
      : "";
  let mbomNottask =
    mbomNotMyTask !== undefined && mbomNotMyTask.length > 0
      ? mbomNotMyTask[0]
      : "";
  const getTavVal = (data) => {
    setTableVal(data);
  };

  //engineering changes / new changes
  const [Typenewrelease, SetTypenewrelease] = useState(0);
  const [Typeecn, SetTypeECN] = useState(1);
  const [Changesnewrelease, SetChangesnewrelease] = useState(0);
  const [Changesecn, SetChangesECN] = useState(0);
  const [Engdatevalue, setEngDateValue] = useState(
    moment(newDate).format("YYYY-MM-DD")
  );

  const [initiatorEmpCode, SetInitiatorEmpCode] = useState("");

  const progName = useRef(null);
  const reason = useRef(
    bomMyTask !== undefined && bomMyTask.length > 0 ? bomMyTask[0].Reason : null
  );

  const Encemplogin = cookies.get("emp_logged");

  const Emplogin = CryptoJS.AES.decrypt(Encemplogin, "magna").toString(
    CryptoJS.enc.Utf8
  );

  const Deptlogged = cookies.get("Dept_logged");

  const DecDeptlogged = CryptoJS.AES.decrypt(Deptlogged, "magna").toString(
    CryptoJS.enc.Utf8
  );

  //M-BOm
  const [initiatorMbomEmpCode, SetInitiatorMbomEmpCode] = useState("");
  const [approverMbomEmpCode, SetApproverMbomEmpCode] = useState("E011");
  const [notificationMbomEmpCode, SetNotificationMbomEmpCode] =
    useState("E036");
  const [filename, setFileName] = useState("");

  let Encusername = cookies.get("logged_user");
  let Encdeptname = cookies.get("logged_dept");
  let Encemplogged = cookies.get("emp_logged");
  let Encempname = cookies.get("emp_Name");

  const deptname = CryptoJS.AES.decrypt(Encdeptname, "magna").toString(
    CryptoJS.enc.Utf8
  );
  const emplogged = CryptoJS.AES.decrypt(Encemplogged, "magna").toString(
    CryptoJS.enc.Utf8
  );
  const empName = CryptoJS.AES.decrypt(Encempname, "magna").toString(
    CryptoJS.enc.Utf8
  );

  //Commercial approval status
  const customerPODetails = useRef(null);
  const supplierPODetails = useRef(null);
  const cstAprvlDetails = useRef(null);

  const customerPORemarks = useRef(null);
  const supplierPORemarks = useRef(null);
  const cstAprvlRemarks = useRef(null);

  //managem
  const manage = [
    {
      id: 1,
      dept: "AGM",
      dept_code: "D0013",
      username: "",
      emp_code: "",
      accept: false,
      reject: false,
      date: moment(newDate).format("YYYY-MM-DD"),
      sign: false,
      remark: "",
    },
    {
      id: 2,
      dept: "Engineering-Management",
      dept_code: "D0014",
      username: "",
      emp_code: "",
      accept: false,
      reject: false,
      date: moment(newDate).format("YYYY-MM-DD"),
      sign: false,
      remark: "",
    },
    {
      id: 3,
      dept: "GM(ECN Only)",
      dept_code: "D0015",
      username: "",
      emp_code: "",
      accept: false,
      reject: false,
      date: moment(newDate).format("YYYY-MM-DD"),
      sign: false,
      remark: "",
    },
  ];

  const items = [
    {
      id: 1,
      dept: "Cost Controller",
      dept_code: "D0008",
      Emp_name: "",
      Emp_code: "",
      accept: false,
      reject: false,
      date: moment(newDate).format("YYYY-MM-DD"),
      sign: false,
      remark: "",
    },
    {
      id: 2,
      dept: "Production",
      dept_code: "D0003",
      Emp_name: "",
      Emp_code: "",
      accept: false,
      reject: false,
      date: moment(newDate).format("YYYY-MM-DD"),
      sign: false,
      remark: "",
    },
    {
      id: 3,
      dept: "Logistics",
      dept_code: "D0009",
      Emp_name: "",
      Emp_code: "",
      accept: false,
      reject: false,
      date: moment(newDate).format("YYYY-MM-DD"),
      sign: false,
      remark: "",
    },
    {
      id: 4,
      dept: "Planning",
      dept_code: "D0010",
      Emp_name: "",
      Emp_code: "",
      accept: false,
      reject: false,
      date: moment(newDate).format("YYYY-MM-DD"),
      sign: false,
      remark: "",
    },
    {
      id: 5,
      dept: "Purchase",
      dept_code: "D0005",
      Emp_name: "",
      Emp_code: "",
      accept: false,
      reject: false,
      date: moment(newDate).format("YYYY-MM-DD"),
      sign: false,
      remark: "",
    },
    {
      id: 6,
      dept: "Manufacturing",
      dept_code: "D0001",
      Emp_name: "",
      Emp_code: "",
      accept: false,
      reject: false,
      date: moment(newDate).format("YYYY-MM-DD"),
      sign: false,
      remark: "",
    },
    {
      id: 7,
      dept: "Maintenance",
      dept_code: "D0011",
      Emp_name: "",
      Emp_code: "",
      accept: false,
      reject: false,
      date: moment(newDate).format("YYYY-MM-DD"),
      sign: false,
      remark: "",
    },
    {
      id: 8,
      dept: "Materials (RM)",
      dept_code: "D0012",
      Emp_name: "",
      Emp_code: "",
      accept: false,
      reject: false,
      date: moment(newDate).format("YYYY-MM-DD"),
      sign: false,
      remark: "",
    },
    {
      id: 9,
      dept: "Program Management",
      dept_code: "D0007",
      Emp_name: "",
      Emp_code: "",
      accept: false,
      reject: false,
      date: moment(newDate).format("YYYY-MM-DD"),
      sign: false,
      remark: "",
    },
    {
      id: 10,
      dept: "Quality",
      dept_code: "D0004",
      Emp_name: "",
      Emp_code: "",
      accept: false,
      reject: false,
      date: moment(newDate).format("YYYY-MM-DD"),
      sign: false,
      remark: "",
    },
  ];

  const [management, SetManagement] = useState([...manage]);
  const [user, SetUser] = useState([...items]);

  const handleFilesupload = (files) => {
    // SetinsertComplete(false);
    const file = files.base64.toString();
    const checkimg = file.split("/");
    setCheckImage(checkimg[0]);
    setBeforepic(file);
    setFileName(files.fileList[0].name);
  };

  useEffect(() => {
    async function onloadFunc() {
      dispatch({ type: ACTION_TYPES.FETCH_START });
      await api
        .post("api/userMstDropDown")
        .then((response) => {
          const recordset = response.data;
          if (recordset.success !== false) {
            if (recordset.data.length !== 0) {
              dispatch({
                type: ACTION_TYPES.FETCH_SUCCESS,
                payload: recordset.data,
              });
            } else {
              dispatch({ type: ACTION_TYPES.FETCH_EMPTY });
            }
          } else {
            dispatch({ type: ACTION_TYPES.FETCH_EMPTY });
          }
        })
        .catch((error) => {
          dispatch({ type: ACTION_TYPES.FETCH_ERROR, payload: error });
        });
    }
    onloadFunc();
  }, []);

  useEffect(() => {
    bomtaskinner &&
      bomtaskinner.map((item, i) => {
        let ite = i + 1;
        let assigname = item["Dept" + ite + "Assig_Name"];
        if (assigname !== undefined) {
          let Empcode;
          Empcode = assigname;
          SetretrieveEmpCode(Empcode);
        }
      });
  }, [bomMyTask]);

  const handleCheckboxAcceptChange = (id) => (event) => {
    SetManagement((prevData) =>
      prevData.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            reject: false,
            accept: event.target.checked,
          };
        }
        return item;
      })
    );
  };

  const handleAcceptUser = (id) => (e) => {
    SetUser((prevData) =>
      prevData.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            reject: false,
            accept: e.target.checked,
          };
        }
        return item;
      })
    );
  };
  const handleRejectUSer = (id) => (e) => {
    SetUser((prevData) =>
      prevData.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            accept: false,
            reject: e.target.checked,
          };
        }
        return item;
      })
    );
  };
  const handleCheckboxRejectChange = (id) => (event) => {
    SetManagement((prevData) =>
      prevData.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            accept: false,
            reject: event.target.checked,
          };
        }
        return item;
      })
    );
  };

  const handleManagementName = (id) => (e, string) => {
    SetManagement((prevData) =>
      prevData.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            emp_code: e.target.value,
            username: string.props.children,
          };
        }
        return item;
      })
    );
  };

  const handleUserName = (id) => (e, string) => {
    SetUser((prevData) =>
      prevData.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            Emp_code: e.target.value,
            Emp_name: string.props.children,
          };
        }
        return item;
      })
    );
  };

  const handleManageRemark = (id) => (e) => {
    SetManagement((prevData) =>
      prevData.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            remark: e.target.value,
          };
        }
        return item;
      })
    );
  };

  const handleUserRemark = (id) => (e) => {
    SetUser((prevData) =>
      prevData.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            remark: e.target.value,
          };
        }
        return item;
      })
    );
  };

  const handleCheckManageSign = (id) => (e) => {
    SetManagement((prevData) =>
      prevData.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            sign: e.target.checked,
          };
        }
        return item;
      })
    );
  };

  const handleSignUser = (id) => (e) => {
    SetUser((prevData) =>
      prevData.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            sign: e.target.checked,
          };
        }
        return item;
      })
    );
  };

  const handleManageCancel = (id) => {
    // const resetfield = management.map((item) =>
    //   item.id === id
    //     ? { ...item, accept: false, reject: false, remark: "", sign: false }
    //     : item
    // );
    // SetManagement(resetfield);
  };
  const handleManageSubmit = async (id) => {
    const returndata = management.map((data) => {
      if (data.id === id) {
        return data;
      }
    });
    let mstid = bomMyTask.length > 0 && bomMyTask ? bomMyTask[0].Mst_Id : "";
    let bomType = bomMyTask.length > 0 && bomMyTask && bomMyTask[0].BOM_Type;
    let program = bomMyTask.length > 0 && bomMyTask && bomMyTask[0].Program;
    let bomno = bomMyTask.length > 0 && bomMyTask && bomMyTask[0].bom_no;
    let createdate =
      bomMyTask.length > 0 && bomMyTask && bomMyTask[0].Request_Date;
    let createdby =
      bomMyTask.length > 0 && bomMyTask && bomMyTask[0].Created_By;
    const i = id - 1;
    if (returndata.length > 0) {
      if (
        returndata[i].remark !== null &&
        returndata[i].remark !== "" &&
        returndata[i].sign !== false &&
        (returndata[i].accept !== false || returndata[i].reject !== false)
      ) {
        const formdata = new FormData();
        formdata.append("ID", id);
        formdata.append("MstId", mstid);
        formdata.append("date", moment(newDate).format("YYYY-MM-DD"));
        formdata.append("remark", returndata[i].remark);
        formdata.append("bomType", bomType);
        formdata.append("program", program);
        formdata.append("bomno", bomno);
        formdata.append("createdate", createdate);
        formdata.append("createdby", createdby);

        if (returndata[i].sign === 1) {
          formdata.append("sign", "1");
        } else if (returndata[i].sign === 0) {
          formdata.append("sign", "0");
        }

        if (returndata[i].accept === true) {
          formdata.append("status", "1");
        } else if (returndata[i].reject === true) {
          formdata.append("status", "2");
        }
        try {
          setIsLoading(true);
          await api
            .post("api/insertManagementApproval", formdata, {
              "Content-Type": "text/plain",
            })
            .then((res) => {
              if (res !== undefined && res !== null && res !== "") {
                let record = res.data;
                toast.success("Submitted Successfully", {
                  position: toast.POSITION.BOTTOM_RIGHT,
                });
                const resetfield = user.map((item) =>
                  item.id === id
                    ? {
                        ...item,
                        accept: false,
                        reject: false,
                        remark: "",
                        sign: false,
                      }
                    : item
                );
                setIsLoading(false);
                SetManagement(resetfield);
                handleBack();
              }
            });
        } catch (err) {
          if (err) {
            toast.error("Something Went Wrong, Please Try Again!!!", {
              position: toast.POSITION.BOTTOM_RIGHT,
            });
          }
        }
      } else {
        toast.error("Field is Empty!!!", {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      }
    }
  };
  const handleUserSubmit = async (id) => {
    const returndata = user.map((data) => {
      if (data.id === id) {
        return data;
      }
    });
    let mstid = bomMyTask.length > 0 && bomMyTask && bomMyTask[0].Mst_Id;
    let bomno = bomMyTask.length > 0 && bomMyTask && bomMyTask[0].bom_no;
    let createdate =
      bomMyTask.length > 0 && bomMyTask && bomMyTask[0].Request_Date;
    let date = createdate.split("T");
    let Createdby =
      bomMyTask.length > 0 && bomMyTask && bomMyTask[0].Initiator_Name;
    let reason = bomMyTask.length > 0 && bomMyTask && bomMyTask[0].Reason;
    let program = bomMyTask.length > 0 && bomMyTask && bomMyTask[0].Program;
    let bomType = bomMyTask.length > 0 && bomMyTask && bomMyTask[0].BOM_Type;
    const i = id - 1;
    if (returndata.length > 0) {
      if (
        returndata[i].remark !== null &&
        returndata[i].remark !== "" &&
        returndata[i].sign !== false &&
        (returndata[i].accept !== false || returndata[i].reject !== false) &&
        mstid !== ""
      ) {
        const formdata = new FormData();
        formdata.append("ID", id);
        formdata.append("MstId", mstid);
        formdata.append("date", moment(newDate).format("YYYY-MM-DD"));
        formdata.append("remark", returndata[i].remark);
        formdata.append("bomno", bomno);
        formdata.append("createddate", date[0]);
        formdata.append("Createdby", Createdby);
        formdata.append("reason", reason);
        formdata.append("program", program);
        formdata.append("bomType", bomType);

        if (returndata[i].sign === 1) {
          formdata.append("sign", "1");
        } else if (returndata[i].sign === 0) {
          formdata.append("sign", "0");
        }

        if (returndata[i].accept === true) {
          formdata.append("status", "1");
        } else if (returndata[i].reject === true) {
          formdata.append("status", "2");
        }
        setIsLoading(true);
        try {
          await api
            .post("api/insertUserApproval", formdata, {
              "Content-Type": "text/plain",
            })
            .then((res) => {
              if (res !== undefined && res !== null && res !== "") {
                let record = res.data;
                toast.success("Submitted Successfully", {
                  position: toast.POSITION.BOTTOM_RIGHT,
                });
                const resetfield = user.map((item) =>
                  item.id === id
                    ? {
                        ...item,
                        accept: false,
                        reject: false,
                        remark: "",
                        sign: false,
                      }
                    : item
                );
                setIsLoading(false);
                SetUser(resetfield);

                handleBack();
              }
            });
        } catch (err) {
          if (err) {
            toast.error("Something Went Wrong, Please Try Again!!!", {
              position: toast.POSITION.BOTTOM_RIGHT,
            });
          }
        }
      } else {
        toast.error("Field is Empty!!!", {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      }
    }
  };
  const handleUserCancel = (id) => {
    const resetfield = user.map((item) =>
      item.id === id
        ? { ...item, accept: false, reject: false, remark: "", sign: false }
        : item
    );
    SetUser(resetfield);
  };

  const handleApproveMBOM = async () => {
    const bomno =
      mbomAppMyTask && mbomAppMyTask.length > 0 && mbomAppMyTask[0].bom_no;
    let date =
      mbomAppMyTask &&
      mbomAppMyTask.length > 0 &&
      mbomAppMyTask[0].Request_Date;
    const reqdate = date.split("T");
    const mstid =
      mbomAppMyTask && mbomAppMyTask.length > 0 && mbomAppMyTask[0].Mst_Id;

    const formdata = new FormData();
    formdata.append("bomno", bomno);
    formdata.append("reqdate", reqdate[0]);
    formdata.append("mstid", mstid);
    formdata.append("notmbom", notificationMbomEmpCode);
    formdata.append("notmbomappr", approverMbomEmpCode);
    setIsLoading(true);
    await api
      .post("api/updateApproveMBOM", formdata, {
        "Content-Type": "text/plain",
      })
      .then((res) => {
        if (res !== undefined && res !== null) {
          const recordset = res.data;
          if (recordset.success === true) {
            setIsLoading(false);
            handleBack();
            toast.success(recordset.message, {
              position: toast.POSITION.BOTTOM_RIGHT,
            });
          }
        } else {
          toast.error("Request Failed... Please Try Again!!!", {
            position: toast.POSITION.BOTTOM_RIGHT,
          });
        }
      })
      .catch((err) => {
        console.log(err, "------while approve the mbom");
        throw err;
      });
  };
  const handleRejectMBOM = async () => {
    const bomno =
      mbomAppMyTask && mbomAppMyTask.length > 0 && mbomAppMyTask[0].bom_no;
    let date =
      mbomAppMyTask &&
      mbomAppMyTask.length > 0 &&
      mbomAppMyTask[0].Request_Date;
    const reqdate = date.split("T");
    const mstid =
      mbomAppMyTask && mbomAppMyTask.length > 0 && mbomAppMyTask[0].Mst_Id;
    const initmbom =
      mbomAppMyTask &&
      mbomAppMyTask.length > 0 &&
      mbomAppMyTask[0].Int_MBOM_Appvl;
    const formdata = new FormData();
    formdata.append("bomno", bomno);
    formdata.append("reqdate", reqdate[0]);
    formdata.append("mstid", mstid);
    formdata.append("initmbom", initmbom);
    formdata.append("notmbomappr", approverMbomEmpCode);
    setIsLoading(true);
    await api
      .post("api/updateRejectMBOM", formdata, {
        "Content-Type": "text/plain",
      })
      .then((res) => {
        if (res !== undefined && res !== null) {
          const recordset = res.data;
          if (recordset.success === true) {
            setIsLoading(false);
            handleBack();
            toast.success(recordset.message, {
              position: toast.POSITION.BOTTOM_RIGHT,
            });
          }
        } else {
          toast.error("Request Failed... Please Try Again!!!", {
            position: toast.POSITION.BOTTOM_RIGHT,
          });
        }
      })
      .catch((err) => {
        console.log(err, "------while reject the mbom");
        throw err;
      });
  };
  const handleSave = async () => {
    if (filename !== "") {
      const mstid = mbomMyTask && mbomMyTask.length > 0 && mbomMyTask[0].Mst_Id;
      let date =
        mbomMyTask && mbomMyTask.length > 0 && mbomMyTask[0].Request_Date;
      const createdby =
        mbomMyTask && mbomMyTask.length > 0 && mbomMyTask[0].Initiator_Name;
      const mbomapprover =
        mbomMyTask && mbomMyTask.length > 0 && mbomMyTask[0].Int_MBOM_Appvl;
      const bomno = mbomMyTask && mbomMyTask.length > 0 && mbomMyTask[0].bom_no;
      const reqdate = date.split("T");
      let type = filename && filename.split(".");

      const formdata = new FormData();
      formdata.append("picture", beforepic);
      formdata.append("mstid", mstid);
      formdata.append("reqdate", reqdate[0]);
      formdata.append("createdby", createdby);
      formdata.append("createddate", moment(newDate).format("YYYY-MM-DD"));
      formdata.append("type", type[1]);
      formdata.append("mbomapprover", mbomapprover);
      formdata.append("bomno", bomno);
      setIsLoading(true);
      await api
        .post("api/insertMBOMDoc", formdata, {
          "Content-Type": "text/plain",
        })
        .then((res) => {
          if (res !== undefined && res !== null) {
            const recordset = res.data;
            if (recordset.success === true) {
              setIsLoading(false);
              setFileName("");
              setBeforepic("");
              handleBack();
              toast.success(recordset.message, {
                position: toast.POSITION.BOTTOM_RIGHT,
              });
            }
          } else {
            toast.error("Request Failed... Please Try Again!!!", {
              position: toast.POSITION.BOTTOM_RIGHT,
            });
          }
        })
        .catch((err) => {
          console.log(err, "------while insert the mbom file");
          throw err;
        });
    } else {
      toast.error("M-BOM File is Mandatory!", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    }
  };

  const handleSubmit = async () => {
    if (
      (Typenewrelease !== 0 || Typeecn !== 0) &&
      (Changesnewrelease !== 0 || Changesecn !== 0) &&
      initiatorEmpCode !== "" &&
      progName.current.value !== ""
    ) {
      if ((Typeecn === 1 && reason.current.value !== "") || Typeecn === 0) {
        if (
          (Typeecn === 1 &&
            customerPODetails.current.value !== "" &&
            supplierPODetails.current.value !== "" &&
            cstAprvlDetails.current.value !== "" &&
            customerPORemarks.current.value !== "" &&
            supplierPORemarks.current.value !== "" &&
            cstAprvlRemarks.current.value !== "") ||
          (Typeecn === 0 &&
            (customerPODetails.current.value === "" ||
              customerPODetails.current.value !== "") &&
            (supplierPODetails.current.value === "" ||
              supplierPODetails.current.value !== "") &&
            (cstAprvlDetails.current.value === "" ||
              cstAprvlDetails.current.value !== "") &&
            (customerPORemarks.current.value === "" ||
              customerPORemarks.current.value !== "") &&
            (supplierPORemarks.current.value === "" ||
              supplierPORemarks.current.value !== "") &&
            (cstAprvlRemarks.current.value === "" ||
              cstAprvlRemarks.current.value !== ""))
        ) {
          if (
            initiatorMbomEmpCode !== "" &&
            approverMbomEmpCode !== "" &&
            notificationMbomEmpCode !== ""
            // filename !== ""
          ) {
            let managename = {
              Dept11Assig_Name: "",
              Dept12Assig_Name: "",
              Dept13Assig_Name: "",
            };
            let username = {
              Dept1Assig_Name: "",
              Dept2Assig_Name: "",
              Dept3Assig_Name: "",
              Dept4Assig_Name: "",
              Dept5Assig_Name: "",
              Dept6Assig_Name: "",
              Dept7Assig_Name: "",
              Dept8Assig_Name: "",
              Dept9Assig_Name: "",
              Dept10Assig_Name: "",
            };
            let usernamearr = [];
            user.map((item, i) => {
              if (item.Emp_code !== "") {
                let ite = i + 1;
                if (item.id === ite) {
                  let deptname = `Dept${ite}Assig_Name`;
                  username[deptname] = item.Emp_code;
                  usernamearr.push({
                    mail: item.Emp_code,
                  });
                  console.log(username);
                }
              }
              return;
            });

            management.map((item, i) => {
              if (
                (Typenewrelease === 1 &&
                  item.emp_code !== "" &&
                  (i === 0 || i === 1)) ||
                (Typenewrelease === 1 && item.emp_code === "" && i === 2) ||
                (item.emp_code !== "" &&
                  (i === 0 || i === 1 || i === 2) &&
                  Typeecn === 1)
              ) {
                let iteration = i + 11;
                let ite = i + 1;
                let deptname;
                if (item.id === ite) {
                  if (Typenewrelease === 1) {
                    if (ite === 1 || ite === 2) {
                      deptname = `Dept${iteration}Assig_Name`;
                      managename[deptname] = item.emp_code;
                    } else if (ite === 3) {
                      deptname = `Dept13Assig_Name`;
                      managename[deptname] = "null";
                    }
                  } else {
                    deptname = `Dept${iteration}Assig_Name`;
                    managename[deptname] = item.emp_code;
                  }
                }
              }
              return;
            });
            let manageobjkeys = Object.keys(managename);
            let unameobjkeys = Object.keys(username);
            let mnamelength = 0;
            let unamelength = 0;

            for (let i = 0; i < manageobjkeys.length; i++) {
              let key = manageobjkeys[i];
              if (managename[key] !== "") {
                mnamelength = mnamelength + 1;
              }
            }
            for (let i = 0; i < unameobjkeys.length; i++) {
              let key = unameobjkeys[i];
              if (username[key] !== "") {
                unamelength = unamelength + 1;
              }
            }

            if (unamelength === 10 && mnamelength === 3) {
              if (
                tableVal !== undefined &&
                tableVal !== "" &&
                tableVal.length > 0
              ) {
                let checkNumberTable = 0;

                tableVal.map((item, i) => {
                  if (
                    typeof parseInt(item.partno) === "number" &&
                    !isNaN(item.partno) &&
                    typeof parseInt(item.partno2) === "number" &&
                    !isNaN(item.partno2)
                  ) {
                    checkNumberTable = checkNumberTable + 1;
                  } else {
                    checkNumberTable = 0;
                  }
                });

                if (checkNumberTable === tableVal.length) {
                  setIsLoading(true);
                  const revisionData = [...tableVal];
                  const formdata = new FormData();
                  formdata.append(
                    "reqdate",
                    moment(Engdatevalue).format("YYYY-MM-DD")
                  );
                  formdata.append(
                    "createddate",
                    moment(newDate).format("YYYY-MM-DD")
                  );
                  if (Typenewrelease === 1) {
                    formdata.append("bomtype", 0);
                  } else if (Typeecn === 1) {
                    formdata.append("bomtype", 1);
                  }
                  if (Changesnewrelease === 1) {
                    formdata.append("bomchanges", 0);
                  } else if (Changesecn === 1) {
                    formdata.append("bomchanges", 1);
                  }

                  formdata.append("program", progName.current.value);
                  formdata.append("createdby", Emplogin);

                  if (Typeecn === 1) {
                    formdata.append("reason", reason.current.value);
                    formdata.append(
                      "customerPODet",
                      customerPODetails.current.value
                    );
                    formdata.append(
                      "customerPORemrk",
                      customerPORemarks.current.value
                    );
                    formdata.append(
                      "supplierPODtl",
                      supplierPODetails.current.value
                    );
                    formdata.append(
                      "supplierPORemrk",
                      supplierPORemarks.current.value
                    );
                    formdata.append(
                      "cstapprvlDtl",
                      cstAprvlDetails.current.value
                    );
                    formdata.append(
                      "cstapprvlRemrk",
                      cstAprvlRemarks.current.value
                    );
                  }

                  formdata.append("iniapprvl", initiatorMbomEmpCode);
                  formdata.append("appapprvl", approverMbomEmpCode);
                  formdata.append("notapprvl", notificationMbomEmpCode);

                  formdata.append("tabledata", JSON.stringify(revisionData));

                  formdata.append("managename", JSON.stringify(managename));
                  formdata.append("username", JSON.stringify(username));

                  formdata.append("usernamearr", JSON.stringify(usernamearr));
                  formdata.append("deptname", deptname);
                  formdata.append("emplogged", empName);

                  await api
                    .post("api/insertBOMRequestDetails", formdata, {
                      "Content-Type": "text/plain",
                    })
                    .then((res) => {
                      if (res !== undefined && res !== null) {
                        setIsLoading(false);
                        const recordset = res.data;
                        if (recordset.success === true) {
                          toast.success("Request Submitted Successfuly!", {
                            position: toast.POSITION.BOTTOM_RIGHT,
                          });
                          setEngDateValue(moment(newDate).format("YYYY-MM-DD"));
                          SetInitiatorEmpCode("");

                          SetChangesnewrelease(0);
                          SetChangesECN(0);
                          if (Typeecn === 1) {
                            customerPODetails.current.value = "";
                            customerPORemarks.current.value = "";
                            supplierPODetails.current.value = "";
                            supplierPORemarks.current.value = "";
                            cstAprvlDetails.current.value = "";
                            cstAprvlRemarks.current.value = "";
                            reason.current.value = "";
                          }

                          progName.current.value = "";
                          setTableVal("");
                          SetInitiatorMbomEmpCode("");
                          setTableData(tableData ? false : true);
                          setBeforepic(background);
                          SetinsertComplete(true);
                          SetUser((prevData) =>
                            prevData.map((item) => {
                              return {
                                ...item,
                                Emp_code: "",
                                Emp_name: "",
                              };
                            })
                          );
                          SetManagement((prevData) =>
                            prevData.map((item) => {
                              return {
                                ...item,
                                emp_code: "",
                                username: "",
                              };
                            })
                          );
                          SetTypenewrelease(0);
                          SetTypeECN(1);
                        }
                      } else {
                        toast.error("Request Failed... Please Try Again!!!", {
                          position: toast.POSITION.BOTTOM_RIGHT,
                        });
                      }
                    });
                } else {
                  toast.error("Part Number Must be in Number!", {
                    position: toast.POSITION.BOTTOM_RIGHT,
                  });
                }
              } else {
                toast.error("Material Description is Mandatory!", {
                  position: toast.POSITION.BOTTOM_RIGHT,
                });
              }
            } else {
              toast.error(
                "Name Field is Mandatory in Feasibility & Risk Assessment and Management Approval!",
                {
                  position: toast.POSITION.BOTTOM_RIGHT,
                }
              );
            }
          } else {
            toast.error("MBOM is  Mandatory!", {
              position: toast.POSITION.BOTTOM_RIGHT,
            });
          }
        } else {
          toast.error("Commercial Approval Status is  Mandatory!", {
            position: toast.POSITION.BOTTOM_RIGHT,
          });
        }
      } else {
        toast.error("Reason Field is  Mandatory!", {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      }
    } else {
      toast.error("Engineering Changes Mandatory!", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    }
  };

  const handleCancel = () => {
    setEngDateValue(moment(newDate).format("YYYY-MM-DD"));
    SetInitiatorEmpCode("");
    SetChangesnewrelease(0);
    SetChangesECN(0);
    if (Typeecn === 1) {
      customerPODetails.current.value = "";
      customerPORemarks.current.value = "";
      supplierPODetails.current.value = "";
      supplierPORemarks.current.value = "";
      cstAprvlDetails.current.value = "";
      cstAprvlRemarks.current.value = "";
      reason.current.value = "";
    }

    progName.current.value = "";
    setTableVal("");
    SetInitiatorMbomEmpCode("");
    setTableData(tableData ? false : true);
    setBeforepic(background);
    SetinsertComplete(true);
    SetUser((prevData) =>
      prevData.map((item) => {
        return {
          ...item,
          Emp_code: "",
          Emp_name: "",
        };
      })
    );
    SetManagement((prevData) =>
      prevData.map((item) => {
        return {
          ...item,
          emp_code: "",
          username: "",
        };
      })
    );
    SetTypenewrelease(0);
    SetTypeECN(1);
    toast.success("Data has been cleared...", {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
  };

  return (
    <Box>
      <Box sx={{ m: 3 }}>
        <Card raised={true} sx={{ backgroundColor: "#2E3B55", color: "white" }}>
          <Grid container xl={12}>
            <Grid
              xl={0.01}
              item={true}
              style={{
                display:
                  bomMyTask.length > 0 ||
                  mbomMyTask.length > 0 ||
                  mbomAppMyTask.length > 0 ||
                  mbomNotMyTask.length > 0
                    ? "block"
                    : "none",
              }}
            >
              <Button
                variant="contained"
                color="success"
                sx={{
                  m: 2,
                }}
                onClick={() => {
                  handleBack();
                }}
              >
                Back
              </Button>
            </Grid>
            <Grid xl={11.99} item={true}>
              <Typography variant="h6" align="center" sx={{ m: 2 }}>
                {mbomT === "true"
                  ? "MBOM Change Request"
                  : mbomN === "nuetral"
                  ? "MBOM Approver"
                  : "BOM Change Request"}
              </Typography>
            </Grid>
          </Grid>
        </Card>
        <Box
          sx={{ flexGrow: 1, mt: 2 }}
          style={{ display: mbomA === "add" ? "none" : "block" }}
        >
          <Card raised={true} sx={app_style.cardSx}>
            <CardHeader
              sx={{ backgroundColor: "#5A5A5A", color: "white" }}
              title={
                <Typography sx={app_style.cardHeading1}>
                  Engineering Changes / New Releases
                </Typography>
              }
            ></CardHeader>
            <CardContent>
              <Stack spacing={2}>
                <Grid container spacing={2}>
                  <Grid
                    item
                    xl={Typeecn === 1 ? 2.8 : 3.3}
                    lg={Typeecn === 1 ? 2.8 : 3.3}
                    md={4}
                    xs={12}
                    sm={4}
                  >
                    <Typography sx={{ m: 1, fontSize: 14 }}>Type</Typography>
                    <Card sx={{ width: "280px", height: "50px" }}>
                      <CardContent style={{ display: "flex" }}>
                        <Grid xs={8} item={true} sx={{ mt: -2.6 }}>
                          <Item>
                            {(bomMyTask.length > 0 && bomMyTask) ||
                            (mbomMyTask.length > 0 && mbomMyTask) ||
                            (mbomAppMyTask.length > 0 && mbomAppMyTask) ? (
                              <FormControlLabel
                                label="New Release"
                                style={{
                                  pointerEvents: "none",
                                  cursor: "not-allowed",
                                }}
                                control={
                                  <Checkbox
                                    checked={
                                      mbomT === "true"
                                        ? mbomtask.BOM_Type === 0
                                          ? 1
                                          : 0
                                        : mbomN === "nuetral"
                                        ? mbomApptask.BOM_Type === 0
                                          ? 1
                                          : 0
                                        : bomtask.BOM_Type === 0
                                        ? 1
                                        : 0
                                    }
                                  />
                                }
                              />
                            ) : (
                              <FormControlLabel
                                label="New Release"
                                onClick={(e) => {
                                  SetTypeECN(0);

                                  SetTypenewrelease(e.target.checked ? 1 : 0);
                                }}
                                control={<Checkbox checked={Typenewrelease} />}
                              />
                            )}
                          </Item>
                        </Grid>
                        <Grid xs={2} item={true} sx={{ mt: -1 }}>
                          <Item>
                            {(bomMyTask.length > 0 && bomMyTask) ||
                            (mbomMyTask.length > 0 && mbomMyTask) ||
                            (mbomAppMyTask.length > 0 && mbomAppMyTask) ? (
                              <FormControlLabel
                                sx={{ mt: -1.5 }}
                                label="ECN"
                                style={{
                                  pointerEvents: "none",
                                  cursor: "not-allowed",
                                }}
                                control={
                                  <Checkbox
                                    checked={
                                      mbomT === "true"
                                        ? mbomtask.BOM_Type === 1
                                          ? 1
                                          : 0
                                        : mbomN === "nuetral"
                                        ? mbomApptask.BOM_Type === 1
                                          ? 1
                                          : 0
                                        : bomtask.BOM_Type === 1
                                        ? 1
                                        : 0
                                    }
                                  />
                                }
                              />
                            ) : (
                              <FormControlLabel
                                sx={{ mt: -1.5 }}
                                label="ECN"
                                onClick={(e) => {
                                  SetTypenewrelease(0);

                                  SetTypeECN(e.target.checked ? 1 : 0);
                                }}
                                control={<Checkbox checked={Typeecn} />}
                              />
                            )}
                          </Item>
                        </Grid>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid
                    item
                    xl={Typeecn === 1 ? 2.9 : 3.4}
                    lg={Typeecn === 1 ? 2.9 : 3.4}
                    md={4}
                    xs={12}
                    sm={4}
                  >
                    <Typography sx={{ m: 1, fontSize: 14 }}>
                      Changes In
                    </Typography>

                    <Card sx={{ width: "280px", ml: 1, mt: 1, height: "48px" }}>
                      <CardContent style={{ display: "flex" }}>
                        <Grid xs={7.8} item={true} sx={{ mt: -1 }}>
                          <Item>
                            {(bomMyTask.length > 0 && bomMyTask) ||
                            (mbomMyTask.length > 0 && mbomMyTask) ||
                            (mbomAppMyTask.length > 0 && mbomAppMyTask) ? (
                              <FormControlLabel
                                sx={{ mt: -1.5 }}
                                label="Child Parts"
                                style={{
                                  pointerEvents: "none",
                                  cursor: "not-allowed",
                                }}
                                control={
                                  <Checkbox
                                    checked={
                                      mbomT === "true"
                                        ? mbomtask.BOM_Type === 0
                                          ? 1
                                          : 0
                                        : mbomN === "nuetral"
                                        ? mbomApptask.BOM_Type === 0
                                          ? 1
                                          : 0
                                        : bomtask.BOM_Type === 0
                                        ? 1
                                        : 0
                                    }
                                  />
                                }
                              />
                            ) : (
                              <FormControlLabel
                                sx={{ mt: -1.5 }}
                                label="Child Parts"
                                onClick={(e) => {
                                  SetChangesECN(0);

                                  SetChangesnewrelease(
                                    e.target.checked ? 1 : 0
                                  );
                                }}
                                control={
                                  <Checkbox checked={Changesnewrelease} />
                                }
                              />
                            )}
                          </Item>
                        </Grid>
                        <Grid xs={0.3} item={true} sx={{ mt: -1 }}>
                          <Item>
                            {(bomMyTask.length > 0 && bomMyTask) ||
                            (mbomMyTask.length > 0 && mbomMyTask) ||
                            (mbomAppMyTask.length > 0 && mbomAppMyTask) ? (
                              <FormControlLabel
                                sx={{ mt: -1.5 }}
                                label="FG"
                                style={{
                                  pointerEvents: "none",
                                  cursor: "not-allowed",
                                }}
                                control={
                                  <Checkbox
                                    checked={
                                      mbomT === "true"
                                        ? mbomtask.BOM_Type === 1
                                          ? 1
                                          : 0
                                        : mbomN === "nuetral"
                                        ? mbomApptask.BOM_Type === 1
                                          ? 1
                                          : 0
                                        : bomtask.BOM_Type === 1
                                        ? 1
                                        : 0
                                    }
                                  />
                                }
                              />
                            ) : (
                              <FormControlLabel
                                sx={{ mt: -1.5 }}
                                label="FG"
                                onClick={(e) => {
                                  SetChangesnewrelease(0);
                                  SetChangesECN(e.target.checked ? 1 : 0);
                                }}
                                control={<Checkbox checked={Changesecn} />}
                              />
                            )}
                          </Item>
                        </Grid>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid
                    item
                    xl={Typeecn === 1 ? 1.8 : 2.4}
                    lg={Typeecn === 1 ? 1.8 : 2.4}
                    md={4}
                    xs={12}
                    sm={4}
                  >
                    <Typography sx={{ m: 1, fontSize: 14 }}>
                      Initiator Name
                    </Typography>
                    {(bomMyTask && bomMyTask[0]) ||
                    (mbomMyTask && mbomMyTask[0]) ||
                    (mbomAppMyTask && mbomAppMyTask[0]) ? (
                      <FormControl size="small">
                        <InputLabel>Initiator Name</InputLabel>
                        <Select
                          required
                          label="Initiator Name"
                          sx={{
                            backgroundColor: "white",
                            width: 180,
                            height: "45px",
                          }}
                          style={{
                            pointerEvents: "none",
                            cursor: "not-allowed",
                          }}
                          value={
                            mbomT === "true"
                              ? mbomMyTask[0].Initiator_Name
                              : mbomN === "nuetral"
                              ? mbomAppMyTask[0].Initiator_Name
                              : bomMyTask[0].Initiator_Name
                          }
                        >
                          {userList.map((user, index) => {
                            return (
                              <MenuItem key={index} value={user.Emp_Code}>
                                {user.Emp_Name}
                              </MenuItem>
                            );
                          })}
                        </Select>
                      </FormControl>
                    ) : (
                      <FormControl size="small">
                        <InputLabel>Initiator Name</InputLabel>
                        <Select
                          required
                          label="Initiator Name"
                          sx={{
                            backgroundColor: "white",
                            width: 180,
                            height: "45px",
                          }}
                          value={initiatorEmpCode}
                          onChange={(e, string) => {
                            SetInitiatorEmpCode(e.target.value);
                          }}
                        >
                          {userList.map((user, index) => {
                            if (user.Emp_Code === emplogged) {
                              return (
                                <MenuItem key={index} value={user.Emp_Code}>
                                  {user.Emp_Name}
                                </MenuItem>
                              );
                            }
                          })}
                        </Select>
                      </FormControl>
                    )}
                  </Grid>
                  <Grid
                    item
                    xl={Typeecn === 1 ? 1.9 : 2.4}
                    lg={Typeecn === 1 ? 1.9 : 2.4}
                    md={4}
                    xs={12}
                    sm={4}
                  >
                    <Typography sx={{ m: 1, fontSize: 14 }}>Program</Typography>

                    <Item style={{ backgroundColor: "#F4F4F4" }}>
                      {(bomMyTask.length > 0 && bomMyTask) ||
                      (mbomMyTask.length > 0 && mbomMyTask) ||
                      (mbomAppMyTask.length > 0 && mbomAppMyTask) ? (
                        <TextField
                          sx={{
                            backgroundColor: "white",
                            mt: -1,
                            "& .MuiInputBase-input": {
                              height: "15px",
                              width: 170,
                            },
                          }}
                          style={{
                            pointerEvents: "none",
                            cursor: "not-allowed",
                          }}
                          type="text"
                          value={
                            mbomT === "true"
                              ? mbomMyTask[0].Program
                              : mbomN === "nuetral"
                              ? mbomAppMyTask[0].Program
                              : bomMyTask[0].Program
                          }
                        />
                      ) : (
                        <TextField
                          sx={{
                            backgroundColor: "white",
                            mt: -1,
                            "& .MuiInputBase-input": {
                              height: "15px",
                              width: 170,
                            },
                          }}
                          inputRef={progName}
                          id="outlined-multiline-static"
                          placeholder="Enter Program Here..."
                          variant="outlined"
                        />
                      )}
                    </Item>
                  </Grid>
                  {Typeecn === 1 ? (
                    <Grid
                      item
                      xl={Typeecn === 1 ? 2.6 : 0}
                      lg={Typeecn === 1 ? 2.6 : 0}
                      md={4}
                      xs={12}
                      sm={4}
                      style={{
                        display:
                          Typenewrelease === 1 ||
                          (mbomT === "true"
                            ? mbomMyTask &&
                              mbomMyTask[0] &&
                              mbomMyTask[0].BOM_Type === 0
                            : mbomN === "nuetral"
                            ? mbomAppMyTask &&
                              mbomAppMyTask[0] &&
                              mbomAppMyTask[0].BOM_Type === 0
                            : bomMyTask &&
                              bomMyTask[0] &&
                              bomMyTask[0].BOM_Type === 0)
                            ? "none"
                            : "block",
                      }}
                    >
                      <Typography sx={{ m: 1, fontSize: 14 }}>
                        Reason for Changes
                      </Typography>

                      <Item
                        style={{ backgroundColor: "#F4F4F4" }}
                        sx={{ mt: -1 }}
                      >
                        {(bomMyTask.length > 0 && bomMyTask) ||
                        (mbomMyTask.length > 0 && mbomMyTask) ||
                        (mbomAppMyTask.length > 0 && mbomAppMyTask) ? (
                          <TextField
                            sx={{
                              backgroundColor: "white",
                              fontSize: 14,
                              width: 220,
                              height: "50px",
                            }}
                            style={{
                              pointerEvents: "none",
                              cursor: "not-allowed",
                            }}
                            type="text"
                            value={
                              mbomT === "true"
                                ? mbomMyTask[0].Reason
                                : mbomN === "nuetral"
                                ? mbomAppMyTask[0].Reason
                                : bomMyTask[0].Reason
                            }
                          />
                        ) : (
                          <TextField
                            sx={{
                              backgroundColor: "white",
                              fontSize: 14,
                              width: 220,
                              height: "50px",
                            }}
                            inputRef={reason}
                            id="outlined-multiline-static"
                            placeholder="Enter Reason Here..."
                            multiline
                            rows={1}
                          />
                        )}
                      </Item>
                    </Grid>
                  ) : (
                    ""
                  )}
                </Grid>
              </Stack>
            </CardContent>
          </Card>
        </Box>
        <Grid container>
          <Grid
            xl={6}
            lg={6}
            md={12}
            sm={12}
            xs={12}
            item
            style={{
              display:
                Typenewrelease === 1 ||
                mbomA === "add" ||
                (mbomT === "true"
                  ? mbomMyTask && mbomMyTask[0] && mbomMyTask[0].BOM_Type === 0
                  : mbomN === "nuetral"
                  ? mbomAppMyTask &&
                    mbomAppMyTask[0] &&
                    mbomAppMyTask[0].BOM_Type === 0
                  : bomMyTask && bomMyTask[0] && bomMyTask[0].BOM_Type === 0)
                  ? "none"
                  : "block",
            }}
          >
            <Box sx={{ flexGrow: 1, mt: 2 }}>
              <Card raised={true} sx={app_style.cardSx}>
                <CardHeader
                  sx={{ backgroundColor: "#5A5A5A", color: "white" }}
                  title={
                    <Typography
                      sx={app_style.cardHeading1}
                      style={{ textAlign: "left" }}
                    >
                      Commercial Approval Status (Applicable Only for ECN's)
                    </Typography>
                  }
                ></CardHeader>
                <CardContent>
                  <TableContainer component={Paper} style={{ height: "285px" }}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                      <TableHead sx={{ backgroundColor: "#646D7E" }}>
                        <TableRow>
                          <TableCell
                            sx={{ fontWeight: "bold", color: "white" }}
                          >
                            Key Items
                          </TableCell>
                          <TableCell
                            sx={{ fontWeight: "bold", color: "white" }}
                          >
                            Details
                          </TableCell>
                          <TableCell
                            sx={{ fontWeight: "bold", color: "white" }}
                          >
                            Remarks
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        <TableRow
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell sx={{ fontWeight: "bold" }}>
                            Customer PO
                          </TableCell>
                          <TableCell>
                            {(bomMyTask.length > 0 && bomMyTask) ||
                            (mbomMyTask.length > 0 && mbomMyTask) ||
                            (mbomAppMyTask.length > 0 && mbomAppMyTask) ? (
                              <TextField
                                style={{
                                  pointerEvents: "none",
                                  cursor: "not-allowed",
                                }}
                                size="small"
                                variant="outlined"
                                sx={{ width: "150px" }}
                                value={
                                  mbomT === "true"
                                    ? mbomMyTask[0].Customer_PO_Dtl
                                    : mbomN === "nuetral"
                                    ? mbomAppMyTask[0].Customer_PO_Dtl
                                    : bomMyTask[0].Customer_PO_Dtl
                                }
                              />
                            ) : (
                              <TextField
                                size="small"
                                variant="outlined"
                                sx={{ width: "150px" }}
                                inputRef={customerPODetails}
                                placeholder="Details..."
                              />
                            )}
                          </TableCell>
                          <TableCell>
                            {(bomMyTask.length > 0 && bomMyTask) ||
                            (mbomMyTask.length > 0 && mbomMyTask) ||
                            (mbomAppMyTask.length > 0 && mbomAppMyTask) ? (
                              <TextField
                                size="small"
                                variant="outlined"
                                sx={{ width: "150px" }}
                                style={{
                                  pointerEvents: "none",
                                  cursor: "not-allowed",
                                }}
                                value={
                                  mbomT === "true"
                                    ? mbomMyTask[0].Customer_PO_Rmrk
                                    : mbomN === "nuetral"
                                    ? mbomAppMyTask[0].Customer_PO_Rmrk
                                    : bomMyTask[0].Customer_PO_Rmrk
                                }
                              />
                            ) : (
                              <TextField
                                size="small"
                                variant="outlined"
                                sx={{ width: "150px" }}
                                inputRef={customerPORemarks}
                                placeholder="Remarks..."
                              />
                            )}
                          </TableCell>
                        </TableRow>
                        <TableRow
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell sx={{ fontWeight: "bold" }}>
                            Supplier PO
                          </TableCell>
                          <TableCell>
                            {(bomMyTask.length > 0 && bomMyTask) ||
                            (mbomMyTask.length > 0 && mbomMyTask) ||
                            (mbomAppMyTask.length > 0 && mbomAppMyTask) ? (
                              <TextField
                                style={{
                                  pointerEvents: "none",
                                  cursor: "not-allowed",
                                }}
                                size="small"
                                variant="outlined"
                                sx={{ width: "150px" }}
                                value={
                                  mbomT === "true"
                                    ? mbomMyTask[0].Supplier_PO_Dtl
                                    : mbomN === "nuetral"
                                    ? mbomAppMyTask[0].Supplier_PO_Dtl
                                    : bomMyTask[0].Supplier_PO_Dtl
                                }
                              />
                            ) : (
                              <TextField
                                size="small"
                                variant="outlined"
                                sx={{ width: "150px" }}
                                placeholder="Details..."
                                inputRef={supplierPODetails}
                              />
                            )}
                          </TableCell>
                          <TableCell>
                            {(bomMyTask.length > 0 && bomMyTask) ||
                            (mbomMyTask.length > 0 && mbomMyTask) ||
                            (mbomAppMyTask.length > 0 && mbomAppMyTask) ? (
                              <TextField
                                style={{
                                  pointerEvents: "none",
                                  cursor: "not-allowed",
                                }}
                                size="small"
                                variant="outlined"
                                sx={{ width: "150px" }}
                                value={
                                  mbomT === "true"
                                    ? mbomMyTask[0].Supplier_PO_Rmrk
                                    : mbomN === "nuetral"
                                    ? mbomAppMyTask[0].Supplier_PO_Rmrk
                                    : bomMyTask[0].Supplier_PO_Rmrk
                                }
                              />
                            ) : (
                              <TextField
                                size="small"
                                variant="outlined"
                                sx={{ width: "150px" }}
                                placeholder="Remarks..."
                                inputRef={supplierPORemarks}
                              />
                            )}
                          </TableCell>
                        </TableRow>
                        <TableRow
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell sx={{ fontWeight: "bold" }}>
                            Obsolute cost approval
                          </TableCell>
                          <TableCell>
                            {(bomMyTask.length > 0 && bomMyTask) ||
                            (mbomMyTask.length > 0 && mbomMyTask) ||
                            (mbomAppMyTask.length > 0 && mbomAppMyTask) ? (
                              <TextField
                                style={{
                                  pointerEvents: "none",
                                  cursor: "not-allowed",
                                }}
                                size="small"
                                variant="outlined"
                                sx={{ width: "150px" }}
                                value={
                                  mbomT === "true"
                                    ? mbomMyTask[0].Cost_Appvl_Dtl
                                    : mbomN === "nuetral"
                                    ? mbomAppMyTask[0].Cost_Appvl_Dtl
                                    : bomMyTask[0].Cost_Appvl_Dtl
                                }
                              />
                            ) : (
                              <TextField
                                size="small"
                                variant="outlined"
                                sx={{ width: "150px" }}
                                placeholder="Detalls..."
                                inputRef={cstAprvlDetails}
                              />
                            )}
                          </TableCell>
                          <TableCell>
                            {(bomMyTask.length > 0 && bomMyTask) ||
                            (mbomMyTask.length > 0 && mbomMyTask) ||
                            (mbomAppMyTask.length > 0 && mbomAppMyTask) ? (
                              <TextField
                                style={{
                                  pointerEvents: "none",
                                  cursor: "not-allowed",
                                }}
                                size="small"
                                variant="outlined"
                                sx={{ width: "150px" }}
                                value={
                                  mbomT === "true"
                                    ? mbomMyTask[0].Cost_Appvl_Rmrk
                                    : mbomN === "nuetral"
                                    ? mbomAppMyTask[0].Cost_Appvl_Rmrk
                                    : bomMyTask[0].Cost_Appvl_Rmrk
                                }
                              />
                            ) : (
                              <TextField
                                size="small"
                                variant="outlined"
                                sx={{ width: "150px" }}
                                placeholder="Remarks..."
                                inputRef={cstAprvlRemarks}
                              />
                            )}
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </CardContent>
              </Card>
            </Box>
          </Grid>
          <Grid
            xl={
              Typenewrelease === 1 ||
              mbomA === "add" ||
              (mbomT === "true"
                ? mbomMyTask && mbomMyTask[0] && mbomMyTask[0].BOM_Type === 0
                : mbomN === "nuetral"
                ? mbomAppMyTask &&
                  mbomAppMyTask[0] &&
                  mbomAppMyTask[0].BOM_Type === 0
                : bomMyTask && bomMyTask[0] && bomMyTask[0].BOM_Type === 0)
                ? 12
                : 6
            }
            lg={
              Typenewrelease === 1 ||
              (mbomT === "true"
                ? mbomMyTask && mbomMyTask[0] && mbomMyTask[0].BOM_Type === 0
                : mbomN === "nuetral"
                ? mbomAppMyTask &&
                  mbomAppMyTask[0] &&
                  mbomAppMyTask[0].BOM_Type === 0
                : bomMyTask && bomMyTask[0] && bomMyTask[0].BOM_Type === 0)
                ? 12
                : 6
            }
            md={12}
            sm={12}
            xs={12}
            item
          >
            <Box sx={{ flexGrow: 1, mt: 2 }}>
              <Card raised={true} sx={app_style.cardSx}>
                <CardHeader
                  sx={{ backgroundColor: "#5A5A5A", color: "white" }}
                  title={
                    <Typography
                      sx={app_style.cardHeading1}
                      style={{ textAlign: "left" }}
                    >
                      M-BOM
                    </Typography>
                  }
                ></CardHeader>
                <CardContent>
                  <TableContainer component={Paper}>
                    <Table
                      sx={{ minWidth: 650, height: 285 }}
                      aria-label="simple table"
                    >
                      <TableHead sx={{ backgroundColor: "#646D7E" }}>
                        <TableRow>
                          <TableCell
                            sx={{
                              fontWeight: "bold",
                              color: "white",
                              width: "240px",
                            }}
                          >
                            Type
                          </TableCell>
                          <TableCell
                            sx={{
                              fontWeight: "bold",
                              color: "white",
                              width: "150px",
                            }}
                          >
                            Approval
                          </TableCell>
                          <TableCell
                            sx={{
                              fontWeight: "bold",
                              color: "white",
                              width: "250px",
                            }}
                          >
                            M-BOM
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        <TableRow>
                          <TableCell sx={{ fontWeight: "bold" }}>
                            Initiator-MBOM
                          </TableCell>
                          <TableCell>
                            {(bomMyTask.length > 0 && bomMyTask[0]) ||
                            (mbomMyTask.length > 0 && mbomMyTask[0]) ||
                            (mbomAppMyTask.length > 0 && mbomAppMyTask[0]) ||
                            (mbomNotMyTask.length > 0 && mbomNotMyTask[0]) ? (
                              <FormControl size="small" fullWidth>
                                <InputLabel>Initiator M-BOM</InputLabel>
                                <Select
                                  required
                                  sx={{
                                    backgroundColor: "white",
                                    width: 190,
                                    height: "45px",
                                  }}
                                  style={{
                                    pointerEvents: "none",
                                    cursor: "not-allowed",
                                  }}
                                  value={
                                    mbomT === "true"
                                      ? mbomMyTask[0].Int_MBOM_Appvl
                                      : mbomN === "nuetral"
                                      ? mbomAppMyTask[0].Int_MBOM_Appvl
                                      : mbomA === "add"
                                      ? mbomNotMyTask[0].Int_MBOM_Appvl
                                      : bomMyTask[0].Int_MBOM_Appvl
                                  }
                                >
                                  {userList.map((user, index) => {
                                    if (user.Dept === "D0001") {
                                      return (
                                        <MenuItem
                                          key={index}
                                          value={user.Emp_Code}
                                        >
                                          {user.Emp_Name}
                                        </MenuItem>
                                      );
                                    }
                                  })}
                                </Select>
                              </FormControl>
                            ) : (
                              <FormControl size="small" fullWidth>
                                <InputLabel>Initiator M-BOM</InputLabel>
                                <Select
                                  required
                                  label="Initiator M-BOM"
                                  sx={{
                                    backgroundColor: "white",
                                    width: 150,
                                    height: "45px",
                                  }}
                                  value={initiatorMbomEmpCode}
                                  onChange={(e, string) => {
                                    SetInitiatorMbomEmpCode(e.target.value);
                                  }}
                                >
                                  {userList.map((user, index) => {
                                    if (user.Dept === "D0001") {
                                      return (
                                        <MenuItem
                                          key={index}
                                          value={user.Emp_Code}
                                        >
                                          {user.Emp_Name}
                                        </MenuItem>
                                      );
                                    }
                                  })}
                                </Select>
                              </FormControl>
                            )}
                          </TableCell>
                          <TableCell
                            rowSpan={2}
                            sx={{
                              verticalAlign: "middle",
                              textAlign: "center",
                            }}
                          >
                            {(mbomAppMyTask && mbomAppMyTask.length > 0) ||
                            (mbomNotMyTask && mbomNotMyTask.length > 0) ? (
                              <Base64Downloader
                                base64={base64code}
                                downloadName="Download"
                                Tag="a"
                                extraAttributes={{ href: "#" }}
                                className="my-class-name"
                                onDownloadSuccess={() =>
                                  console.log("File download initiated")
                                }
                                onDownloadError={() =>
                                  console.warn("Download failed to start")
                                }
                              >
                                <Button variant="contained">
                                  Click to download
                                </Button>
                              </Base64Downloader>
                            ) : (
                              <ReactFileReader
                                fileTypes={[".pdf", ".docx", ".xlsx", ".pptx"]}
                                base64={true}
                                multipleFiles={true}
                                value={beforepic}
                                handleFiles={handleFilesupload}
                              >
                                <Grid container xs={12}>
                                  <Grid item={true} xs={12}>
                                    {mbomMyTask.length > 0 &&
                                    mbomMyTask &&
                                    mbomMyTask[0].Int_MBOM_Appvl ===
                                      emplogged ? (
                                      <Button
                                        variant="contained"
                                        sx={{
                                          "&:hover": {
                                            backgroundColor: "transparent",
                                            color: "#157DEC",
                                          },
                                        }}
                                      >
                                        Upload
                                      </Button>
                                    ) : (
                                      <Button
                                        variant="contained"
                                        // sx={{
                                        //   "&:hover": {
                                        //     backgroundColor: "transparent",
                                        //     color: "#157DEC",
                                        //   },
                                        // }}
                                        disabled={true}
                                      >
                                        Upload
                                      </Button>
                                    )}
                                  </Grid>
                                  <Grid
                                    item={true}
                                    xs={7}
                                    sx={{ marginTop: 2 }}
                                  >
                                    {checkimage === "data:image" ? (
                                      <>
                                        <InputLabel htmlFor="my-input">
                                          <span
                                            style={{
                                              fontWeight: "bold",
                                              color: "black",
                                            }}
                                          >
                                            File Name :{" "}
                                          </span>
                                          {filename}
                                        </InputLabel>
                                      </>
                                    ) : (
                                      ""
                                    )}
                                  </Grid>
                                </Grid>
                              </ReactFileReader>
                            )}

                            <Box>
                              {checkimage === "data:image" ? (
                                ""
                              ) : (
                                <InputLabel htmlFor="my-input">
                                  <span
                                    style={{
                                      fontWeight: "bold",
                                      color: "black",
                                    }}
                                  >
                                    File Name :{" "}
                                  </span>
                                  {filename}
                                </InputLabel>
                              )}
                            </Box>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell sx={{ fontWeight: "bold" }}>
                            Approver-MBOM
                          </TableCell>
                          <TableCell>
                            <FormControl size="small">
                              <InputLabel>Approver M-BOM</InputLabel>
                              <Select
                                required
                                label="Approver M-BOM"
                                sx={{
                                  backgroundColor: "white",
                                  width: 180,
                                  height: "45px",
                                }}
                                style={{
                                  pointerEvents: "none",
                                  cursor: "not-allowed",
                                }}
                                value={approverMbomEmpCode}
                                onChange={(e, string) => {
                                  SetApproverMbomEmpCode(e.target.value);
                                }}
                              >
                                {userList.map((user, index) => {
                                  if (user.Emp_Code === "E011") {
                                    return (
                                      <MenuItem
                                        key={index}
                                        value={user.Emp_Code}
                                      >
                                        {user.Emp_Name}
                                      </MenuItem>
                                    );
                                  }
                                })}
                              </Select>
                            </FormControl>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell sx={{ fontWeight: "bold" }}>
                            Notification-MBOM
                          </TableCell>
                          <TableCell>
                            <FormControl size="small">
                              <InputLabel>Notification M-BOM</InputLabel>
                              <Select
                                required
                                label="Approver M-BOM"
                                sx={{
                                  backgroundColor: "white",
                                  width: 180,
                                  height: "45px",
                                }}
                                style={{
                                  pointerEvents: "none",
                                  cursor: "not-allowed",
                                }}
                                value={notificationMbomEmpCode}
                                onChange={(e, string) => {
                                  SetNotificationMbomEmpCode(e.target.value);
                                }}
                              >
                                {userList.map((user, index) => {
                                  if (user.Emp_Code === "E036") {
                                    return (
                                      <MenuItem
                                        key={index}
                                        value={user.Emp_Code}
                                      >
                                        {user.Emp_Name}
                                      </MenuItem>
                                    );
                                  }
                                })}
                              </Select>
                            </FormControl>
                          </TableCell>
                          <TableCell
                            sx={{ fontWeight: "bold", textAlign: "center" }}
                          >
                            <span>
                              {mbomAppMyTask.length > 0 &&
                              mbomAppMyTask &&
                              mbomAppMyTask[0].App_MBOM_Appvl === emplogged ? (
                                <Button
                                  variant="contained"
                                  sx={{
                                    "&:hover": {
                                      backgroundColor: "transparent",
                                      color: "#157DEC",
                                    },
                                  }}
                                  onClick={handleApproveMBOM}
                                >
                                  Approve
                                </Button>
                              ) : (
                                <Button
                                  variant="contained"
                                  sx={{
                                    "&:hover": {
                                      backgroundColor: "transparent",
                                      color: "#157DEC",
                                    },
                                  }}
                                  style={{
                                    pointerEvents: "none",
                                    cursor: "not-allowed",
                                  }}
                                >
                                  Approve
                                </Button>
                              )}
                            </span>

                            <span style={{ paddingLeft: "10px" }}>
                              {mbomMyTask.length > 0 &&
                              mbomMyTask &&
                              mbomMyTask[0].Int_MBOM_Appvl === emplogged ? (
                                <Button
                                  variant="contained"
                                  sx={{
                                    "&:hover": {
                                      backgroundColor: "transparent",
                                      color: "#157DEC",
                                    },
                                  }}
                                  onClick={() => {
                                    handleSave();
                                  }}
                                >
                                  Save
                                </Button>
                              ) : mbomAppMyTask.length > 0 &&
                                mbomAppMyTask &&
                                mbomAppMyTask[0].App_MBOM_Appvl ===
                                  emplogged ? (
                                <Button
                                  variant="contained"
                                  color="error"
                                  sx={{
                                    "&:hover": {
                                      backgroundColor: "transparent",
                                      color: "red",
                                    },
                                  }}
                                  onClick={() => {
                                    handleRejectMBOM();
                                  }}
                                >
                                  Reject
                                </Button>
                              ) : (
                                <Button
                                  variant="contained"
                                  sx={{
                                    "&:hover": {
                                      backgroundColor: "transparent",
                                      color: "#157DEC",
                                    },
                                  }}
                                  style={{
                                    pointerEvents: "none",
                                    cursor: "not-allowed",
                                  }}
                                >
                                  Save
                                </Button>
                              )}
                            </span>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </CardContent>
              </Card>
            </Box>
          </Grid>
        </Grid>

        <Box
          sx={{ flexGrow: 1, mt: 2 }}
          style={{
            display:
              mbomT === "true" || mbomN === "nuetral" || mbomA === "add"
                ? "none"
                : "block",
          }}
        >
          <Card raised={true} sx={app_style.cardSx}>
            <CardHeader
              sx={{ backgroundColor: "#5A5A5A", color: "white" }}
              title={
                <Typography
                  sx={app_style.cardHeading1}
                  style={{ textAlign: "center" }}
                >
                  Approval
                </Typography>
              }
            ></CardHeader>
            <CardContent>
              <Grid container spacing={2}>
                {user.map((dept, index) => (
                  <Grid item xs={12} sm={12} md={6} l={6} key={index}>
                    <Card raised={true} sx={app_style.cardSx}>
                      {DecDeptlogged === dept.dept_code &&
                      bomMyTask.length > 0 &&
                      bomMyTask ? (
                        <CardHeader
                          sx={{
                            backgroundColor: "#000000",
                            color: "white",
                            height: "5px",
                          }}
                          title={
                            <Typography
                              sx={app_style.cardSubHeading1}
                              style={{ textAlign: "center" }}
                            >
                              <Grid container spacing={2} xs={12}>
                                <Grid item xs={11.5} sx={{ mt: -1 }}>
                                  {dept.dept}
                                </Grid>
                                <Grid item xs={0.5} sx={{ mt: -1.5 }}>
                                  <VerifiedIcon style={{ color: "red" }} />
                                </Grid>
                              </Grid>
                            </Typography>
                          }
                        ></CardHeader>
                      ) : (
                        <CardHeader
                          sx={{
                            backgroundColor: "#646D7E",
                            color: "white",
                            height: "5px",
                          }}
                          title={
                            <Typography
                              sx={app_style.cardSubHeading1}
                              style={{ textAlign: "center" }}
                            >
                              {dept.dept}
                            </Typography>
                          }
                        ></CardHeader>
                      )}
                      <CardContent>
                        <Box>
                          <Grid container xs={12} sx={{ textAlign: "center" }}>
                            <Grid item={true} xs={7}>
                              {DecDeptlogged === dept.dept_code &&
                              bomMyTask.length > 0 &&
                              bomMyTask ? (
                                <FormControlLabel
                                  label="Accepted"
                                  onClick={handleAcceptUser(dept.id)}
                                  control={<Checkbox checked={dept.accept} />}
                                />
                              ) : (
                                <FormControlLabel
                                  style={{
                                    pointerEvents: "none",
                                    cursor: "not-allowed",
                                  }}
                                  label="Accepted"
                                  onClick={handleAcceptUser(dept.id)}
                                  control={<Checkbox checked={dept.accept} />}
                                />
                              )}
                            </Grid>
                            <Grid item={true} xs={0}>
                              {DecDeptlogged === dept.dept_code &&
                              bomMyTask.length > 0 &&
                              bomMyTask ? (
                                <FormControlLabel
                                  label="Rejected"
                                  onClick={handleRejectUSer(dept.id)}
                                  control={<Checkbox checked={dept.reject} />}
                                />
                              ) : (
                                <FormControlLabel
                                  style={{
                                    pointerEvents: "none",
                                    cursor: "not-allowed",
                                  }}
                                  label="Rejected"
                                  onClick={handleRejectUSer(dept.id)}
                                  control={<Checkbox checked={dept.reject} />}
                                />
                              )}
                            </Grid>
                          </Grid>
                        </Box>
                        <Box>
                          <Grid container>
                            <Grid xs={3} xl={3} lg={3} item sx={{ ml: 2 }}>
                              <FormControl size="small">
                                <InputLabel sx={{ mt: 1 }}>Name</InputLabel>
                                {bomMyTask.length > 0 && bomMyTask ? (
                                  <Select
                                    required
                                    style={{
                                      pointerEvents: "none",
                                      cursor: "not-allowed",
                                    }}
                                    sx={{
                                      backgroundColor: "white",
                                      width: 180,
                                      mt: 1,
                                    }}
                                    label="Name"
                                    id={`namelist${dept.id}`}
                                    value={retrieveEmpCode && retrieveEmpCode}
                                    onChange={handleUserName(dept.id)}
                                  >
                                    {userList.map((user, index) => {
                                      if (
                                        retrieveEmpCode &&
                                        retrieveEmpCode === user.Emp_Code &&
                                        dept.dept_code === user.Dept
                                      ) {
                                        return (
                                          <MenuItem
                                            key={index}
                                            value={user.Emp_Code}
                                            defaultValue={user.Emp_Code}
                                          >
                                            {user.Emp_Name}
                                          </MenuItem>
                                        );
                                      }
                                    })}
                                  </Select>
                                ) : (
                                  <Select
                                    required
                                    sx={{
                                      backgroundColor: "white",
                                      width: 180,
                                      mt: 1,
                                    }}
                                    label="Name"
                                    id={`namelist${dept.id}`}
                                    value={dept.Emp_code}
                                    onChange={handleUserName(dept.id)}
                                  >
                                    {userList.map((user, index) => {
                                      if (dept.dept_code === user.Dept) {
                                        return (
                                          <MenuItem
                                            // key={Object.keys(user)[0]}
                                            key={index}
                                            value={user.Emp_Code}
                                            defaultValue={user.Emp_Code}
                                          >
                                            {/* {user.username} */}
                                            {user.Emp_Name}
                                          </MenuItem>
                                        );
                                      }
                                    })}
                                  </Select>
                                )}
                              </FormControl>
                            </Grid>
                            <Grid xs={5} xl={5} lg={5} item sx={{ ml: 1 }}>
                              {DecDeptlogged === dept.dept_code &&
                              bomMyTask.length > 0 &&
                              bomMyTask ? (
                                <TextField
                                  size="small"
                                  variant="outlined"
                                  id={`remark${dept.id}`}
                                  label="Remarks"
                                  value={dept.remark}
                                  onChange={handleUserRemark(dept.id)}
                                  sx={{
                                    backgroundColor: "white",
                                    width: 180,
                                    mt: 1,
                                    ml: 9.5,
                                  }}
                                />
                              ) : (
                                <TextField
                                  style={{
                                    pointerEvents: "none",
                                    cursor: "not-allowed",
                                  }}
                                  size="small"
                                  variant="outlined"
                                  id={`remark${dept.id}`}
                                  label="Remarks"
                                  value={dept.remark}
                                  onChange={handleUserRemark(dept.id)}
                                  sx={{
                                    backgroundColor: "white",
                                    width: 180,
                                    mt: 1,
                                    ml: 9.5,
                                  }}
                                />
                              )}
                            </Grid>
                            <Grid
                              xs={1}
                              xl={1}
                              lg={1}
                              item
                              sx={{ mt: 2, ml: 6 }}
                            >
                              {DecDeptlogged === dept.dept_code &&
                              bomMyTask.length > 0 &&
                              bomMyTask ? (
                                <FormControlLabel
                                  sx={{ mt: -1.5 }}
                                  label="Sign"
                                  onClick={handleSignUser(dept.id)}
                                  control={<Checkbox checked={dept.sign} />}
                                />
                              ) : (
                                <FormControlLabel
                                  style={{
                                    pointerEvents: "none",
                                    cursor: "not-allowed",
                                  }}
                                  sx={{ mt: -1.5 }}
                                  label="Sign"
                                  onClick={handleSignUser(dept.id)}
                                  control={<Checkbox checked={dept.sign} />}
                                />
                              )}
                            </Grid>
                          </Grid>

                          <Grid container sx={{ mt: 2 }}>
                            <Grid
                              xs={6}
                              item={true}
                              textAlign={"right"}
                              sx={{ ml: -5 }}
                            >
                              {DecDeptlogged === dept.dept_code &&
                              bomMyTask.length > 0 &&
                              bomMyTask ? (
                                <Button
                                  variant="outlined"
                                  sx={{
                                    "&:hover": {
                                      backgroundColor: "#157DEC",
                                      color: "white",
                                    },
                                  }}
                                  id={`feabtyriskcan+${dept.id}`}
                                  onClick={(e) => {
                                    handleUserCancel(dept.id);
                                  }}
                                >
                                  Cancel
                                </Button>
                              ) : (
                                <Button
                                  variant="outlined"
                                  sx={{
                                    "&:hover": {
                                      backgroundColor: "#157DEC",
                                      color: "white",
                                    },
                                  }}
                                  id={`feabtyriskcan+${dept.id}`}
                                  style={{
                                    pointerEvents: "none",
                                    cursor: "not-allowed",
                                  }}
                                  onClick={(e) => {
                                    handleUserCancel(dept.id);
                                  }}
                                >
                                  Cancel
                                </Button>
                              )}
                            </Grid>
                            <Grid
                              xs={6}
                              item={true}
                              textAlign={"left"}
                              sx={{ ml: 5 }}
                            >
                              {DecDeptlogged === dept.dept_code &&
                              bomMyTask.length > 0 &&
                              bomMyTask ? (
                                <Button
                                  variant="contained"
                                  sx={{
                                    "&:hover": {
                                      backgroundColor: "transparent",
                                      color: "#157DEC",
                                    },
                                  }}
                                  id={`feabtyriskapprov+${dept.id}`}
                                  onClick={(e) => {
                                    handleUserSubmit(dept.id);
                                  }}
                                >
                                  Save
                                </Button>
                              ) : (
                                <Button
                                  style={{
                                    pointerEvents: "none",
                                    cursor: "not-allowed",
                                  }}
                                  variant="contained"
                                  sx={{
                                    "&:hover": {
                                      backgroundColor: "transparent",
                                      color: "#157DEC",
                                    },
                                  }}
                                  id={`feabtyriskapprov+${dept.id}`}
                                  onClick={(e) => {
                                    handleUserSubmit(dept.id);
                                  }}
                                >
                                  Save
                                </Button>
                              )}
                            </Grid>
                          </Grid>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        </Box>
        <Box
          sx={{ flexGrow: 1, mt: 2 }}
          style={{
            display:
              mbomT === "true" || mbomN === "nuetral" || mbomA === "add"
                ? "none"
                : "block",
          }}
        >
          <Card raised={true} sx={{ ...app_style.cardSx, border: "green" }}>
            <CardHeader
              sx={{ backgroundColor: "#5A5A5A", color: "white" }}
              title={
                <Typography
                  sx={app_style.cardHeading1}
                  style={{ textAlign: "center" }}
                >
                  Management Approval
                </Typography>
              }
            ></CardHeader>
            <CardContent>
              <Grid container spacing={2}>
                {management.map((item, i) => {
                  return (
                    <Grid
                      item
                      xs={12}
                      sm={12}
                      md={4}
                      lg={
                        Typenewrelease === 1 ||
                        (bomMyTask &&
                          bomMyTask[0] &&
                          bomMyTask[0].BOM_Type === 0)
                          ? 6
                          : 4
                      }
                      key={i}
                      style={{
                        display:
                          (Typenewrelease === 1 && i === 2) ||
                          (bomMyTask &&
                            bomMyTask[0] &&
                            bomMyTask[0].BOM_Type === 0 &&
                            i === 2)
                            ? "none"
                            : "block",
                      }}
                    >
                      <Card raised={true} sx={app_style.cardSx}>
                        {DecDeptlogged === item.dept_code &&
                        bomMyTask.length > 0 &&
                        bomMyTask ? (
                          <CardHeader
                            sx={{ backgroundColor: "#000000", color: "white" }}
                            title={
                              <Typography
                                sx={app_style.cardSubHeading1}
                                style={{ textAlign: "center" }}
                              >
                                <Grid container spacing={2} xs={12}>
                                  <Grid item xs={11.5} sx={{ mt: -1 }}>
                                    {item.dept}
                                  </Grid>
                                  <Grid item xs={0.5} sx={{ mt: -1.5 }}>
                                    <VerifiedIcon style={{ color: "red" }} />
                                  </Grid>
                                </Grid>
                              </Typography>
                            }
                          ></CardHeader>
                        ) : (
                          <CardHeader
                            sx={{ backgroundColor: "#646D7E", color: "white" }}
                            title={
                              <Typography
                                sx={app_style.cardSubHeading1}
                                style={{ textAlign: "center" }}
                              >
                                {item.dept}
                              </Typography>
                            }
                          ></CardHeader>
                        )}
                        <CardContent>
                          <Box>
                            <Grid
                              container
                              xs={12}
                              sx={{ textAlign: "center" }}
                            >
                              <Grid item={true} xs={7}>
                                {DecDeptlogged === item.dept_code &&
                                bomMyTask.length > 0 &&
                                bomMyTask ? (
                                  <FormControlLabel
                                    key={item.id}
                                    label="Accepted"
                                    onClick={handleCheckboxAcceptChange(
                                      item.id
                                    )}
                                    control={<Checkbox checked={item.accept} />}
                                  />
                                ) : (
                                  <FormControlLabel
                                    key={item.id}
                                    style={{
                                      pointerEvents: "none",
                                      cursor: "not-allowed",
                                    }}
                                    label="Accepted"
                                    onClick={handleCheckboxAcceptChange(
                                      item.id
                                    )}
                                    control={<Checkbox checked={item.accept} />}
                                  />
                                )}
                              </Grid>
                              <Grid item={true} xs={0}>
                                {DecDeptlogged === item.dept_code &&
                                bomMyTask.length > 0 &&
                                bomMyTask ? (
                                  <FormControlLabel
                                    key={item.id}
                                    label="Rejected"
                                    onClick={handleCheckboxRejectChange(
                                      item.id
                                    )}
                                    control={<Checkbox checked={item.reject} />}
                                  />
                                ) : (
                                  <FormControlLabel
                                    key={item.id}
                                    style={{
                                      pointerEvents: "none",
                                      cursor: "not-allowed",
                                    }}
                                    label="Rejected"
                                    onClick={handleCheckboxRejectChange(
                                      item.id
                                    )}
                                    control={<Checkbox checked={item.reject} />}
                                  />
                                )}
                              </Grid>
                            </Grid>
                          </Box>
                          <Box>
                            <Grid container>
                              <Grid xs={4.7} xl={4.7} lg={4.7} item>
                                <FormControl size="small">
                                  <InputLabel sx={{ mt: 1 }}>Name</InputLabel>
                                  {
                                    // DecDeptlogged === item.dept_code &&
                                    bomMyTask.length > 0 && bomMyTask ? (
                                      <Select
                                        style={{
                                          pointerEvents: "none",
                                          cursor: "not-allowed",
                                        }}
                                        label="Name"
                                        required
                                        sx={{
                                          backgroundColor: "white",
                                          width: 180,
                                          mt: 1,
                                        }}
                                        id={`namelisted${item.id}`}
                                        value={
                                          retrieveEmpCode && retrieveEmpCode
                                        }
                                        onChange={handleManagementName(item.id)}
                                      >
                                        {userList.map((man, index) => {
                                          if (
                                            retrieveEmpCode &&
                                            retrieveEmpCode === man.Emp_Code &&
                                            item.dept_code === man.Dept
                                          ) {
                                            return (
                                              <MenuItem
                                                defaultValue={man.Emp_Code}
                                                key={index}
                                                value={man.Emp_Code}
                                              >
                                                {man.Emp_Name}
                                              </MenuItem>
                                            );
                                          }
                                        })}
                                      </Select>
                                    ) : (
                                      <Select
                                        required
                                        sx={{
                                          backgroundColor: "white",
                                          width: 180,
                                          mt: 1,
                                        }}
                                        label="Name"
                                        id={`namelisted${item.id}`}
                                        value={item.emp_code}
                                        onChange={handleManagementName(item.id)}
                                      >
                                        {userList.map((man, index) => {
                                          if (item.dept_code === man.Dept) {
                                            return (
                                              <MenuItem
                                                defaultValue={man.Emp_Code}
                                                key={index}
                                                value={man.Emp_Code}
                                              >
                                                {man.Emp_Name}
                                              </MenuItem>
                                            );
                                          }
                                        })}
                                      </Select>
                                    )
                                  }
                                </FormControl>
                              </Grid>
                              <Grid xs={5.2} xl={5.2} lg={5.2} item>
                                {DecDeptlogged === item.dept_code &&
                                bomMyTask.length > 0 &&
                                bomMyTask ? (
                                  <TextField
                                    size="small"
                                    variant="outlined"
                                    id={`remarks${item.id}`}
                                    label="Remarks"
                                    onChange={handleManageRemark(item.id)}
                                    value={item.remark}
                                    sx={{
                                      backgroundColor: "white",
                                      width: 150,
                                      mt: 1,
                                      ml: 3,
                                    }}
                                  />
                                ) : (
                                  <TextField
                                    style={{
                                      pointerEvents: "none",
                                      cursor: "not-allowed",
                                    }}
                                    size="small"
                                    variant="outlined"
                                    id={`remarks${item.id}`}
                                    label="Remarks"
                                    onChange={handleManageRemark(item.id)}
                                    value={item.remark}
                                    sx={{
                                      backgroundColor: "white",
                                      width: 150,
                                      mt: 1,
                                      ml: 3,
                                    }}
                                  />
                                )}
                              </Grid>
                              <Grid
                                xs={0.5}
                                xl={0.5}
                                lg={0.5}
                                item
                                sx={{ mt: 1 }}
                              >
                                {DecDeptlogged === item.dept_code &&
                                bomMyTask.length > 0 &&
                                bomMyTask ? (
                                  <FormControlLabel
                                    label="Sign"
                                    onClick={handleCheckManageSign(item.id)}
                                    control={<Checkbox checked={item.sign} />}
                                  />
                                ) : (
                                  <FormControlLabel
                                    style={{
                                      pointerEvents: "none",
                                      cursor: "not-allowed",
                                    }}
                                    label="Sign"
                                    onClick={handleCheckManageSign(item.id)}
                                    control={<Checkbox checked={item.sign} />}
                                  />
                                )}
                              </Grid>
                            </Grid>
                            <Grid container xs={12}>
                              <Grid container sx={{ mt: 2 }}>
                                <Grid
                                  xs={6}
                                  item={true}
                                  textAlign={"right"}
                                  sx={{ ml: -5 }}
                                >
                                  {DecDeptlogged === item.dept_code &&
                                  bomMyTask.length > 0 &&
                                  bomMyTask ? (
                                    <Button
                                      variant="outlined"
                                      sx={{
                                        "&:hover": {
                                          backgroundColor: "#157DEC",
                                          color: "white",
                                        },
                                      }}
                                      onClick={handleManageCancel(item.id)}
                                    >
                                      Clear
                                    </Button>
                                  ) : (
                                    <Button
                                      variant="outlined"
                                      sx={{
                                        "&:hover": {
                                          backgroundColor: "#157DEC",
                                          color: "white",
                                        },
                                      }}
                                      style={{
                                        pointerEvents: "none",
                                        cursor: "not-allowed",
                                      }}
                                      onClick={handleManageCancel(item.id)}
                                    >
                                      Clear
                                    </Button>
                                  )}
                                </Grid>
                                <Grid
                                  xs={6}
                                  item={true}
                                  textAlign={"left"}
                                  sx={{ ml: 5 }}
                                >
                                  {DecDeptlogged === item.dept_code &&
                                  bomMyTask.length > 0 &&
                                  bomMyTask ? (
                                    <Button
                                      variant="contained"
                                      sx={{
                                        "&:hover": {
                                          backgroundColor: "transparent",
                                          color: "#157DEC",
                                          variant: "none",
                                        },
                                      }}
                                      id={`managementapprov+${item.id}`}
                                      onClick={(e) => {
                                        handleManageSubmit(item.id);
                                      }}
                                    >
                                      Save
                                    </Button>
                                  ) : (
                                    <Button
                                      style={{
                                        pointerEvents: "none",
                                        cursor: "not-allowed",
                                      }}
                                      variant="contained"
                                      sx={{
                                        "&:hover": {
                                          backgroundColor: "transparent",
                                          color: "#157DEC",
                                          variant: "none",
                                        },
                                      }}
                                      id={`managementapprov+${item.id}`}
                                      onClick={(e) => {
                                        handleManageSubmit(item.id);
                                      }}
                                    >
                                      Save
                                    </Button>
                                  )}
                                </Grid>
                              </Grid>
                            </Grid>
                          </Box>
                        </CardContent>
                      </Card>
                    </Grid>
                  );
                })}
              </Grid>
            </CardContent>
          </Card>
        </Box>
        <Grid
          container
          xs={12}
          style={{
            display:
              mbomT === "true" || mbomN === "nuetral" || mbomA === "add"
                ? "none"
                : "block",
          }}
        >
          <Grid xs={12} item={true}>
            <Box sx={{ flexGrow: 1, mt: 2 }}>
              <Card raised={true} sx={app_style.cardSx}>
                <CardHeader
                  sx={{ backgroundColor: "#5A5A5A", color: "white" }}
                  title={
                    <Typography
                      sx={app_style.cardHeading1}
                      style={{ textAlign: "center" }}
                    >
                      Material Description
                    </Typography>
                  }
                ></CardHeader>
                <CardContent>
                  <Box className="table-container">
                    <EditableTable
                      getTavVal={getTavVal}
                      tableData={tableData}
                      tabArr={tabArr}
                      bomMyTask={bomMyTask}
                      insertComplete={insertComplete}
                    />
                  </Box>
                  <br />
                  <Grid container sx={{ mt: 2 }}>
                    <Grid
                      xs={6}
                      item={true}
                      textAlign={"right"}
                      sx={{ ml: -5 }}
                    >
                      {bomMyTask.length > 0 && bomMyTask ? (
                        ""
                      ) : (
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
                          CLEAR
                        </Button>
                      )}
                    </Grid>
                    <Grid xs={6} item={true} textAlign={"left"} sx={{ ml: 5 }}>
                      {bomMyTask.length > 0 && bomMyTask ? (
                        ""
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
                            handleSubmit();
                          }}
                        >
                          Submit
                        </Button>
                      )}
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <ToastContainer />
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      {/* <AssignedTask /> */}
      {/* <Box sx={{ display: "none" }}>
        <RiskListTable newreq={newreq} />
      </Box> */}
    </Box>
  );
};

export default BOMNewRequest;
