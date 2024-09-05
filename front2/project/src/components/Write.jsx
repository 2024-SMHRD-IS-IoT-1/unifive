import React from 'react'

const Write = () => {
  return (
    <div>
        <h2>게시글 작성</h2>
            <form onSubmit={handleleFormSubmit}>
                <input 
                    type='text'
                    name='title'
                    value={newPost.title}
                    onChange={handleInputChange}
                    placeholder='제목을 입력하세요'
                    required
                />
                <textarea 
                    name='content'
                    value={newPost.content}
                    onChange={handleInputChange}
                    placeholder='내용을 입력하세요'
                    required
                />
                <select
                    name='category'
                    value={newPost.category}
                    onChange={handleInputChange}
                >
                    {categories.filter(cat => cat !=='전체').map(category=>(
                            <option key={category} value={category}>{category}</option>
                    ))}
                </select>
                <button type="submit">게시글 추가</button>
            </form>
    </div>
  )
}

export default Write
