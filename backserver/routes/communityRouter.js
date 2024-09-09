const express = require("express");
const router = express.Router();
const conn = require("../config/db");


router.get("/community",(req,res)=>{
    let sql = "select * from tbl_post order by post_idx desc"
    conn.query(sql,(err,post_list)=>{
    if(err){
        return res.status(500).json({error:"post_list error"})
    }
    // console.log(a)
    res.json({data:post_list});
    });
});

router.post("/write",(req,res)=>{
    const data = req.body
    console.log(data);
    
    let sql = "insert into tbl_post (post_title, post_content, user_id, post_category) values (?, ?, ?, ?)";
    conn.query(sql, [data[0].title, data[0].content, data[0].userId, data[0].category] ,(err, post)=>{
        if(err){
            return res.status(500).json("post error");
        }
        console.log(req.body)
        res.json({message:"등록완료",data:post});
    });
});

router.get("/post/:post_idx", (req, res) => {
    const postIdx = req.params.post_idx;

    // 첫 번째 쿼리: 게시글 가져오기
    const sqlselect = "SELECT * FROM tbl_post WHERE post_idx = ?";
    conn.query(sqlselect, [postIdx], (err, postResult) => {
        if (err) {
            return res.status(500).json({ error: "Fetch failed" });
        }

        // 두 번째 쿼리: 댓글 가져오기
        const sqlcomment = "SELECT * FROM tbl_comment WHERE post_idx = ?";
        conn.query(sqlcomment, [postIdx], (err, comments) => {
            if (err) {
                return res.status(500).json({ error: "Fetch failed" });
            }

            // 최종 응답
            res.json({ comments: comments, post: postResult[0], postIdx: postIdx });
        });
    });
});



// router.get("/comment:post_idx",(req,res)=>{
//         const data = req.body    
// // 내가 데이터 받고 post_idx 맞는 조건문 걸어서 프론트에 보내주면 map함수로 띄어주기
//         let sqlSelect = "SELECT * FROM tbl_comment WHERE post_idx = ?";
//         conn.query(sqlSelect, [data.post_idx], (err, comments) => {
//             if (err) {
//                 return res.status(500).json({ error: "Fetch failed" });
//             }
            
//             res.json({ comments });
//         });
    
// });

router.post("/comment",(req,res)=>{
    const { post_idx, content, user_id } = req.body;
    console.log({ post_idx, content, user_id });

    let sql = "insert into tbl_comment(post_idx, comt_content, user_id) values (?, ?, ?)";
    conn.query(sql, [post_idx, content, user_id],(err, result)=>{
        if(err){
            return res.status(500).json({error: "Insert failed"})
        }
        res.status(200).json({ message: 'Comment added successfully' });
    });
});

module.exports = router;