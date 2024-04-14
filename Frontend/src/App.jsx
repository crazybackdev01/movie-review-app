import React from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navigation from "./pages/Auth/Navigation";

const App = () => {
  // const notify = () => toast("Hello");
  return (
    <>
      <ToastContainer />
      <Navigation />
      {/* <button onClick={notify}>Click me</button> */}
      <main className="py-3">
        <Outlet />
      </main>
    </>
  );
};

export default App;
