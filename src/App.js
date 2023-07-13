import React from 'react';
import io from 'socket.io-client'
import './App.css';
import ChatMain from './pages/ChatMain';
import Login from './pages/Login';
import { BrowserRouter, Route, Routes } from "react-router-dom";

const socket = io.connect("http://localhost:4000")

function App() {
  return (
    
    <BrowserRouter>
    <Routes>
        <Route path="/chat" element={<ChatMain socket={socket} />} />
        <Route path="/" element={ <Login/>} />
       
      </Routes>
    </BrowserRouter>
    
  );
}

export default App;
