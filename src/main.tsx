import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import { router } from "./RoutingLayer/navigation/router";
import { ToastContainer } from "react-toastify";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
    <ToastContainer /> 
  </React.StrictMode>
);

// import Chatbot from "./ServiceLayer/externalServices/Chatbot";
// import MediaPlan from "./ServiceLayer/externalServices/MediaPlan";
// ReactDOM.createRoot(document.getElementById("root")!).render(
//      <React.StrictMode>
//       <Chatbot />
//       <MediaPlan />

//   </React.StrictMode>
// );

// import Test from "./ServiceLayer/cloudinary/test"
// import Upload from "./ServiceLayer/cloudinary/Upload";
// ReactDOM.createRoot(document.getElementById("root")!).render(
//      <React.StrictMode>
//       <Upload />

//   </React.StrictMode>
// );