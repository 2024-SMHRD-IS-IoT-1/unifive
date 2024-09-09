import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios';
import '../style/login.css'
import { useNavigate } from 'react-router-dom';
import Cookies from "js-cookie" // 쿠키
import { jwtDecode } from 'jwt-decode'
import { Data } from '../App';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';





const Login = () => {
    const { setUserId } = useContext(Data);
    const [inputId, setInputId] = useState('')
    const [inputPw, setInputPw] = useState('')
    // const [userId, setuserId] = useState('')
    // const [ responseMessage, setResponseMessage ] = useState('')
    const navigate = useNavigate();

    useEffect(() => {
        console.log(inputId);
    }, [inputId]);


    const sendInput = async (e) => {
        e.preventDefault()

        try {
            const response = await axios.post('http://192.168.219.64:3001/user/login', { inputId: inputId, inputPw: inputPw })
            console.log(response, inputId);

            // 서버에서 받은 JWT
            const token = response.data.token;
            console.log("토큰", token)

            // JWT 토큰을 쿠키에 저장
            Cookies.set('token', token, { expires: 1 }) // 1일 후 만료

            // 쿠키에 jwt 확인하기
            console.log('쿠키에 저장된 토큰', Cookies.get('token'))

            if (response.data.message === 'success') {
                navigate('/')
            }

            // JWT 토큰 디코딩 -> 사용자 id 추출
            if (token) {
                try {
                    const decoded = jwtDecode(token)
                    setUserId(decoded.id) //디코딩된 Id를 유저 아이디에 저장
                    console.log('디코딩 성공?', decoded.id)
                } catch (error) {
                    console.log('디코딩 실패', error)
                }
            }

        } catch (error) {
            console.error('Error Data', error);

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

        useEffect(() => {
            const userToken = Cookies.get('userToken')

            if (!userToken) {
                navigate('/login');
            }
        }, [navigate])
    }







    return (
        <div id='login'>

            <form onSubmit={sendInput} id='login-box'>
                <br />
                <br />

                <img src="../smartfarm.png" id='img' />
                <h5>로그인</h5>
                <br />
                <br />

                <label htmlFor='idbox'>아이디</label>
                <input type="text" onChange={e => setInputId(e.target.value)} id='idbox' />

                <label htmlFor='pwbox'>비밀번호</label>
                <input type="password" onChange={e => setInputPw(e.target.value)} id='pwbox' />
                <br />
                <br />


                <input type="submit" value="로그인" id='sub' />
                <br />
                <br />

                <Button id='join' onClick={handleJoin} variant="outline-danger">회원가입</Button>
                <br />
                <br />

                <Button id='find' variant="outline-secondary">비밀번호 찾기</Button>
                <br />
                <br />
                <br />

            </form>
        </div>
    )
}



export default Login