import React, { useState, useEffect } from "react";
import { Skeleton } from "antd";
import { app_style } from "./style";
import { Box, Card, CardContent, CardHeader, Typography } from "@mui/material";
import BOMTrackerTable from "../../../Component/BOM_Summary_Tracker";
import api from "../../config";

const SummaryTracker = () => {
  const [loading, setLoading] = useState(false);

  const [resData, SetResdata] = useState();

  let ResArr = [];
  let ResObj = {};

  //   const handleClickEscalation = (row) => {
  //     alert(row.description);
  //   };

  useEffect(() => {
    async function onloadECNFunc() {
      setLoading(true);
      await api
        .post("api/getBOMMasterTrackerList")
        .then((response) => {
          const recordset = response.data;
          setLoading(false);
          if (recordset.success !== false) {
            if (recordset.data.length !== 0) {
              let summaryres = recordset.data;
              summaryres.map((item, i) => {
                let summaryresArr = [];
                let key = i + 1;
                let id = key;
                const {
                  bom_no,
                  Request_Date,
                  Program,
                  BOM_Type,
                  Initiator_Name,
                  Approval_Status,
                } = item;
                let deptArr = [
                  {
                    Dept: "Cost Controller",
                  },
                  {
                    Dept: "Production",
                  },
                  {
                    Dept: "Logistics",
                  },
                  {
                    Dept: "Planning",
                  },
                  {
                    Dept: "Purchase",
                  },
                  {
                    Dept: "Manufacturing",
                  },
                  {
                    Dept: "Maintenance",
                  },
                  {
                    Dept: "Materials(RM)",
                  },
                  {
                    Dept: "Program Management",
                  },
                  {
                    Dept: "Quality",
                  },
                  {
                    Dept: "AGM",
                  },
                  {
                    Dept: "Engineering-Management",
                  },
                  {
                    Dept: "GM",
                  },
                  {
                    Dept: "M-BOM",
                  },
                ];
                for (i = 1; i <= 14; i++) {
                  if (i === 14) {
                    ResObj = {
                      ["Dept_Status"]: Approval_Status,
                    };
                  } else {
                    ResObj = {
                      ["Dept_Status"]: item["Dept" + i + "_Status"],
                    };
                  }

                  summaryresArr.push(ResObj);
                }
                summaryresArr.push();
                ResArr.push({
                  key,
                  id,
                  bom_no,
                  Request_Date,
                  Program,
                  BOM_Type,
                  Initiator_Name,
                  summaryresArr,
                  deptArr,
                });
                return;
              });
              SetResdata(ResArr);
            } else {
              SetResdata([]);
            }
          } else {
            SetResdata([]);
          }
        })
        .catch((error) => {
          if (error) {
            console.log(error);
          }
        });
    }
    onloadECNFunc();
  }, []);

  return (
    <Box>
      <Box sx={{ m: 3 }}>
        <Card raised={true} sx={app_style.cardSxT}>
          <CardHeader
            sx={{ backgroundColor: "#5A5A5A", color: "white" }}
            title={
              <Typography sx={app_style.cardHeading}>
                BOM Master Tracker
              </Typography>
            }
          ></CardHeader>
          <CardContent>
            <Skeleton loading={loading} active>
              <BOMTrackerTable resData={resData} />
            </Skeleton>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};
export default SummaryTracker;
