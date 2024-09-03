const express = require("express");
const router = express.Router();
const conn = require("../config/db");

// 메인페이지 식물이름 받아와서 관련 데이터 전부 페이지에 보내는 기능 라우터
router.post("/main",(req,res)=>{
    let{inputPlantName} = req.body

    let sql = "select * from tbl_plant where plant_name = ?"
    conn.query(sql, [inputPlantName], (err,results)=>{
        if(err){
            return res.json("error")
        }
        res.json(results);
    });
});





module.exports = router;