const express = require("express");
const router = express.Router();
const conn = require("../config/db");


router.get("/commu",(req,res)=>{
    const data = req.body
    console.log(data);
})


module.exports = router;