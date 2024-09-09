import React from 'react';
import { useEffect, useState } from 'react';
import axios, { formToJSON } from 'axios';
import '../style/community.css';
import { useNavigate } from 'react-router-dom';


const Community = () => {
    const [activeCategory, setActiveCategory] = useState('전체');
    const [posts, setPosts] = useState([]); // 게시글 목록을 저장할 상태
    const [loading, setLoading] = useState(true); // 로딩 상태를 저장할 상태
    const navigate = useNavigate();

    const categories = [
        { name: '전체' },
        { name: '자유게시판' },
        { name: '직접키운식물자랑' },
        { name: '레시피 공유' }
    ];

    // 서버에서 데이터 받아오기
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get('http://192.168.219.64:3001/community/community');
                setPosts(response.data.data); // 받아온 데이터 저장
            } catch (error) {
                console.error('게시글을 불러오는 중 에러가 발생했습니다:', error);
            } finally {
                setLoading(false); // 데이터 받아오면 로딩 해제
            }
        };

        fetchPosts(); // useEffect 실행 시 서버에서 데이터 불러오기
    }, []);

    const filteredPosts = activeCategory === '전체'
        ? posts
        : posts.filter(post => post.post_category === activeCategory);


        const handlePostClick = (postIdx) => {
            navigate(`/community/post/${postIdx}`);
        };
        
        
    return (
        <div className='container'>
            <div>
                <h1>Community!</h1>

                {/* 카테고리 버튼 */}
                <div className='category-buttons'>
                    {categories.map((category) => (
                        <button
                            key={category.name}
                            onClick={() => setActiveCategory(category.name)}
                        >
                            <span>{category.name}</span>
                        </button>
                    ))}
                </div>

                {/* 로딩 중일 때 표시할 내용 */}
                {loading ? (
                    <p className='loading-message'>게시글을 불러오는 중입니다...</p>
                ) : (
                    <div className='post-card'>
                        {filteredPosts.length > 0 ? (
                            filteredPosts.map((post) => (
                                <div key={post.post_idx} className='post-item' onClick={() => handlePostClick(post.post_idx)}>
                                    <div>
                                        <div>
                                            <h2>{post.post_title}</h2>
                                            <span>{post.post_category}</span>
                                            <p>{post.post_content}</p>
                                        </div>
                                        <p>
                                            작성자: {post.user_id} | 작성일: {post.created_at}
                                        </p>
                                        <div>
                                            {/* <span>좋아요</span> */}
                                            {/* <span>댓글</span>   */}
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p>해당 카테고리에 게시글이 없습니다.</p>
                        )}
                    </div>
                )}

                {/* 글쓰기 버튼 */}
                <button 
                    className='write-post-button'
                    onClick={() => navigate('/community/write')}
                >
                    게시글 쓰기
                </button>
            </div>
        </div>
    );
}

export default Community;
