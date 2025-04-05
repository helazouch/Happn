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

// import Chatbot from "./ServiceLayer/externalServices/Chatbot";
// import MediaPlan from "./ServiceLayer/externalServices/MediaPlan";
// ReactDOM.createRoot(document.getElementById("root")!).render(
//      <React.StrictMode>
//       <Chatbot />
//       <MediaPlan />

//   </React.StrictMode>
// );


// ReactDOM.createRoot(document.getElementById("root")!).render(
//      <React.StrictMode>
//       <ChatbotInterface />
      
//   </React.StrictMode>
// );