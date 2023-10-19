/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";
import { Box, Input, Typography } from "@mui/material";
import { Table } from "antd";
import moment from "moment";
// import * as CryptoJS from "crypto-js";
// import 'antd/dist/antd.css';
import "./index.css";

const Bom_Summary_Tracker = (props) => {
  const { resData } = props;
  const [searchText, setSearchText] = useState("");


  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  const filteredData =
    resData &&
    resData.filter((item) => {
      if (!item) {
        return false;
      }
      const values = Object.values(item).map((searchText) => {
        if (searchText !== null) {
          return searchText.toString().toLowerCase();
        }
        return "";
      });

      return values.some((val) => val.includes(searchText.toLowerCase()));
    });
  // searchText ? searchText.toString().toLowerCase() : ''
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      align: "center",
      width: 40,
      // render: (text, record, index) => index + 1,
    },
    {
      title: "BOM_No",
      dataIndex: "bom_no",
      key: "bom_no",
      align: "center",
      width: 40,
    },
    {
      title: "Request Date",
      dataIndex: "Request_Date",
      key: "Request_Date",
      align: "center",
      width: 40,
      render: (text, record, index) => {
        if (text !== null) {
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
      title: "Program",
      dataIndex: "Program",
      key: "Program",
      align: "center",
      width: 40,
    },
    {
      title: "Type",
      dataIndex: "BOM_Type",
      key: "BOM_Type",
      align: "center",
      width: 20,
    },
    {
      title: "Requester",
      dataIndex: "Initiator_Name",
      key: "Initiator_Name",
      align: "center",
      width: 50,
      // render: (text) => (
      //   <span>{text || ""}</span>
      // ),
    },
    {
      title: "Approval Status",
      children: [
        {
          title: "Details",
          dataIndex: "deptArr",
          key: "deptArr",
          width: 50,
          render: (deptArr) => (
            <table style={{ border: "1px solid black" }}>
              {deptArr.map((detail, index) => (
                <tr style={{ border: "1px solid black" }}>
                  <td style={{ border: "1px solid black" }} key={index}>
                    <Typography sx={{ fontWeight: "bold" }}>
                      {detail.Dept}
                    </Typography>
                  </td>
                </tr>
              ))}
            </table>
          ),
        },
        {
          title: "Status",
          dataIndex: "summaryresArr",
          key: "summaryresArr",
          width: 30,
          render: (summaryresArr) => (
            <table style={{ border: "1px solid black" }}>
              {summaryresArr.map((status, index) => {
                if (index === 13) {
                  return (
                    <tr style={{ border: "1px solid black" }}>
                      <td style={{ border: "1px solid black" }} key={index}>
                        {status.Dept_Status === 0 ||
                        status.Dept_Status === 1 ? (
                          <Typography
                            sx={{
                              fontWeight: "bold",
                              color: "orange",
                              textAlign: "center",
                            }}
                          >
                            Pending
                          </Typography>
                        ) : (
                          <Typography
                            sx={{
                              fontWeight: "bold",
                              color: "green",
                              textAlign: "center",
                            }}
                          >
                            Approved
                          </Typography>
                        )}
                      </td>
                    </tr>
                  );
                } else {
                  return (
                    <tr style={{ border: "1px solid black" }}>
                      <td style={{ border: "1px solid black" }} key={index}>
                        {status.Dept_Status === 0 ? (
                          <Typography
                            sx={{
                              fontWeight: "bold",
                              color: "orange",
                              textAlign: "center",
                            }}
                          >
                            Pending
                          </Typography>
                        ) : status.Dept_Status === 1 ? (
                          <Typography
                            sx={{
                              fontWeight: "bold",
                              color: "green",
                              textAlign: "center",
                            }}
                          >
                            Approved
                          </Typography>
                        ) : (
                          <Typography
                            sx={{
                              fontWeight: "bold",
                              color: "#D2042D",
                              textAlign: "center",
                            }}
                          >
                            Rejected
                          </Typography>
                        )}
                      </td>
                    </tr>
                  );
                }
              })}
            </table>
          ),
        },
      ],
    },
  ];

  return (
    <Box>
      <Input
        placeholder="Search..."
        onInput={handleSearch}
        style={{ marginBottom: 10, width: "100%" }}
      />
      <Table
        bordered
        columns={columns}
        dataSource={filteredData && filteredData}
      />
    </Box>
  );
};
export default Bom_Summary_Tracker;
