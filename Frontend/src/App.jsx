import React from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const notify = () => toast("Hello");
  return (
    <>
      <button onClick={notify}>Click me</button>
      <ToastContainer />
      <main className="py-3">
        <Outlet />
      </main>
    </>
  );
};

export default App;
