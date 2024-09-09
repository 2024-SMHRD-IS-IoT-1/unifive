import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import { Data } from '../App'
import Cookies from 'js-cookie'
import '../style/main.css'
import { Leaf,Users,User,LogOut,Plus } from 'lucide-react';


const Main = () => {
    const {userId, setUserId} = useContext(Data);
    const [ plantList,setPlantList ] = useState([]);
    console.log(userId);
        
    useEffect(()=>{
            const fetchPlants = async () => {
                try {
                    const response = await axios.post('http://192.168.219.64:3001/main', {user_id: userId})
                    
                    setPlantList(response.data.plants);
                } catch (error) {
                    console.error('Error fetching plant data' , error);
                }
            };

            fetchPlants();
        },[])

        
            const navigate = useNavigate()
        
            const handleLogout = () => {
              
              // 쿠키에서 삭제
              Cookies.remove('token')

              setUserId("")
        
              // 로그인 페이지로 이동.
              navigate('/')
            }

            
            const handleCommunity = ()  => {
                navigate('/community')
            }
        
            const handleMypage = () => {
                navigate('/mypage')
            }
        

    return (
        <div className="main-container">
            <div className="content-wrapper">

                <header>
                    <h1 className="main-title">Main Page</h1>

                    <div className="button-group">
                        <button className="circle-button" onClick={handleCommunity }>Community</button>
                        <button className="circle-button" onClick={handleMypage }>My Page</button>
                    </div>
                </header>
                

                <main>
                    <div className='section-header'>
                        <h2 className="section-title">My Plants</h2>
                            <Link to='/main/myplant'>
                                <button className="add-plant-button">+ Add Plant</button>
                            </Link>
                    </div>

                    <div className="plant-card">
                        <div className='plant-header'>
                        {/* <svg className="plant-icon"></svg> */}
                            {plantList && plantList.length > 0 ? (
                                plantList.map((plant) => (
                                <div key={plant.id} className="plant-item">
                                    <h3>{plant.name}</h3>
                                    <p>별칭: {plant.alias}</p>
                                    <p>정보: {plant.species}</p>/
                                </div>
                                ))
                            ) : (
                                <div className="empty-state">
                                    <p>No plant found.</p>
                                </div>
                            )}
                        </div>

                    </div>

                        
                    <button className="logout-button" onClick={handleLogout}>로그아웃</button>
            
                </main>
                            
            </div>
        </div>                   
    ); 
};

export default Main;