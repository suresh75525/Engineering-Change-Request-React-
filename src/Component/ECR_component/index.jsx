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
          // height:10
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

const EditableTable = (props) => {
  const { getTavVal = () => {}, tableData } = props;
  const [dataSource, setDataSource] = useState([
    {
      key: 0,
      magna: "",
      rev1: "",
      customer: "",
      rev2: "",
      part: "",
      rev3: "",
    },
  ]);

  useEffect(() => {
    setDataSource([
      {
        key: 0,
        magna: "",
        rev1: "",
        customer: "",
        rev2: "",
        part: "",
        rev3: "",
      },
    ]);
  }, [tableData]);
  const [count, setCount] = useState(1);
  const handleDelete = (key) => {
    const newData = dataSource.filter((item) => item.key !== key);
    setDataSource(newData);
    const validation = newData.every(
      (item) =>
        item.magna &&
        item.rev1 &&
        item.customer &&
        item.rev2 &&
        item.part &&
        item.rev3
    );
    if (validation) {
      const newDatafinal = [...newData];
      getTavVal(newDatafinal);
    }
  };

  const defaultColumns = [
    {
      title: "Magna",
      dataIndex: "magna",
      width: "20%",
      editable: true,
    },
    {
      title: "Magna_Rev",
      dataIndex: "rev1",
      editable: true,
    },
    {
      title: "Customer",
      dataIndex: "customer",
      width: "20%",
      editable: true,
    },
    {
      title: "Customer_Rev",
      dataIndex: "rev2",
      editable: true,
    },
    {
      title: "Part Number",
      dataIndex: "part",
      width: "20%",
      editable: true,
    },
    {
      title: "Part_Rev",
      dataIndex: "rev3",
      editable: true,
    },
    {
      title: "operation",
      dataIndex: "operation",
      render: (_, record) =>
        dataSource.length >= 1 ? (
          <Popconfirm
            title="Sure to delete?"
            onConfirm={() => handleDelete(record.key)}
          >
            <Button>Delete</Button>
          </Popconfirm>
        ) : null,
    },
  ];
  const handleAdd = () => {
    const newData = {
      key: count,
      magna: "",
      rev1: "",
      customer: "",
      rev2: "",
      part: "",
      rev3: "",
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
        item.magna &&
        item.rev1 &&
        item.customer &&
        item.rev2 &&
        item.part &&
        item.rev3
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
          <Grid item xs={7.5} sx={{ backgroundColor: "#D3D3D3" }}>
            <Typography variant="h6" sx={{ textAlign: "center" }}>
              Affected Part number (FG)
            </Typography>
          </Grid>
          <Grid item xs={4.5} sx={{ backgroundColor: "#BFBFBF" }}>
            <Typography variant="h6" sx={{ textAlign: "center" }}>
              Affected Part number (Child Parts)
            </Typography>
          </Grid>
        </Grid>
      </Box>
    );
  };

  return (
    <div>
      <Button
        onClick={handleAdd}
        variant="contained"
        style={{
          marginBottom: 16,
        }}
      >
        Add a row
      </Button>
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
export default EditableTable;
