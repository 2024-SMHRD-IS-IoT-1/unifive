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
        //res.json(results); // db에 있는 이름과 일치하는 식물데이터 정보
        res.json({message:"success", plant_idx:results.plant_idx});
        // const plantnum = res.json(results.plant_idx)
        // return plantnum
    });
});

router.post("/main/alias",(req,res)=>{
        // 식물이름이 데이터에 있으면 식물별명 등록 후 gorwing_plant에 라우터
        let {user_id, plant_idx,inputAlias} =req.body

        // 다음 growing_idx 값 가져오기
        let getNextIdxSql = "SELECT IFNULL(MAX(growing_idx), 0) + 1 AS next_idx FROM tbl_growing_plant";
        conn.query(getNextIdxSql, (err, idxResults) => {
            if (err) {
                return res.json("error getting next growing_idx");
            }

            let growingIdx = idxResults[0].next_idx;


        let sql = "insert into tbl_glowing_plant(growing_idx, user_id, plant_idx, growing_st_dt, plant_alias) values (?,?,?,CURRENT_TIMESTAMP,?)"
        conn.query(sql, [growingIdx, user_id ,plant_idx, inputAlias], (err,plantAlias)=>{
            if(err){
                return res.json("plantAlias error");
            }
            res.json({message:"success"});
        });
    });
});

module.exports = router;