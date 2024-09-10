import React, { useState, useEffect, useContext, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { Data } from '../App';
import '../style/alias.css';

import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';



const Alias = () => {

    const { setUserId, userId } = useContext(Data);
    const [inputPlantName, setInputPlantName] = useState('');
    const inputAlias = useRef('');
    const [responseMessage, setResponseMessage] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {

        console.log(`Location pathname: ${location.pathname}`);
        console.log(`Response Message: ${responseMessage}`);

        if (location.pathname === '/main/alias' && !responseMessage) {
            console.log('Navigating to /main/myplant');
            navigate('/main/myplant');
        }
    }, [location.pathname, responseMessage, navigate]);


    const handleInputChange = (e) => {
        setInputPlantName(e.target.value);
    };



    const sendPlant = async (e) => {
        e.preventDefault();
        console.log(`Sending plant name: ${inputPlantName}`);

        try {
            const response = await axios.post('http://192.168.219.62:3001/main/myplant', { inputPlantName });
            console.log('Response Data:', response.data);

            if (response.data.message === "success") {
                console.log('Success Message:', response.data.message);
                setResponseMessage(response.data.data[0]);
                navigate('/main/alias');
            } else {
                alert('Plant not found or error')
                setResponseMessage(null);
            }
        } catch (error) {
            console.error('Error fetching plant data', error);
            alert('Error fetching plant data');
        }
    };


    const submitAlias = async (e) => {
        e.preventDefault();
        try {
            console.log(responseMessage)
            // const result = responseMessage.results[0] || {};
            const plant_idx = responseMessage.plant_idx;
            const plant_name = responseMessage.plant_name;
            console.log(plant_idx, plant_name)
            if (plant_idx !== undefined && plant_name !== undefined) {
                await axios.post('http://192.168.219.62:3001/main/alias',
                    {
                        user_id: userId,
                        plant_idx
                            : plant_idx,
                        inputAlias
                            : inputAlias.current.value
                    });
                alert('Alias added successfully');
                navigate('/');
            } else {
                throw new Error('Invalid response data');
            }
        } catch (error) {
            console.error('Error adding alias', error);
            alert('Error adding alias');
        }
    }


    return (
        <div className='alias-container'>
            <div className="input-wrapper">
                <h1>식물 검색</h1>
                {location.pathname === '/main/myplant' && (
                    <form onSubmit={sendPlant}>
                        <input
                            type='text'
                            value={inputPlantName}
                            onChange={handleInputChange}
                            placeholder='Enter plant name'
                            required
                        />
                        <Button type='submit' variant="outline-success">Search Plant</Button>
                    </form>
                )}
            </div>
            <div className="input-wrapper">
                {location.pathname === '/main/alias' && responseMessage && (
                    <form onSubmit={submitAlias}>
                        <h2>별칭 입력</h2>
                        <input
                            type='text'
                            ref={inputAlias}
                            placeholder='Enter alias'
                            required
                        />
                        <Button type='submit' variant="outline-success">Add Alias</Button>
                    </form>
                )}
            </div>
        </div>
    )
}

export default Alias