import React, { useEffect, useState } from 'react'
import instance from '../axios' ;
import '../style/login.css'
import { useNavigate } from 'react-router-dom'




    const Login = () =>{

       
        const navigate = useNavigate();

        const [ inputId, setInputId ] = useState('')
        const [ inputPw, setInputPw ] = useState('')

        useEffect(() => {
            // console.log(inputId);
          });

        const sendInput = async (e) => {
            e.preventDefault()
            
            try{
                const response = await instance.post('/user/login', {inputId:inputId, inputPw:inputPw}) 
                // console.log(response,inputId);
                if (response.data === "success") {
                    navigate('/main');
                }else {
                    alert('아이디 혹은 비밀번호를 다시 입력해주세요.')
                }

            } catch(error){
                console.error(error);
            };

        };

        const handleJoin = () => {
            navigate('/user/join');
        };

        // const handleFindPassword = () => {
        //     navigate('/find-password');
        // };


        return(
            <div id='login'>
                <form onSubmit={sendInput} id='login-box'>
                    <img src="../smartfarm.png" id='img' />
                    <h2>로그인</h2>
                    <label>아이디</label>
                    <input type="text" onChange={e => setInputId(e.target.value)} id='idbox'/>
                    <br />
                    <br />
                    <label>비밀번호</label>
                    <input type="password" onChange={e => setInputPw(e.target.value)} id='pwbox' />
                    <br />
                    <br />
                    <br />
                    <br />
                    <input type="submit" value="로그인" id='sub' />
                    <br />
                    <br />
                    <br />
                    <button id='join' onClick={handleJoin}>회원가입</button>
                    <button id='find' >비밀번호 찾기</button>
                </form>
            </div>
        )
    }



export default Login