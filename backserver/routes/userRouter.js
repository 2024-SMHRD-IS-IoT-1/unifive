const express = require("express");
const router = express.Router();
const conn = require("../config/db");
const jwt = require('jsonwebtoken')


router.get("/", (req,res)=>{
    //console.log("user ROuter")
    res.end()
})

// join 기능 라우터
router.post("/join",(req,res)=>{
    let{inputId, inputPw, inputName, inputEmail, inputPhone} = req.body
    // console.log('d')
    let sql = "insert into tbl_user(user_id, user_pw, user_name, user_email, user_phone) values (?,SHA2(?, 224),?,?,?)"
    conn.query(sql,[inputId, inputPw, inputName, inputEmail, inputPhone], (err, rows)=>{
        try{
        if(rows){
            res.json({message:"success"}) // 성공시 success 프론트로 보내주기
        }
        else{
            res.json({message:"fail"})
        }}
        catch(err){
            res.status(500).json({message:"error"});
        }
    })
})

// 로그인 기능 라우터
router.post("/login", (req, res) => {
    let { inputId, inputPw } = req.body;
    console.log(req.body)
    let sql = "select user_id, user_name from tbl_user where user_id=? and user_pw=SHA2(?, 224)";
    conn.query(sql, [inputId, inputPw], (err, rows) => {
        console.log(rows) 
        try {
            if (rows.length > 0) {
                // req.session.user_id=inputId;
                const token = jwt.sign(
                    {
                        id : inputId
                    },
                    "secretkey",
                    {
                        expiresIn : '24h'
                    }
                )
                console.log(token)
                res.json({ message: "success" , token : token});
                
            } else {
                res.json({ message: "fail" });
            }
        } catch (err) {
            res.status(500).json({message:"error"});
        }
    });


});



//정보수정 기능 라우터
router.post("/user/update", (req,res)=>{
    let{inputId, inputPw, inputName, inputPhone} = req.body;

    let sql = "update tbl_user set ";
    // id, pw로 유저 찾아서 원하는 정보만 수정하기(sql뒤에 조건문추가, 삽입)
    let fields = [];

    if (inputName) fields.push(`user_name = '${inputName}'`);
    if (inputPhone) fields.push(`user_phone = '${inputPhone}'`);

    sql += fields.join(", ") + "where user_id =? and user_pw =SHA2(?, 224)";

    conn.query(sql, [inputId, inputPw, inputName, inputPhone], (err, rows)=>{
        try{
        if(rows.affectedRows > 0){
            res.json({message:"success"})
        }else(
            res.json({message:"fail"})
        )}
        catch(err){
            res.status(500).json({message:"error"})
        }
    })

})


//정보삭제 기능 라우터
router.post("/user/delete",(res,req)=>{
    let{user_id, user_pw} = req.body
    let sql = "delete from tbl_user where user_id=? and user_pw=SHA2(?, 224)"
    conn.query(sql, [user_id, user_pw], (err,rows)=>{
        try{
        if(rows.affectedRows>0){
            res.json({message:"success"})
        }else{
            res.json({message:"fail"})
        }}
        catch(err){
            res.status(500).json({message:"error"})
        }
    })
})

// // 회원 기본 프로필
// // 회원이 찍은 사진
// router.get("/post/:post_idx",(req,res)=>{
//     const postIdx = req.params.post_idx;
//     const sqlselect = "select * from tbl_post where post_idx = ?";
//     conn.query(sqlselect, [postIdx], (err, res) => {
//         if (err) {
//         return res.status(500).json({ error: "Fetch failed" });
//         }
//     })
//     const sqlcomment = "select * from tbl_comment where post_idx = ?";
//     conn.query(sqlcomment, [], (err, comments)=>{
//         if (err){
//         return res.status(500).json({ error: "Fetch failed" });
//         }
//     res.json({comments, res, postIdx});
// });
// });
// router.get("/user/profile:user_id",(req,res),{
    
    
// });


module.exports = router;