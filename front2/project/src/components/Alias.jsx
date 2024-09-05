import axios from 'axios'
import React, { useState,useEffect } from 'react'
import { useNavigate,useLocation } from 'react-router-dom'
import Cookies from "js-cookie"
import '../style/alias.css'
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'; 


const Alias = () => {

    const [inputPlantName, setInputPlantName] = useState('');
    const [inputAlias, setInputAlias] = useState('');
    const [responseMessage, setResponseMessage] = useState(null);
    const navigate = useNavigate();
    const location = useLocation(); 
    // console.log('Current path:', location.pathname);
 
    useEffect(() => {
        if (location.pathname === '/main/alias' && !responseMessage) {
            navigate('/main/myplant');
        }
    }, [location.pathname, responseMessage, navigate]);

    const handleInputChange = (e) => {
        setInputPlantName(e.target.value);
        console.log(e.target.value);
    };

    const handleAliasChange = (e) => {
        setInputAlias(e.target.value);
    };

    const sendPlant = async (e) => {
        e.preventDefault();
        

        try {
            
            const response = await axios.post('http://192.168.219.64:3001/main/myplant', { inputPlantName });
            console.log('Response Data:',response.data); 
            
            if (response.data.message === "success") {
                console.log('Success Message:', response.data.message);
                setResponseMessage(response.data);
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

    // console.log(inputPlantName)
    const submitAlias = async (e) => {
        e.preventDefault();

        if (responseMessage) {
            try {
                console.log('Response Message:',responseMessage);
                const result = responseMessage.results[0] || {};
                const plant_idx = result.plant_idx;
                const plant_name = result.plant_name;
                console.log(result);
                if (plant_idx !== undefined && plant_name !== undefined){
                    await axios.post('http://192.168.219.64:3001/main/alias',
                        {
                            // input_id
                            // : input_id,
                            plant_idx
                            : plant_idx,
                            inputAlias
                            : inputAlias
                        });
                    alert('Alias added successfully');
                    navigate('/main');
                }else {
                    throw new Error('Invalid response data');
                }
            } catch (error) {
                console.error('Error adding alias', error);
                alert('Error adding alias');
            }
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
                        value={inputAlias}
                        onChange={handleAliasChange}
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