import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import Login from './components/Login';
import Main from './components/Main';
import Join from './components/Join';
import Alias from './components/Alias';
import Community from './components/Community';
import { Route, Routes } from 'react-router-dom';
// import axios from 'axios';


function App () {
return (

      
         <Routes>
           
           <Route path='/login' element={<Login />}></Route>
           <Route path='/main' element={<Main />}></Route>
           <Route path='/join' element={<Join />}></Route>
           <Route path='/main/myplant' element={<Alias />}></Route>
           <Route path='/main/alias' element={<Alias />} />
           <Route path='/community' element={<Community />}></Route>


         </Routes>


   );
 }


export default App;
