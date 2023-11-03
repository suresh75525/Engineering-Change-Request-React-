import React, { useEffect, useState, useRef, useReducer } from "react";
import {
  Box,
  Typography,
  Card,
  CardHeader,
  CardContent,
  Grid,
  TextField,
  Divider,
  Modal,
  Button,
  Stack,
  MenuItem,
  Select,
  FormControl,
  FormControlLabel,
  InputLabel,
  Checkbox,
} from "@mui/material";
import ReactFileReader from "react-file-reader";
import Paper from "@mui/material/Paper";
import moment from "moment";
import { styled } from "@mui/material/styles";
import wrongimg from './t1.png';
import trueimg from './t2.png';
import notapp from './notapp.png';
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { app_style } from "./style";
import api from "../../Page/config";
import { Badge } from "antd";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import PartNumberRevision from "../Master Tracker Tables/Part_Number_Revision";
import AffectedTable from "../Master Tracker Tables/Affected_Relevant_Table";
import TimePlan from "../Master Tracker Tables/Time_Plan_Table";
import ChangeImpTable from "../Master Tracker Tables/Change_Implementation";
import BreakPointTable from "../Master Tracker Tables/Break_Points_Table";
import { INITIAL_STATE, postReducer } from "../../reducers/postReducer";
import Base64Downloader from "common-base64-downloader-react";
import { ACTION_TYPES } from "../../reducers/postActionType";



const Item = styled(Paper)(({ theme }) => ({
  boxShadow: "none",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const MasterReportDetail = (props) => {
  const {
    reportDetail,
    handleClickBack = () => { },
    tabArr,
    handleEcostatus = () => { },
    ecorecord,
  } = props;

  const checklistobj = [
    {
      id: 1,
      name: "Customer",
      cusname: "",
      check: false,
      checkimg: "data:image",
      filename: "",
      picture: "",
      type: "",
    },
    {
      id: 2,
      name: "Supplier",
      cusname: "",
      check: false,
      checkimg: "data:image",
      filename: "",
      picture: "",
      type: "",
    },
    {
      id: 3,
      name: "Magna",
      cusname: "",
      check: false,
      checkimg: "data:image",
      filename: "",
      picture: "",
      type: "",
    },
    {
      id: 4,
      name: "Transit",
      cusname: "",
      check: false,
      checkimg: "data:image",
      filename: "",
      picture: "",
      type: "",
    },
  ];
  const newDate = new Date();
  const [open, setOpen] = useState(false);
  const [checklst, SetChecklist] = useState([...checklistobj]);
  const [beforePic, setBeforePic] = useState("");
  const [afterPic, setAfterPic] = useState("");
  const [base64Image, setBase64Image] = useState("");
  // const [assignedStatus, setAssignedStatus] = useState([]);
  const [Change_Imp, SetChange_Imp] = useState("Select");
  const [Partnoretdata, SetPartnoretdata] = useState([]);
  const [ChngeImpretdata, SetChngeImpretdata] = useState([]);
  const [BrkPntretdata, SetBrkPntretdata] = useState([]);
  const [Timeplnretdata, SetTimeplnretdata] = useState([]);
  const [affretdata, Setaffretdata] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [viewtaskdata, setViewTaskdata] = useState("");
  const [selecteddept, setSelectedDept] = useState(null)
  const [state, dispatch] = useReducer(postReducer, INITIAL_STATE);
  const [taskstate, TaskStatus] = useReducer(postReducer, INITIAL_STATE);
  const ECRApprovestatus =
    state.post && state.post.length > 0 && state.post[0].approval_status;
  const ECRTaskStatus =
    taskstate.post && taskstate.post.length > 0 && taskstate.post[0];

  const ecorecfield =
    ecorecord.length > 0 && ecorecord[5].length > 0 ? ecorecord[5][0] : null;
  const feasbltydata = viewtaskdata.length > 0 ? viewtaskdata[0] : null;
  const riskappdata = viewtaskdata.length > 0 ? viewtaskdata[1] : null;
  const rankdata = viewtaskdata.length > 0 ? viewtaskdata[2] : null;
  const remarkdata = viewtaskdata.length > 0 ? viewtaskdata[3] : null;

  const quesobj = [
    {
      id: 1,
      question: "Is product adequately defined application requirements, etc. to enable feasibility evaluation?",
      ans: feasbltydata && feasbltydata.length > 0 ? feasbltydata[0].col1 : "",
    },
    {
      id: 2,
      question: "Can Engineering Performance Specifications be met as written?",
      ans: feasbltydata && feasbltydata.length > 0 ? feasbltydata[0].col2 : "",
    },
    {
      id: 3,
      question: "Can product be manufactured to tolerances specified on drawing?",
      ans: feasbltydata && feasbltydata.length > 0 ? feasbltydata[0].col3 : "",
    },
    {
      id: 4,
      question: "Can product be manufactured with process capability that meet requirements?",
      ans: feasbltydata && feasbltydata.length > 0 ? feasbltydata[0].col4 : "",
    },
    {
      id: 5,
      question: "Is there adequate capacity to produce product?",
      ans: feasbltydata && feasbltydata.length > 0 ? feasbltydata[0].col5 : "",
    },
    {
      id: 6,
      question: "Does the design allow the use of efficient material handling techniques?",
      ans: feasbltydata && feasbltydata.length > 0 ? feasbltydata[0].col6 : "",
    },
    {
      id: 7,
      question: "Is statistical process control required on the product?",
      ans: feasbltydata && feasbltydata.length > 0 ? feasbltydata[0].col7 : "",
    },
    {
      id: 8,
      question: "Is statistical process control presently used on similar products?",
      ans: feasbltydata && feasbltydata.length > 0 ? feasbltydata[0].col8 : "",
    },
    {
      id: 9,
      question: "Costs for capital equipment?",
      ans: feasbltydata && feasbltydata.length > 0 ? feasbltydata[0].col9 : "",
    },
    {
      id: 10,
      question: "Costs for tooling?",
      ans: feasbltydata && feasbltydata.length > 0 ? feasbltydata[0].col10 : "",
    },
    {
      id: 11,
      question: "Alternative manufacturing methods?",
      ans: feasbltydata && feasbltydata.length > 0 ? feasbltydata[0].col11 : "",
    },
    {
      id: 12,
      question: "Are the processes in control and stable?",
      ans: feasbltydata && feasbltydata.length > 0 ? feasbltydata[0].col12 : "",
    },
    {
      id: 13,
      question: "Does process capability meet customer requirements?",
      ans: feasbltydata && feasbltydata.length > 0 ? feasbltydata[0].col12 : "",
    }
  ]
  const purchaseonj = [
    {
      id: 1,
      question: "New supplier needs to be explored / developed",
      ans: riskappdata && riskappdata.length > 0 ? riskappdata[0].col1 : "",
      ans1: rankdata && rankdata.length > 0 ? rankdata[0].col1 : "",
      ans2: remarkdata && remarkdata.length > 0 ? remarkdata[0].col1 : ""
    },
    {
      id: 2,
      question: "Skill set required for Part development",
      ans: riskappdata && riskappdata.length > 0 ? riskappdata[0].col2 : "",
      ans1: rankdata && rankdata.length > 0 ? rankdata[0].col2 : "",
      ans2: remarkdata && remarkdata.length > 0 ? remarkdata[0].col2 : ""
    },
    {
      id: 3,
      question: "New/complex technology",
      ans: riskappdata && riskappdata.length > 0 ? riskappdata[0].col3 : "",
      ans1: rankdata && rankdata.length > 0 ? rankdata[0].col3 : "",
      ans2: remarkdata && remarkdata.length > 0 ? remarkdata[0].col3 : ""
    },
    {
      id: 4,
      question: "Capex investment",
      ans: riskappdata && riskappdata.length > 0 ? riskappdata[0].col4 : "",
      ans1: rankdata && rankdata.length > 0 ? rankdata[0].col4 : "",
      ans2: remarkdata && remarkdata.length > 0 ? remarkdata[0].col4 : ""
    },
    {
      id: 5,
      question: "New material - customer approval required",
      ans: riskappdata && riskappdata.length > 0 ? riskappdata[0].col5 : "",
      ans1: rankdata && rankdata.length > 0 ? rankdata[0].col5 : "",
      ans2: remarkdata && remarkdata.length > 0 ? remarkdata[0].col5 : ""
    },
    {
      id: 6,
      question: "RM cost / direct import",
      ans: riskappdata && riskappdata.length > 0 ? riskappdata[0].col6 : "",
      ans1: rankdata && rankdata.length > 0 ? rankdata[0].col6 : "",
      ans2: remarkdata && remarkdata.length > 0 ? remarkdata[0].col6 : ""
    },
    {
      id: 7,
      question: "Not easily avaliable",
      ans: riskappdata && riskappdata.length > 0 ? riskappdata[0].col7 : "",
      ans1: rankdata && rankdata.length > 0 ? rankdata[0].col7 : "",
      ans2: remarkdata && remarkdata.length > 0 ? remarkdata[0].col7 : ""
    },
    {
      id: 8,
      question: "Shortage of Material",
      ans: riskappdata && riskappdata.length > 0 ? riskappdata[0].col8 : "",
      ans1: rankdata && rankdata.length > 0 ? rankdata[0].col8 : "",
      ans2: remarkdata && remarkdata.length > 0 ? remarkdata[0].col8 : ""
    },
    {
      id: 9,
      question: "Change in Logistics",
      ans: riskappdata && riskappdata.length > 0 ? riskappdata[0].col9 : "",
      ans1: rankdata && rankdata.length > 0 ? rankdata[0].col9 : "",
      ans2: remarkdata && remarkdata.length > 0 ? remarkdata[0].col9 : ""
    },
    {
      id: 10,
      question: "Affects productivity / flow of material",
      ans: riskappdata && riskappdata.length > 0 ? riskappdata[0].col10 : "",
      ans1: rankdata && rankdata.length > 0 ? rankdata[0].col10 : "",
      ans2: remarkdata && remarkdata.length > 0 ? remarkdata[0].col10 : ""
    }
  ]
  const programManagementobj = [
    {
      id: 1,
      question: "Any special skills required to CFT",
      ans: riskappdata && riskappdata.length > 0 ? riskappdata[0].col1 : "",
      ans1: rankdata && rankdata.length > 0 ? rankdata[0].col1 : "",
      ans2: remarkdata && remarkdata.length > 0 ? remarkdata[0].col1 : ""
    },
    {
      id: 2,
      question: "Any training required to CFT",
      ans: riskappdata && riskappdata.length > 0 ? riskappdata[0].col2 : "",
      ans1: rankdata && rankdata.length > 0 ? rankdata[0].col2 : "",
      ans2: remarkdata && remarkdata.length > 0 ? remarkdata[0].col2 : ""
    },
    {
      id: 3,
      question: "Any additional manpower required to manage the changes",
      ans: riskappdata && riskappdata.length > 0 ? riskappdata[0].col3 : "",
      ans1: rankdata && rankdata.length > 0 ? rankdata[0].col3 : "",
      ans2: remarkdata && remarkdata.length > 0 ? remarkdata[0].col3 : ""
    },
    {
      id: 4,
      question: "New/complex technology (Hardware / software)",
      ans: riskappdata && riskappdata.length > 0 ? riskappdata[0].col4 : "",
      ans1: rankdata && rankdata.length > 0 ? rankdata[0].col4 : "",
      ans2: remarkdata && remarkdata.length > 0 ? remarkdata[0].col4 : ""
    },
    {
      id: 5,
      question: "Capex investment / Collaborator inputs required to do change",
      ans: riskappdata && riskappdata.length > 0 ? riskappdata[0].col5 : "",
      ans1: rankdata && rankdata.length > 0 ? rankdata[0].col5 : "",
      ans2: remarkdata && remarkdata.length > 0 ? remarkdata[0].col5 : ""
    },
    {
      id: 6,
      question: "New material used",
      ans: riskappdata && riskappdata.length > 0 ? riskappdata[0].col6 : "",
      ans1: rankdata && rankdata.length > 0 ? rankdata[0].col6 : "",
      ans2: remarkdata && remarkdata.length > 0 ? remarkdata[0].col6 : ""
    },
    {
      id: 7,
      question: "Any IMDS concern / Hazardous materials in BOM",
      ans: riskappdata && riskappdata.length > 0 ? riskappdata[0].col7 : "",
      ans1: rankdata && rankdata.length > 0 ? rankdata[0].col7 : "",
      ans2: remarkdata && remarkdata.length > 0 ? remarkdata[0].col7 : ""
    },
    {
      id: 8,
      question: "New Validation method needs to be devised",
      ans: riskappdata && riskappdata.length > 0 ? riskappdata[0].col8 : "",
      ans1: rankdata && rankdata.length > 0 ? rankdata[0].col8 : "",
      ans2: remarkdata && remarkdata.length > 0 ? remarkdata[0].col8 : ""
    },
    {
      id: 9,
      question: "Review or change required in DFMEA / PFMEA",
      ans: riskappdata && riskappdata.length > 0 ? riskappdata[0].col9 : "",
      ans1: rankdata && rankdata.length > 0 ? rankdata[0].col9 : "",
      ans2: remarkdata && remarkdata.length > 0 ? remarkdata[0].col9 : ""
    },
    {
      id: 10,
      question: "Completely new design feature / design need",
      ans: riskappdata && riskappdata.length > 0 ? riskappdata[0].col10 : "",
      ans1: rankdata && rankdata.length > 0 ? rankdata[0].col10 : "",
      ans2: remarkdata && remarkdata.length > 0 ? remarkdata[0].col10 : ""
    },
  ]
  const Engineeringobj = [
    {
      id: 1,
      question: "Skill set required for design / upgradation",
      ans: riskappdata && riskappdata.length > 0 ? riskappdata[0].col1 : "",
      ans1: rankdata && rankdata.length > 0 ? rankdata[0].col1 : "",
      ans2: remarkdata && remarkdata.length > 0 ? remarkdata[0].col1 : ""
    },
    {
      id: 2,
      question: "Training required for Design engineer",
      ans: riskappdata && riskappdata.length > 0 ? riskappdata[0].col2 : "",
      ans1: rankdata && rankdata.length > 0 ? rankdata[0].col2 : "",
      ans2: remarkdata && remarkdata.length > 0 ? remarkdata[0].col2 : ""
    },
    {
      id: 3,
      question: "Addition of man power to do design change",
      ans: riskappdata && riskappdata.length > 0 ? riskappdata[0].col3 : "",
      ans1: rankdata && rankdata.length > 0 ? rankdata[0].col3 : "",
      ans2: remarkdata && remarkdata.length > 0 ? remarkdata[0].col3 : ""
    },
    {
      id: 4,
      question: "New/complex technology (Hardware / software)",
      ans: riskappdata && riskappdata.length > 0 ? riskappdata[0].col4 : "",
      ans1: rankdata && rankdata.length > 0 ? rankdata[0].col4 : "",
      ans2: remarkdata && remarkdata.length > 0 ? remarkdata[0].col4 : ""
    },
    {
      id: 5,
      question: "Capex investment / Collaborator inputs required to do change",
      ans: riskappdata && riskappdata.length > 0 ? riskappdata[0].col5 : "",
      ans1: rankdata && rankdata.length > 0 ? rankdata[0].col5 : "",
      ans2: remarkdata && remarkdata.length > 0 ? remarkdata[0].col5 : ""
    },
    {
      id: 6,
      question: "New material used",
      ans: riskappdata && riskappdata.length > 0 ? riskappdata[0].col6 : "",
      ans1: rankdata && rankdata.length > 0 ? rankdata[0].col6 : "",
      ans2: remarkdata && remarkdata.length > 0 ? remarkdata[0].col6 : ""
    },
    {
      id: 7,
      question: "Material severely affects other product Design chara",
      ans: riskappdata && riskappdata.length > 0 ? riskappdata[0].col7 : "",
      ans1: rankdata && rankdata.length > 0 ? rankdata[0].col7 : "",
      ans2: remarkdata && remarkdata.length > 0 ? remarkdata[0].col7 : ""
    },
    {
      id: 8,
      question: "New Validation method needs to be devised",
      ans: riskappdata && riskappdata.length > 0 ? riskappdata[0].col8 : "",
      ans1: rankdata && rankdata.length > 0 ? rankdata[0].col8 : "",
      ans2: remarkdata && remarkdata.length > 0 ? remarkdata[0].col8 : ""
    },
    {
      id: 9,
      question: "Review or change required in DFMEA",
      ans: riskappdata && riskappdata.length > 0 ? riskappdata[0].col9 : "",
      ans1: rankdata && rankdata.length > 0 ? rankdata[0].col9 : "",
      ans2: remarkdata && remarkdata.length > 0 ? remarkdata[0].col9 : ""
    },
    {
      id: 10,
      question: "Completely new design feature / design need",
      ans: riskappdata && riskappdata.length > 0 ? riskappdata[0].col10 : "",
      ans1: rankdata && rankdata.length > 0 ? rankdata[0].col10 : "",
      ans2: remarkdata && remarkdata.length > 0 ? remarkdata[0].col10 : ""
    }
  ];
  const qualityobj = [
    {
      id: 1,
      question: "Skill to operate a special measuring eqpt",
      ans: riskappdata && riskappdata.length > 0 ? riskappdata[0].col1 : "",
      ans1: rankdata && rankdata.length > 0 ? rankdata[0].col1 : "",
      ans2: remarkdata && remarkdata.length > 0 ? remarkdata[0].col1 : ""
    },
    {
      id: 2,
      question: "Training required to Inspectors",
      ans: riskappdata && riskappdata.length > 0 ? riskappdata[0].col2 : "",
      ans1: rankdata && rankdata.length > 0 ? rankdata[0].col2 : "",
      ans2: remarkdata && remarkdata.length > 0 ? remarkdata[0].col2 : ""
    },
    {
      id: 3,
      question: "Addition of man power",
      ans: riskappdata && riskappdata.length > 0 ? riskappdata[0].col3 : "",
      ans1: rankdata && rankdata.length > 0 ? rankdata[0].col3 : "",
      ans2: remarkdata && remarkdata.length > 0 ? remarkdata[0].col3 : ""
    },
    {
      id: 4,
      question: "New / complex technology for measurement/ eqp",
      ans: riskappdata && riskappdata.length > 0 ? riskappdata[0].col4 : "",
      ans1: rankdata && rankdata.length > 0 ? rankdata[0].col4 : "",
      ans2: remarkdata && remarkdata.length > 0 ? remarkdata[0].col4 : ""
    },
    {
      id: 5,
      question: "Investment in Lab / inspection facility",
      ans: riskappdata && riskappdata.length > 0 ? riskappdata[0].col5 : "",
      ans1: rankdata && rankdata.length > 0 ? rankdata[0].col5 : "",
      ans2: remarkdata && remarkdata.length > 0 ? remarkdata[0].col5 : ""
    },
    {
      id: 6,
      question: "Validation / testing required",
      ans: riskappdata && riskappdata.length > 0 ? riskappdata[0].col6 : "",
      ans1: rankdata && rankdata.length > 0 ? rankdata[0].col6 : "",
      ans2: remarkdata && remarkdata.length > 0 ? remarkdata[0].col6 : ""
    },
    {
      id: 7,
      question: "New matl - Customer validation / approval required",
      ans: riskappdata && riskappdata.length > 0 ? riskappdata[0].col7 : "",
      ans1: rankdata && rankdata.length > 0 ? rankdata[0].col7 : "",
      ans2: remarkdata && remarkdata.length > 0 ? remarkdata[0].col7 : ""
    },
    {
      id: 8,
      question: "Affecting process chara",
      ans: riskappdata && riskappdata.length > 0 ? riskappdata[0].col8 : "",
      ans1: rankdata && rankdata.length > 0 ? rankdata[0].col8 : "",
      ans2: remarkdata && remarkdata.length > 0 ? remarkdata[0].col8 : ""
    },
    {
      id: 9,
      question: "Method of measurement not known",
      ans: riskappdata && riskappdata.length > 0 ? riskappdata[0].col9 : "",
      ans1: rankdata && rankdata.length > 0 ? rankdata[0].col9 : "",
      ans2: remarkdata && remarkdata.length > 0 ? remarkdata[0].col9 : ""
    },
    {
      id: 10,
      question: "Effects human safety / fatigue / Product safety (CC) chara",
      ans: riskappdata && riskappdata.length > 0 ? riskappdata[0].col10 : "",
      ans1: rankdata && rankdata.length > 0 ? rankdata[0].col10 : "",
      ans2: remarkdata && remarkdata.length > 0 ? remarkdata[0].col10 : ""
    },
    {
      id: 11,
      question: "Effects productivity / efficiency of inspection",
      ans: riskappdata && riskappdata.length > 0 ? riskappdata[0].col11 : "",
      ans1: rankdata && rankdata.length > 0 ? rankdata[0].col11 : "",
      ans2: remarkdata && remarkdata.length > 0 ? remarkdata[0].col11 : ""
    }
  ]
  const Manufacturingobj = [
    {
      id: 1,
      question: "Skill required to operate",
      ans: riskappdata && riskappdata.length > 0 ? riskappdata[0].col1 : "",
      ans1: rankdata && rankdata.length > 0 ? rankdata[0].col1 : "",
      ans2: remarkdata && remarkdata.length > 0 ? remarkdata[0].col1 : ""
    },
    {
      id: 2,
      question: "Training required for Operator",
      ans: riskappdata && riskappdata.length > 0 ? riskappdata[0].col2 : "",
      ans1: rankdata && rankdata.length > 0 ? rankdata[0].col2 : "",
      ans2: remarkdata && remarkdata.length > 0 ? remarkdata[0].col2 : ""
    },
    {
      id: 3,
      question: "Addition of man power",
      ans: riskappdata && riskappdata.length > 0 ? riskappdata[0].col3 : "",
      ans1: rankdata && rankdata.length > 0 ? rankdata[0].col3 : "",
      ans2: remarkdata && remarkdata.length > 0 ? remarkdata[0].col3 : ""
    },
    {
      id: 4,
      question: "New tool/ jigs/ fixtures reqd",
      ans: riskappdata && riskappdata.length > 0 ? riskappdata[0].col4 : "",
      ans1: rankdata && rankdata.length > 0 ? rankdata[0].col4 : "",
      ans2: remarkdata && remarkdata.length > 0 ? remarkdata[0].col4 : ""
    },
    {
      id: 5,
      question: "Capex investment",
      ans: riskappdata && riskappdata.length > 0 ? riskappdata[0].col5 : "",
      ans1: rankdata && rankdata.length > 0 ? rankdata[0].col5 : "",
      ans2: remarkdata && remarkdata.length > 0 ? remarkdata[0].col5 : ""
    },
    {
      id: 6,
      question: "Change in layout",
      ans: riskappdata && riskappdata.length > 0 ? riskappdata[0].col6 : "",
      ans1: rankdata && rankdata.length > 0 ? rankdata[0].col6 : "",
      ans2: remarkdata && remarkdata.length > 0 ? remarkdata[0].col6 : ""
    },
    {
      id: 7,
      question: "Affecting safety chara",
      ans: riskappdata && riskappdata.length > 0 ? riskappdata[0].col7 : "",
      ans1: rankdata && rankdata.length > 0 ? rankdata[0].col7 : "",
      ans2: remarkdata && remarkdata.length > 0 ? remarkdata[0].col7 : ""
    },
    {
      id: 8,
      question: "New material - process / tooling validation reqd",
      ans: riskappdata && riskappdata.length > 0 ? riskappdata[0].col8 : "",
      ans1: rankdata && rankdata.length > 0 ? rankdata[0].col8 : "",
      ans2: remarkdata && remarkdata.length > 0 ? remarkdata[0].col8 : ""
    },
    {
      id: 9,
      question: "Affecting process parameters",
      ans: riskappdata && riskappdata.length > 0 ? riskappdata[0].col9 : "",
      ans1: rankdata && rankdata.length > 0 ? rankdata[0].col9 : "",
      ans2: remarkdata && remarkdata.length > 0 ? remarkdata[0].col9 : ""
    },
    {
      id: 10,
      question: "Change in process flow",
      ans: riskappdata && riskappdata.length > 0 ? riskappdata[0].col10 : "",
      ans1: rankdata && rankdata.length > 0 ? rankdata[0].col10 : "",
      ans2: remarkdata && remarkdata.length > 0 ? remarkdata[0].col10 : ""
    },
    {
      id: 11,
      question: "Affects human safety/ fatigue / ergonomics",
      ans: riskappdata && riskappdata.length > 0 ? riskappdata[0].col11 : "",
      ans1: rankdata && rankdata.length > 0 ? rankdata[0].col11 : "",
      ans2: remarkdata && remarkdata.length > 0 ? remarkdata[0].col11 : ""
    },
    {
      id: 12,
      question: "Affects productivity",
      ans: riskappdata && riskappdata.length > 0 ? riskappdata[0].col12 : "",
      ans1: rankdata && rankdata.length > 0 ? rankdata[0].col12 : "",
      ans2: remarkdata && remarkdata.length > 0 ? remarkdata[0].col12 : ""
    }
  ]
  const SDEobj = [
    {
      id: 1,
      question: "New supplier needs to be explored / developed",
      ans: riskappdata && riskappdata.length > 0 ? riskappdata[0].col1 : "",
      ans1: rankdata && rankdata.length > 0 ? rankdata[0].col1 : "",
      ans2: remarkdata && remarkdata.length > 0 ? remarkdata[0].col1 : ""
    },
    {
      id: 2,
      question: "Skill set required for Part development",
      ans: riskappdata && riskappdata.length > 0 ? riskappdata[0].col2 : "",
      ans1: rankdata && rankdata.length > 0 ? rankdata[0].col2 : "",
      ans2: remarkdata && remarkdata.length > 0 ? remarkdata[0].col2 : ""
    },
    {
      id: 3,
      question: "New/complex technology",
      ans: riskappdata && riskappdata.length > 0 ? riskappdata[0].col3 : "",
      ans1: rankdata && rankdata.length > 0 ? rankdata[0].col3 : "",
      ans2: remarkdata && remarkdata.length > 0 ? remarkdata[0].col3 : ""
    },
    {
      id: 4,
      question: "Capex investment",
      ans: riskappdata && riskappdata.length > 0 ? riskappdata[0].col4 : "",
      ans1: rankdata && rankdata.length > 0 ? rankdata[0].col4 : "",
      ans2: remarkdata && remarkdata.length > 0 ? remarkdata[0].col4 : ""
    },
    {
      id: 5,
      question: "New material - customer approval required",
      ans: riskappdata && riskappdata.length > 0 ? riskappdata[0].col5 : "",
      ans1: rankdata && rankdata.length > 0 ? rankdata[0].col5 : "",
      ans2: remarkdata && remarkdata.length > 0 ? remarkdata[0].col5 : ""
    },
    {
      id: 6,
      question: "Not easily avaliable",
      ans: riskappdata && riskappdata.length > 0 ? riskappdata[0].col6 : "",
      ans1: rankdata && rankdata.length > 0 ? rankdata[0].col6 : "",
      ans2: remarkdata && remarkdata.length > 0 ? remarkdata[0].col6 : ""
    },
    {
      id: 7,
      question: "Shortage of Material",
      ans: riskappdata && riskappdata.length > 0 ? riskappdata[0].col7 : "",
      ans1: rankdata && rankdata.length > 0 ? rankdata[0].col7 : "",
      ans2: remarkdata && remarkdata.length > 0 ? remarkdata[0].col7 : ""
    },
    {
      id: 8,
      question: "Complex process",
      ans: riskappdata && riskappdata.length > 0 ? riskappdata[0].col8 : "",
      ans1: rankdata && rankdata.length > 0 ? rankdata[0].col8 : "",
      ans2: remarkdata && remarkdata.length > 0 ? remarkdata[0].col8 : ""
    },
    {
      id: 9,
      question: "Affects productivity / flow of material",
      ans: riskappdata && riskappdata.length > 0 ? riskappdata[0].col9 : "",
      ans1: rankdata && rankdata.length > 0 ? rankdata[0].col9 : "",
      ans2: remarkdata && remarkdata.length > 0 ? remarkdata[0].col9 : ""
    }
  ]
  const Productionobj = [
    {
      id: 1,
      question: "High skill required",
      ans: riskappdata && riskappdata.length > 0 ? riskappdata[0].col1 : "",
      ans1: rankdata && rankdata.length > 0 ? rankdata[0].col1 : "",
      ans2: remarkdata && remarkdata.length > 0 ? remarkdata[0].col1 : ""
    },
    {
      id: 2,
      question: "NA",
      ans: riskappdata && riskappdata.length > 0 ? riskappdata[0].col2 : "",
      ans1: rankdata && rankdata.length > 0 ? rankdata[0].col2 : "",
      ans2: remarkdata && remarkdata.length > 0 ? remarkdata[0].col2 : ""
    },
    {
      id: 3,
      question: "NA",
      ans: riskappdata && riskappdata.length > 0 ? riskappdata[0].col3 : "",
      ans1: rankdata && rankdata.length > 0 ? rankdata[0].col3 : "",
      ans2: remarkdata && remarkdata.length > 0 ? remarkdata[0].col3 : ""
    },
    {
      id: 4,
      question: "NA",
      ans: riskappdata && riskappdata.length > 0 ? riskappdata[0].col4 : "",
      ans1: rankdata && rankdata.length > 0 ? rankdata[0].col4 : "",
      ans2: remarkdata && remarkdata.length > 0 ? remarkdata[0].col4 : ""
    },
    {
      id: 5,
      question: "NA",
      ans: riskappdata && riskappdata.length > 0 ? riskappdata[0].col5 : "",
      ans1: rankdata && rankdata.length > 0 ? rankdata[0].col5 : "",
      ans2: remarkdata && remarkdata.length > 0 ? remarkdata[0].col5 : ""
    },
    {
      id: 6,
      question: "NA",
      ans: riskappdata && riskappdata.length > 0 ? riskappdata[0].col6 : "",
      ans1: rankdata && rankdata.length > 0 ? rankdata[0].col6 : "",
      ans2: remarkdata && remarkdata.length > 0 ? remarkdata[0].col6 : ""
    },
    {
      id: 7,
      question: "Complex process",
      ans: riskappdata && riskappdata.length > 0 ? riskappdata[0].col7 : "",
      ans1: rankdata && rankdata.length > 0 ? rankdata[0].col7 : "",
      ans2: remarkdata && remarkdata.length > 0 ? remarkdata[0].col7 : ""
    },
    {
      id: 8,
      question: "Affects productivity",
      ans: riskappdata && riskappdata.length > 0 ? riskappdata[0].col8 : "",
      ans1: rankdata && rankdata.length > 0 ? rankdata[0].col8 : "",
      ans2: remarkdata && remarkdata.length > 0 ? remarkdata[0].col8 : ""
    },
  ]
  const [customer, SetCustomer] = useState(false);
  const [supplier, SetSupplier] = useState(false);
  const [magna, SetMagna] = useState(false);
  const [Transit, SetTransit] = useState(false);

  const [capYes, SetCapacityYes] = useState(false);
  const [capNo, SetCapacityNo] = useState(false);

  const [buildYes, SetBuildYes] = useState(false);
  const [buildNo, SetBuildNo] = useState(false);

  const [applicable, SetApplicable] = useState(false);
  const [notapplicable, SetNotApplicable] = useState(false);

  const [tableVal, setTableVal] = useState([]);
  const [tableData, setTableData] = useState(false);

  const [modalCode, setModalcode] = useState(0);
  const commondeptobj = selecteddept !== null && selecteddept === "D0002" ? Engineeringobj : selecteddept === "D0004" ? qualityobj : selecteddept === "D0005" ? purchaseonj : selecteddept === "D0006" ? SDEobj : selecteddept === "D0001" ? Manufacturingobj : selecteddept === "D0003" ? Productionobj : programManagementobj;
  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: modalCode === 1 ? 1600 : 700,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const getDateDiffInDays = (day1, day2) => {
    const diffInMs = Math.abs(day1 - day2);
    const diffInDays = Math.ceil(diffInMs / (1000 * 60 * 60 * 24));
    return diffInDays;
  };
  const curDate = moment(new Date());
  const dayCount = getDateDiffInDays(
    moment(reportDetail.Created_date),
    curDate
  );
  const ecrstatus = reportDetail.Is_active;

  //Commercial Approvals
  const [quote, SetQuote] = useState("");
  const [quoteCus, SetQuoteCus] = useState("");
  const [cusApproval, SetCustomerApproval] = useState("");
  const [poreceipt, SetPOReceipt] = useState("");
  const [absapproval, SetAbsApproval] = useState("");
  // const [checkimage, setCheckImage] = useState("data:image");

  const [changeimp, SetChangeImp] = useState("Select");
  const [timingtar, SetTimingTar] = useState("Select");
  const [costtar, SetCostTar] = useState("");
  const [qualitytar, SetQualityTar] = useState("");
  const [filemnger, Setfilemnger] = useState("");

  const [ischecked, setisChecked] = useState(0);

  const [AffProg, setAffProg] = useState("");
  const affprog = useRef(null);

  const [fqNoc, setFqNoc] = useState("");
  const fqnoc = useRef(null);

  const [Noc, setNoc] = useState("");
  const noc = useRef(null);

  const [productsafety, SetProductSafety] = useState();
  const [legal, SetLegal] = useState();
  const [statotory, SetStatototy] = useState();

  //Affected Relevant Table
  const documentobj = [
    {
      id: 1,
      value: "Drawing",
    },
    {
      id: 2,
      value: "PFMEA",
    },
    {
      id: 3,
      value: "DFMEA",
    },
    {
      id: 4,
      value: "Control Plan",
    },
    {
      id: 5,
      value: "E-BOM",
    },
    {
      id: 6,
      value: "SAP BOM",
    },
    {
      id: 7,
      value: "Incoming CP",
    },
    {
      id: 8,
      value: "F_off / Inp checklist",
    },
    {
      id: 9,
      value: "Supplier PO",
    },
    {
      id: 10,
      value: "Customer PO",
    },
    {
      id: 11,
      value: "Supplier AOI",
    },
    {
      id: 12,
      value: "Cusrtomer AOI",
    },
    {
      id: 13,
      value: "Homologation",
    },
    {
      id: 14,
      value: "Setup sheet & PY",
    },
    {
      id: 15,
      value: "JES",
    },
  ];

  const initialData = [...Array(documentobj.length)].map((_, index) => {
    let id = index + 1;
    return {
      key: id,
      document: "",
      applicable: false,
      actualDate: "",
      targetDate: "",
      remark: "",
      status: "",
      champion: "",
      func: "",
    };
  });
  // moment(newDate).format("YYYY-MM-DD")
  const updatedData = initialData.map((data, index) => {
    return {
      ...data,
      document: documentobj[index].value,
    };
  });
  // const feasibledaa = feasbltydata && feasbltydata.length > 0 && feasbltydata.map((res,i) => {
  //     console.log(`col`+`${++i}`)
  //   // return res[`col`+`${++i}`]
  //   return;
  // })

  const handleChangeCusname = (id) => (e) => {
    SetChecklist((prevData) =>
      prevData.map((item) => {
        if (item.id === id) {
          // if(filemnger.length > 0)
          return {
            ...item,
            cusname: e.target.value,
            status: item.picture > 0 ? "updated" : "inserted"
          };
        }
        return item;
      })
    );
  };
  const handleCheck = (id) => (event) => {
    SetChecklist((prevData) =>
      prevData.map((item) => {
        if (item.id === id) {
          if (event.target.checked === false) {
            return {
              ...item,
              check: event.target.checked,
              filename: "",
              cusname: "",
              status: ""
            };
          }
         else if (event.target.checked === true && item.picture === "" && item.status === "deleted") {
            return {
              ...item,
              check: event.target.checked,
              filename: "",
              status: "inserted"
            };
          }
          else if (event.target.checked === true && filemnger.length > 0 && item.picture !== "") {
            return {
              ...item,
              check: event.target.checked,
              filename: "",
              status: "updated"
            };
          }
          else {
            return {
              ...item,
              check: event.target.checked,
              status: "inserted"
            };
          }
        }
        return item;
      })
    );
  };
  console.log(checklst, "---checklst")
  //timtable
  const [timetabledata, setTimeTabledata] = useState([
    {
      key: 1,
      activity: "",
      planstart: "",
      planend: "",
      // lt1: "",
      actualstart: "",
      actualend: "",
      // lt2: "",
      champion: "",
    },
  ]);

  console.log(timetabledata, "----timetabledata")

  const initiateTimetab = () => {
    setTimeTabledata([
      {
        key: 0,
        activity: "",
        planstart: "",
        planend: "",
        // lt1: "",
        actualstart: "",
        actualend: "",
        // lt2: "",
        champion: "",
      },
    ]);
  };
  const handleFilesupload = (id) => (files) => {
    SetChecklist((prevData) =>
      prevData.map((item) => {
        let filname = files.fileList[0].name;
        let type = filname.split(".");
        if (item.id === id) {
          return {
            ...item,
            filename: filname,
            picture: files.base64.toString(),
            type: type[1],
            status: item.picture !== "" ? "updated" : "inserted"
          };
        }
        return item;
      })
    );
  };

  //change imp table
  const activityobj = [
    {
      id: 1,
      value: "Adjust line scan system & FG laebling",
    },
    {
      id: 2,
      value: "Internal PTR",
    },
    {
      id: 3,
      value: "DVP Approval , Sl#2",
    },
    {
      id: 4,
      value: "Proto sample / Initial submission",
    },
    {
      id: 5,
      value: "Customer approval for Proto / Initial samples",
    },
    {
      id: 6,
      value: "Product / Process Validation completion & approval",
    },
    {
      id: 7,
      value: "EDI release",
    },
    {
      id: 8,
      value: "Approval for implementation (PSW/Others)",
    },
    {
      id: 9,
      value: "Fixture Readiness",
    },
    {
      id: 10,
      value: "Appropriate labeling on Parts & Boxes (1st shipment",
    },
    {
      id: 11,
      value: "TGR / TGW / Lessons learned documentation",
    },
  ];

  const initialchngeimpData = [...Array(11)].map((_, index) => {
    let id = index + 1;
    return {
      key: id,
      applicable: false,
      document: "",
      champion: "",
      actualDate: "",
      remark: "",
    };
  });

  const updatedchngeimpData = initialchngeimpData.map((data, index) => {
    return {
      ...data,
      document: activityobj[index].value,
    };
  });
  const [chngeImpdata, setChngeImpData] = useState(updatedchngeimpData);
  //Break point tabl
  const activityBrkpntobj = [
    {
      id: 1,
      value: "Invoice Number",
    },
    {
      id: 2,
      value: "ASN Number",
    },
    {
      id: 3,
      value: " Logistics tracking Number",
    },
  ];

  const initialBrkpntData = [...Array(activityBrkpntobj.length)].map(
    (_, index) => {
      let id = index + 1;
      return {
        key: id,
        applicable: false,
        document: "",
        champion: "",
        actualDate: "",
        remark: "",
      };
    }
  );

  const updatedBrkpntData = initialBrkpntData.map((data, index) => {
    return {
      ...data,
      document: activityobj[index].value,
    };
  });
  const [brkpntdata, setBrkPntdata] = useState(updatedBrkpntData);

  const handleCellBrkPnttab = (key, dataIndex, value, isret) => {
    setBrkPntdata((prevData) =>
      prevData.map((item) => {
        if (item.key === key) {
          if (isret !== null && value === false && item.applicable === true) {
            return {
              ...item,
              actualDate: "",
              remark: "",
              rec: "delete",
              isEdited: "true",
              champion: "",
              [dataIndex]: value,
            };
          } else if (isret !== null && item.isEdited === "false") {
            return {
              ...item,
              rec: "update",
              isEdited: "true",
              [dataIndex]: value,
            };
          } else {
            return {
              ...item,
              rec: "insert",
              isEdited: "true",
              [dataIndex]: value,
            };
          }
        } else {
          return item;
        }
      })
    );
  };
  const handleDateBrkPnttab = (key, dataIndex, value, isret) => {
    setBrkPntdata((prevData) =>
      prevData.map((item) =>
        item.key === key
          ? {
            // ...item,
            // [dataIndex]: moment(value.$d).format("YYYY-MM-DD"),
            // ...(isret !== null ? { isEdited: "true" } : {}),
            ...item,
            ...(isret !== null && item.isEdited === "false" ? { rec: "update", isEdited: "true" } : { rec: "insert" }),
            [dataIndex]: moment(value.$d).format("YYYY-MM-DD"),
          }
          : item
      )
    );
  };

  const handleTimedata = (data) => {
    setTimeTabledata(data);
  };
  const handleAddTimeplan = ([data, newdata]) => {
    setTimeTabledata([...data, newdata]);
  };
  const [AffTabledata, setAffTableData] = useState(updatedData);

  const AfftabRetrRec = () => {
    if (affretdata) {
      if (affretdata.length > 0) {
        affretdata.map((record, index) => {
          setAffTableData((prevVal) =>
            prevVal.map((item) => {
              if (record.Document === item.document) {
                let tardate = record.Target_Date ? record.Target_Date.split("T") : "";
                let actdate = record.Actual_Date ? record.Actual_Date.split("T") : ""
                return {
                  // ...record,
                  key: index,
                  document: record.Document,
                  applicable: record.Applicable === 1 ? true : false,
                  champion: record.Champion,
                  func: record.Func,
                  targetDate: record.Target_Date ? tardate[0] : "",
                  actualDate: record.Actual_Date ? actdate[0] : "",
                  status: record.Status,
                  remark: record.Remark,
                  isEdited: "false",
                  rec: "",
                  ID: record.ID,
                  Mst_Id: record.Mst_Id,
                };
              }
              return item;
            })
          )

        });
        // setAffTableData(newdata);
      }
    }
  };

  // const AffTabhandleCellChange = (key, dataIndex, value, isret) => {
  //   console.log("isret----", isret)
  //   setAffTableData((prevData) =>
  //     prevData.map(
  //       (item) =>
  //         item.key === key
  //           ? {
  //             ...item,
  //             // ...(isret !== null && value === false && item.applicable === true ? { rec: "podaa" } : isret !== null && item.isEdited === "false" ? { rec: "update", isEdited: "true" } : { rec: "insert" }),

  //             [dataIndex]: value,
  //           }
  //           : item
  //     )
  //   );
  // };
  const AffTabhandleCellChange = (key, dataIndex, value, isret) => {
    setAffTableData((prevData) =>
      prevData.map((item) => {
        if (item.key === key) {
          if (isret !== null && value === false && item.applicable === true) {
            return {
              ...item,
              actualDate: "",
              targetDate: "",
              remark: "",
              status: "",
              rec: "delete",
              isEdited: "true",
              func: "",
              champion: "",
              [dataIndex]: value,
            };
          } else if (isret !== null && item.isEdited === "false") {
            return {
              ...item,
              rec: "update",
              isEdited: "true",
              [dataIndex]: value,
            };
          } else {
            return {
              ...item,
              rec: "insert",
              isEdited: "true",
              [dataIndex]: value,
            };
          }
        } else {
          return item;
        }
      })
    );
  };


  const AffTabhandleDateChange = (key, dataIndex, value, isret) => {
    setAffTableData((prevData) =>
      prevData.map((item) =>
        item.key === key
          ? {
            ...item,
            ...(isret !== null && item.isEdited === "false" ? { rec: "update", isEdited: "true" } : { rec: "insert" }),
            [dataIndex]: moment(value.$d).format("YYYY-MM-DD"),
          }
          : item
      )
    );
  };

  const TimeTabhandleCellChange = (key, dataIndex, value, isret) => {
    setTimeTabledata((prevData) =>
      prevData.map((item) =>
        item.key === key
          ? {
            ...item,
            [dataIndex]: value,
            ...(isret !== null ? { isEdited: "true" } : {}),
          }
          : item
      )
    );
  };

  const TimeTabhandleDateChange = (key, dataIndex, date, isret) => {
    setTimeTabledata((prevData) =>
      prevData.map((item) =>
        item.key === key
          ? {
            ...item,
            [dataIndex]: moment(date.$d).format("YYYY-MM-DD"),
            ...(isret !== null ? { isEdited: "true" } : {}),
          }
          : item
      )
    );
  };

  const handleCellChangeImptab = (key, dataIndex, value, isret) => {
    setChngeImpData((prevData) =>
      prevData.map((item) => {
        if (item.key === key) {
          if (isret !== null && value === false && item.applicable === true) {
            return {
              ...item,
              actualDate: "",
              remark: "",
              rec: "delete",
              isEdited: "true",
              champion: "",
              [dataIndex]: value,
            };
          } else if (isret !== null && item.isEdited === "false") {
            return {
              ...item,
              rec: "update",
              isEdited: "true",
              [dataIndex]: value,
            };
          } else {
            return {
              ...item,
              rec: "insert",
              isEdited: "true",
              [dataIndex]: value,
            };
          }
        } else {
          return item;
        }
      })
    );
  };

  const handleDateChangeImptab = (key, dataIndex, value, isret) => {
    setChngeImpData((prevData) =>
      prevData.map((item) =>
        item.key === key
          ? {
            // ...item,
            // [dataIndex]: moment(value.$d).format("YYYY-MM-DD"),
            // ...(isret !== null ? { isEdited: "true" } : {}),
            ...item,
            ...(isret !== null && item.isEdited === "false" ? { rec: "update", isEdited: "true" } : { rec: "insert" }),
            [dataIndex]: moment(value.$d).format("YYYY-MM-DD"),
          }
          : item
      )
    );
  };

  const Listobj = [
    {
      id: 1,
      value: "Yes",
    },
    {
      id: 2,
      value: "No",
    },
    {
      id: 3,
      value: "Not Applicable",
    },
  ];
  const changeimpobj = [
    {
      id: 1,
      value: "Completed",
    },
    {
      id: 2,
      value: "In Progress",
    },
    // {
    //   id: 3,
    //   value: "Not Started",
    // },
  ];
  const timingtargetobj = [
    {
      id: 1,
      value: "Target met",
    },
    {
      id: 2,
      value: "Target Not met",
    },
  ];
  const costtargetobj = [
    {
      id: 1,
      value: "Target met",
    },
    {
      id: 2,
      value: "Target Not met",
    },
  ];
  const qualitytargetobj = [
    {
      id: 1,
      value: "Target met",
    },
    {
      id: 2,
      value: "Target Not met",
    },
  ];
  const getTavVal = (data) => {
    setTableVal(data);
  };
  const handleOpenModal = (type) => {
    if (type === 0) {
      setModalcode(2);
      setBase64Image(beforePic);
      setOpen(true);

    } else if (type === 1) {
      setModalcode(2);
      setBase64Image(afterPic);
      setOpen(true);
    } else {
      setModalcode(1);
      setOpen(true)

    }
  };

  const handleCloseModal = () => setOpen(false);

  const handleChangeQuote = (event) => {
    SetQuote(event.target.value);
  };

  const handleChangeQuoteCus = (event) => {
    SetQuoteCus(event.target.value);
  };

  const handleChangeCusApproval = (event) => {
    SetCustomerApproval(event.target.value);
  };

  const handleChangePOReceipt = (event) => {
    SetPOReceipt(event.target.value);
  };

  const handleChangeObsApproval = (event) => {
    SetAbsApproval(event.target.value);
  };

  const fetcthAssignedStatus = async () => {
    const formdata = new FormData();
    formdata.append("id", reportDetail.ID);
    TaskStatus({ type: ACTION_TYPES.FETCH_START });
    await api
      .post("api/getAssignedECRTask", formdata, {
        "Content-Type": "text/plain",
      })
      .then((response) => {
        const recordset = response.data;
        if (recordset.success !== false) {
          if (recordset.data.length !== 0) {
            TaskStatus({
              type: ACTION_TYPES.FETCH_SUCCESS,
              payload: recordset.data,
            });
            // setAssignedStatus(recordset.data[0]);
          } else {
            // setAssignedStatus([]);
            TaskStatus({ type: ACTION_TYPES.FETCH_EMPTY });
          }
        } else {
          // setAssignedStatus([]);
          TaskStatus({ type: ACTION_TYPES.FETCH_EMPTY });
        }
      })
      .catch((error) => {
        TaskStatus({ type: ACTION_TYPES.FETCH_ERROR, payload: error });
      });
  };
  const fetcthApprovedStatus = async () => {
    const formdata = new FormData();
    formdata.append("id", reportDetail.ecr_no);
    dispatch({ type: ACTION_TYPES.FETCH_START });
    await api
      .post("api/getECRStatus", formdata, {
        "Content-Type": "text/plain",
      })
      .then((response) => {
        const recordset = response.data;
        if (recordset.success !== false) {
          if (recordset.data.length !== 0) {
            // setAssignedStatus(recordset.data[0]);
            dispatch({
              type: ACTION_TYPES.FETCH_SUCCESS,
              payload: recordset.data,
            });
          } else {
            // setAssignedStatus([]);
            dispatch({ type: ACTION_TYPES.FETCH_EMPTY });
          }
        } else {
          // setAssignedStatus([]);
          dispatch({ type: ACTION_TYPES.FETCH_EMPTY });
        }
      })
      .catch((error) => {
        dispatch({ type: ACTION_TYPES.FETCH_ERROR, payload: error });
      });
  };
  useEffect(() => {
    async function onloadFunc() {
      const formdata = new FormData();
      formdata.append("ID", reportDetail.ID);
      await api
        .post("api/getBase64EncodedImage", formdata, {
          "Content-Type": "text/plain",
        })
        .then((response) => {
          const recordset = response.data;
          if (recordset.success !== false) {
            setBeforePic(recordset.dataBefore);
            setAfterPic(recordset.dataAfter);
          } else {
            setBeforePic("");
            setAfterPic("");
          }
        })
        .catch((error) => {
          if (error) {
            console.log(error);
          }
        });
    }
    onloadFunc();
    setFqNoc(
      ecorecfield && ecorecfield.Change_Imp === 0 ? ecorecfield.FQ_No : ""
    );
    setNoc(
      ecorecfield && ecorecfield.Change_Imp === 0 ? ecorecfield.NOC_No : ""
    );
    setAffProg(
      ecorecfield && ecorecfield.Change_Imp === 0 ? ecorecfield.Aff_Program : ""
    );
    SetProductSafety(
      ecorecfield && ecorecfield.Change_Imp === 0
        ? ecorecfield.Product === 1
          ? true
          : false
        : false
    );
    SetStatototy(
      ecorecfield && ecorecfield.Change_Imp === 0
        ? ecorecfield.Safety === 1
          ? true
          : false
        : false
    );
    SetLegal(
      ecorecfield && ecorecfield.Change_Imp === 0
        ? ecorecfield.Legal === 1
          ? true
          : false
        : false
    );
    SetCustomer(
      ecorecfield && ecorecfield.Change_Imp === 0
        ? ecorecfield.Customer === 1
          ? true
          : false
        : false
    );
    SetSupplier(
      ecorecfield && ecorecfield.Change_Imp === 0
        ? ecorecfield.Supplier === 1
          ? true
          : false
        : false
    );
    SetMagna(
      ecorecfield && ecorecfield.Change_Imp === 0
        ? ecorecfield.Magna === 1
          ? true
          : false
        : false
    );
    SetTransit(
      ecorecfield && ecorecfield.Change_Imp === 0
        ? ecorecfield.Transit === 1
          ? true
          : false
        : false
    );
    SetChange_Imp(ecorecfield && ecorecfield.Change_Imp);
    SetCapacityYes(
      ecorecfield && ecorecfield.Change_Imp === 0
        ? ecorecfield.Capacity === 1
          ? true
          : false
        : false
    );
    SetCapacityNo(
      ecorecfield && ecorecfield.Change_Imp === 0
        ? ecorecfield.Capacity === 0
          ? true
          : false
        : false
    );
    SetBuildYes(
      ecorecfield && ecorecfield.Change_Imp === 0
        ? ecorecfield.Build_Req === 1
          ? true
          : false
        : false
    );
    SetBuildNo(
      ecorecfield && ecorecfield.Change_Imp === 0
        ? ecorecfield.Build_Req === 0
          ? true
          : false
        : false
    );
    SetApplicable(
      ecorecfield && ecorecfield.Change_Imp === 0
        ? ecorecfield.Specific_Cus_Req === 1
          ? true
          : false
        : false
    );
    SetNotApplicable(
      ecorecfield && ecorecfield.Change_Imp === 0
        ? ecorecfield.Specific_Cus_Req === 0
          ? true
          : false
        : false
    );
    SetPartnoretdata(
      ecorecord.length > 0 && ecorecord[1].length > 0 ? ecorecord[1] : null
    );
    SetChngeImpretdata(
      ecorecord.length > 0 && ecorecord[3].length > 0 ? ecorecord[3] : null
    );
    SetBrkPntretdata(
      ecorecord.length > 0 && ecorecord[4].length > 0 ? ecorecord[4] : null
    );
    SetTimeplnretdata(
      ecorecord.length > 0 && ecorecord[2].length > 0 ? ecorecord[2] : null
    );
    Setaffretdata(
      ecorecord.length > 0 && ecorecord[0].length > 0 ? ecorecord[0] : null
    );
    Setfilemnger(
      ecorecord.length > 0 && ecorecord[6].length > 0 ? ecorecord[6] : null
    );

    checklistobj.map((checklistItem) => {
      const matchingFileManagerItem =
        filemnger &&
        filemnger.find(
          (filemanagerItem) => filemanagerItem.id === checklistItem.id
        );

      if (matchingFileManagerItem) {
        return {
          ...checklistItem,
          filename: matchingFileManagerItem.File_Name,
        };
      }

      return checklistItem;
    });
    SetChecklist((prevData) =>
      prevData.map((item, i) => {
        const matchingFileManagerItem =
          filemnger &&
          filemnger.find((filemanagerItem) => filemanagerItem.id === item.id);
        let chklst = `Chklst${++i}`;
        if (matchingFileManagerItem) {
          return {
            ...item,
            mstid: matchingFileManagerItem.Mst_id,
            id:matchingFileManagerItem.ID,
            filename: matchingFileManagerItem.File_Name,
            picture: matchingFileManagerItem.picture,
            cusname: matchingFileManagerItem[chklst],
            check: matchingFileManagerItem[chklst] !== "" ? true : false,
            status: "retrieve"
          };
        }
        return item;
      })
    );

    SetQuote(
      ecorecord.length > 0 && ecorecord[5].length > 0
        ? ecorecord[5][0].Quote_CFT
        : ""
    );
    SetQuoteCus(
      ecorecord.length > 0 && ecorecord[5].length > 0
        ? ecorecord[5][0].Quote_Customer
        : ""
    );
    SetCustomerApproval(
      ecorecord.length > 0 && ecorecord[5].length > 0
        ? ecorecord[5][0].Custmr_Apprvl
        : ""
    );
    SetPOReceipt(
      ecorecord.length > 0 && ecorecord[5].length > 0
        ? ecorecord[5][0].PO_Rec
        : ""
    );
    SetAbsApproval(
      ecorecord.length > 0 && ecorecord[5].length > 0
        ? ecorecord[5][0].Obs_Apprvl
        : ""
    );
    SetChangeImp(
      ecorecord.length > 0 && ecorecord[5].length > 0
        ? ecorecord[5][0].Change_Imp
        : ""
    );
    SetTimingTar(
      ecorecord.length > 0 && ecorecord[5].length > 0
        ? ecorecord[5][0].Timing_Target
        : ""
    );
    SetCostTar(
      ecorecord.length > 0 && ecorecord[5].length > 0
        ? ecorecord[5][0].Cost_Target
        : ""
    );
    SetQualityTar(
      ecorecord.length > 0 && ecorecord[5].length > 0
        ? ecorecord[5][0].Quality_Target
        : ""
    );
    SetPartnoretdata(
      (prevVal) =>
        prevVal &&
        prevVal.map((item) => {
          return {
            ...item,
            isEdited: "false",
          };
        })
    );

    ChngeImpretdata &&
      ChngeImpretdata.map((data, i) => {
        let index = i + 1;
        setChngeImpData((prevVal) =>
          prevVal.map((item) => {
            // let champ = item.champion;
            if (item.key === index) {
              const actdate = data.Actual_Date !== null ? data.Actual_Date.split("T") : null;
              return {
                ...item,
                champion: data.Champion,
                remark: data.Remark,
                actualDate: data.Actual_Date !== null ? actdate[0] : "-",
                isEdited: "false",
                rec: "",
                ID: data.ID,
                Mst_Id: data.Mst_Id,
                applicable: data.Champion !== "" ? true : false,
              };
            }
            return item;
          })
        );
      });

    BrkPntretdata &&
      BrkPntretdata.map((data, i) => {
        let index = i + 1;
        setBrkPntdata((prevVal) =>
          prevVal.map((item) => {
            // let champ = item.champion;

            if (item.key === index) {
              const actdate = data.Actual_Date !== null ? data.Actual_Date.split("T") : null;
              return {
                ...item,
                champion: data.Champion,
                remark: data.Remark,
                actualDate: data.Actual_Date !== null ? actdate[0] : "-",
                isEdited: "false",
                rec: "",
                ID: data.ID,
                Mst_Id: data.Mst_Id,
                applicable: data.Champion !== "" ? true : false,
              };
            }
            return item;
          })
        );
      });
    // Timeplnretdata &&
    //   Timeplnretdata.map((data, i) => {
    //     // let index = i + 1;
    //     setTimeTabledata((prevVal) =>
    //       [...Array(Timeplnretdata.length)].map((item) => {
    //         // let champ = item.champion;
    //         // if (item.key === i) {
    //         const plantdate1 = data.Plan_Start.split("T");
    //         const plandate2 = data.Plan_End.split("T");
    //         const actualdate1 = data.Actual_Start.split("T");
    //         const actualdate2 = data.Actual_End.split("T");
    //         return {
    //           ...data,
    //           // ...Timeplnretdata,
    //           activity: data.Activity,
    //           planstart: plantdate1[0],
    //           planend: plandate2[0],
    //           // lt1: data.LT1,
    //           actualstart: actualdate1[0],
    //           actualend: actualdate2[0],
    //           // lt2: data.LT2,
    //           champion: data.Champion,
    //           isEdited: "false",
    //           ID: data.ID,
    //           Mst_Id: data.Mst_Id,
    //         };
    //         // }
    //         // return item;
    //       })
    //     );
    //   });
    const newTimetableData = Timeplnretdata && Timeplnretdata.map((item, index) => ({
      key: index,
      activity: item.Activity,
      planstart: item.Plan_Start,
      planend: item.Plan_End,
      actualstart: item.Actual_Start,
      actualend: item.Actual_End,
      champion: item.Champion,
    }));
    newTimetableData ? setTimeTabledata(newTimetableData) : ""
    fetcthAssignedStatus();
    fetcthApprovedStatus();
  }, [reportDetail, ecorecfield, ecorecord, ChngeImpretdata]);

  const handleSubmit = async () => {
    if (fqnoc.current.value !== "" && noc.current.value !== "") {
      if (tableVal !== undefined && tableVal !== "" && tableVal.length > 0) {
        let requiredinscol = [
          "currentPart1",
          "currentRev1",
          "currentMagnaPart1",
          "currentMagnaRev1",
          "customerPart2",
          "customerRev2",
          "customerMagnaPart2",
          "customerMagnaRev2",
        ];
        const validateObj = tableVal.every((obj) =>
          requiredinscol.every(
            (col) => obj[col] !== null && obj[col] !== undefined
          )
        );

        if (validateObj) {
          if (
            quote !== "" &&
            quoteCus !== "" &&
            cusApproval !== "" &&
            poreceipt !== "" &&
            absapproval !== "" &&
            affprog.current.value !== "" &&
            (productsafety !== false || legal !== false || statotory !== false)
          ) {
            const Afftabfildata = AffTabledata.filter(
              (data) => data.applicable === true
            );
            const isValidAffobj =
              Afftabfildata.length > 0 &&
              Afftabfildata.every(
                (item) =>
                  (item.applicable === true || item.applicable === false) &&
                  item.remark !== "" &&
                  item.status !== "" &&
                  item.champion !== "" &&
                  item.func !== ""
              );
            const chngeImpfildata = chngeImpdata.filter(
              (data) => data.applicable === true
            );

            const isValidChngeimpObj =
              chngeImpfildata.length > 0 &&
              chngeImpfildata.every(
                (item) =>
                  item.remark !== "" && item.champion !== ""
              );
            const brkpntfildata = brkpntdata.filter(
              (data) => data.applicable === true
            );
            const isValidBrkpntobj =
              brkpntfildata.length > 0 &&
              brkpntfildata.every(
                (item) =>
                  item.remark !== "" && item.champion !== ""
              );
            const chkfildata = checklst.filter((data) => data.check === true);
            const chklstdata =
              chkfildata.length > 0 &&
              chkfildata.every((item) => item.filename !== "" && item.cusname);

            if (Afftabfildata.length > 0 && isValidAffobj) {
              if (timetabledata.length > 0) {
                const isValidTimeTabobj = timetabledata.every(
                  (item) =>
                    (item.activity !== "" && item.champion !== "")
                );
                if (isValidTimeTabobj) {
                  if (isValidChngeimpObj && chngeImpfildata.length > 0) {
                    if (isValidBrkpntobj && brkpntfildata.length > 0) {
                      if (
                        chkfildata.length > 0 &&
                        chklstdata &&
                        (capYes !== false || capNo !== false) &&
                        (buildYes !== false || buildNo !== false) &&
                        (applicable !== false || notapplicable !== false)
                      ) {
                        if (
                          changeimp !== "" &&
                          timingtar !== "" &&
                          costtar !== "" &&
                          qualitytar !== ""
                        ) {
                          setIsLoading(true);
                          const formdata = new FormData();
                          let updmstid = ecorecfield && ecorecfield.ID;

                          let date = reportDetail.Created_date;
                          let creadate = date.split("T");
                          formdata.append("ecrno", reportDetail.ecr_no);
                          formdata.append("createddate", creadate[0]);
                          formdata.append("createdby", reportDetail.Emp_Name);
                          formdata.append(
                            "closeddate",
                            moment(newDate).format("YYYY-MM-DD")
                          );
                          formdata.append("fqnoc", fqnoc.current.value);
                          formdata.append("noc", noc.current.value);

                          formdata.append(
                            "partnodata",
                            JSON.stringify(tableVal)
                          );
                          formdata.append("quote", quote);
                          formdata.append("quoteCus", quoteCus);
                          formdata.append("cusApproval", cusApproval);
                          formdata.append("poreceipt", poreceipt);
                          formdata.append("absapproval", absapproval);
                          formdata.append("affprog", affprog.current.value);
                          if (productsafety === true) {
                            formdata.append("product", 1);
                          } else {
                            formdata.append("product", 0);
                          }
                          if (statotory === true) {
                            formdata.append("statotory", 1);
                          } else {
                            formdata.append("statotory", 0);
                          }
                          if (legal === true) {
                            formdata.append("legal", 1);
                          } else {
                            formdata.append("legal", 0);
                          }

                          formdata.append(
                            "AffTabledata",
                            JSON.stringify(Afftabfildata)
                          );
                          formdata.append(
                            "timetabledata",
                            JSON.stringify(timetabledata)
                          );
                          formdata.append(
                            "chngeImpdata",
                            JSON.stringify(chngeImpfildata)
                          );
                          formdata.append(
                            "brkpntdata",
                            JSON.stringify(brkpntfildata)
                          );

                          formdata.append("chklst", JSON.stringify(chkfildata));

                          if (capYes === true) {
                            formdata.append("capacity", 1);
                          } else if (capNo === true) {
                            formdata.append("capacity", 0);
                          }

                          if (buildYes === true) {
                            formdata.append("build", 1);
                          } else if (buildNo === true) {
                            formdata.append("build", 0);
                          }

                          if (applicable === true) {
                            formdata.append("applicable", 1);
                          } else if (notapplicable === true) {
                            formdata.append("applicable", 0);
                          }

                          if (changeimp === 1) {
                            //complete
                            formdata.append("ecostatus", 2);
                          } else if (changeimp === 2) {
                            //in progress
                            formdata.append("ecostatus", 0);
                          } else if (changeimp === 3) {
                            //not started
                            formdata.append("ecostatus", 1);
                          }
                          // formdata.append("changeimp", changeimp);
                          if (changeimp === 1) {
                            //complete
                            formdata.append("changeimp", 2);
                          } else if (changeimp === 2) {
                            //in progress
                            formdata.append("changeimp", 0);
                          }

                          if (timingtar === 1) {
                            formdata.append("timingtar", 1);
                          } else if (timingtar === 2) {
                            formdata.append("timingtar", 2);
                          }
                          formdata.append("costtar", costtar);
                          formdata.append("qualitytar", qualitytar);
                          formdata.append("updmstid", updmstid);

                          await api
                            .post("api/InsertECORequestDetails", formdata, {
                              "Content-Type": "text/plain",
                            })
                            .then((res) => {
                              if (res !== undefined && res !== null) {
                                setIsLoading(false);
                                const recordset = res.data;
                                if (recordset.success === true) {
                                  toast.success(
                                    "Request Submitted Successfuly!",
                                    {
                                      position: toast.POSITION.BOTTOM_RIGHT,
                                    }
                                  );
                                  let check = ischecked + 1;
                                  setisChecked(check);
                                  let resetChngeimpdata = chngeImpdata.map(
                                    (item) => {
                                      return {
                                        ...item,
                                        actualDate:
                                          moment(newDate).format("YYYY-MM-DD"),
                                        champion: "",
                                        remark: "",
                                      };
                                    }
                                  );
                                  let resettimeplandata = timetabledata.map(
                                    (item) => {
                                      return {
                                        ...item,
                                        actualend:
                                          moment(newDate).format("YYYY-MM-DD"),
                                        actualstart:
                                          moment(newDate).format("YYYY-MM-DD"),
                                        // lt1: "",
                                        // lt2: "",
                                        activity: "",
                                        champion: "",
                                        planend:
                                          moment(newDate).format("YYYY-MM-DD"),
                                        planstart:
                                          moment(newDate).format("YYYY-MM-DD"),
                                      };
                                    }
                                  );
                                  let resetAffTabdata = AffTabledata.map(
                                    (item) => {
                                      return {
                                        ...item,
                                        actualDate:
                                          moment(newDate).format("YYYY-MM-DD"),
                                        applicable: false,
                                        champion: "",
                                        remark: "",
                                        status: "",
                                        targetDate:
                                          moment(newDate).format("YYYY-MM-DD"),
                                        function: "",
                                      };
                                    }
                                  );
                                  let resetBrkpntdata = brkpntdata.map(
                                    (item) => {
                                      return {
                                        ...item,
                                        actualDate:
                                          moment(newDate).format("YYYY-MM-DD"),
                                        champion: "",
                                        remark: "",
                                      };
                                    }
                                  );
                                  setChngeImpData(resetChngeimpdata);
                                  setTimeTabledata(resettimeplandata);
                                  setAffTableData(resetAffTabdata);
                                  setBrkPntdata(resetBrkpntdata);
                                  fqnoc.current.value = "";
                                  noc.current.value = "";
                                  affprog.current.value = "";
                                  SetQuote("");
                                  SetQuoteCus("");
                                  SetCustomerApproval("");
                                  SetPOReceipt("");
                                  SetAbsApproval("");
                                  SetProductSafety(false);
                                  SetLegal(false);
                                  SetStatototy(false);
                                  setTableVal("");
                                  setTableData(tableData);
                                  SetCustomer(false);
                                  SetSupplier(false);
                                  SetMagna(false);
                                  SetTransit(false);
                                  SetCapacityNo(false);
                                  SetCapacityYes(false);
                                  SetBuildYes(false);
                                  SetBuildNo(false);
                                  SetApplicable(false);
                                  SetNotApplicable(false);
                                  SetTimingTar("Select");
                                  SetCostTar("");
                                  SetQualityTar("");
                                  SetChangeImp("Select");
                                  handleClickBack();
                                  handleEcostatus();
                                }
                              } else {
                                toast.error(
                                  "Request Failed... Please Try Again!!!",
                                  {
                                    position: toast.POSITION.BOTTOM_RIGHT,
                                  }
                                );
                              }
                            });
                        } else {
                          toast.error("Final Change Status is mandatory!!!", {
                            position: toast.POSITION.BOTTOM_RIGHT,
                          });
                        }
                      } else {
                        {
                          toast.error("Check List Field is mandatory!!!", {
                            position: toast.POSITION.BOTTOM_RIGHT,
                          });
                        }
                      }
                    } else {
                      toast.error("Break Point Table Field is mandatory!!!", {
                        position: toast.POSITION.BOTTOM_RIGHT,
                      });
                    }
                  } else {
                    toast.error("Change Implementation Field is mandatory!!!", {
                      position: toast.POSITION.BOTTOM_RIGHT,
                    });
                  }
                } else {
                  toast.error("Time Plan Table Field is mandatory!!!", {
                    position: toast.POSITION.BOTTOM_RIGHT,
                  });
                }
              } else {
                toast.error("Time Plan Table Field is mandatory!!!", {
                  position: toast.POSITION.BOTTOM_RIGHT,
                });
              }
            } else {
              toast.error(
                "Affected Relevant Documentation Field is mandatory!!!",
                {
                  position: toast.POSITION.BOTTOM_RIGHT,
                }
              );
            }
          } else {
            toast.error("Commercial Approval Field is mandatory!!!", {
              position: toast.POSITION.BOTTOM_RIGHT,
            });
          }
        } else {
          toast.error("Part Number Revision Details Field is mandatory!!!", {
            position: toast.POSITION.BOTTOM_RIGHT,
          });
        }
      } else {
        toast.error("Part Number Revision Details Field is mandatory!!!", {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      }
    } else {
      toast.error("Engineering Change Order Field is mandatory!!!", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    }
  };

  const handleViewTask = async (dept) => {
    setSelectedDept(dept);
    handleOpenModal(2)
    const ecrno = reportDetail.ecr_no;
    const formdata = new FormData();
    formdata.append("ecrno", ecrno);
    formdata.append("dept", dept)
    await api
      .post("api/getViewTask", formdata, {
        "Content-Type": "text/plain",
      })
      .then((res) => {
        if (res !== undefined && res !== null) {
          const recordset = res.data;
          if (recordset.success === true) {
            if (recordset.data.length !== 0) {
              setViewTaskdata(recordset.data);
            }
          }
        }
      })

  }

  const handleUpdate = async () => {
    if (fqnoc.current.value !== "" && noc.current.value !== "") {
      // tableVal ---> insert
      //partnoretdata --> update
      if (tableVal !== undefined && tableVal !== "" && tableVal.length > 0) {
        let requiredinscol = [
          "currentPart1",
          "currentRev1",
          "currentMagnaPart1",
          "currentMagnaRev1",
          "customerPart2",
          "customerRev2",
          "customerMagnaPart2",
          "customerMagnaRev2",
        ];
        let insertPartrec = [];
        if (tableVal.length !== Partnoretdata.length) {
          let remrow = tableVal.length - Partnoretdata.length;
          insertPartrec = tableVal.slice(-remrow);
          tableVal.splice(-remrow);
        }
        const validateObj = tableVal.every((obj) =>
          requiredinscol.every(
            (col) => obj[col] !== null && obj[col] !== undefined
          )
        );

        if (validateObj) {
          if (
            quote !== "" &&
            quoteCus !== "" &&
            cusApproval !== "" &&
            poreceipt !== "" &&
            absapproval !== "" &&
            affprog.current.value !== "" &&
            (productsafety !== false || legal !== false || statotory !== false)
          ) {
            //update , delete and insert using filter...
            const updatedfilteredAfftabdata = AffTabledata.filter(
              (item) => item.isEdited === "true" && item.rec === "update"
            );
            const insertedfilterAfftabdata = AffTabledata.filter((item) => item.isEdited === "true" && item.rec === "insert")
            const deletedfilterAfftabdata = AffTabledata.filter((item) => item.isEdited === "true" && item.rec === "delete" && item.applicable === false)

            const updatedfilteredchngeImpdata = chngeImpdata.filter(
              (item) => item.isEdited === "true" && item.rec === "update"
            );
            const insertedfilteredchngeImpdata = chngeImpdata.filter((item) => item.rec === "insert")
            const deletedfilteredchngeImpdata = chngeImpdata.filter((item) => item.isEdited === "true" && item.rec === "delete" && item.applicable === false)

            const updatedfilteredBrkPntdata = brkpntdata.filter(
              (item) => item.isEdited === "true" && item.rec === "update"
            );
            const insertedfilteredBrkPntdata = brkpntdata.filter((item) => item.rec === "insert")
            const deletedfilteredBrkPntdata = AffTabledata.filter((item) => item.isEdited === "true" && item.rec === "delete" && item.applicable === false)

            //--------------
            const isValidAffData = (data) => {
              return data.every(
                (item) =>
                  (item.applicable === true || item.applicable === false) &&
                  item.remark !== "" &&
                  item.status !== "" &&
                  item.champion !== "" &&
                  item.func !== ""
              );
            };

            const isValidData = (data) => {
              return data.every(
                (item) =>
                  item.remark !== "" && item.champion !== ""
              )
            }

            const isValidChngeImpobj = updatedfilteredchngeImpdata.length > 0
              ? isValidData(updatedfilteredchngeImpdata)
              : true;

            const isValidinsChngeInsobj = insertedfilteredchngeImpdata.length > 0
              ? isValidData(insertedfilteredchngeImpdata)
              : true;

            const isValidBrkPntobj = updatedfilteredBrkPntdata.length > 0
              ? isValidData(updatedfilteredBrkPntdata)
              : true;

            const isValidinsBrkpntInsobj = insertedfilteredBrkPntdata.length > 0
              ? isValidData(insertedfilteredBrkPntdata)
              : true;

            const isValidAffobj = updatedfilteredAfftabdata.length > 0
              ? isValidAffData(updatedfilteredAfftabdata)
              : true;

            const isValidinsAffobj = insertedfilterAfftabdata.length > 0
              ? isValidAffData(insertedfilterAfftabdata)
              : true;
              
              const isValidChklstData = (data) => {
                return data.every(
                  (item) =>
                  item.filename !== "" && item.cusname !== ""
                );
              };

            const chkfilterupddata = checklst.filter((data) => data.check === true && data.status === "updated");
            const chkfilterinsdata = checklst.filter((data) => data.check === true && data.status === "inserted");
            // const chkdeldata = checklst.filter((data) => data.check === false && data.status === "deleted");
            // const delmstid = chkdeldata && chkdeldata.length > 0 && chklstdata.map((res) => {
            //   return res.mstid
            // })
            const chkupddata = chkfilterupddata.length > 0
              ? isValidChklstData(chkfilterupddata)
              : true;
              const chkinsdata = chkfilterinsdata.length > 0
              ? isValidChklstData(chkfilterinsdata)
              : true;
            let insertTimetabrec = [];
            if (isValidAffobj && isValidinsAffobj) {
              if (timetabledata.length !== Timeplnretdata.length) {
                let remrow = timetabledata.length - Timeplnretdata.length;
                insertTimetabrec = timetabledata.slice(-remrow);
                timetabledata.splice(-remrow);
              }
              if (timetabledata.length > 0) {
                const isValidTimeTabobj = timetabledata.every(
                  (item) => item.activity !== "" && item.champion !== ""
                );
                const isValidTimeTabinsobj =
                  insertTimetabrec &&
                  insertTimetabrec.every(
                    (item) => item.activity !== "" && item.champion !== ""
                  );
                if (isValidTimeTabobj && isValidTimeTabinsobj) {

                  if (isValidChngeImpobj && isValidinsChngeInsobj) {
                    if (isValidBrkPntobj && isValidinsBrkpntInsobj) {
                      if (
                        chkupddata &&
                        chkinsdata &&
                        (capYes !== false || capNo !== false) &&
                        (buildYes !== false || buildNo !== false) &&
                        (applicable !== false || notapplicable !== false)
                      ) {
                        if (
                          changeimp !== "" &&
                          timingtar !== "" &&
                          costtar !== "" &&
                          qualitytar !== ""
                        ) {
                          setIsLoading(true);
                          const formdata = new FormData();
                          let updmstid = ecorecfield && ecorecfield.ID;
                          let customerval = customer === true ? 1 : 0;
                          let supplierval = supplier === true ? 1 : 0;
                          let magnaval = magna === true ? 1 : 0;
                          let Transitval = Transit === true ? 1 : 0;
                          let date = reportDetail.Created_date;
                          let creadate = date.split("T");
                          formdata.append("ecrno", reportDetail.ecr_no);
                          formdata.append("createddate", creadate[0]);
                          formdata.append("createdby", reportDetail.Emp_Name);
                          formdata.append(
                            "closeddate",
                            moment(newDate).format("YYYY-MM-DD")
                          );
                          formdata.append("fqnoc", fqnoc.current.value);
                          formdata.append("noc", noc.current.value);
                          formdata.append(
                            "insertPartrec",
                            JSON.stringify(insertPartrec)
                          );
                          formdata.append(
                            "partnodata",
                            JSON.stringify(tableVal)
                          );
                          formdata.append(
                            "insertTimetabrec",
                            JSON.stringify(insertTimetabrec)
                          );
                          formdata.append("quote", quote);
                          formdata.append("quoteCus", quoteCus);
                          formdata.append("cusApproval", cusApproval);
                          formdata.append("poreceipt", poreceipt);
                          formdata.append("absapproval", absapproval);
                          formdata.append("affprog", affprog.current.value);
                          if (productsafety === true) {
                            formdata.append("product", 1);
                          } else {
                            formdata.append("product", 0);
                          }

                          if (statotory === true) {
                            formdata.append("statotory", 1);
                          } else {
                            formdata.append("statotory", 0);
                          }

                          if (legal === true) {
                            formdata.append("legal", 1);
                          } else {
                            formdata.append("legal", 0);
                          }

                          formdata.append(
                            "UpdAffTabledata",
                            JSON.stringify(updatedfilteredAfftabdata)
                          );
                          formdata.append("InsAffTabledata", JSON.stringify(insertedfilterAfftabdata))

                          formdata.append(
                            "timetabledata",
                            JSON.stringify(timetabledata)
                          );
                          formdata.append(
                            "chngeImpdata",
                            JSON.stringify(updatedfilteredchngeImpdata)
                          );
                          formdata.append("InsChngeImpdata", JSON.stringify(insertedfilteredchngeImpdata))
                          formdata.append(
                            "brkpntdata",
                            JSON.stringify(updatedfilteredBrkPntdata)
                          );
                          formdata.append("DelAffTabdata", JSON.stringify(deletedfilterAfftabdata))
                          formdata.append("DelChngeImpdata", JSON.stringify(deletedfilteredchngeImpdata))
                          formdata.append("InsBrkPntdata", JSON.stringify(insertedfilteredBrkPntdata))
                          formdata.append("DelBrkPntdata", JSON.stringify(deletedfilteredBrkPntdata))
                          // formdata.append("chklst", JSON.stringify(chklstdata));
                          formdata.append("customer", customerval);
                          formdata.append("supplier", supplierval);
                          formdata.append("magna", magnaval);
                          formdata.append("Transit", Transitval);

                          if (capYes === true) {
                            formdata.append("capacity", 1);
                          } else if (capNo === true) {
                            formdata.append("capacity", 0);
                          }

                          if (buildYes === true) {
                            formdata.append("build", 1);
                          } else if (buildNo === true) {
                            formdata.append("build", 0);
                          }

                          if (applicable === true) {
                            formdata.append("applicable", 1);
                          } else if (notapplicable === true) {
                            formdata.append("applicable", 0);
                          }

                          if (changeimp === 1) {
                            //complete
                            formdata.append("ecostatus", 2);
                          } else if (changeimp === 2) {
                            //in progress
                            formdata.append("ecostatus", 0);
                          } else if (changeimp === 3) {
                            //not started
                            formdata.append("ecostatus", 1);
                          }
                          // formdata.append("changeimp", changeimp);
                          if (changeimp === 1) {
                            //complete
                            formdata.append("changeimp", 2);
                          } else if (changeimp === 0) {
                            //in progress
                            formdata.append("changeimp", 0);
                          }
                          formdata.append("chkupddata",JSON.stringify(chkfilterupddata));
                          formdata.append("chkinsdata",JSON.stringify(chkfilterinsdata))
                          formdata.append("timingtar", timingtar);
                          formdata.append("costtar", costtar);
                          formdata.append("qualitytar", qualitytar);
                          formdata.append("updmstid", updmstid);

                          await api
                            .post("api/UpdateECORequestDetails", formdata, {
                              "Content-Type": "text/plain",
                            })
                            .then((res) => {
                              if (res !== undefined && res !== null) {
                                setIsLoading(false);
                                const recordset = res.data;
                                if (recordset.success === true) {
                                  toast.success(
                                    "Rocords Updated Successfuly!",
                                    {
                                      position: toast.POSITION.BOTTOM_RIGHT,
                                    }
                                  );
                                  let check = ischecked + 1;
                                  setisChecked(check);
                                  let resetChngeimpdata = chngeImpdata.map(
                                    (item) => {
                                      return {
                                        ...item,
                                        actualDate:
                                          moment(newDate).format("YYYY-MM-DD"),
                                        champion: "",
                                        remark: "",
                                      };
                                    }
                                  );
                                  let resettimeplandata = timetabledata.map(
                                    (item) => {
                                      return {
                                        ...item,
                                        actualend:
                                          moment(newDate).format("YYYY-MM-DD"),
                                        actualstart:
                                          moment(newDate).format("YYYY-MM-DD"),
                                        lt1: "",
                                        lt2: "",
                                        activity: "",
                                        champion: "",
                                        planend:
                                          moment(newDate).format("YYYY-MM-DD"),
                                        planstart:
                                          moment(newDate).format("YYYY-MM-DD"),
                                      };
                                    }
                                  );
                                  let resetAffTabdata = AffTabledata.map(
                                    (item) => {
                                      return {
                                        ...item,
                                        actualDate:
                                          moment(newDate).format("YYYY-MM-DD"),
                                        applicable: false,
                                        champion: "",
                                        remark: "",
                                        status: "",
                                        targetDate:
                                          moment(newDate).format("YYYY-MM-DD"),
                                        function: "",
                                      };
                                    }
                                  );
                                  let resetBrkpntdata = brkpntdata.map(
                                    (item) => {
                                      return {
                                        ...item,
                                        actualDate:
                                          moment(newDate).format("YYYY-MM-DD"),
                                        champion: "",
                                        remark: "",
                                      };
                                    }
                                  );
                                  setChngeImpData(resetChngeimpdata);
                                  setTimeTabledata(resettimeplandata);
                                  setAffTableData(resetAffTabdata);
                                  setBrkPntdata(resetBrkpntdata);
                                  fqnoc.current.value = "";
                                  noc.current.value = "";
                                  affprog.current.value = "";
                                  SetQuote("");
                                  SetQuoteCus("");
                                  SetCustomerApproval("");
                                  SetPOReceipt("");
                                  SetAbsApproval("");
                                  SetProductSafety(false);
                                  SetLegal(false);
                                  SetStatototy(false);
                                  setTableVal("");
                                  setTableData(tableData);
                                  SetCustomer(false);
                                  SetSupplier(false);
                                  SetMagna(false);
                                  SetTransit(false);
                                  SetCapacityNo(false);
                                  SetCapacityYes(false);
                                  SetBuildYes(false);
                                  SetBuildNo(false);
                                  SetApplicable(false);
                                  SetNotApplicable(false);
                                  SetTimingTar("Select");
                                  SetCostTar("");
                                  SetQualityTar("");
                                  SetChangeImp("Select");
                                  handleClickBack();
                                  handleEcostatus();
                                }
                              } else {
                                toast.error(
                                  "Request Failed... Please Try Again!!!",
                                  {
                                    position: toast.POSITION.BOTTOM_RIGHT,
                                  }
                                );
                              }
                            });
                        } else {
                          toast.error("Final Change Status is mandatory!!!", {
                            position: toast.POSITION.BOTTOM_RIGHT,
                          });
                        }
                      } else {
                        {
                          toast.error("Check List Field is mandatory!!!", {
                            position: toast.POSITION.BOTTOM_RIGHT,
                          });
                        }
                      }
                    } else {
                      toast.error("Break Point Table Field is mandatory!!!", {
                        position: toast.POSITION.BOTTOM_RIGHT,
                      });
                    }
                  } else {
                    toast.error("Change Implementation Field is mandatory!!!", {
                      position: toast.POSITION.BOTTOM_RIGHT,
                    });
                  }
                } else {
                  toast.error("Time Plan Table Field is mandatory!!!", {
                    position: toast.POSITION.BOTTOM_RIGHT,
                  });
                }
              } else {
                toast.error("Time Plan Table Field is mandatory!!!", {
                  position: toast.POSITION.BOTTOM_RIGHT,
                });
              }
            } else {
              toast.error(
                "Affected Relevant Documentation Field is mandatory!!!",
                {
                  position: toast.POSITION.BOTTOM_RIGHT,
                }
              );
            }
          } else {
            toast.error("Commercial Approval Field is mandatory!!!", {
              position: toast.POSITION.BOTTOM_RIGHT,
            });
          }
        } else {
          toast.error("Part Number Revision Details Field is mandatory!!!", {
            position: toast.POSITION.BOTTOM_RIGHT,
          });
        }
      } else {
        toast.error("Part Number Revision Details Field is mandatory!!!", {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      }
    } else {
      toast.error("Engineering Change Order Field is mandatory!!!", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    }
  };

  return (
    <Box sx={{ mt: 1 }}>
      <Box>
        <Card raised={true} sx={{ backgroundColor: "#2E3B55", color: "white" }}>
          <Box>
            <Grid container spacing={2}>
              <Grid item xs={0.1} sm={0.1} md={0.1} lg={0.1} xl={0.1}>
                <Button
                  variant="contained"
                  color="success"
                  sx={{ marginTop: 1.5, marginLeft: 1.5 }}
                  onClick={() => handleClickBack()}
                >
                  Back
                </Button>
              </Grid>
              <Grid
                item
                xs={11.5}
                sm={11.5}
                md={11.5}
                lg={11.5}
                xl={11.5}
                alignItems="center"
              >
                <Typography
                  variant="h6"
                  sx={{ m: 2, textAlign: { xs: "center", sm: "center" } }}
                >
                  Master Tracker
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Card>

        <Card raised={true} sx={app_style.cardSxT}>
          <CardHeader
            sx={{ backgroundColor: "#5A5A5A", color: "white" }}
            title={
              ecrstatus === 0 ? (
                <Typography sx={app_style.cardHeading}>
                  Engineering Change Order - ECO
                </Typography>
              ) : (
                <Typography sx={app_style.cardHeading}>
                  Engineering Change Request - ECR
                </Typography>
              )
            }
          ></CardHeader>
          <CardContent>
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={6} sm={4} xl={3} lg={3} md={4}>
                <Typography>
                  Employee Name :{" "}
                  <span style={{ fontWeight: "bold" }}>
                    {reportDetail.Emp_Name}
                  </span>
                </Typography>
              </Grid>
              <Grid item xs={6} sm={4} xl={3} lg={3} md={4}>
                <Typography>
                  Created Date :{" "}
                  <span style={{ fontWeight: "bold" }}>
                    {moment(reportDetail.Created_date).format("DD-MMM-YYYY")}
                  </span>
                </Typography>
              </Grid>
              <Grid item xs={6} sm={4} xl={3} lg={3} md={4}>
                <Typography>
                  Initiated By :{" "}
                  <span style={{ fontWeight: "bold" }}>
                    {reportDetail.Initiate_By}
                  </span>
                </Typography>
              </Grid>
              <Grid item xs={6} sm={4} xl={3} lg={3} md={4}>
                <Typography>
                  Open Days :{" "}
                  <span style={{ fontWeight: "bold" }}>{dayCount}</span>
                </Typography>
              </Grid>
            </Grid>
            <Grid container spacing={2} sx={{ mt: 1, mb: 2 }}>
              <Grid item xs={6} sm={4} xl={3} lg={3} md={4}>
                <Typography>
                  ECR SI.NO :{" "}
                  <span style={{ fontWeight: "bold" }}>
                    {reportDetail.ecr_no}
                  </span>
                </Typography>
              </Grid>
              <Grid item xs={6} sm={4} xl={3} lg={3} md={4}>
                <Typography>
                  Description :{" "}
                  <span style={{ fontWeight: "bold" }}>
                    {reportDetail.description}
                  </span>
                </Typography>
              </Grid>
              <Grid item xs={6} sm={4} xl={3} lg={3} md={4}>
                <Typography>
                  Reason :{" "}
                  <span style={{ fontWeight: "bold" }}>
                    {reportDetail.reason}
                  </span>
                </Typography>
              </Grid>
            </Grid>
            <Divider />
            <Grid container spacing={2} sx={{ mt: 1, mb: 2 }}>
              <Grid item xl={3} lg={3} md={6} sm={6} xs={12}>
                <Box display="flex" alignItems="center">
                  <Typography sx={{ paddingRight: 1 }}>FQ NOC : </Typography>
                  {ecorecfield && ecorecfield.Change_Imp === 0 ? (
                    <TextField
                      id="fqnoc"
                      size="small"
                      placeholder="FQ NOC#"
                      variant="outlined"
                      inputRef={fqnoc}
                      value={fqNoc}
                      onChange={(e) => {
                        setFqNoc(e.target.value);
                        fqnoc.current.value = e.target.value;
                      }}
                    />
                  ) : ecorecfield === null ||
                    (ecorecfield && ecorecfield.Change_Imp === 1) ? (
                    <TextField
                      id="fqnoc"
                      size="small"
                      placeholder="FQ NOC#"
                      variant="outlined"
                      inputRef={fqnoc}
                    />
                  ) : (
                    <TextField
                      id="fqnoc"
                      size="small"
                      placeholder="FQ NOC#"
                      variant="outlined"
                      value={ecorecfield.FQ_No}
                    />
                  )}
                </Box>
              </Grid>
              <Grid item xl={3} lg={3} md={6} sm={6} xs={12}>
                <Box display="flex" alignItems="center">
                  <Typography sx={{ paddingRight: 1 }}>NOC : </Typography>
                  {ecorecfield && ecorecfield.Change_Imp === 0 ? (
                    <TextField
                      size="small"
                      id="noc"
                      placeholder="NOC#"
                      variant="outlined"
                      inputRef={noc}
                      value={Noc}
                      onChange={(e) => {
                        setNoc(e.target.value);
                        noc.current.value = e.target.value;
                      }}
                    />
                  ) : ecorecfield === null ||
                    (ecorecfield && ecorecfield.Change_Imp === 1) ? (
                    <TextField
                      size="small"
                      id="noc"
                      placeholder="NOC#"
                      variant="outlined"
                      inputRef={noc}
                    />
                  ) : (
                    <TextField
                      size="small"
                      id="noc"
                      placeholder="NOC#"
                      variant="outlined"
                      value={ecorecfield.NOC_No}
                    />
                  )}
                </Box>
              </Grid>
              <Grid item xl={3} lg={3} md={6} sm={6} xs={12}>
                <Box display="flex" alignItems="center">
                  <Typography>
                    Customer :{" "}
                    <span style={{ fontWeight: "bold" }}>
                      {reportDetail.Cust_Name}
                    </span>
                  </Typography>
                </Box>
              </Grid>
              <Grid item xl={3} lg={3} md={6} sm={6} xs={12}>
                <Box display="flex" alignItems="center">
                  <Typography sx={{ paddingRight: 1 }}>
                    Click to View :{" "}
                  </Typography>
                  <Button
                    variant="contained"
                    style={{ margin: "5px" }}
                    size="small"
                    onClick={() => handleOpenModal(0)}
                  >
                    Before pic
                  </Button>
                  <Button
                    variant="contained"
                    style={{ margin: "5px" }}
                    size="small"
                    onClick={() => handleOpenModal(1)}
                  >
                    After pic
                  </Button>
                </Box>
              </Grid>
            </Grid>
            <Divider />
            <Grid container spacing={1} sx={{ mt: 1, mb: 2 }}>
              <Grid item xl={4} lg={4} md={4} sm={6} xs={6}>
                <Box display="flex" alignItems="center">
                  <Typography sx={app_style.TextHeading}>Admin : </Typography>
                  {ECRApprovestatus === 1 ||
                    ECRApprovestatus === 2 ||
                    ECRApprovestatus === 5 ? (
                    <>
                      <Badge status="success" text="Approved" />
                    </>
                  ) : ECRApprovestatus === 3 ||
                    ECRApprovestatus === 4 ||
                    ECRApprovestatus === 6 ? (
                    <>
                      <Badge status="error" text="Rejected" />
                    </>
                  ) : (
                    <>
                      <Badge status="processing" text="Pending" />
                    </>
                  )}
                </Box>
              </Grid>
              <Grid item xl={4} lg={4} md={4} sm={6} xs={6}>
                <Box display="flex" alignItems="center">
                  <Typography sx={app_style.TextHeading}>
                    Management Admin :{" "}
                  </Typography>
                  {ECRApprovestatus === 2 || ECRApprovestatus === 5 ? (
                    <>
                      <Badge status="success" text="Approved" />
                    </>
                  ) : ECRApprovestatus === 4 ||
                    ECRApprovestatus === 6 ||
                    ECRApprovestatus === 3 ? (
                    <>
                      <Badge status="error" text="Rejected" />
                    </>
                  ) : (
                    <>
                      <Badge status="processing" text="Pending" />
                    </>
                  )}
                </Box>
              </Grid>

              <Grid item xl={4} lg={4} md={4} sm={6} xs={6}>
                <Box display="flex" alignItems="center">
                  <Typography sx={app_style.TextHeading}>
                    Cost Controller Admin :{" "}
                  </Typography>
                  {ECRApprovestatus === 5 ? (
                    <>
                      <Badge status="success" text="Approved" />
                    </>
                  ) : ECRApprovestatus === 6 ||
                    ECRApprovestatus === 4 ||
                    ECRApprovestatus === 3 ? (
                    <>
                      <Badge status="error" text="Rejected" />
                    </>
                  ) : (
                    <>
                      <Badge status="processing" text="Pending" />
                    </>
                  )}
                </Box>
              </Grid>
              {/* <Grid item xl={3} lg={3} md={3} sm={6} xs={6}>
                <Box display="flex" alignItems="center">
                  <Typography sx={{ paddingRight: 1 }}>SDE : </Typography>
                  {assignedStatus.SDE === 1 ? (
                    <>
                      <Badge status="success" text="Completed" />
                    </>
                  ) : (
                    <>
                      <Badge status="error" text="Pending" />
                    </>
                  )}
                </Box>
              </Grid> */}
            </Grid>
          </CardContent>
        </Card>

        {ECRApprovestatus === 1 ||
          ECRApprovestatus === 2 ||
          ECRApprovestatus === 5 ? (
          <Box>
            <Box sx={{ mt: 2 }}>
              <Card raised={true} sx={app_style.cardSxT}>
                <CardHeader
                  sx={{ backgroundColor: "#5A5A5A", color: "white" }}
                  title={
                    <Typography sx={app_style.cardHeading}>
                      individual Task Status
                    </Typography>
                  }
                ></CardHeader>
                <CardContent>
                  <Grid container spacing={0} sx={{ paddingTop: 3, mb: 2 }}>
                    <Grid item xl={3} lg={3} md={3} sm={12} xs={12}>
                      <Box display="flex" alignItems="center">
                        <Typography sx={app_style.TextHeading}>
                          Engineering{" "}
                          <span style={{ marginLeft: "20px" }}>:</span>{" "}
                        </Typography>
                        {ECRTaskStatus.engineering === 1 ? (
                          <>
                            <Badge status="success" text="Completed" />
                          </>
                        ) : (
                          <>
                            <Badge status="error" text="Pending" />
                          </>
                        )}
                        {ECRTaskStatus.engineering === 1 ?
                          <Button sx={{ ml: 2 }} variant="contained" onClick={() => handleViewTask("D0002")}>View</Button>
                          :
                          <Button sx={{ ml: 2 }} variant="contained" onClick={() => handleViewTask("D0002")} disabled>View</Button>
                        }

                      </Box>
                    </Grid>
                    <Grid item xl={3} lg={3} md={3} sm={12} xs={12}>
                      <Box display="flex" alignItems="center">
                        <Typography sx={app_style.TextHeading}>
                          Quality <span style={{ marginLeft: "35px" }}>:</span>
                        </Typography>
                        {ECRTaskStatus.quality === 1 ? (
                          <>
                            <Badge status="success" text="Completed" />
                          </>
                        ) : (
                          <>
                            <Badge status="error" text="Pending" />
                          </>
                        )}
                        {
                          ECRTaskStatus.quality === 1 ?
                            <Button sx={{ ml: 2 }} variant="contained" onClick={() => handleViewTask("D0004")}>View</Button>
                            :
                            <Button sx={{ ml: 2 }} variant="contained" onClick={() => handleViewTask("D0004")} disabled>View</Button>
                        }

                      </Box>
                    </Grid>
                    <Grid item xl={3} lg={3} md={3} sm={12} xs={12}>
                      <Box display="flex" alignItems="center">
                        <Typography sx={app_style.TextHeading}>
                          Purchase :
                          <span style={{ marginLeft: "110px" }}>:</span>{" "}
                        </Typography>
                        {ECRTaskStatus.purchase === 1 ? (
                          <>
                            <Badge status="success" text="Completed" />
                          </>
                        ) : (
                          <>
                            <Badge status="error" text="Pending" />
                          </>
                        )}
                        {ECRTaskStatus.purchase === 1 ?
                          <Button sx={{ ml: 3.5 }} variant="contained" onClick={() => handleViewTask("D0005")}>View</Button>
                          :
                          <Button sx={{ ml: 3.5 }} variant="contained" onClick={() => handleViewTask("D0005")} disabled>View</Button>
                        }

                      </Box>
                    </Grid>
                    <Grid item xl={3} lg={3} md={3} sm={12} xs={12}>
                      <Box display="flex" sx={{ ml: 5 }}>
                        <Typography sx={app_style.TextHeading}>
                          SDE :
                        </Typography>
                        {ECRTaskStatus.SDE === 1 ? (
                          <>
                            <Badge status="success" text="Completed" />
                          </>
                        ) : (
                          <>
                            <Badge status="error" text="Pending" />
                          </>
                        )}
                        {
                          ECRTaskStatus.SDE === 1 ?
                            <Button sx={{ ml: 2, mt: -1 }} variant="contained" onClick={() => handleViewTask("D0006")}>View</Button>
                            :
                            <Button sx={{ ml: 2, mt: -1 }} variant="contained" onClick={() => handleViewTask("D0006")} disabled>View</Button>
                        }

                      </Box>
                    </Grid>
                  </Grid>
                  <Grid container spacing={0} sx={{ paddingTop: 2 }}>
                    <Grid item xl={3} lg={3} md={3} sm={12} xs={12}>
                      <Box display="flex" alignItems="center">
                        <Typography sx={app_style.TextHeading}>
                          Manufacturing :
                        </Typography>
                        {ECRTaskStatus.manufacturing === 1 ? (
                          <>
                            <Badge status="success" text="Completed" />
                          </>
                        ) : (
                          <>
                            <Badge status="error" text="Pending" />
                          </>
                        )}
                        {
                          ECRTaskStatus.manufacturing === 1 ?
                            <Button sx={{ ml: 4 }} variant="contained" onClick={() => handleViewTask("D0001")}>View</Button>
                            :
                            <Button sx={{ ml: 4 }} variant="contained" onClick={() => handleViewTask("D0001")} disabled>View</Button>
                        }

                      </Box>
                    </Grid>
                    <Grid item xl={3} lg={3} md={3} sm={12} xs={12}>
                      <Box display="flex" alignItems="center">
                        <Typography sx={app_style.TextHeading}>
                          Production :
                        </Typography>
                        {ECRTaskStatus.production === 1 ? (
                          <>
                            <Badge status="success" text="Completed" />
                          </>
                        ) : (
                          <>
                            <Badge status="error" text="Pending" />
                          </>
                        )}
                        {
                          ECRTaskStatus.production === 1 ?
                            <Button sx={{ ml: 2 }} variant="contained" onClick={() => handleViewTask("D0003")}>View</Button>
                            :
                            <Button sx={{ ml: 2 }} variant="contained" onClick={() => handleViewTask("D0003")} disabled>View</Button>
                        }

                      </Box>
                    </Grid>
                    <Grid iitem xl={3} lg={3} md={3} sm={12} xs={12}>
                      <Box display="flex" alignItems="center">
                        <Typography sx={app_style.TextHeading}>
                          Program Management :
                        </Typography>
                        {ECRTaskStatus.Program_management === 1 ? (
                          <>
                            <Badge status="success" text="Completed" />
                          </>
                        ) : (
                          <>
                            <Badge status="error" text="Pending" />
                          </>
                        )}
                        {
                          ECRTaskStatus.Program_management === 1 ?
                            <Button sx={{ ml: 2 }} variant="contained" onClick={() => handleViewTask("D0007")}>View</Button>
                            :
                            <Button sx={{ ml: 2 }} variant="contained" onClick={() => handleViewTask("D0007")}>View</Button>
                        }

                      </Box>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Box>
          </Box>
        ) : (
          ""
        )}

        {ecrstatus === 0 ? (
          <Box>
            <Box sx={{ mt: 2 }}>
              <Card raised={true} sx={app_style.cardSxT}>
                <CardHeader
                  sx={{ backgroundColor: "#5A5A5A", color: "white" }}
                  title={
                    <Typography sx={app_style.cardHeading}>
                      Part Number Revision Details
                    </Typography>
                  }
                ></CardHeader>
                <CardContent>
                  <PartNumberRevision
                    getTavVal={getTavVal}
                    tableData={tableData}
                    tabArr={tabArr}
                    partnoretdata={Partnoretdata}
                    Change_Imp={Change_Imp}
                  />
                </CardContent>
              </Card>
            </Box>

            <Box sx={{ mt: 2 }}>
              <Card raised={true} sx={app_style.cardSxT}>
                <CardHeader
                  sx={{ backgroundColor: "#5A5A5A", color: "white" }}
                  title={
                    <Typography sx={app_style.cardHeading}>
                      Commercial Approvals
                    </Typography>
                  }
                ></CardHeader>
                <CardContent>
                  <Stack spacing={1}>
                    <Grid container spacing={2}>
                      <Grid xs={12} sm={6} md={4} item>
                        <Item style={{ backgroundColor: "#F4F4F4" }}>
                          <Typography
                            sx={{ m: 1, fontSize: 16, fontWeight: "bold" }}
                          >
                            Quote from CFT
                          </Typography>

                          {Change_Imp !== null && Change_Imp === 0 ? (
                            <FormControl sx={{ minWidth: 160 }} size="small">
                              <InputLabel>Select</InputLabel>
                              <Select
                                required
                                sx={{ backgroundColor: "white", fontSize: 14 }}
                                label="Select"
                                value={
                                  quote !== ""
                                    ? quote
                                    : ecorecfield && ecorecfield.Quote_CFT
                                }
                                onChange={handleChangeQuote}
                              >
                                {Listobj &&
                                  Listobj.map((item, index) => (
                                    <MenuItem key={index} value={item.id}>
                                      {item.value}
                                    </MenuItem>
                                  ))}
                              </Select>
                            </FormControl>
                          ) : Change_Imp === null ||
                            (Change_Imp !== null && Change_Imp === 1) ? (
                            <FormControl sx={{ minWidth: 160 }} size="small">
                              <InputLabel>Select</InputLabel>
                              <Select
                                required
                                sx={{ backgroundColor: "white", fontSize: 14 }}
                                label="Select"
                                defaultValue="Select"
                                value={quote}
                                onChange={handleChangeQuote}
                              >
                                {Listobj &&
                                  Listobj.map((item, index) => (
                                    <MenuItem key={index} value={item.id}>
                                      {item.value}
                                    </MenuItem>
                                  ))}
                              </Select>
                            </FormControl>
                          ) : Change_Imp !== null && Change_Imp === 2 ? (
                            <FormControl sx={{ minWidth: 160 }} size="small">
                              <InputLabel>Select</InputLabel>
                              <Select
                                required
                                style={{
                                  pointerEvents: "none",
                                  cursor: "not-allowed",
                                }}
                                sx={{ backgroundColor: "white", fontSize: 14 }}
                                label="Select"
                                value={ecorecfield && ecorecfield.Quote_CFT}
                                onChange={handleChangeQuote}
                              >
                                {Listobj &&
                                  Listobj.map((item, index) => (
                                    <MenuItem key={index} value={item.id}>
                                      {item.value}
                                    </MenuItem>
                                  ))}
                              </Select>
                            </FormControl>
                          ) : (
                            ""
                          )}
                        </Item>
                      </Grid>
                      <Grid xs={12} sm={6} md={4} item>
                        <Item style={{ backgroundColor: "#F4F4F4" }}>
                          <Typography
                            sx={{ m: 1, fontSize: 16, fontWeight: "bold" }}
                          >
                            Quote to Customer
                          </Typography>
                          {Change_Imp !== null && Change_Imp === 0 ? (
                            <FormControl sx={{ minWidth: 160 }} size="small">
                              <InputLabel>Select</InputLabel>
                              <Select
                                required
                                sx={{ backgroundColor: "white", fontSize: 14 }}
                                label="Select"
                                value={
                                  quoteCus !== ""
                                    ? quoteCus
                                    : ecorecfield && ecorecfield.Quote_Customer
                                }
                                onChange={handleChangeQuoteCus}
                              >
                                {Listobj &&
                                  Listobj.map((item, index) => (
                                    <MenuItem key={index} value={item.id}>
                                      {item.value}
                                    </MenuItem>
                                  ))}
                              </Select>
                            </FormControl>
                          ) : Change_Imp === null ||
                            (Change_Imp !== null && Change_Imp === 1) ? (
                            <FormControl sx={{ minWidth: 160 }} size="small">
                              <InputLabel>Select</InputLabel>
                              <Select
                                required
                                sx={{ backgroundColor: "white", fontSize: 14 }}
                                label="Select"
                                value={quoteCus}
                                onChange={handleChangeQuoteCus}
                              >
                                {Listobj &&
                                  Listobj.map((item, index) => (
                                    <MenuItem key={index} value={item.id}>
                                      {item.value}
                                    </MenuItem>
                                  ))}
                              </Select>
                            </FormControl>
                          ) : Change_Imp !== null && Change_Imp === 2 ? (
                            <FormControl sx={{ minWidth: 160 }} size="small">
                              <InputLabel>Select</InputLabel>
                              <Select
                                required
                                sx={{ backgroundColor: "white", fontSize: 14 }}
                                label="Select"
                                style={{
                                  pointerEvents: "none",
                                  cursor: "not-allowed",
                                }}
                                value={
                                  ecorecfield && ecorecfield.Quote_Customer
                                }
                                onChange={handleChangeQuoteCus}
                              >
                                {Listobj &&
                                  Listobj.map((item, index) => (
                                    <MenuItem key={index} value={item.id}>
                                      {item.value}
                                    </MenuItem>
                                  ))}
                              </Select>
                            </FormControl>
                          ) : (
                            ""
                          )}
                        </Item>
                      </Grid>
                      <Grid xs={12} sm={6} md={4} item>
                        <Item style={{ backgroundColor: "#F4F4F4" }}>
                          <Typography
                            sx={{ m: 1, fontSize: 16, fontWeight: "bold" }}
                          >
                            Customer Approval
                          </Typography>
                          {Change_Imp !== null && Change_Imp === 0 ? (
                            <FormControl sx={{ minWidth: 160 }} size="small">
                              <InputLabel>Select</InputLabel>
                              <Select
                                required
                                sx={{ backgroundColor: "white", fontSize: 14 }}
                                label="Select"
                                value={
                                  cusApproval !== ""
                                    ? cusApproval
                                    : ecorecfield && ecorecfield.Custmr_Apprvl
                                }
                                onChange={handleChangeCusApproval}
                              >
                                {Listobj &&
                                  Listobj.map((item, index) => (
                                    <MenuItem key={index} value={item.id}>
                                      {item.value}
                                    </MenuItem>
                                  ))}
                              </Select>
                            </FormControl>
                          ) : Change_Imp === null ||
                            (Change_Imp !== null && Change_Imp === 1) ? (
                            <FormControl sx={{ minWidth: 160 }} size="small">
                              <InputLabel>Select</InputLabel>
                              <Select
                                required
                                sx={{ backgroundColor: "white", fontSize: 14 }}
                                label="Select"
                                value={cusApproval}
                                onChange={handleChangeCusApproval}
                              >
                                {Listobj &&
                                  Listobj.map((item, index) => (
                                    <MenuItem key={index} value={item.id}>
                                      {item.value}
                                    </MenuItem>
                                  ))}
                              </Select>
                            </FormControl>
                          ) : Change_Imp !== null && Change_Imp === 2 ? (
                            <FormControl sx={{ minWidth: 160 }} size="small">
                              <InputLabel>Select</InputLabel>
                              <Select
                                required
                                sx={{ backgroundColor: "white", fontSize: 14 }}
                                label="Select"
                                style={{
                                  pointerEvents: "none",
                                  cursor: "not-allowed",
                                }}
                                value={ecorecfield && ecorecfield.Custmr_Apprvl}
                                onChange={handleChangeCusApproval}
                              >
                                {Listobj &&
                                  Listobj.map((item, index) => (
                                    <MenuItem key={index} value={item.id}>
                                      {item.value}
                                    </MenuItem>
                                  ))}
                              </Select>
                            </FormControl>
                          ) : (
                            ""
                          )}
                        </Item>
                      </Grid>
                      <Grid xs={12} sm={6} md={4} item>
                        <Item style={{ backgroundColor: "#F4F4F4" }}>
                          <Typography
                            sx={{ m: 1, fontSize: 16, fontWeight: "bold" }}
                          >
                            PO Receipt
                          </Typography>
                          {Change_Imp !== null && Change_Imp === 0 ? (
                            <FormControl sx={{ minWidth: 160 }} size="small">
                              <InputLabel>Select</InputLabel>
                              <Select
                                required
                                sx={{ backgroundColor: "white", fontSize: 14 }}
                                label="Select"
                                value={
                                  poreceipt !== ""
                                    ? poreceipt
                                    : ecorecfield && ecorecfield.PO_Rec
                                }
                                onChange={handleChangePOReceipt}
                              >
                                {Listobj &&
                                  Listobj.map((item, index) => (
                                    <MenuItem key={index} value={item.id}>
                                      {item.value}
                                    </MenuItem>
                                  ))}
                              </Select>
                            </FormControl>
                          ) : Change_Imp === null ||
                            (Change_Imp !== null && Change_Imp === 1) ? (
                            <FormControl sx={{ minWidth: 160 }} size="small">
                              <InputLabel>Select</InputLabel>
                              <Select
                                required
                                sx={{ backgroundColor: "white", fontSize: 14 }}
                                label="Select"
                                value={poreceipt}
                                onChange={handleChangePOReceipt}
                              >
                                {Listobj &&
                                  Listobj.map((item, index) => (
                                    <MenuItem key={index} value={item.id}>
                                      {item.value}
                                    </MenuItem>
                                  ))}
                              </Select>
                            </FormControl>
                          ) : Change_Imp !== null && Change_Imp === 2 ? (
                            <FormControl sx={{ minWidth: 160 }} size="small">
                              <InputLabel>Select</InputLabel>
                              <Select
                                required
                                sx={{ backgroundColor: "white", fontSize: 14 }}
                                style={{
                                  pointerEvents: "none",
                                  cursor: "not-allowed",
                                }}
                                label="Select"
                                value={ecorecfield && ecorecfield.PO_Rec}
                                onChange={handleChangePOReceipt}
                              >
                                {Listobj &&
                                  Listobj.map((item, index) => (
                                    <MenuItem key={index} value={item.id}>
                                      {item.value}
                                    </MenuItem>
                                  ))}
                              </Select>
                            </FormControl>
                          ) : (
                            ""
                          )}
                        </Item>
                      </Grid>
                      <Grid xs={12} sm={6} md={4} item>
                        <Item style={{ backgroundColor: "#F4F4F4" }}>
                          <Typography
                            sx={{ m: 1, fontSize: 16, fontWeight: "bold" }}
                          >
                            Obsolescene Approval
                          </Typography>
                          {Change_Imp !== null && Change_Imp === 0 ? (
                            <FormControl sx={{ minWidth: 160 }} size="small">
                              <InputLabel>Select</InputLabel>
                              <Select
                                required
                                sx={{ backgroundColor: "white", fontSize: 14 }}
                                label="Select"
                                value={
                                  absapproval !== ""
                                    ? absapproval
                                    : ecorecfield && ecorecfield.Obs_Apprvl
                                }
                                onChange={handleChangeObsApproval}
                              >
                                {Listobj &&
                                  Listobj.map((item, index) => (
                                    <MenuItem key={index} value={item.id}>
                                      {item.value}
                                    </MenuItem>
                                  ))}
                              </Select>
                            </FormControl>
                          ) : Change_Imp === null ||
                            (Change_Imp !== null && Change_Imp === 1) ? (
                            <FormControl sx={{ minWidth: 160 }} size="small">
                              <InputLabel>Select</InputLabel>
                              <Select
                                required
                                sx={{ backgroundColor: "white", fontSize: 14 }}
                                label="Select"
                                value={absapproval}
                                onChange={handleChangeObsApproval}
                              >
                                {Listobj &&
                                  Listobj.map((item, index) => (
                                    <MenuItem key={index} value={item.id}>
                                      {item.value}
                                    </MenuItem>
                                  ))}
                              </Select>
                            </FormControl>
                          ) : Change_Imp !== null && Change_Imp === 2 ? (
                            <FormControl sx={{ minWidth: 160 }} size="small">
                              <InputLabel>Select</InputLabel>
                              <Select
                                required
                                sx={{ backgroundColor: "white", fontSize: 14 }}
                                style={{
                                  pointerEvents: "none",
                                  cursor: "not-allowed",
                                }}
                                label="Select"
                                value={ecorecfield && ecorecfield.Obs_Apprvl}
                                onChange={handleChangeObsApproval}
                              >
                                {Listobj &&
                                  Listobj.map((item, index) => (
                                    <MenuItem key={index} value={item.id}>
                                      {item.value}
                                    </MenuItem>
                                  ))}
                              </Select>
                            </FormControl>
                          ) : (
                            ""
                          )}
                        </Item>
                      </Grid>
                      <Grid xs={12} sm={6} md={4} item>
                        <Item style={{ backgroundColor: "#F4F4F4" }}>
                          <Typography sx={{ fontWeight: "bold", mt: 1 }}>
                            Affected Programs
                          </Typography>
                          {ecorecfield && ecorecfield.Change_Imp === 0 ? (
                            <TextField
                              sx={{
                                backgroundColor: "white",
                                ml: 5,
                                "& .MuiInputBase-input": {
                                  height: "15px",
                                  minWidth: 30,
                                },
                              }}
                              id="outlined-multiline-static"
                              placeholder="Enter Program Here..."
                              variant="outlined"
                              inputRef={affprog}
                              value={AffProg}
                              onChange={(e) => {
                                setAffProg(e.target.value);
                                affprog.current.value = e.target.value;
                              }}
                            />
                          ) : ecorecfield === null ||
                            (ecorecfield && ecorecfield.Change_Imp === 1) ? (
                            <TextField
                              sx={{
                                backgroundColor: "white",
                                ml: 5,
                                "& .MuiInputBase-input": {
                                  height: "15px",
                                  minWidth: 30,
                                },
                              }}
                              inputRef={affprog}
                              id="outlined-multiline-static"
                              placeholder="Enter Program Here..."
                              variant="outlined"
                            />
                          ) : (
                            <TextField
                              sx={{
                                backgroundColor: "white",
                                ml: 5,
                                "& .MuiInputBase-input": {
                                  height: "15px",
                                  minWidth: 30,
                                },
                              }}
                              // inputRef={affprog}
                              id="outlined-multiline-static"
                              placeholder="Enter Program Here..."
                              variant="outlined"
                              value={ecorecfield.Aff_Program}
                            />
                          )}
                        </Item>
                      </Grid>
                    </Grid>
                    <Grid container spacing={0} xs={12}>
                      <Grid xs={12} item={true}>
                        <Typography
                          sx={{
                            fontWeight: "bold",
                            ml: 5,
                            textDecoration: "underline",
                          }}
                        >
                          Change request evaluation
                        </Typography>
                        <Grid container spacing={0} xs={12}>
                          <Grid xs={6.5} item={true}>
                            <Typography sx={{ ml: 10, mt: 1 }}>
                              Is there any impact on Product Safety, Statutory
                              Requirements, or Legal Requirements ?{" "}
                            </Typography>
                          </Grid>
                          <Grid xs={2} item={true}>
                            <Item sx={{ mt: -1.2 }}>
                              {Change_Imp !== null && Change_Imp === 0 ? (
                                <FormControlLabel
                                  label="Product Safety"
                                  onClick={(e) => {
                                    SetProductSafety(
                                      e.target.checked === true ? true : false
                                    );
                                  }}
                                  control={
                                    <Checkbox
                                      checked={productsafety === true ? 1 : 0}
                                    />
                                  }
                                />
                              ) : Change_Imp === null ||
                                (Change_Imp !== null && Change_Imp === 1) ? (
                                <FormControlLabel
                                  label="Product Safety"
                                  onClick={(e) => {
                                    SetProductSafety(
                                      e.target.checked === true ? true : false
                                    );
                                  }}
                                  control={
                                    <Checkbox
                                      checked={productsafety === true ? 1 : 0}
                                    />
                                  }
                                />
                              ) : Change_Imp !== null && Change_Imp === 2 ? (
                                <FormControlLabel
                                  label="Product Safety"
                                  style={{
                                    pointerEvents: "none",
                                    cursor: "not-allowed",
                                  }}
                                  onClick={(e) => {
                                    SetProductSafety(
                                      e.target.checked === true ? true : false
                                    );
                                  }}
                                  control={
                                    <Checkbox
                                      checked={
                                        ecorecfield && ecorecfield.Product === 1
                                          ? 1
                                          : 0
                                      }
                                    />
                                  }
                                />
                              ) : (
                                ""
                              )}
                            </Item>
                          </Grid>
                          <Grid xs={1.2} item={true}>
                            <Item sx={{ mt: -1.2 }}>
                              {Change_Imp !== null && Change_Imp === 0 ? (
                                <FormControlLabel
                                  label="Statotory"
                                  onClick={(e) => {
                                    SetStatototy(
                                      e.target.checked === true ? true : false
                                    );
                                  }}
                                  control={
                                    <Checkbox
                                      checked={statotory === true ? 1 : 0}
                                    />
                                  }
                                />
                              ) : Change_Imp === null ||
                                (Change_Imp !== null && Change_Imp === 1) ? (
                                <FormControlLabel
                                  label="Statotory"
                                  onClick={(e) => {
                                    SetStatototy(e.target.checked);
                                  }}
                                  control={
                                    <Checkbox
                                      checked={statotory === true ? 1 : 0}
                                    />
                                  }
                                />
                              ) : Change_Imp !== null && Change_Imp === 2 ? (
                                <FormControlLabel
                                  label="Statotory"
                                  onClick={(e) => {
                                    SetStatototy(
                                      e.target.checked === true ? true : false
                                    );
                                  }}
                                  style={{
                                    pointerEvents: "none",
                                    cursor: "not-allowed",
                                  }}
                                  control={
                                    <Checkbox
                                      checked={
                                        ecorecfield && ecorecfield.Safety === 1
                                          ? 1
                                          : 0
                                      }
                                    />
                                  }
                                />
                              ) : (
                                ""
                              )}
                            </Item>
                          </Grid>
                          <Grid xs={1.5} item={true}>
                            <Item sx={{ mt: -1.2 }}>
                              {ecorecfield && ecorecfield.Change_Imp === 0 ? (
                                <FormControlLabel
                                  label="Legal"
                                  onClick={(e) => {
                                    SetLegal(e.target.checked);
                                  }}
                                  control={
                                    <Checkbox
                                      checked={legal === true ? 1 : 0}
                                    />
                                  }
                                />
                              ) : ecorecfield === null ||
                                (ecorecfield &&
                                  ecorecfield.Change_Imp === 1) ? (
                                <FormControlLabel
                                  label="Legal"
                                  onClick={(e) => {
                                    SetLegal(
                                      e.target.checked === true ? true : false
                                    );
                                  }}
                                  control={
                                    <Checkbox
                                      checked={legal === true ? 1 : 0}
                                    />
                                  }
                                />
                              ) : ecorecfield &&
                                ecorecfield.Change_Imp === 2 ? (
                                <FormControlLabel
                                  label="Legal"
                                  onClick={(e) => {
                                    SetLegal(
                                      e.target.checked === true ? true : false
                                    );
                                  }}
                                  style={{
                                    pointerEvents: "none",
                                    cursor: "not-allowed",
                                  }}
                                  control={
                                    <Checkbox
                                      checked={
                                        ecorecfield && ecorecfield.Legal === 1
                                          ? 1
                                          : 0
                                      }
                                    />
                                  }
                                />
                              ) : (
                                ""
                              )}
                            </Item>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Stack>
                </CardContent>
              </Card>
            </Box>

            <Box sx={{ mt: 2 }}>
              <Card raised={true} sx={app_style.cardSxT}>
                <CardHeader
                  sx={{ backgroundColor: "#5A5A5A", color: "white" }}
                  title={
                    <Typography sx={app_style.cardHeading}>
                      Affected Relevant Documentation
                    </Typography>
                  }
                ></CardHeader>
                <CardContent>
                  <Box className="table-container">
                    <AffectedTable
                      AffTabhandleCellChange={AffTabhandleCellChange}
                      AffTabhandleDateChange={AffTabhandleDateChange}
                      AffTabledata={AffTabledata}
                      ischecked={ischecked}
                      Change_Imp={Change_Imp}
                      affretdata={affretdata}
                      AfftabRetrRec={AfftabRetrRec}
                    />
                  </Box>
                </CardContent>
              </Card>
            </Box>

            <Box sx={{ mt: 2 }}>
              <Card raised={true} sx={app_style.cardSxT}>
                <CardHeader
                  sx={{ backgroundColor: "#5A5A5A", color: "white" }}
                  title={
                    <Typography sx={app_style.cardHeading}>
                      Time Plan
                    </Typography>
                  }
                ></CardHeader>
                <CardContent>
                  <Box className="table-container">
                    <TimePlan
                      TimeTabhandleCellChange={TimeTabhandleCellChange}
                      TimeTabhandleDateChange={TimeTabhandleDateChange}
                      timetabledata={timetabledata}
                      initiateTimetab={initiateTimetab}
                      handleTimedata={handleTimedata}
                      handleAddTimeplan={handleAddTimeplan}
                      ischecked={ischecked}
                      Change_Imp={Change_Imp}
                      Timeplnretdata={Timeplnretdata}
                    />
                  </Box>
                </CardContent>
              </Card>
            </Box>

            <Box sx={{ mt: 2 }}>
              <Card raised={true} sx={app_style.cardSxT}>
                <CardHeader
                  sx={{ backgroundColor: "#5A5A5A", color: "white" }}
                  title={
                    <Typography sx={app_style.cardHeading}>
                      Change Implementation
                    </Typography>
                  }
                ></CardHeader>
                <CardContent>
                  <Box className="table-container">
                    <ChangeImpTable
                      handleCellChangeImptab={handleCellChangeImptab}
                      handleDateChangeImptab={handleDateChangeImptab}
                      chngeImpdata={chngeImpdata}
                      ischecked={ischecked}
                      ChngeImpretdata={ChngeImpretdata}
                      Change_Imp={Change_Imp}
                    />
                  </Box>
                </CardContent>
              </Card>
            </Box>

            <Box sx={{ mt: 2 }}>
              <Card raised={true} sx={app_style.cardSxT}>
                <CardHeader
                  sx={{ backgroundColor: "#5A5A5A", color: "white" }}
                  title={
                    <Typography sx={app_style.cardHeading}>
                      Break Point Details
                    </Typography>
                  }
                ></CardHeader>
                <CardContent>
                  <BreakPointTable
                    handleCellBrkPnttab={handleCellBrkPnttab}
                    handleDateBrkPnttab={handleDateBrkPnttab}
                    brkpntdata={brkpntdata}
                    ischecked={ischecked}
                    BrkPntretdata={BrkPntretdata}
                    Change_Imp={Change_Imp}
                  />
                </CardContent>
              </Card>
            </Box>

            <Box sx={{ mt: 2 }}>
              <Card raised={true} sx={app_style.cardSxT}>
                <CardHeader
                  sx={{ backgroundColor: "#5A5A5A", color: "white" }}
                  title={
                    <Typography sx={app_style.cardHeading}>
                      CheckList
                    </Typography>
                  }
                ></CardHeader>
                <CardContent>
                  <Stack spacing={1}>
                    <Grid container>
                      <table style={{ width: "100%", textAlign: "center" }}>
                        {checklst.map((data, index) => {
                          const columnWidths = [
                            "40%",
                            "15%",
                            "10%",
                            "7%",
                            "10%",
                            "7%",
                          ];
                          return (
                            <tr>
                              {index === 0 ? (
                                <td style={{ width: columnWidths[0] }}>
                                  <Typography
                                    sx={{ fontWeight: "bold", mt: 2 }}
                                  >
                                    Identified the Inventory stock of affected
                                    parts that will become obsolete
                                  </Typography>
                                </td>
                              ) : (
                                <td></td>
                              )}
                              <td style={{ width: columnWidths[1] }}>
                                <Grid container>
                                  <Grid item lg={6} xl={6} sm={12}>
                                    <FormControlLabel
                                      sx={{ ml: 2, mt: 2 }}
                                      key={data.id}
                                      disabled={data.picture !== "" && data.status === "retrieve" ? true : false}
                                      control={
                                        <Checkbox
                                          checked={data.check}
                                          onClick={handleCheck(data.id)}
                                        />
                                      }
                                    />
                                  </Grid>
                                  <Grid item lg={6} xl={6} sm={12}>
                                    <Typography
                                      sx={{
                                        fontWeight: "bold",
                                        textAlign: "left",
                                        mt: 3,
                                        ml: 0,
                                      }}
                                    >
                                      {data.name}
                                    </Typography>
                                  </Grid>
                                </Grid>
                              </td>
                              <td style={{ width: columnWidths[4] }}>
                                <TextField
                                  disabled={data.check === true ? false : true}
                                  sx={{ mt: 2, width: "150px" }}
                                  id={`cusname${data.id}`}
                                  size="small"
                                  placeholder="Type here..."
                                  variant="outlined"
                                  onChange={handleChangeCusname(data.id)}
                                  value={data.cusname}
                                />
                              </td>
                              <td style={{ width: columnWidths[2] }}>
                                {Change_Imp !== null && Change_Imp === 0 ?
                                  <ReactFileReader
                                    fileTypes={[
                                      ".pdf",
                                      ".docx",
                                      ".xlsx",
                                      ".pptx",
                                    ]}
                                    disabled={data.check === true ? false : true}
                                    base64={true}
                                    multipleFiles={true}
                                    handleFiles={handleFilesupload(data.id)}
                                  >
                                    <Button
                                      disabled={
                                        data.check === true ? false : true
                                      }
                                      variant="contained"
                                      sx={{
                                        "&:hover": {
                                          backgroundColor: "transparent",
                                          color: "#157DEC",
                                        },
                                        mt: 2,
                                      }}
                                    >
                                      Upload
                                    </Button>
                                  </ReactFileReader>
                                  : Change_Imp === null ||
                                    (Change_Imp !== null && Change_Imp === 1) ?
                                    <ReactFileReader
                                      fileTypes={[
                                        ".pdf",
                                        ".docx",
                                        ".xlsx",
                                        ".pptx",
                                      ]}
                                      disabled={data.check === true ? false : true}
                                      base64={true}
                                      multipleFiles={true}
                                      handleFiles={handleFilesupload(data.id)}
                                    >
                                      <Button
                                        disabled={
                                          data.check === true ? false : true
                                        }
                                        variant="contained"
                                        sx={{
                                          "&:hover": {
                                            backgroundColor: "transparent",
                                            color: "#157DEC",
                                          },
                                          mt: 2,
                                        }}
                                      >
                                        Upload
                                      </Button>
                                    </ReactFileReader>
                                    : Change_Imp !== null && Change_Imp === 2 ?
                                      <Base64Downloader
                                        base64={data.picture}
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
                                          Download
                                        </Button>
                                      </Base64Downloader>
                                      : ""}

                              </td>
                              <td style={{ width: columnWidths[3] }}>
                                <Grid sx={{ mt: 3 }}>
                                  <Typography sx={{ fontWeight: "bold" }}>
                                    File Name :
                                  </Typography>
                                </Grid>
                              </td>
                              <td style={{ width: columnWidths[4] }}>
                                <Grid sx={{ mt: 3, textAlign: "left" }}>
                                  <InputLabel
                                    htmlFor="my-input"
                                    key={data.id}
                                    id={`inputlab${data.id}`}
                                  >
                                    {data.filename}
                                  </InputLabel>
                                </Grid>
                              </td>
                            </tr>
                          );
                        })}
                      </table>
                    </Grid>
                    <Grid container spacing={2}>
                      <Grid
                        item
                        xs={4}
                        sm={3.5}
                        md={2}
                        xl={1.7}
                        lg={2}
                        sx={{ fontWeight: "bold", mt: 7 }}
                      >
                        {" "}
                        Any Effect on Capacity?
                      </Grid>
                      <Grid item xs={3.7} sm={4} xl={1} lg={1.5} md={2}>
                        <Item sx={{ mt: 5, ml: 1 }}>
                          {Change_Imp !== null && Change_Imp === 0 ? (
                            <FormControlLabel
                              label="Yes"
                              onClick={(e) => {
                                if (e.target.checked === true) {
                                  SetCapacityNo(false);
                                  SetCapacityYes(
                                    e.target.checked === true ? true : false
                                  );
                                } else {
                                  SetCapacityNo(true);
                                  SetCapacityYes(
                                    e.target.checked === true ? true : false
                                  );
                                }
                              }}
                              control={
                                <Checkbox checked={capYes === true ? 1 : 0} />
                              }
                            />
                          ) : Change_Imp === null ||
                            (Change_Imp !== null && Change_Imp === 1) ? (
                            <FormControlLabel
                              label="Yes"
                              onClick={(e) => {
                                if (e.target.checked === true) {
                                  SetCapacityNo(false);
                                  SetCapacityYes(
                                    e.target.checked === true ? true : false
                                  );
                                } else {
                                  SetCapacityNo(true);
                                  SetCapacityYes(
                                    e.target.checked === true ? true : false
                                  );
                                }
                              }}
                              control={
                                <Checkbox checked={capYes === true ? 1 : 0} />
                              }
                            />
                          ) : Change_Imp !== null && Change_Imp === 2 ? (
                            <FormControlLabel
                              label="Yes"
                              style={{
                                pointerEvents: "none",
                                cursor: "not-allowed",
                              }}
                              // onClick={handleCapacityYes}
                              control={
                                <Checkbox
                                  checked={
                                    ecorecfield && ecorecfield.Capacity === 1
                                      ? 1
                                      : 0
                                  }
                                />
                              }
                            />
                          ) : (
                            ""
                          )}
                        </Item>
                      </Grid>
                      <Grid item xs={3.7} sm={4} xl={1} lg={1.5} md={2}>
                        <Item sx={{ mt: 5 }}>
                          {Change_Imp !== null && Change_Imp === 0 ? (
                            <FormControlLabel
                              label="No"
                              onClick={(e) => {
                                if (e.target.checked === true) {
                                  SetCapacityYes(false);
                                  SetCapacityNo(
                                    e.target.checked === true ? true : false
                                  );
                                } else {
                                  SetCapacityYes(true);
                                  SetCapacityNo(
                                    e.target.checked === true ? true : false
                                  );
                                }
                              }}
                              control={
                                <Checkbox checked={capNo === true ? 1 : 0} />
                              }
                            />
                          ) : Change_Imp === null ||
                            (Change_Imp !== null && Change_Imp === 1) ? (
                            <FormControlLabel
                              label="No"
                              onClick={(e) => {
                                if (e.target.checked === true) {
                                  SetCapacityYes(false);
                                  SetCapacityNo(
                                    e.target.checked === true ? true : false
                                  );
                                } else {
                                  SetCapacityYes(true);
                                  SetCapacityNo(
                                    e.target.checked === true ? true : false
                                  );
                                }
                              }}
                              control={
                                <Checkbox checked={capNo === true ? 1 : 0} />
                              }
                            />
                          ) : Change_Imp !== null && Change_Imp === 2 ? (
                            <FormControlLabel
                              label="No"
                              style={{
                                pointerEvents: "none",
                                cursor: "not-allowed",
                              }}
                              // onClick={handleCapacityNo}
                              control={
                                <Checkbox
                                  checked={
                                    ecorecfield && ecorecfield.Capacity === 0
                                      ? 1
                                      : 0
                                  }
                                />
                              }
                            />
                          ) : (
                            ""
                          )}
                        </Item>
                      </Grid>
                      <Grid
                        item
                        xs={3.5}
                        sm={3.5}
                        xl={1.7}
                        md={2}
                        lg={2}
                        sx={{ fontWeight: "bold", mt: 7 }}
                      >
                        {" "}
                        Bank Build Requirement{" "}
                      </Grid>
                      <Grid item xs={3.5} sm={4} xl={1} lg={1.5} md={1.5}>
                        <Item sx={{ mt: 5 }}>
                          {Change_Imp !== null && Change_Imp === 0 ? (
                            <FormControlLabel
                              label="Yes"
                              onClick={(e) => {
                                if (e.target.checked === true) {
                                  SetBuildNo(false);
                                  SetBuildYes(
                                    e.target.checked === true ? true : false
                                  );
                                } else {
                                  SetBuildNo(true);
                                  SetBuildYes(
                                    e.target.checked === true ? true : false
                                  );
                                }
                              }}
                              control={
                                <Checkbox checked={buildYes === true ? 1 : 0} />
                              }
                            />
                          ) : Change_Imp === null ||
                            (Change_Imp !== null && Change_Imp === 1) ? (
                            <FormControlLabel
                              label="Yes"
                              onClick={(e) => {
                                if (e.target.checked === true) {
                                  SetBuildNo(false);
                                  SetBuildYes(
                                    e.target.checked === true ? true : false
                                  );
                                } else {
                                  SetBuildNo(true);
                                  SetBuildYes(
                                    e.target.checked === true ? true : false
                                  );
                                }
                              }}
                              control={
                                <Checkbox checked={buildYes === true ? 1 : 0} />
                              }
                            />
                          ) : Change_Imp !== null && Change_Imp === 2 ? (
                            <FormControlLabel
                              label="Yes"
                              style={{
                                pointerEvents: "none",
                                cursor: "not-allowed",
                              }}
                              // onClick={handleBuildYes}
                              control={
                                <Checkbox
                                  checked={
                                    ecorecfield && ecorecfield.Build_Req === 1
                                      ? 1
                                      : 0
                                  }
                                />
                              }
                            />
                          ) : (
                            ""
                          )}
                        </Item>
                      </Grid>
                      <Grid item xs={3.5} sm={4} xl={1} lg={1.5} md={1.9}>
                        <Item sx={{ mt: 5 }}>
                          {Change_Imp !== null && Change_Imp === 0 ? (
                            <FormControlLabel
                              label="No"
                              onClick={(e) => {
                                if (e.target.checked === true) {
                                  SetBuildYes(false);
                                  SetBuildNo(
                                    e.target.checked === true ? true : false
                                  );
                                } else {
                                  SetBuildYes(true);
                                  SetBuildNo(
                                    e.target.checked === true ? true : false
                                  );
                                }
                              }}
                              control={
                                <Checkbox checked={buildNo === true ? 1 : 0} />
                              }
                            />
                          ) : Change_Imp === null ||
                            (Change_Imp !== null && Change_Imp === 1) ? (
                            <FormControlLabel
                              label="No"
                              onClick={(e) => {
                                if (e.target.checked === true) {
                                  SetBuildYes(false);
                                  SetBuildNo(
                                    e.target.checked === true ? true : false
                                  );
                                } else {
                                  SetBuildYes(true);
                                  SetBuildNo(
                                    e.target.checked === true ? true : false
                                  );
                                }
                              }}
                              control={
                                <Checkbox checked={buildNo === true ? 1 : 0} />
                              }
                            />
                          ) : Change_Imp !== null && Change_Imp === 2 ? (
                            <FormControlLabel
                              label="No"
                              style={{
                                pointerEvents: "none",
                                cursor: "not-allowed",
                              }}
                              // onClick={handleBuildNo}
                              control={
                                <Checkbox
                                  checked={
                                    ecorecfield && ecorecfield.Build_Req === 0
                                      ? 1
                                      : 0
                                  }
                                />
                              }
                            />
                          ) : (
                            ""
                          )}
                        </Item>
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        md={4}
                        sm={12}
                        xl={1.7}
                        lg={4.5}
                        sx={{ fontWeight: "bold", mt: 5 }}
                      >
                        {" "}
                        Verified the Specific customer requirements for the
                        change{" "}
                      </Grid>
                      <Grid item xs={6} sm={4} xl={1.2} lg={3} md={4}>
                        <Item sx={{ mt: 4 }}>
                          {Change_Imp !== null && Change_Imp === 0 ? (
                            <FormControlLabel
                              label="Applicable"
                              onClick={(e) => {
                                if (e.target.checked === true) {
                                  SetNotApplicable(false);
                                  SetApplicable(
                                    e.target.checked === true ? true : false
                                  );
                                } else {
                                  SetNotApplicable(true);
                                  SetApplicable(
                                    e.target.checked === true ? true : false
                                  );
                                }
                              }}
                              control={
                                <Checkbox
                                  checked={applicable === true ? 1 : 0}
                                />
                              }
                            />
                          ) : Change_Imp === null ||
                            (Change_Imp !== null && Change_Imp === 1) ? (
                            <FormControlLabel
                              label="Applicable"
                              onClick={(e) => {
                                if (e.target.checked === true) {
                                  SetNotApplicable(false);
                                  SetApplicable(
                                    e.target.checked === true ? true : false
                                  );
                                } else {
                                  SetNotApplicable(true);
                                  SetApplicable(
                                    e.target.checked === true ? true : false
                                  );
                                }
                              }}
                              control={
                                <Checkbox
                                  checked={applicable === true ? 1 : 0}
                                />
                              }
                            />
                          ) : Change_Imp !== null && Change_Imp === 2 ? (
                            <FormControlLabel
                              label="Applicable"
                              style={{
                                pointerEvents: "none",
                                cursor: "not-allowed",
                              }}
                              // onClick={handleClickApplicable}
                              control={
                                <Checkbox
                                  checked={
                                    ecorecfield &&
                                      ecorecfield.Specific_Cus_Req === 1
                                      ? 1
                                      : 0
                                  }
                                />
                              }
                            />
                          ) : (
                            ""
                          )}
                        </Item>
                      </Grid>
                      <Grid item xs={6} sm={4} xl={1.6} lg={3} md={3.5}>
                        <Item sx={{ mt: 4 }}>
                          {Change_Imp !== null && Change_Imp === 0 ? (
                            <FormControlLabel
                              label="Not Applicable"
                              onClick={(e) => {
                                if (e.target.checked === true) {
                                  SetApplicable(false);
                                  SetNotApplicable(
                                    e.target.checked === true ? true : false
                                  );
                                } else {
                                  SetApplicable(true);
                                  SetNotApplicable(
                                    e.target.checked === true ? true : false
                                  );
                                }
                              }}
                              control={
                                <Checkbox
                                  checked={notapplicable === true ? 1 : 0}
                                />
                              }
                            />
                          ) : Change_Imp === null ||
                            (Change_Imp !== null && Change_Imp === 1) ? (
                            <FormControlLabel
                              label="Not Applicable"
                              // onClick={handleClickNotApplicable}
                              onClick={(e) => {
                                if (e.target.checked === true) {
                                  SetApplicable(false);
                                  SetNotApplicable(
                                    e.target.checked === true ? true : false
                                  );
                                } else {
                                  SetApplicable(true);
                                  SetNotApplicable(
                                    e.target.checked === true ? true : false
                                  );
                                }
                              }}
                              control={
                                <Checkbox
                                  checked={notapplicable === true ? 1 : 0}
                                />
                              }
                            />
                          ) : Change_Imp !== null && Change_Imp === 2 ? (
                            <FormControlLabel
                              label="Not Applicable"
                              style={{
                                pointerEvents: "none",
                                cursor: "not-allowed",
                              }}
                              // onClick={handleClickNotApplicable}
                              control={
                                <Checkbox
                                  checked={
                                    ecorecfield &&
                                      ecorecfield.Specific_Cus_Req === 0
                                      ? 1
                                      : 0
                                  }
                                />
                              }
                            />
                          ) : (
                            ""
                          )}
                        </Item>
                      </Grid>
                    </Grid>
                  </Stack>
                </CardContent>
              </Card>
            </Box>

            <Box sx={{ mt: 2 }}>
              <Card raised={true} sx={app_style.cardSxT}>
                <CardHeader
                  sx={{ backgroundColor: "#5A5A5A", color: "white" }}
                  title={
                    <Typography sx={app_style.cardHeading}>
                      Final Change Status
                    </Typography>
                  }
                ></CardHeader>
                <CardContent>
                  <Stack spacing={2}>
                    <Grid container spacing={2}>
                      <Grid xs={12} sm={6} md={3} item>
                        <Item style={{ backgroundColor: "#F4F4F4" }}>
                          <Typography
                            sx={{ m: 1, fontSize: 16, fontWeight: "bold" }}
                          >
                            Change Implementation
                          </Typography>
                          {Change_Imp !== null && Change_Imp === 0 ? (
                            <FormControl sx={{ minWidth: 160 }} size="small">
                              <InputLabel>Select</InputLabel>
                              <Select
                                required
                                sx={{
                                  color: "black",
                                  backgroundColor:
                                    changeimp === 1
                                      ? "#90EE90"
                                      : changeimp === 2
                                        ? "#DCDCA0"
                                        : changeimp === 3
                                          ? "#f1807e"
                                          : ecorecfield &&
                                            ecorecfield.Change_Imp === 2
                                            ? "#90EE90"
                                            : ecorecfield &&
                                              ecorecfield.Change_Imp === 1
                                              ? "#f1807e"
                                              : ecorecfield &&
                                                ecorecfield.Change_Imp === 0
                                                ? "#DCDCA0"
                                                : "",
                                  fontSize: 14,
                                }}
                                label="Select"
                                value={
                                  changeimp !== ""
                                    ? changeimp === 0
                                      ? 2
                                      : 1
                                    : ecorecfield &&
                                      ecorecfield.Change_Imp === 0
                                      ? 2
                                      : 1
                                }
                                onChange={(event) => {
                                  SetChangeImp(event.target.value);
                                }}
                              >
                                {changeimpobj &&
                                  changeimpobj.map((item, index) => (
                                    <MenuItem key={index} value={item.id}>
                                      {item.value}
                                    </MenuItem>
                                  ))}
                              </Select>
                            </FormControl>
                          ) : Change_Imp === null ||
                            (Change_Imp !== null && Change_Imp === 1) ? (
                            <FormControl sx={{ minWidth: 160 }} size="small">
                              <InputLabel>Select</InputLabel>
                              <Select
                                required
                                sx={{
                                  color: "black",
                                  backgroundColor:
                                    changeimp === 1
                                      ? "#90EE90"
                                      : changeimp === 2
                                        ? "#DCDCA0"
                                        : changeimp === 3
                                          ? "#f1807e"
                                          : "white",
                                  fontSize: 14,
                                }}
                                label="Select"
                                value={changeimp}
                                onChange={(event) => {
                                  SetChangeImp(event.target.value);
                                }}
                              >
                                {changeimpobj &&
                                  changeimpobj.map((item, index) => (
                                    <MenuItem key={index} value={item.id}>
                                      {item.value}
                                    </MenuItem>
                                  ))}
                              </Select>
                            </FormControl>
                          ) : Change_Imp !== null && Change_Imp === 2 ? (
                            <FormControl sx={{ minWidth: 160 }} size="small">
                              <InputLabel>Select</InputLabel>
                              <Select
                                required
                                sx={{
                                  color: "black",
                                  backgroundColor:
                                    ecorecfield && ecorecfield.Change_Imp === 2
                                      ? "#90EE90"
                                      : ecorecfield &&
                                        ecorecfield.Change_Imp === 0
                                        ? "#f1807e"
                                        : "white",
                                  fontSize: 14,
                                }}
                                // style={{
                                //   pointerEvents: "none",
                                //   cursor: "not-allowed",
                                // }}
                                label="Select"
                                value={
                                  ecorecfield && ecorecfield.Change_Imp === 0
                                    ? 2
                                    : 1
                                }
                                onChange={(event) => {
                                  SetChangeImp(event.target.value);
                                }}
                              >
                                {changeimpobj &&
                                  changeimpobj.map((item, index) => (
                                    <MenuItem key={index} value={item.id}>
                                      {item.value}
                                    </MenuItem>
                                  ))}
                              </Select>
                            </FormControl>
                          ) : (
                            ""
                          )}
                        </Item>
                      </Grid>
                      <Grid xs={12} sm={6} md={3} item>
                        <Item style={{ backgroundColor: "#F4F4F4" }}>
                          <Typography
                            sx={{ m: 1, fontSize: 16, fontWeight: "bold" }}
                          >
                            Timing Targets
                          </Typography>
                          {Change_Imp !== null && Change_Imp === 0 ? (
                            <FormControl sx={{ minWidth: 160 }} size="small">
                              <InputLabel>Select</InputLabel>
                              <Select
                                required
                                sx={{
                                  color: "black",
                                  backgroundColor:
                                    timingtar === 1
                                      ? "#90EE90"
                                      : timingtar === 2
                                        ? "#f1807e"
                                        : ecorecfield &&
                                          ecorecfield.Timing_Target === 2
                                          ? "#f1807e"
                                          : ecorecfield &&
                                            ecorecfield.Timing_Target === 1
                                            ? "#90EE90"
                                            : "",
                                  fontSize: 14,
                                }}
                                label="Select"
                                value={
                                  timingtar !== ""
                                    ? timingtar
                                    : ecorecfield && ecorecfield.Timing_Target
                                }
                                onChange={(event) => {
                                  SetTimingTar(event.target.value);
                                }}
                              >
                                {timingtargetobj &&
                                  timingtargetobj.map((item, index) => (
                                    <MenuItem key={index} value={item.id}>
                                      {item.value}
                                    </MenuItem>
                                  ))}
                              </Select>
                            </FormControl>
                          ) : Change_Imp === null ||
                            (Change_Imp !== null && Change_Imp === 1) ? (
                            <FormControl sx={{ minWidth: 160 }} size="small">
                              <InputLabel>Select</InputLabel>
                              <Select
                                required
                                sx={{
                                  color: "black",
                                  backgroundColor:
                                    Change_Imp === 1
                                      ? "white"
                                      : timingtar === 1
                                        ? "#90EE90"
                                        : timingtar === 2
                                          ? "#f1807e"
                                          : "white",
                                  fontSize: 14,
                                }}
                                label="Select"
                                value={timingtar}
                                onChange={(event) => {
                                  SetTimingTar(event.target.value);
                                }}
                              >
                                {timingtargetobj &&
                                  timingtargetobj.map((item, index) => (
                                    <MenuItem key={index} value={item.id}>
                                      {item.value}
                                    </MenuItem>
                                  ))}
                              </Select>
                            </FormControl>
                          ) : Change_Imp !== null && Change_Imp === 2 ? (
                            <FormControl sx={{ minWidth: 160 }} size="small">
                              <InputLabel>Select</InputLabel>
                              <Select
                                required
                                sx={{
                                  color: "black",
                                  backgroundColor:
                                    ecorecfield &&
                                      ecorecfield.Timing_Target === 1
                                      ? "#90EE90"
                                      : ecorecfield &&
                                        ecorecfield.Timing_Target === 2
                                        ? "#f1807e"
                                        : "white",
                                  fontSize: 14,
                                }}
                                style={{
                                  pointerEvents: "none",
                                  cursor: "not-allowed",
                                }}
                                label="Select"
                                value={ecorecfield && ecorecfield.Timing_Target}
                                onChange={(event) => {
                                  SetTimingTar(event.target.value);
                                }}
                              >
                                {timingtargetobj &&
                                  timingtargetobj.map((item, index) => (
                                    <MenuItem key={index} value={item.id}>
                                      {item.value}
                                    </MenuItem>
                                  ))}
                              </Select>
                            </FormControl>
                          ) : (
                            ""
                          )}
                        </Item>
                      </Grid>
                      <Grid xs={12} sm={6} md={3} item>
                        <Item style={{ backgroundColor: "#F4F4F4" }}>
                          <Typography
                            sx={{ m: 1, fontSize: 16, fontWeight: "bold" }}
                          >
                            Cost Targets
                          </Typography>
                          {Change_Imp !== null && Change_Imp === 0 ? (
                            <FormControl sx={{ minWidth: 160 }} size="small">
                              <InputLabel>Select</InputLabel>
                              <Select
                                required
                                sx={{
                                  fontSize: 14,
                                  color: "black",
                                  backgroundColor:
                                    costtar === 1
                                      ? "#90EE90"
                                      : costtar === 2
                                        ? "#f1807e"
                                        : ecorecfield &&
                                          ecorecfield.Cost_Target === 2
                                          ? "#f1807e"
                                          : ecorecfield &&
                                            ecorecfield.Cost_Target === 1
                                            ? "#90EE90"
                                            : "",
                                }}
                                label="Select"
                                value={
                                  costtar !== ""
                                    ? costtar
                                    : ecorecfield && ecorecfield.Cost_Target
                                }
                                onChange={(event) => {
                                  SetCostTar(event.target.value);
                                }}
                              >
                                {costtargetobj &&
                                  costtargetobj.map((item, index) => (
                                    <MenuItem key={index} value={item.id}>
                                      {item.value}
                                    </MenuItem>
                                  ))}
                              </Select>
                            </FormControl>
                          ) : Change_Imp === null ||
                            (Change_Imp !== null && Change_Imp === 1) ? (
                            <FormControl sx={{ minWidth: 160 }} size="small">
                              <InputLabel>Select</InputLabel>
                              <Select
                                required
                                sx={{
                                  fontSize: 14,
                                  color: "black",
                                  backgroundColor:
                                    costtar === 1
                                      ? "#90EE90"
                                      : costtar === 2
                                        ? "#f1807e"
                                        : "white",
                                }}
                                label="Select"
                                value={costtar}
                                onChange={(event) => {
                                  SetCostTar(event.target.value);
                                }}
                              >
                                {costtargetobj &&
                                  costtargetobj.map((item, index) => (
                                    <MenuItem key={index} value={item.id}>
                                      {item.value}
                                    </MenuItem>
                                  ))}
                              </Select>
                            </FormControl>
                          ) : Change_Imp !== null && Change_Imp === 2 ? (
                            <FormControl sx={{ minWidth: 160 }} size="small">
                              <InputLabel>Select</InputLabel>
                              <Select
                                required
                                sx={{
                                  fontSize: 14,
                                  color: "black",
                                  backgroundColor:
                                    ecorecfield && ecorecfield.Cost_Target === 1
                                      ? "#90EE90"
                                      : ecorecfield &&
                                        ecorecfield.Cost_Target === 2
                                        ? "#f1807e"
                                        : "white",
                                }}
                                style={{
                                  pointerEvents: "none",
                                  cursor: "not-allowed",
                                }}
                                label="Select"
                                value={ecorecfield && ecorecfield.Cost_Target}
                                onChange={(event) => {
                                  SetCostTar(event.target.value);
                                }}
                              >
                                {costtargetobj &&
                                  costtargetobj.map((item, index) => (
                                    <MenuItem key={index} value={item.id}>
                                      {item.value}
                                    </MenuItem>
                                  ))}
                              </Select>
                            </FormControl>
                          ) : (
                            ""
                          )}
                        </Item>
                      </Grid>
                      <Grid xs={12} sm={6} md={3} item>
                        <Item style={{ backgroundColor: "#F4F4F4" }}>
                          <Typography
                            sx={{ m: 1, fontSize: 16, fontWeight: "bold" }}
                          >
                            Quality Targets
                          </Typography>
                          <FormControl sx={{ minWidth: 160 }} size="small">
                            <InputLabel>Select</InputLabel>
                            {ecorecfield && ecorecfield.Change_Imp === 0 ? (
                              <Select
                                required
                                sx={{
                                  fontSize: 14,
                                  color: "black",
                                  backgroundColor:
                                    qualitytar === 1
                                      ? "#90EE90"
                                      : qualitytar === 2
                                        ? "#f1807e"
                                        : ecorecfield &&
                                          ecorecfield.Quality_Target === 2
                                          ? "#f1807e"
                                          : ecorecfield &&
                                            ecorecfield.Quality_Target === 1
                                            ? "#90EE90"
                                            : "",
                                }}
                                label="Select"
                                value={
                                  qualitytar !== ""
                                    ? qualitytar
                                    : ecorecfield && ecorecfield.Quality_Target
                                }
                                onChange={(event) => {
                                  SetQualityTar(event.target.value);
                                }}
                              >
                                {qualitytargetobj &&
                                  qualitytargetobj.map((item, index) => (
                                    <MenuItem key={index} value={item.id}>
                                      {item.value}
                                    </MenuItem>
                                  ))}
                              </Select>
                            ) : Change_Imp === null ||
                              (Change_Imp !== null && Change_Imp === 1) ? (
                              <Select
                                required
                                sx={{
                                  fontSize: 14,
                                  color: "black",
                                  backgroundColor:
                                    qualitytar === 1
                                      ? "#90EE90"
                                      : qualitytar === 2
                                        ? "#f1807e"
                                        : "white",
                                }}
                                label="Select"
                                value={qualitytar}
                                onChange={(event) => {
                                  SetQualityTar(event.target.value);
                                }}
                              >
                                {qualitytargetobj &&
                                  qualitytargetobj.map((item, index) => (
                                    <MenuItem key={index} value={item.id}>
                                      {item.value}
                                    </MenuItem>
                                  ))}
                              </Select>
                            ) : Change_Imp !== null && Change_Imp === 2 ? (
                              <Select
                                required
                                sx={{
                                  fontSize: 14,
                                  color: "black",
                                  backgroundColor:
                                    ecorecfield &&
                                      ecorecfield.Quality_Target === 1
                                      ? "#90EE90"
                                      : ecorecfield &&
                                        ecorecfield.Quality_Target === 2
                                        ? "#f1807e"
                                        : "white",
                                }}
                                style={{
                                  pointerEvents: "none",
                                  cursor: "not-allowed",
                                }}
                                label="Select"
                                value={
                                  ecorecfield && ecorecfield.Quality_Target
                                }
                                onChange={(event) => {
                                  SetQualityTar(event.target.value);
                                }}
                              >
                                {qualitytargetobj &&
                                  qualitytargetobj.map((item, index) => (
                                    <MenuItem key={index} value={item.id}>
                                      {item.value}
                                    </MenuItem>
                                  ))}
                              </Select>
                            ) : (
                              ""
                            )}
                          </FormControl>
                        </Item>
                      </Grid>
                    </Grid>
                    {ecorecfield && ecorecfield.Change_Imp === 0 ? (
                      <Grid
                        container
                        justifyContent="center"
                        alignItems="center"
                        spacing={2}
                      >
                        <Grid item>
                          <Button
                            variant="contained"
                            color="success"
                            onClick={handleUpdate}
                          >
                            Update
                          </Button>
                        </Grid>
                        <Grid item>
                          <Button variant="contained">Cancel</Button>
                        </Grid>
                      </Grid>
                    ) : ecorecfield === null ||
                      (ecorecfield && ecorecfield.Change_Imp === 1) ? (
                      <Grid
                        container
                        justifyContent="center"
                        alignItems="center"
                        spacing={2}
                      >
                        <Grid item>
                          <Button
                            variant="contained"
                            color="success"
                            onClick={handleSubmit}
                          >
                            Submit
                          </Button>
                        </Grid>
                        <Grid item>
                          <Button variant="contained">Cancel</Button>
                        </Grid>
                      </Grid>
                    ) : (
                      ""
                    )}
                  </Stack>
                </CardContent>
              </Card>
            </Box>
          </Box>
        ) : (
          ""
        )}
        <ToastContainer />
        <Box>
          <Modal
            open={open}
            hideBackdrop
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={modalStyle}>
              <Box>
                {modalCode === 2 ? (
                  <img width={700} src={base64Image} alt="No preview available" />
                ) : (
                  <div className="row" style={{ display: 'flex', width: '100%' }}>
                    <div className="col-md-5 col-lg-5 col-xl-5" style={{ width: '80%' }}>
                      <div style={{ maxHeight: "600px", overflow: "auto" }}>
                        <table style={{ width: "100%" }}>
                          <tr>
                            <th style={{ textAlign: "center", fontWeight: "bold", fontSize: "20px" }} colSpan={2}>
                              Feasibility Study
                            </th>
                          </tr>
                          {quesobj.map((res) => {
                            return (
                              <tr key={res.id}>
                                <td style={{ width: "40%" }}>
                                  <p>{res.question}</p>
                                </td>
                                <td style={{ width: "10%" }}>
                                  {res.ans === 1 ? <img src={trueimg} width={"25px"} />
                                    : res.ans === 0 ? <img src={wrongimg} width={"25px"} />
                                      : <img src={notapp} width={"30px"} />
                                  }
                                </td>
                              </tr>
                            );
                          })}
                        </table>
                      </div>
                    </div>
                    <div className="col-md-47 col-lg-7 col-xl-7" style={{ width: '105%' }}>
                      <div style={{ maxHeight: "600px", overflow: "auto" }}>
                        <table style={{ width: "100%" }}>
                          <tr>
                            <th style={{ textAlign: "center", fontWeight: "bold", fontSize: "20px" }}>
                              Risk Assessment
                            </th>
                            <th style={{ textAlign: "center", fontWeight: "bold", fontSize: "20px" }}>
                              Risk Applicable

                            </th>
                            <th style={{ textAlign: "center", fontWeight: "bold", fontSize: "20px" }}>
                              Rank
                            </th>
                            <th style={{ textAlign: "center", fontWeight: "bold", fontSize: "20px" }}>
                              Remark
                            </th>
                          </tr>
                          {commondeptobj.map((res) => {
                            return (
                              <tr key={res.id}>
                                <td style={{ width: "40%" }}>
                                  <p>{res.question}</p>
                                </td>
                                <td style={{ width: "5%", textAlign: "center" }}>
                                  {res.ans === 1 ? <img src={trueimg} width={"25px"} />
                                    : <img src={wrongimg} width={"25px"} />
                                  }
                                </td>
                                <td style={{ width: "5%", textAlign: "center" }}>
                                  <Button variant="contained" color={res.ans1 === 0 ? "success" : res.ans1 === 2 ? "error" : "secondary"}>{res.ans1 === 0 ? "LOW" : res.ans1 === 1 ? "MEDIUM" : "HIGH"}</Button>
                                  {/* <p>{res.ans1}</p> */}
                                </td>
                                <td style={{ width: "15%" }}>
                                  <p style={{ alignItems: "center", justifyContent: "center", display: "flex" }}>{res.ans2}</p>
                                </td>
                              </tr>
                            );
                          })}
                        </table>
                      </div>
                    </div>
                  </div>



                )}
              </Box>
              <Box
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: 5,
                }}
              >
                <Button variant="contained" onClick={handleCloseModal}>
                  Close
                </Button>
              </Box>
            </Box>
          </Modal>
        </Box>
      </Box>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Box>
  );
};
export default MasterReportDetail;
