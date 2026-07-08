import { Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Login from "./Pages/Login";

import Home from "./Pages/Homepage";
import ForgotPassword from "./Pages/ForgetPassword";
import List from "./Pages/List";
import Verify from "./Pages/Verify";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/mainPage" element={<List />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Login />} />
        <Route path="/verify" element={<Verify />} />
        <Route path="/password-sent" element={<ForgotPassword />} />
      </Routes>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        theme="dark"
        style={{
          top: "90px",
          right: "20px",
        }}
        toastStyle={{
          fontSize: window.innerWidth < 640 ? "13px" : "15px",
          minHeight: window.innerWidth < 640 ? "48px" : "64px",
          padding: window.innerWidth < 640 ? "10px" : "16px",
          width: window.innerWidth < 640 ? "280px" : "350px",
        }}
      />
    </>
  );
}

export default App;
