// 모듈 가져오기
const express = require('express');
const app = express();
const bp = require("body-parser");
// routes 경로에 있는 파일 호출
const userRouter = require("./routes/userRouter");
const mainRouter = require("./routes/mainRouter");
// cors 설정 ( 도메인 주소가 달라도 일치 시킬 수 있음)
const cors = require('cors')
app.use(cors());
app.use(bp.urlencoded({extended : true})); // post 방식 변경
app.use(express.json());
app.use("/user",userRouter);
app.use("/main",mainRouter);

// 메인페이지 경로 설정 3
// const joinRouter = require('./routes/userRouter')
// app.use('/join', joinRouter);

// 리액트 프로젝트 경로 설정 4
const path = require('path');
app.use(express.static(path.join(__dirname, '..', 'front2', 'project', 'build')));


// 포트 설정 2
app.set('port', process.env.PORT || 3001);
app.listen(app.get('port'), ()=>{
    console.log(`Server is running on ${app.get('port')}`);
})