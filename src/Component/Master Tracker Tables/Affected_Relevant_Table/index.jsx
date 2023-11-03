import React, { useState, useEffect } from "react";
import { Table } from "antd";
import {
  FormControlLabel,
  Checkbox,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Box,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const AffectedTable = (props) => {
  const {
    AffTabhandleCellChange = () => { },
    AffTabhandleDateChange = () => { },
    AfftabRetrRec = () => { },
    AffTabledata,
    ischecked,
    affretdata,
    Change_Imp,
  } = props;
  const [championValue, setchampionValue] = useState({});
  const [functionValue, setfunctionValue] = useState({});
  const [remarkValue, setremarkValue] = useState({});
  const statusOptions = [
    {
      id: 1,
      value: "Open",
    },
    {
      id: 2,
      value: "Close",
    },
  ];

  const handleCellChange = (key, dataIndex, value) => {
    value === false ? (setchampionValue({}), setfunctionValue({}),  setremarkValue({})) : "";
    AffTabhandleCellChange(key, dataIndex, value, affretdata);
  };

  const handleDateChange = (key, dataIndex, value) => {
    AffTabhandleDateChange(key, dataIndex, value, affretdata);
  };

  useEffect(() => {
    if (affretdata) {
      if (affretdata.length > 0) {
        AfftabRetrRec();
        const champ = affretdata.map((record) => {
          return {
            champion: record.Champion,
          };
        });
        setchampionValue(champ);
      }
    }
    setchampionValue({});
    setfunctionValue({});
    setremarkValue({});
    affretdata &&
      affretdata.map((data, i) => {
        AffTabledata.map((data1, j) => {
          // const index = j + 1;
          if (i === j) {
            setchampionValue((prevValues) => ({
              ...prevValues,
              [j]: data.Champion,
            }));
            setfunctionValue((prevValues) => ({
              ...prevValues,
              [j]: data.Func,
            }));
            setremarkValue((prevValues) => ({
              ...prevValues,
              [j]: data.Remark,
            }));
          }
        });
        return;
      });
  }, [ischecked, affretdata]);

  console.log(championValue, "---championValue");
  const columns = [
    {
      title: "S.No",
      dataIndex: "key",
      editable: false,
      width: "5%",
      render: (_, __, index) => (
        <Box style={{ textAlign: "center" }}>
          {index + 1 + (currentPage - 1) * pageSize}
        </Box>
      ),
    },
    {
      title: "Document",
      dataIndex: "document",
      width: 150,
    },
    {
      title: "Applicable",
      dataIndex: "applicable",
      align: "center",
      width: 70,
      render: (_, record) => (
        <FormControlLabel
          sx={{
            ml: 2,
            pointerEvents: Change_Imp === 2 ? "none" : "",
          }}
          onChange={(e) =>
            handleCellChange(record.key, "applicable", e.target.checked)
          }
          control={<Checkbox checked={record.applicable} />}
        />
      ),
    },
    {
      title: "Champion",
      dataIndex: "champion",
      width: 200,
      align: "center",
      render: (_, record) => (
        <TextField
          disabled={record.applicable === true ? false : true}
          sx={{
            backgroundColor: "white",
            "& .MuiInputBase-input": {
              height: "2px",
              width: 130,
            },
            pointerEvents: Change_Imp === 2 ? "none" : "",
          }}
          placeholder="Type champion here..."
          onBlur={(e) => {
            handleCellChange(record.key, "champion", e.target.value);
          }}
          value={championValue[record.key] || ""}
          onChange={(e) => {
            setchampionValue((prevValues) => ({
              ...prevValues,
              [record.key]: e.target.value,
            }));
          }}
        />
      ),
    },
    {
      title: "Function",
      dataIndex: "func",
      width: 200,
      align: "center",
      render: (_, record) => (
        <TextField
          disabled={record.applicable === true ? false : true}
          sx={{
            backgroundColor: "white",
            "& .MuiInputBase-input": {
              height: "2px",
              width: 130,
            },
            pointerEvents: Change_Imp === 2 ? "none" : "",
          }}
          placeholder="Type function here..."
          onBlur={(e) => {
            handleCellChange(record.key, "func", e.target.value);
          }}
          value={functionValue[record.key] || ""}
          onChange={(e) => {
            setfunctionValue((prevValues) => ({
              ...prevValues,
              [record.key]: e.target.value,
            }));
          }}
        />
      ),
    },
    {
      title: "Target Date",
      dataIndex: "targetDate",
      width: 180,
      align: "center",
      render: (_, record) => (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DesktopDatePicker
            required
            defaultValue={null}
            disabled={record.applicable === true ? false : true}
            inputFormat="DD/MM/YYYY"
            disablePast={false}
            value={record.targetDate || null}
            onChange={(date) =>
              handleDateChange(record.key, "targetDate", date)
            }
            renderInput={(params) => (
              <TextField
                sx={{
                  backgroundColor: "white",
                  "& .MuiInputBase-input": {
                    height: "15px",
                    minWidth: 100,
                  },
                  pointerEvents: Change_Imp === 2 ? "none" : "",
                }}
                {...params}
                placeholder="DD/MM/YYYY"
              />
            )}
          />
        </LocalizationProvider>
      ),
    },
    {
      title: "Actual Date",
      dataIndex: "actualDate",
      width: 180,
      align: "center",
      render: (_, record) => (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DesktopDatePicker
            required
            disabled={record.applicable === true ? false : true}
            inputFormat="DD/MM/YYYY"
            defaultValue={null}
            value={record.actualDate || null}
            // value={record.actualDate === '' ? undefined : record.actualDate}
            onChange={(date) =>
              handleDateChange(record.key, "actualDate", date)
            }
            renderInput={(params) => (
              <TextField
                sx={{
                  backgroundColor: "white",
                  "& .MuiInputBase-input": {
                    height: "15px",
                    minWidth: 100,
                  },
                  pointerEvents: Change_Imp === 2 ? "none" : "",
                  border: "none",
                }}
                {...params}
                placeholder="DD/MM/YYYY"
              />
            )}
          />
        </LocalizationProvider>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      align: "center",
      width: 140,
      render: (_, record) => (
        <FormControl sx={{ minWidth: 160 }} size="small">
          <InputLabel>Select</InputLabel>
          <Select
            disabled={record.applicable === true ? false : true}
            required
            sx={{
              backgroundColor: "white",
              width: 160,
              height: "45px",
              pointerEvents: Change_Imp === 2 ? "none" : "",
            }}
            value={record.status}
            onChange={(value) =>
              handleCellChange(record.key, "status", value.target.value)
            }
          >
            {statusOptions.map((item, index) => {
              return (
                <MenuItem key={index} value={item.id}>
                  {item.value}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      ),
    },
    {
      title: "Remark",
      dataIndex: "remark",
      width: 200,
      align: "center",
      render: (_, record) => (
        <TextField
          disabled={record.applicable === true ? false : true}
          sx={{
            backgroundColor: "white",
            "& .MuiInputBase-input": {
              height: "2px",
              minWidth: 60,
            },
            pointerEvents: Change_Imp === 2 ? "none" : "",
          }}
          placeholder="Type champion here..."
          onBlur={(e) => {
            handleCellChange(record.key, "remark", e.target.value);
          }}
          value={remarkValue[record.key] || ""}
          onChange={(e) => {
            setremarkValue((prevValues) => ({
              ...prevValues,
              [record.key]: e.target.value,
            }));
          }}
        />
      ),
    },
  ];
  const pageSize = 5;
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  return (
    <>
      <Table
        dataSource={AffTabledata}
        columns={columns}
        pagination={{
          pageSizeOptions: ["5", "10", "20"],
          defaultPageSize: pageSize,
          onChange: handlePageChange,
          current: currentPage,
        }}
        bordered
        rowClassName={() => "custom-row"}
      />
    </>
  );
};

export default AffectedTable;
