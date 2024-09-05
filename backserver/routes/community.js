const express = require("express");
const router = express.Router();
const conn = require("../config/db");


router.get("/commu",(req,res)=>{
    const data = req.body
    console.log(data);
    
    
    let sql = "insert into tbl_post(post_idx, post_title, post_content, post_file) values (?,?,CURRENT_TIMESTAMP,?)"
})

router.get("/comment",(req,res)=>{

})



module.exports = router;