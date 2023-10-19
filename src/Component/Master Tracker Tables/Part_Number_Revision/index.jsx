import React, { useContext, useEffect, useRef, useState } from "react";
import { Form, Input, Popconfirm, Table } from "antd";
import { Box, Button, Grid, Typography } from "@mui/material";
import "./index.css";
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

const PartNumberRevision = (props) => {
  const {
    getTavVal = () => {},
    tableData,
    tabArr,
    partnoretdata,
    Change_Imp,
  } = props;

  const [dataSource, setDataSource] = useState([
    {
      key: 0,
      currentPart1: "",
      currentRev1: "",
      currentMagnaPart1: "",
      currentMagnaRev1: "",
      customerPart2: "",
      customerRev2: "",
      customerMagnaPart2: "",
      customerMagnaRev2: "",
    },
  ]);

  useEffect(() => {
    if (partnoretdata) {
      if (
        (partnoretdata.length > 0 && Change_Imp !== null && Change_Imp === 0) ||
        (partnoretdata.length > 0 && Change_Imp !== null && Change_Imp === 2)
      ) {
        const newdata = partnoretdata.map((record, index) => {
          return {
            key: index,
            currentPart1: record.Cur_Cus_Part_No,
            currentRev1: record.Cur_Rev_No1,
            currentMagnaPart1: record.Cur_Magna_Part_No,
            currentMagnaRev1: record.Cur_Rev_No2,
            customerPart2: record.Rev_Cus_Part_No,
            customerRev2: record.Rev_Rev_No1,
            customerMagnaPart2: record.Rev_Magna_Part_No,
            customerMagnaRev2: record.Rev_Rev_No2,
            ID: record.ID,
            Mst_Id: record.Mst_Id,
          };
        });
        setDataSource(newdata);
        getTavVal([...newdata]);
      }
    } else {
      setDataSource([
        {
          key: 0,
          currentPart1: "",
          currentRev1: "",
          currentMagnaPart1: "",
          currentMagnaRev1: "",
          customerPart2: "",
          customerRev2: "",
          customerMagnaPart2: "",
          customerMagnaRev2: "",
        },
      ]);
    }
  }, [tableData, tabArr, partnoretdata]);

  const [count, setCount] = useState(1);

  const handleDelete = (key) => {
    const newData = dataSource.filter((item) => item.key !== key);
    setDataSource(newData);
    const validation = newData.every(
      (item) =>
        item.currentPart1 &&
        item.currentRev1 &&
        item.currentMagnaPart1 &&
        item.currentMagnaRev1 &&
        item.customerPart2 &&
        item.customerRev2 &&
        item.customerMagnaPart2 &&
        item.customerMagnaRev2
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
        <Box style={{ textAlign: "center" }}>{index + 1}</Box>
      ),
    },
    {
      title: "Customer Part",
      dataIndex: "currentPart1",
      editable: true,
      width: "14%",
    },
    {
      title: "Rev",
      dataIndex: "currentRev1",
      editable: true,
      width: "8%",
    },
    {
      title: "Magna Part",
      dataIndex: "currentMagnaPart1",
      editable: true,
      width: "14%",
    },
    {
      title: "Rev",
      dataIndex: "currentMagnaRev1",
      editable: true,
      width: "8%",
    },

    {
      title: "Customer Part",
      dataIndex: "customerPart2",
      editable: true,
      width: "14%",
    },
    {
      title: "Rev",
      dataIndex: "customerRev2",
      editable: true,
      width: "8%",
    },
    {
      title: "Magna Part",
      dataIndex: "customerMagnaPart2",
      editable: true,
      width: "14%",
    },
    {
      title: "Rev",
      dataIndex: "customerMagnaRev2",
      editable: true,
      width: "8%",
    },

    {
      title: "operation",
      dataIndex: "operation",
      width: "10%",
      render: (_, record) =>
        dataSource.length >= 1 ? (
          <Popconfirm
            title="Sure to delete?"
            onConfirm={() => handleDelete(record.key)}
          >
            {Change_Imp !== null && Change_Imp === 0 ? (
              <Button>Delete</Button>
            ) : Change_Imp === null ||
              (Change_Imp !== null && Change_Imp === 1) ? (
              <Button>Delete</Button>
            ) : (
              <Button
                style={{
                  pointerEvents: "none",
                  cursor: "not-allowed",
                }}
              >
                Delete
              </Button>
            )}
          </Popconfirm>
        ) : null,
    },
  ];

  const handleAdd = () => {
    const newData = {
      key: count,
      currentPart1: "",
      currentRev1: "",
      currentMagnaPart1: "",
      currentMagnaRev1: "",
      customerPart2: "",
      customerRev2: "",
      customerMagnaPart2: "",
      customerMagnaRev2: "",
    };
    setDataSource([...dataSource, newData]);
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

    setDataSource(newData);
    const validation = newData.every(
      (item) =>
        item.currentPart1 &&
        item.currentRev1 &&
        item.currentMagnaPart1 &&
        item.currentMagnaRev1 &&
        item.customerPart2 &&
        item.customerRev2 &&
        item.customerMagnaPart2 &&
        item.customerMagnaRev2
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
    if (Change_Imp === 2) {
      return {
        ...col,
        onCell: (record) => ({
          record,
          editable: false,
          dataIndex: col.dataIndex,
          title: col.title,
          handleSave,
        }),
      };
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
          <Grid item xs={5.4} sx={{ backgroundColor: "#D3D3D3" }}>
            <Typography variant="h6" sx={{ textAlign: "center" }}>
              Current
            </Typography>
          </Grid>
          <Grid item xs={5.5} sx={{ backgroundColor: "#BFBFBF" }}>
            <Typography variant="h6" sx={{ textAlign: "center" }}>
              Revised
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

  return (
    <div>
      {Change_Imp !== null && Change_Imp === 0 ? (
        <Button
          onClick={handleAdd}
          variant="contained"
          style={{
            marginBottom: 16,
          }}
        >
          Add a row
        </Button>
      ) : Change_Imp === null || (Change_Imp && Change_Imp === 1) ? (
        <Button
          onClick={handleAdd}
          variant="contained"
          style={{
            marginBottom: 16,
          }}
        >
          Add a row
        </Button>
      ) : (
        ""
      )}

      <Table
        components={components}
        rowClassName={() => "editable-row"}
        bordered
        dataSource={dataSource}
        columns={columns}
        pagination={false}
        // title={() => "Table Header"}
        title={title}
      />
    </div>
  );
};
export default PartNumberRevision;
