import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import Home from "./pages/Home";
import SideDrawer from "./components/SideDrawer";
import Header from "./components/Header";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { getProfile, reset } from "./features/auth/AuthSlice";
import { toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import Protector from "./components/Protector";
import Protected from "./components/Protected";
import Logout from "./components/Logout";

const App = () => {
  const [drawerIsOpen, setDrawerIsOpen] = React.useState(false);
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  // check if I have a valid cookie and get the user profile
  React.useEffect(() => {
    if (document.cookie) {
      dispatch(getProfile()).then(() => dispatch(reset()));
    }
    console.log("cookie check");
  }, []);

  return (
    <>
      <Router>
        <SideDrawer
          drawerIsOpen={drawerIsOpen}
          setDrawerIsOpen={setDrawerIsOpen}
        />
        <Header drawerIsOpen={drawerIsOpen} setDrawerIsOpen={setDrawerIsOpen} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route element={<Protector />}>
            <Route path="/protected" element={<Protected />} />
            <Route path="/logout" element={<Logout />} />
          </Route>
        </Routes>
      </Router>
      <ToastContainer />
    </>
  );
};

export default App;
