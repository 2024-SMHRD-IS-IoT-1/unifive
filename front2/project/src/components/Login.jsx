import React, { useContext, useEffect, useState } from 'react'
import instance from '../axios' ;
import '../style/login.css'


    const Login = () =>{

        const { setInputId,setInputPw } = useContext(Data);

        // const [ inputId, setInputId ] = useState('')
        // const [ inputPw, setInputPw ] = useState('')

        useEffect(() => {
            console.log(inputId);
          });

        const sendInput = async (e) => {
            e.preventDefault()
            
            try{
                const response = await instance.post('/user/login', {inputId:inputId, inputPw:inputPw}) 
                // console.log(response,inputId);
            } catch(error){
                console.error(error);
            }
        }

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
                    <button id='join'>회원가입</button>
                    <button id='find'>비밀번호 찾기</button>
                </form>
            </div>
        )
    }



export default Login