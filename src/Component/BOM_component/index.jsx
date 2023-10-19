import React, { useContext, useEffect, useRef, useState } from "react";
import { Form, Input, Popconfirm, Table } from "antd";
import { Box, Button, Typography } from "@mui/material";
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

const EditableTable = (props) => {
  const {
    getTavVal = () => {},
    tableData,
    tabArr,
    bomMyTask,
    insertComplete,
  } = props;
  const Mst_Id =
    bomMyTask !== undefined && bomMyTask.length > 0 ? bomMyTask[0].Mst_Id : "";

  const [dataSource, setDataSource] = useState([
    {
      key: 0,
      partno: "",
      rev: "",
      partno2: "",
      rev2: "",
    },
  ]);
  let DynamictabArr = [];
  useEffect(() => {
    // if (tabArr !== Undefined && tabArr.length > 0) {
    tabArr !== undefined &&
      tabArr.map((item, i) => {
        if (Mst_Id === item.Mst_Id) {
          DynamictabArr.push({
            key: i,
            partno: item.Cur_Part_No,
            rev: item.Cur_Rev_No,
            partno2: item.Prop_Part_No,
            rev2: item.Prop_Rev_No,
          });
        }
        return;
      });
    if (tabArr === undefined) {
      if (insertComplete === true) {
        setDataSource([
          {
            key: 0,
            partno: "",
            rev: "",
            partno2: "",
            rev2: "",
          },
        ]);
      } 
    }
   if(tabArr !== undefined){
    if (tabArr.length > 0) {
      if (Array.isArray(DynamictabArr)) {
        setDataSource([...DynamictabArr]);
      }
    }
   }
  }, [tableData, tabArr, bomMyTask, insertComplete]);

  const [count, setCount] = useState(1);
  const handleDelete = (key) => {
    const newData = dataSource.filter((item) => item.key !== key);
    setDataSource(newData);
    const validation = newData.every(
      (item) => item.partno && item.rev && item.partno2 && item.rev2
    );
    if (validation) {
      const newDatafinal = [...newData];
      getTavVal(newDatafinal);
    }
  };

  const defaultColumns = [
    {
      title: "SI.No",
      dataIndex: "sno",
      width: "5%",
      editable: false,
      render: (_, __, index) => (
        <Box style={{ textAlign: "center" }}>{index + 1}</Box>
      ),
    },
    {
      title: "Current Part Number",
      dataIndex: "partno",
      width: "30%",
      editable: true,
    },
    {
      title: "Current Part Rev",
      dataIndex: "rev",
      width: "10%",
      editable: true,
    },
    {
      title: "Proposed Part Number",
      dataIndex: "partno2",
      width: "30%",
      editable: true,
    },
    {
      title: "Proposed Part Rev",
      dataIndex: "rev2",
      width: "12%",
      editable: true,
    },
    {
      title: "Operation",
      dataIndex: "operation",
      render: (_, record) =>
        dataSource.length >= 1 ? (
          <Popconfirm
            title="Sure to delete?"
            onConfirm={() => handleDelete(record.key)}
          >
            {tabArr !== undefined && tabArr.length > 0 ? (
              <Button
                style={{
                  pointerEvents: "none",
                  cursor: "not-allowed",
                }}
              >
                Delete
              </Button>
            ) : (
              <Button>Delete</Button>
            )}
          </Popconfirm>
        ) : null,
    },
  ];
  const handleAdd = () => {
    const newData = {
      key: count,
      partno: "",
      rev: "",
      partno2: "",
      rev2: "",
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
      (item) => item.partno && item.rev && item.partno2 && item.rev2
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
      <Typography
        sx={{
          fontWeight: "bold",
          textAlign: "center",
          backgroundColor: "#5A5A5A",
          color: "white",
          height: 35,
        }}
      >
        Material Description
      </Typography>
    );
  };

  return (
    <div>
      {tabArr !== undefined ? (
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
      <Box sx={{ backgroundColor: "#646D7E" }}>
        {tabArr !== undefined && tabArr.length > 0 ? (
          <Table
            // components={components}
            bordered
            dataSource={dataSource}
            columns={columns}
            pagination={false}
            title={title}
          />
        ) : (
          <Table
            components={components}
            rowClassName={() => "editable-row"}
            bordered
            dataSource={dataSource}
            columns={columns}
            pagination={false}
            title={title}
          />
        )}
      </Box>
    </div>
  );
};
export default EditableTable;
