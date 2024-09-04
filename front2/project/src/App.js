import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import Login from './components/Login';
import Main from './components/Main';
import Join from './components/Join';
import { Route, Routes } from 'react-router-dom';


// import axios from 'axios';

//

// function App() {




function App() {
  return (

    
    <Routes>
      {/* {!inputId || !inputPw ?(
             <Route path='/' element={<Login />} />
           ) : (
             <Route path='/' element={<Main />} />
           )} */}
      <Route path='/login' element={<Login />}></Route>
      <Route path='/main' element={<Main />}></Route>
      <Route path='/join' element={<Join />}></Route>

    </Routes>
    
  );
}


export default App;
