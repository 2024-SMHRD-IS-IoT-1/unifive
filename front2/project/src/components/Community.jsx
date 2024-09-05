import React from 'react'
import { useEffect, useState } from 'react'
// import { Tab } from '@headlessui/react';
// import { User, Calendar, MessageSquare, Heart } from 'lucide-react';
import axios from 'axios';
// import { response } from 'express';





const initialPosts = [
    { id: 1, title: "오늘 날씨가 좋네요", content: "날씨가 정말 좋아요!", category: "자유게시글" },
    { id: 2, title: "제 토마토 좀 보세요", content: "토마토가 잘 자랐어요.", category: "직접키운식물자랑" },
    { id: 3, title: "간단한 샐러드 레시피", content: "맛있는 샐러드 만드는 법", category: "레시피공유" },
    { id: 4, title: "주말 계획이 있나요?", content: "저는 영화 볼 예정이에요.", category: "자유게시글" },
    { id: 5, title: "제 다육이를 소개합니다", content: "귀여운 다육이에요.", category: "직접키운식물자랑" },
    { id: 6, title: "쉬운 파스타 레시피", content: "누구나 할 수 있는 파스타 요리", category: "레시피공유" },
  ]

const Community = () => {

    const [posts,setPosts] = useState(initialPosts);
    const [selectedCategory, setSelectedCategory] = useState('전체')
    const [newPost,setNewPost] = useState({ title: '', content: '', category: '자유게시글'  });
    const [showForm, setShowForm] = useState(false);

    const categories = ['전체', '자유게시글', '직접키운식물자랑', '레시피공유']

    const filteredPosts = selectedCategory === '전체'
        ? posts
        : posts.filter(post => post.category === selectedCategory)

    const handleInputChange = (e) => {
        const { name,value } = e.target;
        setNewPost({...newPost, [name]:value });
    };

    const handleleFormSubmit = async (e) => {
        e.preventDefault();

        try{
            const response = await axios.get('https://192.168.219.64:3001/community', newPost)

            setPosts([...posts,{...newPost, id: posts.length + 1}]);
            setNewPost({title:'' , content:'', category:'자유게시글'});
        } catch (error) {
            console.error('게시글 추가 실패:', error);
        }
       
    };
   
    const handleButtonClick = () => {
        setShowForm(!showForm);  // 버튼 클릭 시 폼 표시/숨김 토글
    };

  return (
    <div className="container">
         <h1 className="title">Community!</h1>
            <div>
                {categories.map(category => (
                    <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className=''
                    >
                    {category}
                    </button>
                ))}
            </div>

            {/* 게시글 작성 버튼 */}
            <button onClick={handleButtonClick}>
                {showForm ? '취소' : '게시글 작성'}
            </button>

            {!showForm && (

            <ul>
                {filteredPosts.map((post) => (
                    <li key={post.id} className=''>
                        {post.imageUrl && (
                            <img 
                            src={post.imageUrl} 
                            alt={`${post.title}의 이미지`} 
                            className=''
                            />
                        )}
                        <h2 className=''>{post.title}</h2>
                        <p className=''>{post.category}</p>
                        <p className=''>{post.content}</p>
                    </li>
                ))}
            </ul>


            )}
    </div>   
  )
}


export default Community

