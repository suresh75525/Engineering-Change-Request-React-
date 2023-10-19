import React from "react";
import { Box } from "@mui/material";
import ReportDetail from "../../Component/Master_Report";

const MasterReport = (props) => {
  const { reportDetail, handleClickBack = () => {} } = props;
  
  return (
    <Box>
      <Box sx={{ m: 3 }}>
        <Box>
          <ReportDetail
            reportDetail={reportDetail}
            handleClickBack={handleClickBack}
          />
        </Box>
      </Box>
    </Box>
  );
};
export default MasterReport;
