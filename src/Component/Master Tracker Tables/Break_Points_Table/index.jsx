import React, { useState, useEffect } from "react";
import { Table } from "antd";
import { TextField, Box, FormControlLabel, Checkbox } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const BreakPointTable = (props) => {
  const {
    ischecked,
    handleCellBrkPnttab = () => {},
    handleDateBrkPnttab = () => {},
    brkpntdata,
    BrkPntretdata,
    Change_Imp,
  } = props;

  const [remarkValue, setremarkValue] = useState({});
  const [championValue, setchampionValue] = useState({});

  useEffect(() => {
    setchampionValue({});
    setremarkValue({});
    BrkPntretdata &&
      BrkPntretdata.map((data, i) => {
        brkpntdata.map((data1, j) => {
          const index = j + 1;
          if (i === j) {
            setchampionValue((prevValues) => ({
              ...prevValues,
              [index]: data.Champion,
            }));
            setremarkValue((prevValues) => ({
              ...prevValues,
              [index]: data.Remark,
            }));
          }
        });
        return;
      });
  }, [ischecked, BrkPntretdata]);

  const handleCellChange = (key, dataIndex, value, BrkPntretdata) => {
    handleCellBrkPnttab(key, dataIndex, value, BrkPntretdata);
  };
  const handleDateChange = (key, dataIndex, value, BrkPntretdata) => {
    handleDateBrkPnttab(key, dataIndex, value, BrkPntretdata);
  };

  const columns = [
    {
      title: "S.No",
      dataIndex: "key",
      editable: false,
      width: "5%",
      render: (_, __, index) => (
        <Box style={{ textAlign: "center" }}>{index + 1}</Box>
      ),
    },
    {
      title: "Activity",
      dataIndex: "document",
      width: 400,
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
          }}
          onChange={(e) =>
            handleCellChange(record.key, "applicable", e.target.checked)
          }
          control={<Checkbox checked={record.applicable} />}
        />
      ),
    },
    {
      title: "Actual Date",
      dataIndex: "actualDate",
      width: 200,
      align: "center",
      render: (_, record) => (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DesktopDatePicker
            disabled={record.applicable === true ? false : true}
            required
            inputFormat="DD/MM/YYYY"
            value={record.actualDate}
            onChange={(date) =>
              handleDateChange(record.key, "actualDate", date)
            }
            renderInput={(params) => (
              <TextField
                sx={{
                  backgroundColor: "white",
                  "& .MuiInputBase-input": {
                    height: "15px",
                    width: "150px",
                  },
                  pointerEvents: Change_Imp === 2 ? "none" : "",
                }}
                {...params}
              />
            )}
          />
        </LocalizationProvider>
      ),
    },
    {
      title: "Champion",
      dataIndex: "champion",
      width: 230,
      align: "center",
      render: (_, record) => (
        <TextField
          disabled={record.applicable === true ? false : true}
          sx={{
            backgroundColor: "white",
            "& .MuiInputBase-input": {
              height: "2px",
              width: 150,
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
              width: "150px",
            },
            pointerEvents: Change_Imp === 2 ? "none" : "",
          }}
          placeholder="Type Remark here..."
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
  return (
    <>
      <Table
        dataSource={brkpntdata}
        pagination={false}
        columns={columns}
        bordered
        rowClassName={() => "custom-row"}
      />
    </>
  );
};

export default BreakPointTable;
