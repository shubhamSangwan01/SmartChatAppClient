
import './App.css';
import ChatMain from './pages/ChatMain';
import Login from './pages/Login';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from './pages/Main';

function App() {
  return (
    
    <BrowserRouter>
   
      
  
    


    <Routes>
        <Route path="/chat" element={<ChatMain/>} />
        <Route path="/" element={ <Login/>} />
        <Route path="/intro" element={ <Main/>} />
       
      </Routes>
    </BrowserRouter>
    
  );
}

export default App;
