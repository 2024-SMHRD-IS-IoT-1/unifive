import React, { useContext, useEffect } from 'react'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Data } from '../App'

const MyPage = () => {
    const {userId} = useContext(Data);
    const {logOut} = useContext(Data);

        

  return (
    <div>
        
    </div>
  )
}

export default MyPage