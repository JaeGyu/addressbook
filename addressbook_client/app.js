const express = require('express');
const morgan = require('morgan');
const path = require('path');

const app = express();

app.set('port', 8080);
app.use(express.json());  //클라이언트로 부터 넘어오는 json을 감지 한다. body-parser기능이 들어 있음
app.use('/',express.static(path.join(__dirname, 'dist')));   
app.use(morgan('dev'));

app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 대기중');
});