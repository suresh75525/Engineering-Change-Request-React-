/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Skeleton, Table } from "antd";
import { useSelector } from "react-redux";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import {
  Box,
  Button,
  Input,
  Grid,
  FormControl,
  Typography,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";
import api from "../../Page/config";
import moment from "moment";
import "./index.css";

const Item = styled(Paper)(({ theme }) => ({
  boxShadow: "none",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const MasterListDetailz = (props) => {
  const [ecr, setECR] = useState(null);
  const [eco, setECO] = useState(null);
  const [resecrArr, setresECRArr] = useState(null);
  const [resecoArr, setresECOArr] = useState(null);
  const ecrstatus = [
    {
      id: 1,
      value: "Getall",
      code: 4,
    },
    {
      id: 2,
      value: "Opened",
      code: 1,
    },
    {
      id: 3,
      value: "Closed",
      code: 0,
    },
    {
      id: 4,
      value: "Rejected",
      code: 2,
    },
  ];
  const ecostatus = [
    {
      id: 1,
      value: "Getall",
      code: 4,
    },
    {
      id: 2,
      value: "Not Started",
      code: 1,
    },
    {
      id: 3,
      value: "In Progress",
      code: 0,
    },
    {
      id: 4,
      value: "Completed",
      code: 2,
    },
    {
      id: 4,
      value: "Rejected",
      code: 3,
    },
  ];
  const {
    handleClickECR = () => {},
    handleClickEscalation = () => {},
    handleClickApprove = () => {},
    handleClickRej = () => {},
    isApproved,
    data,
    loading,
  } = props;

  const store = useSelector((state) => state.auth);
  const [searchText, setSearchText] = useState("");

  const decryptedbom = store.BomUserType;
  const decryptedecr = store.EcrUserType;
  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  const handleECOStatus = (e) => {
    setECR(null);
    setresECRArr(null);
    setECO(e.target.value);
    setresECOArr(onchangefilter(e.target.value));
  };

  const handleECRStatus = (e) => {
    setECO(null);
    setresECOArr(null);
    setECR(e.target.value);
    setresECRArr(onchangefilter(e.target.value));
  };

  const filteredData =
    data &&
    data.filter((item) => {
      const values = Object.values(item).map((searchText) =>
        searchText !== null && searchText !== ""
          ? searchText.toString().toLowerCase()
          : ""
      );
      return values.some((val) => val.includes(searchText.toLowerCase()));
    });

  const onchangefilter = (val) => {
    return (
      data &&
      data.filter((item) => {
        return ecr !== null
          ? val === 4
            ? item
            : item.Is_active === val
          : val === 4
          ? item
          : item.ECO_Status === val;
      })
    );
  };

  const columns = [
    {
      title: "ECR",
      dataIndex: "ecr_no",
      key: "ecr_no",
      align: "center",
      width: 10,
      render: (text, row, index) => (
        <Button variant="text" onClick={() => handleClickECR(row)}>
          {text}
        </Button>
      ),
    },
    {
      title: "Request Date",
      dataIndex: "Created_date",
      key: "Created_date",
      align: "center",
      width: 80,
      render: (text, record, index) => {
        if (text !== null) {
          const date = text.split("T");
          return {
            children: moment(date[0]).format("DD-MMM-YYYY"),
          };
        }
        return {
          children: "-",
        };
      },
    },
    {
      title: "Target Date",
      dataIndex: "Target_date",
      key: "Target_date",
      align: "center",
      width: 100,
      render: (text, record, index) => {
        if (text !== null) {
          const date = text.split("T");
          return {
            children: moment(date[0]).format("DD-MMM-YYYY"),
          };
        }
        return {
          children: "-",
        };
      },
    },
    {
      title: "ECR_Status",
      dataIndex: "Is_active",
      key: "Is_active",
      align: "center",
      width: 15,
      render: (text, record, index) => {
        if (text === 1) {
          return {
            props: {
              style: { color: "red", fontWeight: "bold" },
            },
            children: "Open",
          };
        } else if (text === 0) {
          return {
            props: {
              style: { color: "Green", fontWeight: "bold" },
            },
            children: "Closed",
          };
        } else {
          return {
            props: {
              style: { color: "Blue", fontWeight: "bold" },
            },
            children: "Rejected",
          };
        }
      },
    },
    {
      title: "ECO_Status",
      dataIndex: "ECO_Status",
      key: "ECO_Status",
      align: "center",
      width: 15,
      render: (text, record, index) => {
        if (text === 1) {
          return {
            props: {
              style: { color: "red", fontWeight: "bold" },
            },
            children: "Not Started",
          };
        } else if (text === 0) {
          return {
            props: {
              style: { color: "blue", fontWeight: "bold" },
            },
            children: "In Progress",
          };
        } else if (text === 2) {
          return {
            props: {
              style: { color: "Green", fontWeight: "bold" },
            },
            children: "Completed",
          };
        } else {
          return {
            props: {
              style: { color: "Blue", fontWeight: "bold" },
            },
            children: "Rejected",
          };
        }
      },
    },
    {
      title: "PM",
      dataIndex: "Emp_Name",
      key: "Emp_Name",
      align: "center",
      width: 50,
    },
    {
      title: "Initiator",
      key: "Initiate_By",
      dataIndex: "Initiate_By",
      align: "center",
      width: 50,
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      align: "center",
      width: 70,
      render(text) {
        return {
          props: {
            style: { textAlign: "left" },
          },
          children: text,
        };
      },
    },
    {
      title: "Closed Date",
      dataIndex: "Closed_date",
      key: "Closed_date",
      align: "center",
      width: 100,
      render: (text, record, index) => {
        if (text !== null) {
          const date = text.split("T");
          return {
            children: moment(date[0]).format("DD-MMM-YYYY"),
          };
        }
        return {
          children: "-",
        };
      },
    },
    {
      title: "Escalation Required",
      dataIndex: "escalation",
      key: "escalation",
      align: "center",
      width: 40,
      render: (text, row, index) =>
        decryptedbom === 0 || decryptedecr === 1 ? (
          <Button variant="text" onClick={() => handleClickEscalation(row)}>
            Yes
          </Button>
        ) : (
          <Button variant="text" style={{ pointerEvents: "none" }}>
            Yes
          </Button>
        ),
    },
    {
      title: "ECR_Status",
      dataIndex: "stutus",
      key: "status",
      align: "center",
      width: 190,
      render: (text, row, index) =>
        row.approval_status === 0 && decryptedecr === 1 ? (
          <Grid container spacing={2} sx={{ ml: 0.3 }}>
            <Grid item>
              <Button
                variant="contained"
                color="success"
                sx={{ width: "80px" }}
                onClick={() => {
                  handleClickApprove(row);
                }}
              >
                Approve
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                color="error"
                sx={{ width: "80px" }}
                onClick={() => handleClickRej(row)}
              >
                Reject
              </Button>
            </Grid>
          </Grid>
        ) : (row.approval_status === 0 ||
            row.approval_status === 1 ||
            row.approval_status === 2) &&
          decryptedecr === 2 ? (
          <Button
            variant="text"
            sx={{
              width: "90px",
              pointerEvents: "none",
              fontWeight: "bold",
              fontSize: "17px",
            }}
          >
            Pending
          </Button>
        ) : row.approval_status === 5 &&
          (decryptedecr === 2 ||
            decryptedecr === 1 ||
            decryptedecr === 0 ||
            decryptedecr === 3) ? (
          <Button
            variant="text"
            color="success"
            sx={{
              width: "90px",
              pointerEvents: "none",
              fontWeight: "bold",
              fontSize: "17px",
            }}
          >
            Approved
          </Button>
        ) : (row.approval_status === 1 || row.approval_status === 0) &&
          (decryptedecr === 1 || decryptedecr === 3) ? (
          <Button
            variant="text"
            sx={{
              width: "90px",
              pointerEvents: "none",
              fontWeight: "bold",
              fontSize: "17px",
            }}
          >
            Pending
          </Button>
        ) : row.approval_status === 2 &&
          (decryptedecr === 0 || decryptedecr === 1) ? (
          <Button
            variant="text"
            sx={{
              width: "90px",
              pointerEvents: "none",
              fontWeight: "bold",
              fontSize: "17px",
            }}
          >
            Pending
          </Button>
        ) : row.approval_status === 0 && decryptedecr === 0 ? (
          <Button
            variant="text"
            sx={{
              width: "90px",
              pointerEvents: "none",
              fontWeight: "bold",
              fontSize: "17px",
            }}
          >
            Pending
          </Button>
        ) : row.approval_status === 1 && decryptedecr === 0 ? (
          <Grid container spacing={2} sx={{ ml: 0.3 }}>
            <Grid item>
              <Button
                variant="contained"
                color="success"
                sx={{ width: "80px" }}
                onClick={() => {
                  handleClickApprove(row);
                }}
              >
                Approve
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                color="error"
                sx={{ width: "80px" }}
                onClick={() => handleClickRej(row)}
              >
                Reject
              </Button>
            </Grid>
          </Grid>
        ) : row.approval_status === 2 && decryptedecr === 3 ? (
          <Grid container spacing={2} sx={{ ml: 0.3 }}>
            <Grid item>
              <Button
                variant="contained"
                color="success"
                sx={{ width: "80px" }}
                onClick={() => {
                  handleClickApprove(row);
                }}
              >
                Approve
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                color="error"
                sx={{ width: "80px" }}
                onClick={() => handleClickRej(row)}
              >
                Reject
              </Button>
            </Grid>
          </Grid>
        ) : (row.approval_status === 3 ||
            row.approval_status === 4 ||
            row.approval_status === 6) &&
          (decryptedecr === 2 ||
            decryptedecr === 1 ||
            decryptedecr === 0 ||
            decryptedecr === 3) ? (
          <Button
            variant="text"
            color="error"
            sx={{
              width: "90px",
              pointerEvents: "none",
              fontWeight: "bold",
              fontSize: "17px",
            }}
          >
            Rejected
          </Button>
        ) : (
          ""
        ),
    },
    {
      title: "Remark",
      dataIndex: "Remark",
      key: "Remark",
      align: "center",
      width: 100,
      render(text) {
        if (text !== null) {
          return {
            children: text,
          };
        }
        return {
          children: "-",
        };
      },
    },
  ];

  return (
    <Box>
      <Grid container>
        <Grid item lg={9} xl={9}>
          <Input
            placeholder="Search..."
            onInput={handleSearch}
            style={{ marginBottom: 10, width: "100%" }}
          />
        </Grid>

        <Grid item lg={1.5} xl={1.5} md={4} sm={4} xs={12} sx={{ mt: -1 }}>
          <Item style={{ backgroundColor: "#F4F4F4" }}>
            <FormControl sx={{ minWidth: 125 }} size="small">
              <InputLabel>ECR Status</InputLabel>
              <Select
                required
                sx={{ backgroundColor: "white", fontSize: 14 }}
                value={ecr}
                onChange={handleECRStatus}
              >
                {ecrstatus
                  ? ecrstatus.map((ecr, index) => (
                      <MenuItem key={index} value={ecr.code}>
                        {ecr.value}
                      </MenuItem>
                    ))
                  : null}
              </Select>
            </FormControl>
          </Item>
        </Grid>
        <Grid item lg={1.5} xl={1.5} md={4} sm={4} xs={12} sx={{ mt: -1 }}>
          <Item style={{ backgroundColor: "#F4F4F4" }}>
            <FormControl sx={{ minWidth: 125 }} size="small">
              <InputLabel>ECO Status</InputLabel>
              <Select
                required
                sx={{ backgroundColor: "white", fontSize: 14 }}
                value={eco}
                onChange={handleECOStatus}
              >
                {ecostatus
                  ? ecostatus.map((eco, index) => (
                      <MenuItem key={index} value={eco.code}>
                        {eco.value}
                      </MenuItem>
                    ))
                  : null}
              </Select>
            </FormControl>
          </Item>
        </Grid>
      </Grid>

      <Skeleton loading={loading} active>
        <Box className="table-container">
          <Table
            bordered
            columns={columns}
            dataSource={
              ecr !== null ? resecrArr : eco !== null ? resecoArr : filteredData
            }
          />
        </Box>
      </Skeleton>
    </Box>
  );
};
export default MasterListDetailz;
