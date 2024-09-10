import React, { useContext, useEffect } from 'react'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Data } from '../App'
import '../style/mypage.css'

const MyPage = () => {
    const { userId,setUserId } = useContext(Data)
    console.log(userId)

    return (
      <div className="container">
        <div className="profile-section">
  <div className="avatar">
    <img src="../../userProfile.jpg" alt="@username" />
  </div>
  
  {/* 수정된 버튼 위치 */}
  <div className="button-group">
    <button className="edit-profile-btn">회원정보 수정</button>
  </div>

  <div className="profile-stats">
    <span><strong>{userId}</strong></span>
    <span><strong>0</strong> 식물 키우는 중</span>
    <span><strong>0</strong> 일 동안 자라는 중</span>  
  </div>
  
</div>

        {/* <div className="post-grid">
          {[...Array(9)].map((i) => (
            <div key={i} className="post-card">
              <img
                src={`/placeholder.svg?height=300&width=300&text=Post ${i + 1}`}
                alt={`Post ${i + 1}`}
              />
            </div>
          ))}
        </div> */}
        <div className="post-grid">
          <img src="../camera.png" alt="" />
        </div>
      </div>
    )
}

export default MyPage