const express = require('express');
const conn = require('../config/db'); // DB 연결 설정 파일
const router = express.Router();

router.get('/data', (req, res) => {
    let sql = "SELECT * FROM tbl_your_table"; // DB에서 데이터 불러오기
    conn.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({ error: "Database query error" });
        }
        res.json(results); // 아두이노에 데이터 전송
    });
});

module.exports = router;
