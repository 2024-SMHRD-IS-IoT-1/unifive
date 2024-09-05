import React, { useEffect, useState } from 'react';
import axios from 'axios' ;
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';



const Main = () => {

        const [ plantList,setPlantList ] = useState([]);

        useEffect(()=>{
            const fetchPlants = async () => {
                try {
                    const response = await axios.get('경로설정')
                    setPlantList(response.data.plants);
                } catch (error) {
                    console.error('Error fetching plant data' , error);
                }
            };

            fetchPlants();
        },[])
    

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
            </div>
        </div>
    );
    

};

export default Main;