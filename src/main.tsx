import React from "react";
import ReactDOM from "react-dom/client";


import { RouterProvider } from "react-router-dom";
import "./index.css";
import { router } from "./RoutingLayer/navigation/router";
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "./Contexts/AuthContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
      <ToastContainer />
    </AuthProvider>
  </React.StrictMode>
);


// import PlanMedia from "./AddCategoryForm";
// ReactDOM.createRoot(document.getElementById("root")!).render(
//      <React.StrictMode>
//       <PlanMedia></PlanMedia>

//   </React.StrictMode>
// );


// ReactDOM.createRoot(document.getElementById("root")!).render(
//      <React.StrictMode>
//       <ChatbotInterface />
      
//   </React.StrictMode>
// );