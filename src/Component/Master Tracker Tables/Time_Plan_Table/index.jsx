import React, { useContext, useEffect, useRef, useState } from "react";
import { Form, Input, Popconfirm, Table } from "antd";
import { Box, Button, Grid, Typography, TextField } from "@mui/material";
import "./index.css";
import moment from "moment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const EditableContext = React.createContext(null);
const EditableRow = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};
const EditableCell = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef(null);
  const form = useContext(EditableContext);
  useEffect(() => {
    if (editing) {
      inputRef.current.focus();
    }
  }, [editing]);
  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({
      [dataIndex]: record[dataIndex],
    });
  };
  const save = async () => {
    try {
      const values = await form.validateFields();
      toggleEdit();
      handleSave({
        ...record,
        ...values,
      });
    } catch (errInfo) {
      console.log("Save failed:", errInfo);
    }
  };
  let childNode = children;
  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{
          margin: 0,
        }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `${title} is required.`,
          },
        ]}
      >
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{
          paddingRight: 24,
        }}
        onClick={toggleEdit}
      >
        {children}
      </div>
    );
  }
  return <td {...restProps}>{childNode}</td>;
};

const TimePlan = (props) => {
  const {
    TimeTabhandleCellChange = () => {},
    TimeTabhandleDateChange = () => {},
    handleTimedata = () => {},
    handleAddTimeplan = () => {},
    timetabledata = { timetabledata },
    initiateTimetab = { initiateTimetab },
    ischecked,
    Timeplnretdata,
    Change_Imp,
  } = props;

  const newDate = new Date();

  const [count, setCount] = useState(1);
  const [championValue, setChampionValue] = useState({});
  const [activityValue, setActivityValue] = useState({});
  // const [lt1Value, setLt1Value] = useState({});
  // const [lt2Value, setLt2Value] = useState({});
 
  useEffect(() => {
    initiateTimetab();
    setChampionValue({});
    setActivityValue({});
    // setLt2Value({});
    // setLt1Value({});
    Timeplnretdata &&
      Timeplnretdata !== null &&
      Timeplnretdata.map((data, i) => {
        [...Array(Timeplnretdata.length)].map((data1, j) => {
          // const index = j + 1;
          if (i === j) {
            setChampionValue((prevValues) => ({
              ...prevValues,
              [j]: data.Champion,
            }));
            setActivityValue((prevValues) => ({
              ...prevValues,
              [j]: data.Activity,
            }));
            // setLt1Value((prevValues) => ({
            //   ...prevValues,
            //   [j]: data.LT1,
            // }));
            // setLt2Value((prevValues) => ({
            //   ...prevValues,
            //   [j]: data.LT2,
            // }));
          }
        });
        return;
      });
  }, [ischecked, Timeplnretdata]);

  const handleCellChange = (key, dataIndex, value) => {
    TimeTabhandleCellChange(key, dataIndex, value, Timeplnretdata);
  };

  const handleDateChange = (key, dataIndex, date) => {
    TimeTabhandleDateChange(key, dataIndex, date, Timeplnretdata);
  };
  console.log("----updated", timetabledata)
  const handleDelete = (key) => {
    const newData = timetabledata.filter((item) => item.key !== key);
    handleTimedata(newData);
    const validation = newData.every(
      (item) =>
        item.activity &&
        item.planstart &&
        item.planend &&
        // item.lt1 &&
        item.actualstart &&
        item.actualend &&
        // item.lt2 &&
        item.champion
    );
    if (validation) {
      const newDatafinal = [...newData];
      getTavVal(newDatafinal);
    }
  };

  const defaultColumns = [
    {
      title: "S.No",
      dataIndex: "sno",
      editable: false,
      width: "5%",
      render: (_, __, index) => (
        <Box style={{ textAlign: "center" }}>
          {index + 1 + (currentPage - 1) * pageSize}
        </Box>
      ),
    },
    {
      title: "Activity",
      dataIndex: "activity",
      width: 200,
      align: "center",
      render: (_, record) => (
        <TextField
          sx={{
            backgroundColor: "white",
            "& .MuiInputBase-input": {
              height: "2px",
              width: 130,
            },
            pointerEvents: Change_Imp === 2 ? "none" : "",
          }}
          placeholder="Type Activity here..."
          value={activityValue[record.key] || ""}
          onBlur={(e) =>
            handleCellChange(record.key, "activity", e.target.value)
          }
          onChange={(e) =>
            setActivityValue((prevVal) => ({
              ...prevVal,
              [record.key]: e.target.value,
            }))
          }
        />
      ),
    },
    {
      title: "Plan Start",
      dataIndex: "planstart",
      align: "center",
      width: 100,
      render: (_, record) => (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DesktopDatePicker
            required
            // minDate={new Date()}
            inputFormat="DD/MM/YYYY"
            value={record.planstart}
            onChange={(date) => handleDateChange(record.key, "planstart", date)}
            renderInput={(params) => (
              <TextField
                sx={{
                  backgroundColor: "white",
                  "& .MuiInputBase-input": {
                    height: "15px",
                    minWidth: 80,
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
      title: "Plan End",
      dataIndex: "planend",
      align: "center",
      width: 100,
      render: (_, record) => (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DesktopDatePicker
            required
            // minDate={new Date()}
            inputFormat="DD/MM/YYYY"
            value={record.planend}
            onChange={(date) => handleDateChange(record.key, "planend", date)}
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
              />
            )}
          />
        </LocalizationProvider>
      ),
    },
   
    {
      title: "Actual Start",
      dataIndex: "actualstart",
      align: "center",
      width: 100,
      render: (_, record) => (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DesktopDatePicker
            required
            // minDate={new Date()}
            inputFormat="DD/MM/YYYY"
            value={record.actualstart}
            onChange={(date) =>
              handleDateChange(record.key, "actualstart", date)
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
              />
            )}
          />
        </LocalizationProvider>
      ),
    },
    {
      title: "Actual End",
      dataIndex: "actualend",
      align: "center",
      width: 100,
      render: (_, record) => (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DesktopDatePicker
            required
            // minDate={new Date()}
            inputFormat="DD/MM/YYYY"
            value={record.actualend}
            onChange={(date) => handleDateChange(record.key, "actualend", date)}
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
              />
            )}
          />
        </LocalizationProvider>
      ),
    },
    
    {
      title: "Champion",
      dataIndex: "champion",
      width: 200,
      align: "center",
      render: (_, record) => (
        <TextField
          sx={{
            backgroundColor: "white",
            "& .MuiInputBase-input": {
              height: "2px",
              width: 130,
            },
            pointerEvents: Change_Imp === 2 ? "none" : "",
          }}
          placeholder="Type champion here..."
          value={championValue[record.key] || ""}
          onBlur={(e) =>
            handleCellChange(record.key, "champion", e.target.value)
          }
          onChange={(e) =>
            setChampionValue((prevVal) => ({
              ...prevVal,
              [record.key]: e.target.value,
            }))
          }
        />
      ),
    },
    {
      title: "operation",
      dataIndex: "operation",
      width: "10%",
      render: (_, record) =>
        timetabledata.length >= 1 ? (
          <Popconfirm
            title="Sure to delete?"
            onConfirm={() => handleDelete(record.key)}
          >
            <Button
              sx={{
                pointerEvents: Change_Imp === 2 ? "none" : "",
              }}
            >
              Delete
            </Button>
          </Popconfirm>
        ) : null,
    },
  ];

  const handleAdd = () => {
    const newData = {
      key: count,
      activity: "",
      planstart: "",
      planend: "",
      // lt1: "",
      actualstart: "",
      actualend: "",
      // lt2: "",
      champion: "",
    };
    handleAddTimeplan([timetabledata, newData]);
    setCount(count + 1);
  };

  const handleSave = (row) => {
    const newData = [...dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    handleTimedata(newData);
    const validation = newData.every(
      (item) =>
        item.activity &&
        item.planstart &&
        item.planend &&
        // item.lt1 &&
        item.actualstart &&
        item.actualend &&
        // item.lt2 &&
        item.champion
    );
    if (validation) {
      const newDatafinal = [...newData];
      getTavVal(newDatafinal);
    }
  };
  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };
  const columns = defaultColumns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave,
      }),
    };
  });


  const title = () => {
    return (
      <Box>
        <Grid container spacing={1}>
          <Grid item xs={10.9} sx={{ backgroundColor: "#BFBFBF" }}>
            <Typography variant="h6" sx={{ textAlign: "center" }}>
              Time Plan
            </Typography>
          </Grid>
          <Grid item xs={1.1} sx={{ backgroundColor: "#B2BEB5" }}>
            <Typography variant="h6" sx={{ textAlign: "center" }}>
              Actions
            </Typography>
          </Grid>
        </Grid>
      </Box>
    );
  };
  const pageSize = 5;
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  return (
    <div>
      {Change_Imp === 2 ? (
        ""
      ) : (
        <Button
          onClick={handleAdd}
          variant="contained"
          style={{
            marginBottom: 16,
          }}
        >
          Add a row
        </Button>
      )}

      <Table
        components={components}
        rowClassName={() => "editable-row"}
        bordered
        dataSource={timetabledata}
        columns={columns}
        pagination={{
          pageSizeOptions: ["5", "10", "20"],
          defaultPageSize: pageSize,
          onChange: handlePageChange,
          current: currentPage,
        }}
        // title={() => "Table Header"}
        title={title}
      />
    </div>
  );
};
export default TimePlan;
