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

module.exports=router;