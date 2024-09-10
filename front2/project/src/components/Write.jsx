import axios from 'axios';
import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import '../style/write.css'
import { Data } from '../App'

const Write = () => {

    const categories = [
        '자유게시판',
        '직접키운식물자랑',
        '레시피 공유'
    ];

    const { setUserId, userId } = useContext(Data);

    const [ newPost , setNewPost ] = useState({
        title:'',
        content:'',
        category: categories[0] // 기본카테고리로 설정
       
    });
  

    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name,value } = e.target;
        setNewPost(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleleFormSubmit = async (e) => {
        e.preventDefault();
        
        try {
            console.log('ss')
            await axios.post('http://192.168.219.64:3001/community/write', 
                { title: newPost.title, content: newPost.content, userId:userId, category:newPost.category});
            alert('게시글이 성공적으로 작성되었습니다.');
            navigate('/community');
        } catch (error) {
            console.error('게시글 작성 중 에러 발생 :',error);
            alert('게시글 작성 중 문제가 발생했습니다.');
        }
    };


  return (
    <div className="community-page">
        <div className="container">
            <h1 className="page-title">새 글 작성하기</h1>
            <form onSubmit={handleleFormSubmit}>
                <div className="post-header">
                    <label htmlFor="title" className="post-title">
                        제목
                    </label>
                    <input 
                        type='text'
                        name='title'
                        value={newPost.title}
                        onChange={handleInputChange}
                        placeholder='제목을 입력하세요'
                        required
                    />
                </div>

                <div>
                <label htmlFor="content" className="post-content">
                    내용
                </label>
                    <textarea 
                        name='content'
                        value={newPost.content}
                        onChange={handleInputChange}
                        placeholder='내용을 입력하세요'
                        required
                    />
                </div>

                <div>
                <label htmlFor="category" className="category-buttons">
                    카테고리
                </label>
                    <select
                        name='category'
                        value={newPost.category}
                        onChange={handleInputChange}
                    >
                        {categories.filter(cat => cat !=='전체').map(category=>(
                                <option key={category} value={category}>{category}</option>
                        ))}
                    </select>
                </div>

            {/* <div>
            <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">
              이미지 업로드
            </label>
            <div className="flex items-center space-x-2">
              <label className="cursor-pointer bg-white px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
                <Upload className="w-5 h-5 inline-block mr-2" />
                이미지 선택
                <input
                  type="file"
                  id="image"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
              {image && <span className="text-sm text-gray-500">{image.name}</span>}
            </div>
          </div> */}

                
                    <button 
                    className='write-post-button'
                    type="submit"
                    
                    >
                        게시글 추가
                    </button>
                
            </form> 
        </div>           
    </div>
  )
}

export default Write
