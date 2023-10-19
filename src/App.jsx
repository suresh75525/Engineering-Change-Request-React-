import React, { useState, lazy, Suspense } from "react";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import cookie from "js-cookie";
// import { AES } from "crypto-js";
import NavBar from "./Page/AppNav/Nav";
import { LinearProgress } from "@mui/material";
import Cookies from "universal-cookie";
import ECR from "./Page/ECR";
import Dashboard from "./Page/DashBoard";
import Task from "./Page/Task";
import Master from "./Page/Master_tracker";
import Profile from "./Page/Employee_Master";
import ChangePassword from "./Page/Change_Password";
import BOMNewRequest from "./Page/BOM/New_Request";
import SummaryTracker from "./Page/BOM/Summary_Tracker";
import ResetPassword from "./Page/Reset_Password";
import * as CryptoJS from "crypto-js";
import CustomerMaster from "./Page/Customer_Master";

const Login = lazy(() => import("./Page/Login"));

const App = () => {
  const cookies = new Cookies();
  // const token = cookies.get("token");
  const [isLoggedIn, setIsLoggedIn] = useState(
    cookies.get("logged_user") !== undefined
  );

  let bomusertype = "";
  try {
    const EncbomUsertype = cookies.get("BomUserType");
    if (EncbomUsertype) {
      bomusertype = CryptoJS.AES.decrypt(EncbomUsertype, "magna").toString(
        CryptoJS.enc.Utf8
      );
    } else {
      console.error("EncUsertype is undefined or empty.");
    }
  } catch (err) {
    console.error("Error during decryption:", err);
  }

  const logIn = () => setIsLoggedIn(true);

  const logOut = () => {
    cookies.remove("token");
    setIsLoggedIn(false);
  };

  return (
    <Suspense fallback={<LinearProgress />}>
      <Router>
        {isLoggedIn && <NavBar onLogOut={logOut} />}
        <Routes>
          <Route
            path="/"
            exact
            element={
              !isLoggedIn ? (
                <Login onLogIn={logIn} />
              ) : (
                <Dashboard to="/DASHBOARD" />
              )
            }
          />
          <Route
            path="/Create ECR"
            exact
            element={isLoggedIn ? <ECR /> : <Navigate to="/" />}
          />
          <Route
            path="/DASHBOARD"
            exact
            element={isLoggedIn ? <Dashboard /> : <Navigate to="/" />}
          />
          <Route
            path="/My Task"
            exact
            element={isLoggedIn ? <Task /> : <Navigate to="/" />}
          />
          <Route
            path="/ECR Tracker"
            exact
            element={isLoggedIn ? <Master /> : <Navigate to="/" />}
          />

          <Route
            path="/Employee Master"
            exact
            element={
              isLoggedIn && bomusertype && bomusertype === "0" ? (
                <Profile />
              ) : (
                <Navigate to="/" />
              )
            }
          />
          {/* && usertype === "1" */}

          <Route
            path="/Change Password"
            exact
            element={isLoggedIn ? <ChangePassword /> : <Navigate to="/" />}
          />

          <Route
            path="/Customer Master"
            exact
            element={isLoggedIn ? <CustomerMaster /> : <Navigate to="/" />}
          />

          <Route
            path="/New Request"
            exact
            element={isLoggedIn ? <BOMNewRequest /> : <Navigate to="/" />}
          />

          <Route
            path="/Summary"
            exact
            element={isLoggedIn ? <SummaryTracker /> : <Navigate to="/" />}
          />
          <Route
            path="/reset-password/:id/:token"
            exact
            element={<ResetPassword />}
          />
        </Routes>
      </Router>
    </Suspense>
  );
};

export default App;
