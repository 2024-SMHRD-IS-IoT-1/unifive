import React, { useContext, useEffect } from 'react'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Data } from '../App'

const MyPage = () => {
    const {userId} = useContext(Data);
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



  return (
    <div>
        
    </div>
  )
}

export default MyPage