import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios' ;
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import {Data} from '../App' 
import Cookies from 'js-cookie'


const Main = () => {
    const {userId, setUserId} = useContext(Data);
        const [ plantList,setPlantList ] = useState([]);
        console.log(userId);
        useEffect(()=>{
            const fetchPlants = async () => {
                try {
                    const response = await axios.get('http://192.168.219.56:3001/main')
                    setPlantList(response.data.plants);
                } catch (error) {
                    console.error('Error fetching plant data' , error);
                }
            };

            fetchPlants();
        },[])

        
            const Navigate = useNavigate()
        
            const handleLogout = () => {
              
              // 쿠키에서 삭제
              Cookies.remove('token')

              setUserId("")
        
              // 로그인 페이지로 이동.
              Navigate('/')
            }
        
    

    return (
        <div>
            <h1>Main Page</h1>
            <Link to='/main/myplant'>
                <button>+ Add Plant</button>
            </Link>

            <div>
                {plantList.length > 0 ? (
                    plantList.map((plant) => (
                        <div>
                            <h3>{plant.name}</h3>
                            <p>별칭: {plant.alias}</p>
                            <p>정보: {plant.species}</p>
                        </div>
                    ))
                ) : (
                    <p>No plant found.</p>
                    
                )}
                <button onClick={handleLogout}>로그아웃</button>
            </div>
        </div>
    );
    

};

export default Main;