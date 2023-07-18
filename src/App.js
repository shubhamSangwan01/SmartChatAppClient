import React from 'react';
import './App.css';
import ChatMain from './pages/ChatMain';
import Login from './pages/Login';
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Main from './pages/Main';
import { ToastContainer } from 'react-toastify';


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

        <Route path="/" element={ <Main/>} />
        <Route path="/chat" element={<ChatMain/>} />
        <Route path="/login" element={ <Login/>} />
        

      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
