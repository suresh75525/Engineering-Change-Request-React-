import React, { useState } from "react";
import {
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { styled } from "@mui/material/styles";
import EditIcon from "@mui/icons-material/Edit";
import "./index.css";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 15,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  height: 12,
  minHeight: 12,
  lineHeight: "12px",
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const EmployeeDetailPage = (props) => {
  const { filteredData, handleRowClick = () => {}, isLoading } = props;
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const columns = [
    { id: "emp_code", label: "Emp Code", minWidth: 100 },
    { id: "emp_name", label: "Emp Name", minWidth: 170 },
    {
      id: "email",
      label: "Email",
      minWidth: 170,
    },
    {
      id: "department",
      label: "Department",
      minWidth: 170,
    },
    {
      id: "bom",
      label: "BOM",
      minWidth: 100,
    },
    {
      id: "ecr",
      label: "ECR",
      minWidth: 100,
    },
    {
      id: "status",
      label: "Status",
      minWidth: 100,
    },
  ];
  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      {isLoading ? (
        <div className="loader-container">
          <div className="loader"></div>
        </div>
      ) : (
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <StyledTableCell
                    key={column.id}
                    align={column.align}
                    style={{
                      minWidth: column.minWidth,
                      fontWeight: "bold",
                      fontSize: "15px",
                    }}
                  >
                    {column.label}
                  </StyledTableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredData &&
                filteredData
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((emp) => {
                    return (
                      <StyledTableRow key={emp.Emp_Code}>
                        <StyledTableCell
                          style={{ display: "flex", alignItems: "center" }}
                        >
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                            }}
                            onClick={(e) => {
                              handleRowClick(e);
                            }}
                          >
                            {/* <EditIcon
                              color="error"
                              sx={{ cursor: "pointer" }}
                            /> */}
                            <p
                              style={{
                                fontWeight: "bold",
                                marginLeft: "15px",
                                cursor: "pointer"
                              }}
                            >
                              {emp.Emp_Code}
                            </p>
                          </div>
                        </StyledTableCell>
                        <StyledTableCell>{emp.Emp_Name}</StyledTableCell>
                        <StyledTableCell>{emp.Emp_Mail}</StyledTableCell>
                        <StyledTableCell>
                          <span style={{ fontWeight: "bold" }}>
                            {emp.Dept_code}
                          </span>
                        </StyledTableCell>
                        <StyledTableCell>
                          {emp.BOM_User_Type === 0 ? (
                            <span
                              style={{ color: "black", fontWeight: "bold" }}
                            >
                              {"Admin"}
                            </span>
                          ) : emp.BOM_User_Type === 1 ? (
                            <span
                              style={{ color: "black", fontWeight: "bold" }}
                            >
                              {"Super Admin"}
                            </span>
                          ) : (
                            <span
                              style={{ color: "black", fontWeight: "bold" }}
                            >
                              {"user"}
                            </span>
                          )}
                        </StyledTableCell>
                        <StyledTableCell>
                          {emp.ECR_User_Type === 0 ? (
                            <span
                              style={{ color: "green", fontWeight: "bold" }}
                            >
                              {"Super Admin"}
                            </span>
                          ) : emp.ECR_User_Type === 1 ? (
                            <span
                              style={{ color: "black", fontWeight: "bold" }}
                            >
                              {"Admin"}
                            </span>
                          ) : emp.ECR_User_Type === 2 ? (
                            <span
                              style={{ color: "black", fontWeight: "bold" }}
                            >
                              {"User"}
                            </span>
                          ) : (
                            <span
                              style={{ color: "black", fontWeight: "bold" }}
                            >
                              {"Cost Controller Admin"}
                            </span>
                          )}
                        </StyledTableCell>
                        <StyledTableCell>
                          {emp.is_active === 1 ? (
                            <span
                              style={{ color: "green", fontWeight: "bold" }}
                            >
                              {"Active"}
                            </span>
                          ) : (
                            <span style={{ color: "red", fontWeight: "bold" }}>
                              {"Block"}
                            </span>
                          )}
                        </StyledTableCell>
                      </StyledTableRow>
                    );
                  })}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <TablePagination
        component="div"
        rowsPerPageOptions={[10, 25, 100]}
        count={filteredData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default EmployeeDetailPage;
