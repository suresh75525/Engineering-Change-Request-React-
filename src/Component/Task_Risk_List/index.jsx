/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useReducer } from "react";
import { useSelector } from "react-redux";
import { Skeleton, Table, Tag } from "antd";
import moment from "moment";
import { Button, Typography } from "@mui/material";
import api from "../../Page/config";
import { INITIAL_STATE, postReducer } from "../../reducers/postReducer";
import { ACTION_TYPES } from "../../reducers/postActionType";

const RequestList = (props) => {
  const {
    listDisplayTable = () => {},
    setMasterId,
    setMstDtl,
    tabDataRender,
    settabDataRender,
    handleBOMClick = () => {},
    handleMBOMclick = () => {},
    handleMBOMAppclick = () => {},
    handleMBOMNotclick = () => {},
    newreq,
    isNewRequest,
  } = props;
  const store = useSelector((state) => state.auth);
  const [expandedRowKeys, setExpandedRowKeys] = useState([]);

  // const [assesData, setAssesData] = useState([]);
  const [datas, setData] = useState([]);
  const [bomassesData1, setBOMAssesData1] = useState([]);
  const [bomassesData2, setBOMAssesData2] = useState([]);
  const [loading, setLoading] = useState(false);
  const [ECNstate, ECNdispatch] = useReducer(postReducer, INITIAL_STATE);
  const [MBOMstate, MBOMdispatch] = useReducer(postReducer, INITIAL_STATE);
  const [MBOMAppstate, MBOMAppdispatch] = useReducer(
    postReducer,
    INITIAL_STATE
  );
  const [MBOMNotstate, MBOMNotdispatch] = useReducer(
    postReducer,
    INITIAL_STATE
  );
  const decryptedDept = store.logged_dept;
  const decryptedEmp = store.emp_logged;
  const assesData = ECNstate.post && ECNstate.post;
  const mbomData = MBOMstate.post && MBOMstate.post;
  const mbomAppData = MBOMAppstate.post && MBOMAppstate.post;
  const mbomNotData = MBOMNotstate.post && MBOMNotstate.post;

  let BOMResArr = [];
  let BOMResObj = {};

  const getECNTask = async () => {
    ECNdispatch({ type: ACTION_TYPES.FETCH_START });
    const formdata = new FormData();
    formdata.append("decryptedDept", decryptedDept);
    formdata.append("decryptedEmp", decryptedEmp);
    await api
      .post("api/getECNAssesmentList", formdata, {
        "Content-Type": "text/plain",
      })
      .then((response) => {
        const recordset = response.data;
        if (recordset.success !== false) {
          if (recordset.data.length !== 0) {
            ECNdispatch({
              type: ACTION_TYPES.FETCH_SUCCESS,
              payload: recordset.data,
            });
          } else {
            ECNdispatch({ type: ACTION_TYPES.FETCH_EMPTY });
          }
        } else {
          ECNdispatch({ type: ACTION_TYPES.FETCH_EMPTY });
        }
      })
      .catch((error) => {
        ECNdispatch({ type: ACTION_TYPES.FETCH_ERROR, payload: error });
      });
  };
  const getBOMTask = async () => {
    setLoading(true);
    const formdata = new FormData();
    formdata.append("decryptedDept", decryptedDept);
    formdata.append("decryptedEmp", decryptedEmp);
    await api
      .post("api/getBOMAssesmentList", formdata, {
        "Content-Type": "text/plain",
      })
      .then((response) => {
        const recordset = response.data;
        if (recordset.success !== false) {
          if (recordset.data.length !== 0) {
            setBOMAssesData1(recordset.data.res1);
            let bomassessres = recordset.data.res2;
            bomassessres.map((item, i) => {
              let BOMInnerArr = [];
              let ite = i + 1;
              const {
                Mst_Id,
                bom_no,
                Reason,
                Program,
                Request_Date,
                Created_By,
                BOM_Type,
                Bom_Changes,
                Initiator_Name,
                Customer_PO_Dtl,
                Customer_PO_Rmrk,
                Supplier_PO_Dtl,
                Supplier_PO_Rmrk,
                Cost_Appvl_Dtl,
                Cost_Appvl_Rmrk,
                Int_MBOM_Appvl,
                App_MBOM_Appvl,
              } = item;
              for (i = 1; i <= 13; i++) {
                BOMResObj = {
                  ["id"]: i,
                  ["Dept" + i + "Assig_Name"]: item["Dept" + i + "Assig_Name"],
                  ["Dept" + i + "Sign"]: item["Dept" + i + "_Sign"],
                  ["Dept" + i + "Date"]: item["Dept" + i + "_Date"],
                  ["Dept" + i + "Remrk"]: item["Dept" + i + "_Remrk"],
                  ["Dept" + i + "Status"]: item["Dept" + i + "_Status"],
                };
                BOMInnerArr.push(BOMResObj);
              }

              BOMResArr.push({
                Mst_Id,
                bom_no,
                Reason,
                Program,
                Request_Date,
                Created_By,
                BOM_Type,
                Bom_Changes,
                Initiator_Name,
                Customer_PO_Dtl,
                Customer_PO_Rmrk,
                Supplier_PO_Dtl,
                Supplier_PO_Rmrk,
                Cost_Appvl_Dtl,
                Cost_Appvl_Rmrk,
                Int_MBOM_Appvl,
                App_MBOM_Appvl,
                BOMInnerArr,
              });
              return;
            });
            setBOMAssesData2(BOMResArr);
          } else {
            setBOMAssesData1([]);
            setBOMAssesData2([]);
          }
        } else {
          setBOMAssesData1([]);
          setBOMAssesData2([]);
        }
      })
      .catch((error) => {
        if (error) {
          console.log(error);
        }
      });
    setLoading(false);
  };

  const getMBOMTask = async () => {
    MBOMdispatch({ type: ACTION_TYPES.FETCH_START });
    const formdata = new FormData();
    formdata.append("empcode", decryptedEmp);
    await api
      .post("api/getMBOMAssesmentList", formdata, {
        "Content-Type": "text/plain",
      })
      .then((res) => {
        const recordset = res.data;
        if (recordset.success !== false) {
          if (recordset.data.length > 0) {
            MBOMdispatch({
              type: ACTION_TYPES.FETCH_SUCCESS,
              payload: recordset.data,
            });
          } else {
            MBOMdispatch({ type: ACTION_TYPES.FETCH_EMPTY });
          }
        } else {
          MBOMdispatch({ type: ACTION_TYPES.FETCH_EMPTY });
        }
      })
      .catch((err) => {
        MBOMdispatch({ type: ACTION_TYPES.FETCH_ERROR, payload: error });
      });
  };

  const getMBOMAppTask = async () => {
    MBOMAppdispatch({ type: ACTION_TYPES.FETCH_START });
    const formdata = new FormData();
    formdata.append("empcode", decryptedEmp);
    await api
      .post("api/getMBOMAppAssesmentList", formdata, {
        "Content-Type": "text/plain",
      })
      .then((res) => {
        const recordset = res.data;
        if (recordset.success !== false) {
          if (recordset.data.length > 0) {
            MBOMAppdispatch({
              type: ACTION_TYPES.FETCH_SUCCESS,
              payload: recordset.data,
            });
          } else {
            MBOMAppdispatch({ type: ACTION_TYPES.FETCH_EMPTY });
          }
        } else {
          MBOMAppdispatch({ type: ACTION_TYPES.FETCH_EMPTY });
        }
      })
      .catch((err) => {
        MBOMdispatch({ type: ACTION_TYPES.FETCH_ERROR, payload: error });
      });
  };

  const getMBOMNotTask = async () => {
    MBOMNotdispatch({ type: ACTION_TYPES.FETCH_START });
    const formdata = new FormData();
    formdata.append("empcode", decryptedEmp);
    await api
      .post("api/getMBOMNotAssesmentList", formdata, {
        "Content-Type": "text/plain",
      })
      .then((res) => {
        const recordset = res.data;
        if (recordset.success !== false) {
          if (recordset.data.length > 0) {
            MBOMNotdispatch({
              type: ACTION_TYPES.FETCH_SUCCESS,
              payload: recordset.data,
            });
          } else {
            MBOMNotdispatch({ type: ACTION_TYPES.FETCH_EMPTY });
          }
        } else {
          MBOMNotdispatch({ type: ACTION_TYPES.FETCH_EMPTY });
        }
      })
      .catch((err) => {
        MBOMNotdispatch({ type: ACTION_TYPES.FETCH_ERROR, payload: err });
      });
  };

  const getMasterListData = async () => {
    await api
      .post("api/getMasterDetailsList")
      .then((response) => {
        const recordset = response.data;
        if (recordset.success !== false) {
          if (recordset.data.length !== 0) {
            setData(recordset.data);
          } else {
            setData([]);
          }
        } else {
          setData([]);
        }
      })
      .catch((error) => {
        if (error) {
          console.log(error);
        }
      });
  };

  useEffect(() => {
    getECNTask();
    getBOMTask();
    getMBOMTask();
    getMBOMAppTask();
    getMBOMNotTask();
    getMasterListData();
  }, [tabDataRender, newreq, isNewRequest]);

  const handleECRClick = (row) => {
    let mstdtldata =
      datas &&
      datas.length > 0 &&
      datas.filter((item) => {
        return item.ID === row.ID;
      });
    setMstDtl(mstdtldata);
    settabDataRender(false);
    listDisplayTable(true);
    setMasterId(row.ID);
  };

  const column = [
    {
      title: "Module",
      dataIndex: "module",
      key: "module",
      align: "center",
      render: (module) => (
        <Tag color="green" size={8} key={module}>
          <Typography sx={{ fontSize: 14 }}>{module}</Typography>
        </Tag>
      ),
    },
    {
      title: "No of Task",
      dataIndex: "totalTask",
      key: "totalTask",
      align: "center",
    },
    {
      title: "Remark",
      dataIndex: "remark",
      key: "remark",
    },
  ];

  const dataSet = [
    {
      key: 0,
      module: "ECR",
      totalTask: assesData.length,
      remark: "To access the assigned ECR task, please click the ADD Icon",
    },
    {
      key: 1,
      module: "BOM",
      totalTask: bomassesData2.length,
      remark: "To access the assigned BOM task, please click the ADD Icon",
    },
    {
      key: 2,
      module: "MBOM-Initiator",
      totalTask: mbomData.length,
      remark:
        "To access the assigned MBOM-Initiator task, please click the ADD Icon",
    },
    {
      key: 3,
      module: "MBOM-Approver",
      totalTask: mbomAppData.length,
      remark:
        "To access the assigned MBOM-Approver task, please click the ADD Icon",
    },
    {
      key: 4,
      module: "BOM-Controller",
      totalTask: mbomNotData.length,
      remark:
        "To access the assigned BOM-Controller task, please click the ADD Icon",
    },
  ];

  const expandedRowDetail = (row) => {
    let columns = [];
    let BOM = [
      {
        title: "BOM_NO",
        dataIndex: "bom_no",
        key: "bom_no",
        align: "center",
        render: (text, row, index) => (
          <>
            <Tag color="blue" size={8} key={text}>
              <Button
                variant="text"
                onClick={() => handleBOMClick(bomassesData1, row)}
              >
                {text}
              </Button>
            </Tag>
          </>
        ),
      },
      {
        title: "Initiator_Name",
        dataIndex: "Initiator_Name",
        key: "Initiator_Name",
        align: "center",
      },
      {
        title: "Request_Date",
        dataIndex: "Request_Date",
        key: "Request_Date",
        align: "center",
        render: (text) => {
          if (text !== null && text !== undefined) {
            const date = text.split("T");
            return {
              children: moment(date[0]).format("DD-MMM-YYYY"),
            };
          }
          return {
            children: "",
          };
        },
      },
      {
        title: "Reason",
        key: "Reason",
        dataIndex: "Reason",
        align: "center",
        render: (text) => {
          if (text === null) {
            return {
              children: "-",
            };
          }
          return {
            children: text,
          };
        },
      },
      {
        title: "Program",
        dataIndex: "Program",
        key: "Program",
      },
    ];
    let ECR = [
      {
        title: "Customer",
        dataIndex: "Cust_Name",
        key: "Cust_Name",
        align: "center",
        render: (text, row, index) => (
          <>
            <Tag color="blue" size={8} key={text}>
              <Button variant="text" onClick={() => handleECRClick(row)}>
                {text}
              </Button>
            </Tag>
          </>
        ),
      },
      {
        title: "Initiate_By",
        dataIndex: "Initiate_By",
        key: "Initiate_By",
        align: "center",
      },
      {
        title: "Request date",
        dataIndex: "Request_date",
        key: "Request_date",
        align: "center",
        render: (text) => {
          if (text !== null && text !== undefined) {
            const date = text.split("T");
            return {
              children: moment(date[0]).format("DD-MMM-YYYY"),
            };
          }
          return {
            children: "",
          };
        },
      },
      {
        title: "Description",
        key: "description",
        dataIndex: "description",
      },
      {
        title: "Reason",
        dataIndex: "reason",
        key: "reason",
      },
      {
        title: "Part Type",
        dataIndex: "part_type",
        key: "part_type",
        align: "center",
        render: (text) => {
          if (text === 1) {
            return {
              children: "Existing Part",
            };
          }
          return {
            children: "New Part",
          };
        },
      },
    ];
    let MBOM = [
      {
        title: "BOM_NO",
        dataIndex: "bom_no",
        key: "bom_no",
        align: "center",
        render: (text, row, index) => (
          <>
            <Tag color="blue" size={8} key={text}>
              <Button variant="text" onClick={() => handleMBOMclick(row)}>
                {text}
              </Button>
            </Tag>
          </>
        ),
      },
      {
        title: "Initiator_Name",
        dataIndex: "Initiator_Name",
        key: "Initiator_Name",
        align: "center",
      },
      {
        title: "Request_Date",
        dataIndex: "Request_Date",
        key: "Request_Date",
        align: "center",
        render: (text) => {
          if (text !== null && text !== undefined) {
            const date = text.split("T");
            return {
              children: moment(date[0]).format("DD-MMM-YYYY"),
            };
          }
          return {
            children: "",
          };
        },
      },
      {
        title: "Reason",
        key: "Reason",
        dataIndex: "Reason",
        align: "center",
        render: (text) => {
          if (text === null) {
            return {
              children: "-",
            };
          }
          return {
            children: text,
          };
        },
      },
      {
        title: "Program",
        dataIndex: "Program",
        key: "Program",
      },
    ];
    let MBOMApp = [
      {
        title: "BOM_NO",
        dataIndex: "bom_no",
        key: "bom_no",
        align: "center",
        render: (text, row, index) => (
          <>
            <Tag color="blue" size={8} key={text}>
              <Button variant="text" onClick={() => handleMBOMAppclick(row)}>
                {text}
              </Button>
            </Tag>
          </>
        ),
      },
      {
        title: "Initiator_Name",
        dataIndex: "Initiator_Name",
        key: "Initiator_Name",
        align: "center",
      },
      {
        title: "Request_Date",
        dataIndex: "Request_Date",
        key: "Request_Date",
        align: "center",
        render: (text) => {
          if (text !== null && text !== undefined) {
            const date = text.split("T");
            return {
              children: moment(date[0]).format("DD-MMM-YYYY"),
            };
          }
          return {
            children: "",
          };
        },
      },
      {
        title: "Reason",
        key: "Reason",
        dataIndex: "Reason",
        align: "center",
        render: (text) => {
          if (text === null) {
            return {
              children: "-",
            };
          }
          return {
            children: text,
          };
        },
      },
      {
        title: "Program",
        dataIndex: "Program",
        key: "Program",
      },
    ];
    let MBOMNot = [
      {
        title: "BOM_NO",
        dataIndex: "bom_no",
        key: "bom_no",
        align: "center",
        render: (text, row, index) => (
          <>
            <Tag color="blue" size={8} key={text}>
              <Button variant="text" onClick={() => handleMBOMNotclick(row)}>
                {text}
              </Button>
            </Tag>
          </>
        ),
      },
      {
        title: "Initiator_Name",
        dataIndex: "Initiator_Name",
        key: "Initiator_Name",
        align: "center",
      },
      {
        title: "Request_Date",
        dataIndex: "Request_Date",
        key: "Request_Date",
        align: "center",
        render: (text) => {
          if (text !== null && text !== undefined) {
            const date = text.split("T");
            return {
              children: moment(date[0]).format("DD-MMM-YYYY"),
            };
          }
          return {
            children: "",
          };
        },
      },
      {
        title: "Reason",
        key: "Reason",
        dataIndex: "Reason",
        align: "center",
        render: (text) => {
          if (text === null) {
            return {
              children: "-",
            };
          }
          return {
            children: text,
          };
        },
      },
      {
        title: "Program",
        dataIndex: "Program",
        key: "Program",
      },
    ];

    if (row.module === "ECR") {
      columns = ECR;
    } else if (row.module === "BOM") {
      columns = BOM;
    } else if (row.module === "MBOM-Initiator") {
      columns = MBOM;
    } else if (row.module === "MBOM-Approver") {
      columns = MBOMApp;
    } else {
      columns = MBOMNot;
    }

    let ExpandData =
      row.key === 0
        ? assesData
        : row.key === 1
        ? bomassesData2
        : row.key === 2
        ? mbomData
        : row.key === 3
        ? mbomAppData
        : mbomNotData;

    return (
      <Table columns={columns} dataSource={ExpandData} pagination={false} />
    );
  };

  const onTableRowExpand = (expanded, record) => {
    const keys = [];
    if (expanded) {
      keys.push(record.key);
    }

    setExpandedRowKeys(keys);
  };

  return (
    <>
      <Skeleton loading={loading} active>
        <Table
          className="components-table-demo-nested"
          columns={column}
          // expandedRowRender={expandedRowDetail}
          // expandedRowKeys={expandedRowKeys}
          // onExpand={onTableRowExpand}
          expandable={{
            expandedRowRender: expandedRowDetail,
            expandedRowKeys: expandedRowKeys,
            onExpand: onTableRowExpand,
          }}
          dataSource={dataSet}
          pagination={false}
          size="middle"
        />
      </Skeleton>
    </>
  );
};
export default RequestList;
