const express = require("express");
const router = express.router();
const conn = require("../config/db");
const multer = require('multer');
const fs = require('fs');
const path = require('path');
fs.readdir('./public/uploads', (error) => {
    if (error) {
        fs.mkdirSync('./public')
        fs.mkdirSync('./public/uploads');
        fs.mkdirSync('./public/uploads/img');
    }
})

// 아두이노에서 이미지 받기 (현재 상태 사진 촬영 버튼)
router.post('/', uploadImage.single('image'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No file received' });
    }
    res.status(200).json({ message: 'Image received successfully', filename: req.file.filename });
});

// ./public/uploads 경로에 사진 파일 생성 (사진 촬영버튼 누르고 저장하시겠습니까? 버튼)
router.get("/save",(req,res)=>{
    const uploadVideo = multer({
        storage: multer.diskStorage({
            destination: function (req, file, cb) {
                cb(null, path.join('public', 'uploads', 'img'));
            },
            filename: function (req, file, cb) {
                let time = new Date()
                let timezoneOffsetInMinutes = time.getTimezoneOffset();
                let setTime = `${time.getFullYear()}${time.getMonth() + 1}${time.getDate()}${time.getUTCHours()}${time.getUTCMinutes()}`
                const ext = path.extname(file.originalname)
                cb(null, `${req.session.user.code}_${setTime}` + ext);
            }
        })
    })
})


module.exports = router;