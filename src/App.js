import React from 'react';
import './App.css';
import ChatMain from './pages/ChatMain';
import Login from './pages/Login';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';



function App() {
  return (
    <>
    <div>
    <ToastContainer
          position="top-center"
          style={{ width: "80%", fontSize: "1.1rem" }}
          autoClose={2500}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </div>
    <BrowserRouter>
    <Routes>
        <Route path="/chat" element={<ChatMain />} />
        <Route path="/" element={ <Login/>} />
       
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
