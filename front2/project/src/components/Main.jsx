import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import { Data } from '../App'


const Main = () => {
    const { userId } = useContext(Data);
    const [plantList, setPlantList] = useState([]);
    console.log(userId);
    useEffect(() => {
        const fetchPlants = async () => {
            try {
                const response = await axios.get('http://192.168.219.56:3001/main')
                setPlantList(response.data.plants);
            } catch (error) {
                console.error('Error fetching plant data', error);
            }
        };

        fetchPlants();
    }, [])


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