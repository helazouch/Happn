import React from 'react';
import ReactDOM from 'react-dom/client';
import Statistics from './PresentationLayer/admin/Statistics';
import './index.css';
import ClientFile from './PresentationLayer/admin/ClientFile';
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Statistics/>
    <ClientFile></ClientFile>
  </React.StrictMode>
);
