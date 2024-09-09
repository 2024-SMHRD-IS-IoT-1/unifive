import logo from './logo.svg';
import './App.css';
import { useState, useContext, createContext } from 'react';
import Login from './components/Login';
import Main from './components/Main';
import Join from './components/Join';
import Alias from './components/Alias';
import MyPage from './components/MyPage';
import Community from './components/Community';
import Post from './components/Post'
import Write from './components/Write'
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie'


export const Data = createContext();

function App() {
  const [userId, setUserId] = useState('');

  

  //useEffect(() => {
  // setTrainerInfo(JSON.parse(sessionStorage.getItem('info')))
  //}, [])


  return (

    <Data.Provider value={{ userId, setUserId }}>

      <Routes>
        {/* {!inputId || !inputPw ?(
             <Route path='/' element={<Login />} />
             ) : (
             <Route path='/' element={<Main />} />
             )} */}

        {!userId ? (
          <Route path='/' element={<Login />}></Route>
        ) : (
          <Route path='/' element={<Main />}></Route>
        )}
        {/* <Route path='/login' element={<Login />}></Route> */}
        {/*<Route path='/main' element={<Main />}></Route>*/}
        <Route path='/join' element={<Join />}></Route>
        <Route path='/main/myplant' element={<Alias />}></Route>
        <Route path='/main/alias' element={<Alias />}></Route>
        <Route path='/community' element={<Community />}></Route>
        <Route path='/community/post' element={<Post />}></Route>




      </Routes>

    </Data.Provider>

  );
}


export default App;
