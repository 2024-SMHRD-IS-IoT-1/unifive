import React, { useEffect, useState } from 'react';
import instance from '../axios' ;



const Main = () => {

    const [ isSearch,setIsSearch] = useState(false);
    const [ inputPlantName,setInputPlantName ] = useState('');
    const [ responseMessage,setResponseMessage] = useState('');
    

    const handleInputChange = (e) => {
        setInputPlantName(e.target.value);
    };

    const toggleInput = () => {
        setIsSearch(!isSearch)
    }

    const sendPlant = async (e) => {
        e.preventDefault()
        

        try{
            const response = await instance.post('/main/main', { inputPlantName : inputPlantName })
            
            setResponseMessage(JSON.stringify(response.data,null,2));
            setInputPlantName('')
        }
        catch (error){
            console.error('Error Data', error);
            setResponseMessage('Error adding plant');
        }   
        console.log({responseMessage})     
    }


  return (
    <div>
        <button onClick={toggleInput}>
            {isSearch ? 'Close Input' : 'Open Input'}
        </button>
        {isSearch && (
            <div>
                <form onSubmit={sendPlant}>
                    <input value={inputPlantName} onChange={handleInputChange} placeholder='Enter plant name'></input>
                    <button type='submit'>검색</button>
                </form>
            </div>
        )}
        
    </div>
  );
};

export default Main;