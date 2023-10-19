import React, { useState, useEffect, useReducer, useRef } from "react";
import {
  Box,
  Card,
  CardHeader,
  Typography,
  CardContent,
  Button,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import api from "../config";
import { app_style } from "../Customer_Master/style";
import { INITIAL_STATE, postReducer } from "../../reducers/postReducer";
import { ACTION_TYPES } from "../../reducers/postActionType";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CustomerMaster = () => {
  const [togglebtn, Settogglebtn] = useState(0);
  const [state, dispatch] = useReducer(postReducer, INITIAL_STATE);
  const [custcode, SetCustomerCode] = useState(null);
  const customer = useRef(null);

  useEffect(() => {
    getCustomerMst();
  }, [togglebtn]);

  const CustomerList = state.post && state.post;

  const getCustomerMst = async () => {
    dispatch({ type: ACTION_TYPES.FETCH_START });
    await api
      .post("api/getCustomerList")
      .then((response) => {
        const recordset = response.data;
        if (recordset.success !== false) {
          if (recordset.data.length !== 0) {
            dispatch({
              type: ACTION_TYPES.FETCH_SUCCESS,
              payload: recordset.data,
            });
          } else {
            dispatch({ type: ACTION_TYPES.FETCH_EMPTY });
          }
        } else {
          dispatch({ type: ACTION_TYPES.FETCH_EMPTY });
        }
      })
      .catch((error) => {
        dispatch({ type: ACTION_TYPES.FETCH_ERROR, payload: error });
      });
  };

  const handleSubmit = async (id) => {
    // id === 1 ? "add" : "remove"
    const customerValue =
      customer.current !== null ? customer.current.value.trim() : "";
    if (id === 1 ? customerValue !== "" : custcode !== null) {
      const formdata = new FormData();
      formdata.append("customer", id === 1 ? customerValue : custcode);
      formdata.append("id", id);
      await api
        .post("api/addandremoveCustomer", formdata, {
          "Content-Type": "text/plain",
        })
        .then((res) => {
          console.log("---res", res);
          if (res.data.success === true) {
            id === 1 ? (customer.current.value = null) : SetCustomerCode(null);
            toast.success("New Customer Created Successfully!!!", {
              position: toast.POSITION.BOTTOM_RIGHT,
            });
          } else {
            toast.error("Something Went Wrong, Try again later", {
              position: toast.POSITION.BOTTOM_RIGHT,
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      toast.error("Field is empty", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    }
  };

  return (
    <Box>
      <Box sx={{ m: 3 }}>
        <Card raised={true} sx={app_style.cardSxT}>
          <CardHeader
            sx={{ backgroundColor: "#5A5A5A", color: "white" }}
            title={
              <Typography sx={app_style.cardHeading}>
                Customer Master
              </Typography>
            }
          ></CardHeader>
          <CardContent>
            <Box>
              <Grid container sx={{ mt: 2 }}>
                <Grid item>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      Settogglebtn(0);
                    }}
                  >
                    Add
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    variant="contained"
                    color="error"
                    sx={{ ml: 2 }}
                    onClick={() => {
                      Settogglebtn(1);
                    }}
                  >
                    Remove
                  </Button>
                </Grid>
              </Grid>
              {togglebtn === 0 ? (
                <Grid
                  container
                  sx={{
                    alignItems: "center",
                    justifyContent: "center",
                    mt: 4,
                    mb: 4,
                  }}
                >
                  <Grid item>
                    <Typography sx={{ mt: 0, fontWeight: "bold" }}>
                      New Customer
                    </Typography>
                  </Grid>
                  <Grid item>
                    <TextField
                      size="small"
                      variant="outlined"
                      placeholder="Customer"
                      sx={{ width: 230, mt: 0, ml: 2 }}
                      inputRef={customer}
                    />
                  </Grid>
                  <Grid item sx={{ ml: 2, mt: 0 }}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => {
                        handleSubmit(1);
                      }}
                    >
                      Submit
                    </Button>
                  </Grid>
                </Grid>
              ) : (
                <Grid
                  container
                  sx={{
                    alignItems: "center",
                    justifyContent: "center",
                    mt: 4,
                    mb: 4,
                  }}
                >
                  <Grid item>
                    <Typography sx={{ fontWeight: "bold" }}>
                      Remove Customer
                    </Typography>
                  </Grid>
                  <Grid item sx={{ ml: 3 }}>
                    <FormControl sx={{ minWidth: 160 }} size="small">
                      <InputLabel>Customer...</InputLabel>
                      <Select
                        required
                        sx={{ width: 230 }}
                        disabled={false}
                        label="customer"
                        value={custcode}
                        onChange={(e) => {
                          SetCustomerCode(e.target.value);
                        }}
                      >
                        {CustomerList &&
                          CustomerList.map((status, index) => (
                            <MenuItem key={index} value={status.Cust_Code}>
                              {status.Cust_Name}
                            </MenuItem>
                          ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item sx={{ ml: 2 }}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => {
                        handleSubmit(0);
                      }}
                    >
                      Submit
                    </Button>
                  </Grid>
                </Grid>
              )}
            </Box>
          </CardContent>
        </Card>
      </Box>
      <ToastContainer />
    </Box>
  );
};

export default CustomerMaster;
