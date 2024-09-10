const express = require("express");
const router = express.Router();
const conn = require("../config/db");
const axios = require("axios");

// 메인페이지 식물이름 받아와서 관련 데이터 전부 페이지에 보내는 기능 라우터
router.post("/",(req,res)=>{
        let {userId} = req.body
        let sql = "SELECT * FROM tbl_growing_plant a JOIN tbl_user b ON a.user_id = b.user_id JOIN tbl_plant c ON a.plant_idx = c.plant_idx WHERE b.user_id = ?"
        conn.query(sql, [userId], (err,result)=>{
            if(err){
                return res.status(500).json("error");
            }else{
                res.json({message:"seccess",data :result, userId : userId });
            }
        })



        // // 수동 자동 제어 데이터 보내기
        // let {user_id} = req.body;
        // console.log(req.body.auto)

        // if (!auto){
        //     let sql = "select * from tbl_plant where plant_idx = ?"
        //     conn.query(sql, [plant_idx], (err, results)=>{
        //         if(err){
        //             return res.status(500).json({error: "DB query error"})
        //         } 
        //         res.json({data:results});
        //     });
        // }else{
        //     res.json({error:"/main error"})
        // }
});

router.post("/myplant",(req,res)=>{
    let {inputPlantName} =req.body

    let sql = "select * from tbl_plant where plant_name = ?"
    conn.query(sql, [inputPlantName], (err,results)=>{
        if(err){
            return res.status(500).json("error")
        }
        //res.json(results); // db에 있는 이름과 일치하는 식물데이터 정보
        if (results.length > 0) {
            res.json({ message: "success", data: results });
        } else {
            res.json({ message: "plant not found" });
        }
        });
});

router.post("/alias",(req,res)=>{
        // 식물이름이 데이터에 있으면 식물별명 등록 후 gorwing_plant에 라우터
        // const data = req.body
        // console.log(data)
        // const inputPlantName = data.inputPlantName
        let {plant_idx, user_id, inputAlias} =req.body;
        console.log("Received data:", { plant_idx, user_id, inputAlias });
        // 다음 growing_idx 값 가져오기
        // let getNextIdxSql = "SELECT IFNULL(MAX(growing_idx), 0) + 1 AS next_idx FROM tbl_growing_plant";
        // conn.query(getNextIdxSql, (err, idxResults) => {
        //     if (err) {
        //         return res.json("error getting next growing_idx");
        //     }
        //     let growingIdx = idxResults[0].next_idx;   

        let sql = "insert into tbl_growing_plant(user_id, plant_idx, growing_st_dt, plant_alias) values (?,?,CURRENT_TIMESTAMP,?)"
        conn.query(sql, [user_id ,plant_idx, inputAlias], (err,res)=>{
            if(err){
                console.error("Database error:", err);
                return res.status(500).json({ message: "plantAlias error" });
            }
            console.log("Query results:", results);
            res.json({message:"success"});
            });
    });

module.exports = router;