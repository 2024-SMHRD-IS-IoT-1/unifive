import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'


const Alias = () => {

    const [inputPlantName, setInputPlantName] = useState('');
    const [inputAlias, setInputAlias] = useState('');
    const [responseMessage, setResponseMessage] = useState(null);
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        setInputPlantName(e.target.value);
        // console.log(e.target.value);
    };

    const handleAliasChange = (e) => {
        setInputAlias(e.target.value);
    };

    const sendPlant = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://192.168.219.62:3001/main/myplant', { inputPlantName });
            console.log(response)
            if (response.data.message === 'success') {
                console.log(response.data.message);
                setResponseMessage(response.data);

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
                await axios.post('http://localhost:3001/main/alias',
                    {
                        // user_id: responseMessage.user_id,
                        // plant_idx: responseMessage.plant_idx,
                        inputAlias
                    });
                alert('Alias added successfully');
                navigate('/');
            } catch (error) {
                console.error('Error adding alias', error);
                alert('Error adding alias');
            }
        }
    }

    return (
        <div>
            <h1>식물 검색</h1>
            <form onSubmit={sendPlant}>
                <input
                    type='text'
                    value={inputPlantName}
                    onChange={handleInputChange}
                    placeholder='Enter plant name'
                    required
                />
                <button type='submit'>Search Plant</button>
            </form>
            {responseMessage && (
                <form onSubmit={submitAlias}>
                    <h2>{`Found plant: ${responseMessage.plantName}`}</h2>
                    <input
                        type='text'
                        value={inputAlias}
                        onChange={handleAliasChange}
                        placeholder='Enter alias'
                        required
                    />
                    <button type='submit'>Add Alias</button>
                </form>
            )}
        </div>
    )
}

export default Alias