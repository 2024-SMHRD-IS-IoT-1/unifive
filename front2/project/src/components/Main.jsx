import React, { useState } from 'react';
import axios from 'axios' ;
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';


const Main = () => {
    
    const [ inputId,setInputId ] = useState('')
    const [ isSearch,setIsSearch] = useState(false);
    const [ inputPlantName,setInputPlantName ] = useState('');
    const [ responseMessage,setResponseMessage] = useState(null);
    const [ inputAlias,setInputAlias ] = useState('');
    const [ showAliasModal, setShowAliasModal ] = useState(false); 
     
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        setInputPlantName(e.target.value);
    }; // 입력 필드에 값 입력시 호출되는 이벤트핸들러

    const toggleInput = () => {
        setIsSearch(!isSearch)
        if (isSearch){
            setInputPlantName('');
            setResponseMessage(null);
            setShowAliasModal(false);
        }
    } // 검색입력 필드를 토글하는 함수 (입력필드의 표시 여부 변경)

    const sendPlant = async (e) => {
        e.preventDefault(); // 페이지 새로 고침 방지
        console.log('Server reponse :' ,responseMessage);
        // console.log('Response message:', response.data);
        
        try{
            const response = await axios.post('http://192.168.219.64:3001/main/main', { inputPlantName : inputPlantName })
            // 서버에 요청 전송 

            // 응답 처리
            if (response.data.message === 'success') {
                setResponseMessage(response.data);
                setInputPlantName('');
                setShowAliasModal(true); // 모달열기
                // navigate('/main/alias')
            } else {
                alert('Plant not found or error occurred');
                setResponseMessage(null);
                setShowAliasModal(false);
            }
        // 오류처리
        }catch (error){
            console.error('Error Data', error);
            alert('Error adding plant');
        }   
        console.log({responseMessage})     
    };

    const handleAliasChange = (e) => {
        setInputAlias(e.target.value);
    };
    
    const submitAlias = async (e) => {
        e.preventDefault();
        try{
            await axios.post('http://192.168.219.64:3001/main/alias', {
                user_id : inputId,
                plant_idx : responseMessage.plant_idx,  // 이 값을 사용해 별칭 등록
                inputAlias   
            });
            setShowAliasModal(false);
            setInputAlias('');
            navigate('/main/alias');
        }catch(error){
            console.error('Error alias', error);
            alert('Error adding alias');
        }
    };

    console.log(inputPlantName)

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
        <Modal
            isOpen={showAliasModal}
            onRequestClose={() => setShowAliasModal(false)}
            contentLabel="Add Alias">
            
            <h3>{`Found plant: ${responseMessage.plantName}`}</h3>
            <form onSubmit={submitAlias}>
                <input
                    value={inputAlias}
                    onChange={handleAliasChange}
                    placeholder='Enter alias'>
                </input>
                <button type='submit'>Add Alias</button>
            </form>
            <button onClick={() => setShowAliasModal(false)}>Close</button>
        </Modal>
    </div>
  );
};

export default Main;