import React from 'react'

const Write = () => {
  return (
    <div>
<<<<<<< HEAD
        <h2>게시글 작성</h2>
=======
        {/*<h2>게시글 작성</h2>
>>>>>>> 31ae1609374d58438f6c7d96fa797b503873c90f
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
<<<<<<< HEAD
            </form>
=======
            </form> */}
>>>>>>> 31ae1609374d58438f6c7d96fa797b503873c90f
    </div>
  )
}

export default Write
