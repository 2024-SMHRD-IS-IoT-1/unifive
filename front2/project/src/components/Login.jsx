import React, { useEffect, useState } from 'react'
// import instance from '../axios' ;
import axios from 'axios';
import '../style/login.css'
import { useNavigate } from 'react-router-dom';


const Login = () => {
    const [inputId, setInputId] = useState('')
    const [inputPw, setInputPw] = useState('')
    // const [ responseMessage, setResponseMessage ] = useState('')
    const navigate = useNavigate();

    useEffect(() => {
        console.log(inputId);
    });

    const sendInput = async (e) => {
        e.preventDefault()

        try {
            const response = await axios.post('http://localhost:3001/user/login', { inputId: inputId, inputPw: inputPw })
            console.log(response, inputId);
            if (response.data.message === 'success') {
                navigate('/main')
            }

        } catch (error) {
            console.error('Error Data', error);

        }
    }

    const handleJoin = () => {
        navigate('/join')
    }

    return (
        <div id='login'>
            <form onSubmit={sendInput} id='login-box'>
                <img src="../smartfarm.png" id='img' />
                <h2>로그인</h2>
                <label>아이디</label>
                <input type="text" onChange={e => setInputId(e.target.value)} id='idbox' />
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