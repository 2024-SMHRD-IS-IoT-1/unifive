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

//   const [ isSearch,setIsSearch] = useState(false);
//   const [ inputPlantName,setInputPlantName ] = useState('');
//   const [ responseMessage,setResponseMessage] = useState('');
//   const [ inputAlias,setInputAlias ] = useState('');
//   const [ showAliasInput, setShowAliasInput ] = useState(false);
//   const [ inputEmail,setInputEmail] = useState('')
//   const [ email1, setEmail1] = useState('')
//   const [ email2, setEmail2] = useState('')
//   const [ inputId,setInputId] = useState('')
//   const [ inputPw,setInputPw] = useState('')
//   const [ inputName,setInputName] = useState('')
//   const [ inputPn,setInputPn] = useState('')


function App () {
return (
//     <div className="App">
//       <Data.Provider
//       value={{
//         isSearch,
//         setIsSearch,
//         inputPlantName,
//         setInputPlantName,
//         responseMessage,
//         setResponseMessage,
//         inputAlias,
//         setInputAlias,
//         showAliasInput, 
//         setShowAliasInput,
//         inputEmail,
//         setInputEmail,
//         email1, 
//         setEmail1,
//         email2, 
//         setEmail2,
//         inputId,
//         setInputId,
//         inputPw,
//         setInputPw,
//         inputName,
//         setInputName,
//         inputPn,
//         setInputPn
//       }}>
      
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

//       </Data.Provider>
//     </div>
   );
 }


export default App;
