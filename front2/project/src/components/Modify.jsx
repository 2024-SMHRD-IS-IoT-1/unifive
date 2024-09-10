import React, {useRef, useState, useEffect} from 'react'
import instance from '../axios'

const Modify = () => {



  return (
    <div id='modify'>
        <h1>회원정보 수정</h1>
        <form  id='modify-box'>
            <h2>아이디</h2>
            <input type="text" />
            <h2>이름</h2>
            <input type="text" />
            
        </form>
    </div>
  )
}

export default Modify