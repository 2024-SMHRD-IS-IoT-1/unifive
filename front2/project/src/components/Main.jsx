import React, { useState } from 'react';
import instance from '../axios' ;
import { Link } from 'react-router-dom'


const Main = () => {

    const [ isSearch,setIsSearch] = useState(false);
    const [ inputPlantName,setInputPlantName ] = useState('');
    const [ responseMessage,setResponseMessage] = useState('');
    const [ inputAlias,setInputAlias ] = useState('');
    const [ showAliasInput, setShowAliasInput ] = useState(false); // 별칭입력상태
     

    const handleInputChange = (e) => {
        setInputPlantName(e.target.value);
    };

    const toggleInput = () => {
        setIsSearch(!isSearch)
        if (isSearch){
            setInputPlantName('');
            setResponseMessage('');
            setShowAliasInput(false);
        }
    }

    const sendPlant = async (e) => {
        e.preventDefault();
        
        try{
            const response = await instance.post('/main/main', { inputPlantName : inputPlantName })
            
            setResponseMessage(response.data);
            setInputPlantName('');
            setShowAliasInput(true); // 입력창

        }catch (error){
            console.error('Error Data', error);
            alert('Error adding plant');
        }   
        // console.log({responseMessage})     
    };

    const handleAliasChange = (e) => {
        setInputAlias(e.target.value);
    };
    
    const submitAlias = async (e) => {
        e.preventDefault();
        try{
            await instance.post('/main/alias')
            setShowAliasInput(false);
            setInputAlias('');
        }catch(error){
            console.error('Error alias', error);
            alert('Error adding alias');
        }
    };

  return (
    <div>
        <button onClick={toggleInput}>
            {isSearch ? 'Close Input' : 'Open Input'}
        </button>
        {isSearch && (
            <div>
                <form onSubmit={sendPlant}>
                    <input 
                    value={inputPlantName} 
                    onChange={handleInputChange} 
                    placeholder='Enter plant name'>
                    </input>
                    <button type='submit'>검색</button>
                </form>
            </div>
        )} 
        {showAliasInput && responseMessage && (
            <div>
                <h3>{`Found plant: ${responseMessage.plantName}`}</h3>
                <form onSubmit={submitAlias}>
                    <input
                    value={inputAlias}
                    onChange={handleAliasChange}
                    placeholder='Enter alias'>
                    </input>
                    <button type='submit'>Add Alias</button>
                </form>
            </div>
        )} 
    </div>
  );
};

export default Main;