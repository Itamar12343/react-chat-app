import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
/*import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import HomePage from "./webpages/homePage.jsx";
import LoginPage from './webpages/loginPage';*/



/*const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage/>,
  },
  {
    path: "login",
    element: <LoginPage/>,
  },
  {
    path: "/:type",
  }
]);*/

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
