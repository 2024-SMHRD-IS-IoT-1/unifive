import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios';

<<<<<<< HEAD

=======
>>>>>>> 31ae1609374d58438f6c7d96fa797b503873c90f
const Post = () => {

    const [ posts,setPosts ] = useState([]);
    const [ newComment,setNewComment] = useState('');
    const [ selectedPostId,setSelectedPostId] = useState(null);
    const [ selectedCategory,setSelectedCategory ] = useState('전체') 

    const categories = ['전체','자유게시글','직접키운식물자랑','레시피공유']

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get('http://192.168.219.56:3001/community/post');
                setPosts(response.data);
            } catch (error) {
                console.error('게시글 가져오기 실패:' , error);
            }
        };
        fetchPosts();
    },[]);

    const handleCommentChange = (e) => {
        setNewComment(e.target.value)
    };

    const handleCommentSubmit = (postID) => {
        setPosts(posts.map(post => 
            post.id === postID
            ? { ...post, Comments: [...(post.Comments || []), newComment] }
            : post
        ));
        setNewComment('');
        setSelectedPostId(null);
    }

  return (
    <div>
        <h1>Community!</h1>
        <div>
            {categories.map(category => (
                <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                >
                    {category}
                </button>
            ))}
        </div>
        
        <ul>
            {posts
                .filter(post => selectedCategory === '전체' || post.category === selectedCategory)   
                .map(post => (
                    <li key={post.id}>
                        <h2>{post.title}</h2>
                        <p>{post.content}</p>

                        {/* 댓글 입력 폼 */}
                        {selectedPostId === post.id && (
                            <div>
                                <textarea
                                    value={newComment}
                                    onChange={handleCommentChange}
                                    placeholder="댓글을 입력하세요"
                                />
                                <button onClick={() => handleCommentSubmit(post.id)}>
                                    댓글 달기
                                </button>
                            </div>
                        )}

                        {/* 댓글 보기/숨기기 버튼 */}
                        <button onClick={() => setSelectedPostId(selectedPostId === post.id ? null : post.id)}>
                                {selectedPostId === post.id ? '댓글 숨기기' : '댓글 보기'}
                            </button>

                            {/* 댓글 목록 */}
                            {selectedPostId === post.id && post.comments && (
                                <ul>
                                    {post.comments.map((comment, index) => (
                                        <li key={index}>{comment}</li>
                                    ))}
                                </ul>
                            )}
                    </li>
                )) 
            }
        </ul>
    </div>
  )
}

export default Post