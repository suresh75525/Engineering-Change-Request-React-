import React from "react";
import { Box } from "@mui/material";

const MasterStatusModal = (props) => {
  const { onLogOut } = props;

  return (
    <Box>
      <Modal
        open={open}
        hideBackdrop
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <Box>
            <img width={700} src={base64Image} alt="No preview available" />
          </Box>
          <Box
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: 5,
            }}
          >
            <Button variant="contained" onClick={handleCloseModal}>
              Close
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};
export default MasterStatusModal;
