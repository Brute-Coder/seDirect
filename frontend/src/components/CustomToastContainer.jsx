import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function CustomToastContainer() {
  return (
    <ToastContainer
      position="top-center"
      autoClose={2000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme={
        document.querySelector("html").classList[0] === "dark"
          ? "light"
          : "dark"
      }
      transition:Bounce
    />
  );
}

export default CustomToastContainer;
