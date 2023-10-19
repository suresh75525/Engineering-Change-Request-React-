/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import "./index.css";
import { Table } from "antd";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";

const RiskCheck = (props) => {
  const {
    getAssesmentData = () => {},
    emptyAssesmentData,
    setEmptyAssesmentData,
  } = props;
  const store = useSelector(state => state.auth);
  let column;
  let data;
  const decrypted = store.logged_dept;
  let emptyArrayList;
  let emptyArrayData;
  if (
    decrypted === "Engineering" ||
    decrypted === "Program_Management" ||
    decrypted === "Purchase"
  ) {
    emptyArrayList = Array(14).fill("");
    emptyArrayData = Array(10).fill("");
  }
  if (decrypted === "Quality") {
    emptyArrayList = Array(15).fill("");
    emptyArrayData = Array(11).fill("");
  }
  if (decrypted === "Manufacturing") {
    emptyArrayList = Array(16).fill("");
    emptyArrayData = Array(12).fill("");
  }
  if (decrypted === "SDE") {
    emptyArrayList = Array(13).fill("");
    emptyArrayData = Array(9).fill("");
  }
  if (decrypted === "Production") {
    emptyArrayList = Array(12).fill("");
    emptyArrayData = Array(8).fill("");
  }
  const [riskSource, setRiskSource] = useState(emptyArrayList);
  const [rankSource, setRankSource] = useState(emptyArrayList);
  const [remarkSource, setRemarkSource] = useState(emptyArrayList);
  const [riskData, setRiskData] = useState(emptyArrayData);
  const [rankData, setRankData] = useState(emptyArrayData);
  const [remarkData, setRemarkData] = useState(emptyArrayData);
  const [riskList, setRiskList] = useState("");
  const [rankList, setRankList] = useState("");
  const [remarkList, setRemarkList] = useState("");

  useEffect(() => {
    function clearData() {
      if (emptyAssesmentData) {
        setRiskSource(emptyArrayList);
        setRankSource(emptyArrayList);
        setRemarkSource(emptyArrayList);
        setRiskData(emptyArrayData);
        setRankData(emptyArrayData);
        setRemarkData(emptyArrayData);
        setRiskList("");
        setRankList("");
        setRemarkList("");
        setEmptyAssesmentData(false);
      }
    }
    clearData();
  }, [emptyAssesmentData]);

  const handleChangeEngg = (e, index) => {
    const newDataFetch = [...riskSource];
    const newData = [...riskData];
    newDataFetch[index] = e.target.value;
    if (
      decrypted === "Engineering" ||
      decrypted === "Program_Management" ||
      decrypted === "Purchase"
    ) {
      if (index < 4) {
        newData[index - 1] = e.target.value;
      } else if (index < 7) {
        newData[index - 2] = e.target.value;
      } else if (index < 10) {
        newData[index - 3] = e.target.value;
      } else {
        newData[index - 4] = e.target.value;
      }
    }
    if (decrypted === "Quality") {
      if (index < 4) {
        newData[index - 1] = e.target.value;
      } else if (index < 7) {
        newData[index - 2] = e.target.value;
      } else if (index < 11) {
        newData[index - 3] = e.target.value;
      } else {
        newData[index - 4] = e.target.value;
      }
    }
    if (decrypted === "Purchase") {
      if (index < 3) {
        newData[index - 1] = e.target.value;
      } else if (index < 6) {
        newData[index - 2] = e.target.value;
      } else if (index < 11) {
        newData[index - 3] = e.target.value;
      } else {
        newData[index - 4] = e.target.value;
      }
    }
    if (decrypted === "Manufacturing") {
      if (index < 4) {
        newData[index - 1] = e.target.value;
      } else if (index < 9) {
        newData[index - 2] = e.target.value;
      } else if (index < 12) {
        newData[index - 3] = e.target.value;
      } else {
        newData[index - 4] = e.target.value;
      }
    }
    if (decrypted === "SDE") {
      if (index < 3) {
        newData[index - 1] = e.target.value;
      } else if (index < 6) {
        newData[index - 2] = e.target.value;
      } else if (index < 10) {
        newData[index - 3] = e.target.value;
      } else {
        newData[index - 4] = e.target.value;
      }
    }
    if (decrypted === "Production") {
      if (index < 2) {
        newData[index - 1] = e.target.value;
      } else if (index < 5) {
        newData[index - 2] = e.target.value;
      } else if (index < 9) {
        newData[index - 3] = e.target.value;
      } else {
        newData[index - 4] = e.target.value;
      }
    }
    setRiskData(newData);
    setRiskSource(newDataFetch);
    const validate = newData.every((item) => item !== "");
    if (validate) {
      setRiskList(newData);
      getAssesmentData(newData, rankList, remarkList);
    }
  };

  const handleEngRank = (e, index) => {
    const newDataFetch = [...rankSource];
    const newData = [...rankData];
    newDataFetch[index] = e.target.value;
    if (decrypted === "Engineering" || decrypted === "Program_Management") {
      if (index < 4) {
        newData[index - 1] = e.target.value;
      } else if (index < 7) {
        newData[index - 2] = e.target.value;
      } else if (index < 10) {
        newData[index - 3] = e.target.value;
      } else {
        newData[index - 4] = e.target.value;
      }
    }
    if (decrypted === "Quality") {
      if (index < 4) {
        newData[index - 1] = e.target.value;
      } else if (index < 7) {
        newData[index - 2] = e.target.value;
      } else if (index < 11) {
        newData[index - 3] = e.target.value;
      } else {
        newData[index - 4] = e.target.value;
      }
    }
    if (decrypted === "Purchase") {
      if (index < 3) {
        newData[index - 1] = e.target.value;
      } else if (index < 6) {
        newData[index - 2] = e.target.value;
      } else if (index < 11) {
        newData[index - 3] = e.target.value;
      } else {
        newData[index - 4] = e.target.value;
      }
    }
    if (decrypted === "Manufacturing") {
      if (index < 4) {
        newData[index - 1] = e.target.value;
      } else if (index < 9) {
        newData[index - 2] = e.target.value;
      } else if (index < 12) {
        newData[index - 3] = e.target.value;
      } else {
        newData[index - 4] = e.target.value;
      }
    }
    if (decrypted === "SDE") {
      if (index < 3) {
        newData[index - 1] = e.target.value;
      } else if (index < 6) {
        newData[index - 2] = e.target.value;
      } else if (index < 10) {
        newData[index - 3] = e.target.value;
      } else {
        newData[index - 4] = e.target.value;
      }
    }
    if (decrypted === "Production") {
      if (index < 2) {
        newData[index - 1] = e.target.value;
      } else if (index < 5) {
        newData[index - 2] = e.target.value;
      } else if (index < 9) {
        newData[index - 3] = e.target.value;
      } else {
        newData[index - 4] = e.target.value;
      }
    }
    setRankData(newData);
    setRankSource(newDataFetch);
    const validate = newData.every((item) => item !== "");
    if (validate) {
      setRankList(newData);
      getAssesmentData(riskList, newData, remarkList);
    }
  };

  const handleEngRemark = (e, index) => {
    const newDataFetch = [...remarkSource];
    const newData = [...remarkData];
    newDataFetch[index] = e.target.value;
    if (
      decrypted === "Engineering" ||
      decrypted === "Program_Management" ||
      decrypted === "Purchase"
    ) {
      if (index < 4) {
        newData[index - 1] = e.target.value;
      } else if (index < 7) {
        newData[index - 2] = e.target.value;
      } else if (index < 10) {
        newData[index - 3] = e.target.value;
      } else {
        newData[index - 4] = e.target.value;
      }
    }
    if (decrypted === "Quality") {
      if (index < 4) {
        newData[index - 1] = e.target.value;
      } else if (index < 7) {
        newData[index - 2] = e.target.value;
      } else if (index < 11) {
        newData[index - 3] = e.target.value;
      } else {
        newData[index - 4] = e.target.value;
      }
    }
    if (decrypted === "Purchase") {
      if (index < 3) {
        newData[index - 1] = e.target.value;
      } else if (index < 6) {
        newData[index - 2] = e.target.value;
      } else if (index < 11) {
        newData[index - 3] = e.target.value;
      } else {
        newData[index - 4] = e.target.value;
      }
    }
    if (decrypted === "Manufacturing") {
      if (index < 4) {
        newData[index - 1] = e.target.value;
      } else if (index < 9) {
        newData[index - 2] = e.target.value;
      } else if (index < 12) {
        newData[index - 3] = e.target.value;
      } else {
        newData[index - 4] = e.target.value;
      }
    }
    if (decrypted === "SDE") {
      if (index < 3) {
        newData[index - 1] = e.target.value;
      } else if (index < 6) {
        newData[index - 2] = e.target.value;
      } else if (index < 10) {
        newData[index - 3] = e.target.value;
      } else {
        newData[index - 4] = e.target.value;
      }
    }
    if (decrypted === "Production") {
      if (index < 2) {
        newData[index - 1] = e.target.value;
      } else if (index < 5) {
        newData[index - 2] = e.target.value;
      } else if (index < 9) {
        newData[index - 3] = e.target.value;
      } else {
        newData[index - 4] = e.target.value;
      }
    }
    setRemarkData(newData);
    setRemarkSource(newDataFetch);
    const validate = newData.every((item) => item !== "");
    if (validate) {
      setRemarkList(newData);
      getAssesmentData(riskList, rankList, newData);
    }
  };

  const columnsQuality = [
    {
      title: () => {
        return <Typography sx={{ textAlign: "center" }}>Criteria</Typography>;
      },
      dataIndex: "Criteria",
      width: "30%",
      render: (text, row, index) => {
        if (index === 0 || index === 4 || index === 7 || index === 11) {
          let head =
            index === 0
              ? "MAN"
              : index === 4
              ? "MACHINE"
              : index === 7
              ? "MATERIAL"
              : "METHOD";
          return {
            children: (
              <Typography
                fontWeight="bold"
                sx={{ fontSize: 14, textAlign: "center" }}
              >
                {head}
              </Typography>
            ),
            props: {
              colSpan: 4,
              style: { backgroundColor: "#F2F3F5" },
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
    {
      title: "Risk Applicable",
      dataIndex: "Risk",
      align: "center",
      width: "10%",
      render: (text, row, index) => {
        if (index === 0 || index === 4 || index === 7 || index === 11) {
          return {
            children: "",
            props: {
              colSpan: 0,
            },
          };
        }
        return {
          children: (
            <FormControl size="small">
              <InputLabel id="demo-simple-select-label">Select</InputLabel>
              <Select
                required
                sx={{ backgroundColor: "white", width: 90 }}
                labelId="demo-simple-select-label"
                label="Select"
                value={riskSource[index]}
                onChange={(e) => {
                  handleChangeEngg(e, index);
                }}
              >
                <MenuItem value={1}>Yes</MenuItem>
                <MenuItem value={0}>No</MenuItem>
              </Select>
            </FormControl>
          ),
        };
      },
    },
    {
      title: "Rank",
      dataIndex: "Rank",
      align: "center",
      width: "20%",
      render: (text, row, index) => {
        if (index === 0 || index === 4 || index === 7 || index === 11) {
          return {
            children: "",
            props: {
              colSpan: 0,
            },
          };
        }
        return {
          children: (
            <FormControl size="small">
              <InputLabel id="demo-simple-select-label">Select</InputLabel>
              <Select
                required
                sx={{ backgroundColor: "white", width: 90 }}
                labelId="demo-simple-select-label"
                label="Select"
                value={rankSource[index]}
                onChange={(e) => {
                  handleEngRank(e, index);
                }}
              >
                <MenuItem value={0}>Low</MenuItem>
                <MenuItem value={1}>Medium</MenuItem>
                <MenuItem value={2}>High</MenuItem>
              </Select>
            </FormControl>
          ),
        };
      },
    },
    {
      title: "Remark",
      dataIndex: "Remark",
      align: "center",
      render: (text, row, index) => {
        if (index === 0 || index === 4 || index === 7 || index === 11) {
          return {
            children: "",
            props: {
              colSpan: 0,
            },
          };
        }
        return {
          children: (
            <TextField
              sx={{ backgroundColor: "white", fontSize: 12, padding: 0 }}
              value={remarkSource[index]}
              onChange={(e) => {
                handleEngRemark(e, index);
              }}
              required
              size="small"
              id="outlined-multiline-static"
              label="Remark"
            />
          ),
        };
      },
    },
  ];

  const dataQuality = [
    {
      key: 0,
      Criteria: "",
    },
    {
      key: 1,
      Criteria: "Skill to operate a special measuring eqpt",
    },
    {
      key: 2,
      Criteria: "Training required to Inspectors",
    },
    {
      key: 3,
      Criteria: "Addition of man power",
    },
    {
      key: 4,
      Criteria: "",
    },
    {
      key: 5,
      Criteria: "New / complex technology for measurement/ eqp",
    },
    {
      key: 6,
      Criteria: "Investment in Lab / inspection facility",
    },
    {
      key: 7,
      Criteria: "",
    },
    {
      key: 8,
      Criteria: "Validation / testing required",
    },
    {
      key: 9,
      Criteria: "New matl - Customer validation / approval required",
    },
    {
      key: 10,
      Criteria: "Affecting process chara",
    },
    {
      key: 11,
      Criteria: "",
    },
    {
      key: 12,
      Criteria: "Method of measurement not known",
    },
    {
      key: 13,
      Criteria: "Effects human safety / fatigue / Product safety (CC) chara",
    },
    {
      key: 14,
      Criteria: "Effects productivity / efficiency of inspection",
    },
  ];

  const columnsProgram = [
    {
      title: () => {
        return <Typography sx={{ textAlign: "center" }}>Criteria</Typography>;
      },
      dataIndex: "Criteria",
      width: "30%",
      render: (text, row, index) => {
        if (index === 0 || index === 4 || index === 7 || index === 10) {
          let head =
            index === 0
              ? "MAN"
              : index === 4
              ? "MACHINE"
              : index === 7
              ? "MATERIAL"
              : "METHOD";
          return {
            children: (
              <Typography
                fontWeight="bold"
                sx={{ fontSize: 14, textAlign: "center" }}
              >
                {head}
              </Typography>
            ),
            props: {
              colSpan: 4,
              style: { backgroundColor: "#F2F3F5" },
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
    {
      title: "Risk Applicable",
      dataIndex: "Risk",
      align: "center",
      width: "10%",
      render: (text, row, index) => {
        if (index === 0 || index === 4 || index === 7 || index === 10) {
          return {
            children: "",
            props: {
              colSpan: 0,
            },
          };
        }
        return {
          children: (
            <FormControl size="small">
              <InputLabel id="demo-simple-select-label">Select</InputLabel>
              <Select
                required
                sx={{ backgroundColor: "white", width: 90 }}
                labelId="demo-simple-select-label"
                label="Select"
                value={riskSource[index]}
                onChange={(e) => {
                  handleChangeEngg(e, index);
                }}
              >
                <MenuItem value={1}>Yes</MenuItem>
                <MenuItem value={0}>No</MenuItem>
              </Select>
            </FormControl>
          ),
        };
      },
    },
    {
      title: "Rank",
      dataIndex: "Rank",
      align: "center",
      width: "20%",
      render: (text, row, index) => {
        if (index === 0 || index === 4 || index === 7 || index === 10) {
          return {
            children: "",
            props: {
              colSpan: 0,
            },
          };
        }
        return {
          children: (
            <FormControl size="small">
              <InputLabel id="demo-simple-select-label">Select</InputLabel>
              <Select
                required
                sx={{ backgroundColor: "white", width: 90 }}
                labelId="demo-simple-select-label"
                label="Select"
                value={rankSource[index]}
                onChange={(e) => {
                  handleEngRank(e, index);
                }}
              >
                <MenuItem value={0}>Low</MenuItem>
                <MenuItem value={1}>Medium</MenuItem>
                <MenuItem value={2}>High</MenuItem>
              </Select>
            </FormControl>
          ),
        };
      },
    },
    {
      title: "Remark",
      dataIndex: "Remark",
      align: "center",
      render: (text, row, index) => {
        if (index === 0 || index === 4 || index === 7 || index === 10) {
          return {
            children: "",
            props: {
              colSpan: 0,
            },
          };
        }
        return {
          children: (
            <TextField
              sx={{ backgroundColor: "white", fontSize: 12, padding: 0 }}
              value={remarkSource[index]}
              onChange={(e) => {
                handleEngRemark(e, index);
              }}
              required
              size="small"
              id="outlined-multiline-static"
              label="Remark"
            />
          ),
        };
      },
    },
  ];

  const dataProgram = [
    {
      key: 0,
      Criteria: "",
    },
    {
      key: 1,
      Criteria: "Any special skills required to CFT",
    },
    {
      key: 2,
      Criteria: "Any training required to CFT",
    },
    {
      key: 3,
      Criteria: "Any additional manpower required to manage the changes",
    },
    {
      key: 4,
      Criteria: "",
    },
    {
      key: 5,
      Criteria: "New/complex technology (Hardware / software)",
    },
    {
      key: 6,
      Criteria: "Capex investment / Collaborator inputs required to do change",
    },
    {
      key: 7,
      Criteria: "",
    },
    {
      key: 8,
      Criteria: "New material used",
    },
    {
      key: 9,
      Criteria: "Any IMDS concern / Hazardous materials in BOM",
    },
    {
      key: 10,
      Criteria: "",
    },
    {
      key: 11,
      Criteria: "New Validation method needs to be devised",
    },
    {
      key: 12,
      Criteria: "Review or change required in DFMEA / PFMEA",
    },
    {
      key: 13,
      Criteria: "Completely new design feature / design need",
    },
  ];

  const columnsSDE = [
    {
      title: () => {
        return <Typography sx={{ textAlign: "center" }}>Criteria</Typography>;
      },
      dataIndex: "Criteria",
      render: (text, row, index) => {
        if (index === 0 || index === 3 || index === 6 || index === 10) {
          let head =
            index === 0
              ? "MAN"
              : index === 3
              ? "MACHINE"
              : index === 6
              ? "MATERIAL"
              : "METHOD";
          return {
            children: (
              <Typography
                fontWeight="bold"
                sx={{ fontSize: 14, textAlign: "center" }}
              >
                {head}
              </Typography>
            ),
            props: {
              colSpan: 4,
              style: { backgroundColor: "#F2F3F5" },
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
    {
      title: "Risk Applicable",
      dataIndex: "Risk",
      align: "center",
      width: "10%",
      render: (text, row, index) => {
        if (index === 0 || index === 3 || index === 6 || index === 10) {
          return {
            children: "",
            props: {
              colSpan: 0,
            },
          };
        }
        return {
          children: (
            <FormControl size="small">
              <InputLabel id="demo-simple-select-label">Select</InputLabel>
              <Select
                required
                sx={{ backgroundColor: "white", width: 90 }}
                labelId="demo-simple-select-label"
                label="Select"
                value={riskSource[index]}
                onChange={(e) => {
                  handleChangeEngg(e, index);
                }}
              >
                <MenuItem value={1}>Yes</MenuItem>
                <MenuItem value={0}>No</MenuItem>
              </Select>
            </FormControl>
          ),
        };
      },
    },
    {
      title: "Rank",
      dataIndex: "Rank",
      align: "center",
      width: "20%",
      render: (text, row, index) => {
        if (index === 0 || index === 3 || index === 6 || index === 10) {
          return {
            children: "",
            props: {
              colSpan: 0,
            },
          };
        }
        return {
          children: (
            <FormControl size="small">
              <InputLabel id="demo-simple-select-label">Select</InputLabel>
              <Select
                required
                sx={{ backgroundColor: "white", width: 90 }}
                labelId="demo-simple-select-label"
                label="Select"
                value={rankSource[index]}
                onChange={(e) => {
                  handleEngRank(e, index);
                }}
              >
                <MenuItem value={0}>Low</MenuItem>
                <MenuItem value={1}>Medium</MenuItem>
                <MenuItem value={2}>High</MenuItem>
              </Select>
            </FormControl>
          ),
        };
      },
    },
    {
      title: "Remark",
      dataIndex: "Remark",
      align: "center",
      render: (text, row, index) => {
        if (index === 0 || index === 3 || index === 6 || index === 10) {
          return {
            children: "",
            props: {
              colSpan: 0,
            },
          };
        }
        return {
          children: (
            <TextField
              sx={{ backgroundColor: "white", fontSize: 12, padding: 0 }}
              value={remarkSource[index]}
              onChange={(e) => {
                handleEngRemark(e, index);
              }}
              required
              size="small"
              id="outlined-multiline-static"
              label="Remark"
            />
          ),
        };
      },
    },
  ];

  const dataSDE = [
    {
      key: 0,
      Criteria: "",
    },
    {
      key: 1,
      Criteria: "New supplier needs to be explored / developed",
    },
    {
      key: 2,
      Criteria: "Skill set required for Part development",
    },
    {
      key: 3,
      Criteria: "",
    },
    {
      key: 4,
      Criteria: "New/complex technology",
    },
    {
      key: 5,
      Criteria: "Capex investment",
    },
    {
      key: 6,
      Criteria: "",
    },
    {
      key: 7,
      Criteria: "New material - customer approval required",
    },
    {
      key: 8,
      Criteria: "Not easily avaliable",
    },
    {
      key: 9,
      Criteria: "Shortage of Material",
    },
    {
      key: 10,
      Criteria: "",
    },
    {
      key: 11,
      Criteria: "Complex process",
    },
    {
      key: 12,
      Criteria: "Affects productivity / flow of material",
    },
  ];

  const columnsPurchase = [
    {
      title: () => {
        return <Typography sx={{ textAlign: "center" }}>Criteria</Typography>;
      },
      dataIndex: "Criteria",
      render: (text, row, index) => {
        if (index === 0 || index === 3 || index === 6 || index === 11) {
          let head =
            index === 0
              ? "MAN"
              : index === 3
              ? "MACHINE"
              : index === 6
              ? "MATERIAL"
              : "METHOD";
          return {
            children: (
              <Typography
                fontWeight="bold"
                sx={{ fontSize: 14, textAlign: "center" }}
              >
                {head}
              </Typography>
            ),
            props: {
              colSpan: 4,
              style: { backgroundColor: "#F2F3F5" },
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
    {
      title: "Risk Applicable",
      dataIndex: "Risk",
      align: "center",
      width: "10%",
      render: (text, row, index) => {
        if (index === 0 || index === 3 || index === 6 || index === 11) {
          return {
            children: "",
            props: {
              colSpan: 0,
            },
          };
        }
        return {
          children: (
            <FormControl size="small">
              <InputLabel id="demo-simple-select-label">Select</InputLabel>
              <Select
                required
                sx={{ backgroundColor: "white", width: 90 }}
                labelId="demo-simple-select-label"
                label="Select"
                value={riskSource[index]}
                onChange={(e) => {
                  handleChangeEngg(e, index);
                }}
              >
                <MenuItem value={1}>Yes</MenuItem>
                <MenuItem value={0}>No</MenuItem>
              </Select>
            </FormControl>
          ),
        };
      },
    },
    {
      title: "Rank",
      dataIndex: "Rank",
      align: "center",
      width: "20%",
      render: (text, row, index) => {
        if (index === 0 || index === 3 || index === 6 || index === 11) {
          return {
            children: "",
            props: {
              colSpan: 0,
            },
          };
        }
        return {
          children: (
            <FormControl size="small">
              <InputLabel id="demo-simple-select-label">Select</InputLabel>
              <Select
                required
                sx={{ backgroundColor: "white", width: 90 }}
                labelId="demo-simple-select-label"
                label="Select"
                value={rankSource[index]}
                onChange={(e) => {
                  handleEngRank(e, index);
                }}
              >
                <MenuItem value={0}>Low</MenuItem>
                <MenuItem value={1}>Medium</MenuItem>
                <MenuItem value={2}>High</MenuItem>
              </Select>
            </FormControl>
          ),
        };
      },
    },
    {
      title: "Remark",
      dataIndex: "Remark",
      align: "center",
      render: (text, row, index) => {
        if (index === 0 || index === 3 || index === 6 || index === 11) {
          return {
            children: "",
            props: {
              colSpan: 0,
            },
          };
        }
        return {
          children: (
            <TextField
              sx={{ backgroundColor: "white", fontSize: 12, padding: 0 }}
              value={remarkSource[index]}
              onChange={(e) => {
                handleEngRemark(e, index);
              }}
              required
              size="small"
              id="outlined-multiline-static"
              label="Remark"
            />
          ),
        };
      },
    },
  ];

  const dataPurchase = [
    {
      key: 0,
      Criteria: "",
    },
    {
      key: 1,
      Criteria: "New supplier needs to be explored / developed",
    },
    {
      key: 2,
      Criteria: "Skill set required for Part development",
    },
    {
      key: 3,
      Criteria: "",
    },
    {
      key: 4,
      Criteria: "New/complex technology",
    },
    {
      key: 5,
      Criteria: "Capex investment",
    },
    {
      key: 6,
      Criteria: "",
    },
    {
      key: 7,
      Criteria: "New material - customer approval required",
    },
    {
      key: 8,
      Criteria: "RM cost / direct import",
    },
    {
      key: 9,
      Criteria: "Not easily avaliable",
    },
    {
      key: 10,
      Criteria: "Shortage of Material",
    },
    {
      key: 11,
      Criteria: "",
    },
    {
      key: 12,
      Criteria: "Change in Logistics",
    },
    {
      key: 13,
      Criteria: "Affects productivity / flow of material",
    },
  ];

  const columnsProduction = [
    {
      title: () => {
        return <Typography sx={{ textAlign: "center" }}>Criteria</Typography>;
      },
      dataIndex: "Criteria",
      render: (text, row, index) => {
        if (index === 0 || index === 2 || index === 5 || index === 9) {
          let head =
            index === 0
              ? "MAN"
              : index === 2
              ? "MACHINE"
              : index === 5
              ? "MATERIAL"
              : "METHOD";
          return {
            children: (
              <Typography
                fontWeight="bold"
                sx={{ fontSize: 14, textAlign: "center" }}
              >
                {head}
              </Typography>
            ),
            props: {
              colSpan: 4,
              style: { backgroundColor: "#F2F3F5" },
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
    {
      title: "Risk Applicable",
      dataIndex: "Risk",
      align: "center",
      width: "10%",
      render: (text, row, index) => {
        if (index === 0 || index === 2 || index === 5 || index === 9) {
          return {
            children: "",
            props: {
              colSpan: 0,
            },
          };
        }
        return {
          children: (
            <FormControl size="small">
              <InputLabel id="demo-simple-select-label">Select</InputLabel>
              <Select
                required
                sx={{ backgroundColor: "white", width: 90 }}
                labelId="demo-simple-select-label"
                label="Select"
                value={riskSource[index]}
                onChange={(e) => {
                  handleChangeEngg(e, index);
                }}
              >
                <MenuItem value={1}>Yes</MenuItem>
                <MenuItem value={0}>No</MenuItem>
              </Select>
            </FormControl>
          ),
        };
      },
    },
    {
      title: "Rank",
      dataIndex: "Rank",
      align: "center",
      width: "20%",
      render: (text, row, index) => {
        if (index === 0 || index === 2 || index === 5 || index === 9) {
          return {
            children: "",
            props: {
              colSpan: 0,
            },
          };
        }
        return {
          children: (
            <FormControl size="small">
              <InputLabel id="demo-simple-select-label">Select</InputLabel>
              <Select
                required
                sx={{ backgroundColor: "white", width: 90 }}
                labelId="demo-simple-select-label"
                label="Select"
                value={rankSource[index]}
                onChange={(e) => {
                  handleEngRank(e, index);
                }}
              >
                <MenuItem value={0}>Low</MenuItem>
                <MenuItem value={1}>Medium</MenuItem>
                <MenuItem value={2}>High</MenuItem>
              </Select>
            </FormControl>
          ),
        };
      },
    },
    {
      title: "Remark",
      dataIndex: "Remark",
      align: "center",
      render: (text, row, index) => {
        if (index === 0 || index === 2 || index === 5 || index === 9) {
          return {
            children: "",
            props: {
              colSpan: 0,
            },
          };
        }
        return {
          children: (
            <TextField
              sx={{ backgroundColor: "white", fontSize: 12, padding: 0 }}
              value={remarkSource[index]}
              onChange={(e) => {
                handleEngRemark(e, index);
              }}
              required
              size="small"
              id="outlined-multiline-static"
              label="Remark"
            />
          ),
        };
      },
    },
  ];

  const dataProduction = [
    {
      key: 0,
      Criteria: "",
    },
    {
      key: 1,
      Criteria: "High skill required",
    },
    {
      key: 2,
      Criteria: "",
    },
    {
      key: 3,
      Criteria: "NA",
    },
    {
      key: 4,
      Criteria: "NA",
    },
    {
      key: 5,
      Criteria: "",
    },
    {
      key: 6,
      Criteria: "NA",
    },
    {
      key: 7,
      Criteria: "NA",
    },
    {
      key: 8,
      Criteria: "NA",
    },
    {
      key: 9,
      Criteria: "",
    },
    {
      key: 10,
      Criteria: "Complex process",
    },
    {
      key: 11,
      Criteria: "Affects productivity",
    },
  ];

  const columnsEngineering = [
    {
      title: () => {
        return <Typography sx={{ textAlign: "center" }}>Criteria</Typography>;
      },
      dataIndex: "Criteria",
      width: "40%",
      render: (text, row, index) => {
        if (index === 0 || index === 4 || index === 7 || index === 10) {
          let head =
            index === 0
              ? "MAN"
              : index === 4
              ? "MACHINE"
              : index === 7
              ? "MATERIAL"
              : "METHOD";
          return {
            children: (
              <Typography
                fontWeight="bold"
                sx={{ fontSize: 14, textAlign: "center" }}
              >
                {head}
              </Typography>
            ),
            props: {
              colSpan: 4,
              style: { backgroundColor: "#F2F3F5" },
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
    {
      title: "Risk Applicable",
      dataIndex: "Risk",
      align: "center",
      width: "10%",
      render: (text, row, index) => {
        if (index === 0 || index === 4 || index === 7 || index === 10) {
          return {
            children: "",
            props: {
              colSpan: 0,
            },
          };
        }
        return {
          children: (
            <FormControl size="small">
              <InputLabel id="demo-simple-select-label">Select</InputLabel>
              <Select
                required
                sx={{ backgroundColor: "white", width: 90 }}
                labelId="demo-simple-select-label"
                label="Select"
                value={riskSource[index]}
                onChange={(e) => {
                  handleChangeEngg(e, index);
                }}
              >
                <MenuItem value={1}>Yes</MenuItem>
                <MenuItem value={0}>No</MenuItem>
              </Select>
            </FormControl>
          ),
        };
      },
    },
    {
      title: "Rank",
      dataIndex: "Rank",
      align: "center",
      width: "20%",
      render: (text, row, index) => {
        if (index === 0 || index === 4 || index === 7 || index === 10) {
          return {
            children: "",
            props: {
              colSpan: 0,
            },
          };
        }
        return {
          children: (
            <FormControl size="small">
              <InputLabel id="demo-simple-select-label">Select</InputLabel>
              <Select
                required
                sx={{ backgroundColor: "white", width: 90 }}
                labelId="demo-simple-select-label"
                label="Select"
                value={rankSource[index]}
                onChange={(e) => {
                  handleEngRank(e, index);
                }}
              >
                <MenuItem value={0}>Low</MenuItem>
                <MenuItem value={1}>Medium</MenuItem>
                <MenuItem value={2}>High</MenuItem>
              </Select>
            </FormControl>
          ),
        };
      },
    },
    {
      title: "Remark",
      dataIndex: "Remark",
      align: "center",
      render: (text, row, index) => {
        if (index === 0 || index === 4 || index === 7 || index === 10) {
          return {
            children: "",
            props: {
              colSpan: 0,
            },
          };
        }
        return {
          children: (
            <TextField
              sx={{ backgroundColor: "white", fontSize: 12, padding: 0 }}
              value={remarkSource[index]}
              onChange={(e) => {
                handleEngRemark(e, index);
              }}
              required
              size="small"
              id="outlined-multiline-static"
              label="Remark"
            />
          ),
        };
      },
    },
  ];

  const dataEngineering = [
    {
      key: 0,
      Criteria: "",
    },
    {
      key: 1,
      Criteria: "Skill set required for design / upgradation",
    },
    {
      key: 2,
      Criteria: "Training required for Design engineer",
    },
    {
      key: 3,
      Criteria: "Addition of man power to do design change",
    },
    {
      key: 4,
      Criteria: "",
    },
    {
      key: 5,
      Criteria: "New/complex technology (Hardware / software)",
    },
    {
      key: 6,
      Criteria: "Capex investment / Collaborator inputs required to do change",
    },
    {
      key: 7,
      Criteria: "",
    },
    {
      key: 8,
      Criteria: "New material used",
    },
    {
      key: 9,
      Criteria: "Material severely affects other product Design chara",
    },
    {
      key: 10,
      Criteria: "",
    },
    {
      key: 11,
      Criteria: "New Validation method needs to be devised",
    },
    {
      key: 12,
      Criteria: "Review or change required in DFMEA",
    },
    {
      key: 13,
      Criteria: "Completely new design feature / design need",
    },
  ];

  const columnsManufacturing = [
    {
      title: () => {
        return <Typography sx={{ textAlign: "center" }}>Criteria</Typography>;
      },
      dataIndex: "Criteria",
      render: (text, row, index) => {
        if (index === 0 || index === 4 || index === 9 || index === 12) {
          let head =
            index === 0
              ? "MAN"
              : index === 4
              ? "MACHINE"
              : index === 9
              ? "MATERIAL"
              : "METHOD";
          return {
            children: (
              <Typography
                fontWeight="bold"
                sx={{ fontSize: 14, textAlign: "center" }}
              >
                {head}
              </Typography>
            ),
            props: {
              colSpan: 4,
              style: { backgroundColor: "#F2F3F5" },
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
    {
      title: "Risk Applicable",
      dataIndex: "Risk",
      align: "center",
      width: "10%",
      render: (text, row, index) => {
        if (index === 0 || index === 4 || index === 9 || index === 12) {
          return {
            children: "",
            props: {
              colSpan: 0,
            },
          };
        }
        return {
          children: (
            <FormControl size="small">
              <InputLabel id="demo-simple-select-label">Select</InputLabel>
              <Select
                required
                sx={{ backgroundColor: "white", width: 90 }}
                labelId="demo-simple-select-label"
                label="Select"
                value={riskSource[index]}
                onChange={(e) => {
                  handleChangeEngg(e, index);
                }}
              >
                <MenuItem value={1}>Yes</MenuItem>
                <MenuItem value={0}>No</MenuItem>
              </Select>
            </FormControl>
          ),
        };
      },
    },
    {
      title: "Rank",
      dataIndex: "Rank",
      align: "center",
      width: "20%",
      render: (text, row, index) => {
        if (index === 0 || index === 4 || index === 9 || index === 12) {
          return {
            children: "",
            props: {
              colSpan: 0,
            },
          };
        }
        return {
          children: (
            <FormControl size="small">
              <InputLabel id="demo-simple-select-label">Select</InputLabel>
              <Select
                required
                sx={{ backgroundColor: "white", width: 90 }}
                labelId="demo-simple-select-label"
                label="Select"
                value={rankSource[index]}
                onChange={(e) => {
                  handleEngRank(e, index);
                }}
              >
                <MenuItem value={0}>Low</MenuItem>
                <MenuItem value={1}>Medium</MenuItem>
                <MenuItem value={2}>High</MenuItem>
              </Select>
            </FormControl>
          ),
        };
      },
    },
    {
      title: "Remark",
      dataIndex: "Remark",
      align: "center",
      render: (text, row, index) => {
        if (index === 0 || index === 4 || index === 9 || index === 12) {
          return {
            children: "",
            props: {
              colSpan: 0,
            },
          };
        }
        return {
          children: (
            <TextField
              sx={{ backgroundColor: "white", fontSize: 12, padding: 0 }}
              value={remarkSource[index]}
              onChange={(e) => {
                handleEngRemark(e, index);
              }}
              required
              size="small"
              id="outlined-multiline-static"
              label="Remark"
            />
          ),
        };
      },
    },
  ];

  const dataManufacturing = [
    {
      key: 0,
      Criteria: "",
    },
    {
      key: 1,
      Criteria: "Skill required to operate",
    },
    {
      key: 2,
      Criteria: "Training required for Operator",
    },
    {
      key: 3,
      Criteria: "Addition of man power",
    },
    {
      key: 4,
      Criteria: "",
    },
    {
      key: 5,
      Criteria: "New tool/ jigs/ fixtures reqd",
    },
    {
      key: 6,
      Criteria: "Capex investment",
    },
    {
      key: 7,
      Criteria: "Change in layout",
    },
    {
      key: 8,
      Criteria: "Affecting safety chara",
    },
    {
      key: 9,
      Criteria: "",
    },
    {
      key: 10,
      Criteria: "New material - process / tooling validation reqd",
    },
    {
      key: 11,
      Criteria: "Affecting process parameters",
    },
    {
      key: 12,
      Criteria: "",
    },
    {
      key: 13,
      Criteria: "Change in process flow",
    },
    {
      key: 13,
      Criteria: "Affects human safety/ fatigue / ergonomics",
    },
    {
      key: 13,
      Criteria: "Affects productivity",
    },
  ];

  if (decrypted === "Quality") {
    column = columnsQuality;
    data = dataQuality;
  }

  if (decrypted === "Program_Management") {
    column = columnsProgram;
    data = dataProgram;
  }

  if (decrypted === "SDE") {
    data = dataSDE;
    column = columnsSDE;
  }

  if (decrypted === "Purchase") {
    data = dataPurchase;
    column = columnsPurchase;
  }

  if (decrypted === "Production") {
    data = dataProduction;
    column = columnsProduction;
  }

  if (decrypted === "Engineering") {
    data = dataEngineering;
    column = columnsEngineering;
  }

  if (decrypted === "Manufacturing") {
    data = dataManufacturing;
    column = columnsManufacturing;
  }

  return (
    <Box>
      <Table bordered columns={column} dataSource={data} pagination={false} />
    </Box>
  );
};

export default RiskCheck;
