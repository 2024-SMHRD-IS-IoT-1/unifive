const express = require("express");
const router = express.Router();
const conn = require("../config/db");


router.get("/community",(req,res)=>{
    let sql = "select * from tbl_post order by post_idx desc"
    conn.query(sql,(err,post_list)=>{
    if(err){
        return res.json("post_list error")
    }
    console.log(a)
    res.json({data:post_list});
    });
});

router.get("/write",(req,res)=>{
    const data = req.body
    console.log(data);
    
    let sql = "insert into tbl_post (post_title, post_content, post_file, user_id, post_category) vaules (?, ?, ?, ?, ?)";
    conn.query(sql, [data[0].제목, data[0].내용, data[0].파일, user_id, data[0].카테고리 ],(err, post)=>{
        if(err){
            return res.json("post error");
        }
        console.log(1)
        res.json({message:"등록완료",data:post});
    });
})



router.get("/post/:post_idx",(req,res)=>{
    const postIdx = req.params.post_idx;
    const sqlselect = "select * from tbl_post where post_idx = ?";
    conn.query(sqlselect, [postIdx], (err, res) => {
        if (err) {
        return res.status(500).json({ error: "Fetch failed" });
        }
    })
    const sqlcomment = "select * from tbl_comment where post_idx = ?";
    conn.query(sqlcomment, [], (err, comments)=>{
        if (err){
        return res.status(500).json({ error: "Fetch failed" });
        }
    res.json({comments, res, postIdx});
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
    const data = req.body
    console.log(data);

    let sql = "insert into tbl_comment(post_idx, comt_content, user_id) vaules (?, ?, ?)";
    conn.query(sql, [data[0].post_idx, data[0].content, user_id],(err, result)=>{
        if(err){
            return res.status(500).json({error: "Insert failed"})
        }
    });
})




module.exports = router;