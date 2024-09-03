import React, { useRef, useState } from 'react'
import '../style/join.css'
import instance from '../axios';
import axios from 'axios';



const Join = () => {
    const selectref = useRef();

    const [inputEmail,setInputEmail] = useState('')
    const [email1, setEmail1] = useState('')
    const [email2, setEmail2] = useState('')
    const [inputId,setInputId] = useState('')
    const [inputPw,setInputPw] = useState('')
    const [inputName,setInputName] = useState('')
    const [inputPn,setInputPn] = useState('')
    const [message, setMessage] = useState('')

    const change = (e) => {
        if (e.target.value == '직접입력') selectref.current.disabled = false
        else selectref.current.value = e.target.value
        setEmail2(email1 + '@' + selectref.current.value)
    }

    const sendInput = async (e) => {
        e.preventDefault()

        try{
            const userData = {
                inputId,
                inputEmail,
                inputPw,
                inputName,
                inputPn
            }
            
            // axios post 요청
            const response = await axios.post('/user/join', userData)

            setMessage("회원가입이 성공했습니다.")
        } catch (error) {
            setMessage("회원가입 실패입니다.")
            console.error("error",error)
        }
    };
    

    return (
        <div className='body'>
            <h1>회원가입</h1>
            <form  onSubmit={sendInput} className='input'>
                ID : <input type="text" name='id' placeholder='아이디' class="a" onChange={(e)=> setInputId(e.target.value)} required/> <br />
                PW : <input type="password" name='pw' class="a" onChange={(e)=> setInputPw(e.target.value)} required/> <br />
                이름 : <input type="text" name='nick' class="a" onChange={(e)=> setInputName(e.target.value)} required/> <br />
                <br />

                <div class='box'>
                    <span>E-mail</span> 
                    <input type="text" name='e-mail' class='email' onChange={(e)=> setInputEmail(e.target.value)}/> @
                    <input class="box" id="domain-txt" type="text" ref={selectref} disabled 
                    onChange={(e)=>{
                        setEmail1(e.target.value)
                    }} />
                    <select class="box" id="domain-list" onChange={change}>
                        <option value="직접입력">직접입력</option>
                        <option value="naver.com">naver.com</option>
                        <option value="google.com">gmail.com</option>
                        <option value="hanmail.net">hanmail.net</option>
                        <option value="nate.com">nate.com</option>
                        <option value="kakao.com">kakao.com</option>
                    </select>
                </div>
                전화번호<select name="phone" id="phone">
                    <option value="010">010</option>
                    <option value="011">011</option>
                    <option value="017">017</option>
                </select>
                <input type="text" name='pn' class="a" maxLength="13" placeholder='핸드폰번호 ex)1111-2222' onChange={(e)=>setInputPn(e.target.value)} /> <br />
                <input type="submit" value='회원가입' class="a" />

            </form>
            {message && <p>{message}</p>}
        </div>
    )
}

export default Join