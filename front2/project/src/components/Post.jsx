import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Data } from '../App'

const Post = () => {
  const [post, setPost] = useState(null);
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState([]);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const { postIdx } = useParams(); // URL 파라미터에서 post_idx 가져오기
  const { userId, setUserId } = useContext(Data);

  useEffect(() => {
    const fetchPostData = async () => {
      console.log('post_idx:', postIdx); // post_idx 값 확인
      if (!postIdx) {
        console.error('post_idx is undefined or null');
        return;
      }
      try {
        const response = await axios.get(`http://192.168.219.64:3001/community/post/${postIdx}`);
        console.log('Server response:', response.data); // 서버 응답 로그 확인

        const { post, comments } = response.data;
        setPost(post);
        setComments(comments);
      } catch (error) {
        console.error('게시글 데이터를 가져오는 중 오류 발생 :', error);
      }
    };

    fetchPostData();
  }, [postIdx]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (newComment.trim() === '') return;
    console.log(userId)
    try {
      // const commentData = { post_idx: postIdx, content: newComment, user_id: userId };
      // console.log('댓글 데이터:', commentData);
      const response = await axios.post('http://192.168.219.64:3001/community/comment', {post_idx: postIdx, content: newComment, user_id: userId });
      console.log('댓글 전송 응답:', response.data);
      setComments([...comments, { post_idx: postIdx, content: newComment, user_id: userId }]);
      setNewComment('');
    } catch (error) {
      console.error('댓글 전송 중 오류 발생:', error);
    }
  };


  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await axios.post(`http://192.168.219.64:3001/community/post/${postIdx}/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log('Image upload response:', response.data);
      // 서버에서 이미지 URL을 받아서 처리할 수 있습니다.
    } catch (error) {
      console.error('이미지 업로드 중 오류 발생:', error);
    }
  };

  return !post ? (<p>로딩 중...</p>) : (
    <div className="post-detail-page">
      <div className="container">
        <button className="back-button" aria-label="뒤로 가기">
          뒤로 가기
        </button>
        <article className="post-content">
          {/* <img src={post.image} alt={post.title} className="post-image" /> */}
          <h1 className="post-title">{post.post_title}</h1>
          <div className="post-meta">
            <span>{post.user_id}</span> | <span>{post.created_at}</span> | <span>{post.category}</span>
          </div>
          <p className="post-body">{post.post_content}</p>
          <div className="post-actions">
            <button className="action-button">
              좋아요
            </button>
            <button className="action-button">
              댓글
            </button>
          </div>
        </article>

        {/* 이미지 업로드 */}
        <section className="image-upload-section">
          <input type="file" accept="image/*" onChange={handleImageUpload} />
        </section>

        {/* 댓글 작성 */}
        <section className="comments-section">
          <h2>댓글</h2>
          <div className="comments-list">
            {comments.length > 0 ? (
              comments.map((comment, index) => (
                <div key={index} className="comment">
                  <div className="comment-header">
                    <p>{comment.user_id} : 
                    {comment.cmt_content}</p>
                    {/* <span>{comment.created_at}</span> */}
                  </div>
                </div>
              ))
            ) : (
              <p>댓글이 없습니다.</p>
            )}
          </div>
          <form onSubmit={handleCommentSubmit} className="comment-form">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="댓글을 작성해주세요..."
              rows="3"
              required
            />
            <button type="submit" className="submit-button">
              댓글 작성
            </button>
          </form>
        </section>
      </div>
    </div>
  );
};

export default Post;

