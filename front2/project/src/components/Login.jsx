import React, { useContext, useEffect, useState } from 'react'
// import instance from '../axios' ;
import axios from 'axios';
import '../style/login.css'
import { useNavigate } from 'react-router-dom';
import Cookies from "js-cookie" // 쿠키






    const Login = () =>{
        const [ inputId, setInputId ] = useState('')
        const [ inputPw, setInputPw ] = useState('')
        // const [ responseMessage, setResponseMessage ] = useState('')
        const navigate = useNavigate();

        useEffect(() => {
            console.log(inputId);
          });

        const sendInput = async (e) => {
            e.preventDefault()
            
            try{
                const response = await axios.post('http://192.168.219.56:3001/user/login', {inputId:inputId, inputPw:inputPw}) 
                console.log(response,inputId);
                const token = response.data.token; // 백에서 넘어온 토큰
                console.log("토큰",response.data.token)

                // jwt 토큰을 쿠키에 저장
                Cookies.set('token', token, {expires : 1}) // 1일 후 만료

                // 쿠키에 jwt 확인하기
                console.log('쿠키',token)

                if (response.data.message ==='success') {
                    navigate('/main')
                }    
                
            } catch(error){
                console.error('Error Data',error);
                
            }
        }

        
        const handleJoin = () => {
            navigate('/join')
        }
        
        // 로그인 상태 확인(쿠키)
        //import Cookies from "js-cookie"
        //import { useNavigate } from 'react-router-dom'
        //import React, {useEffect} from 'react'
        const StayLogin = () => {
            const navigate = useNavigate()
           
            useEffect(()=>{
                const userToken = Cookies.get('userToken')

                if(!userToken) {
                    navigate('/login');
                }
            }, [navigate])
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
                    <button id='join' onClick={handleJoin}>회원가입</button>
                    <button id='find'>비밀번호 찾기</button>
                </form>
            </div>
        )
    }



export default Login