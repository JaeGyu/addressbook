const express = require('express');
const morgan = require('morgan');
const path = require('path');
const sequelize = require('./models').sequelize;
require('dotenv').config();

// const swagger = require('./swagger');

const app = express();
sequelize.sync();

const indexRouter = require('./routes');
const authRouter = require('./routes/auth');
const addressRouter = require('./routes/address');

app.set('port', process.env.PORT || 8080);
app.use(express.json());  //클라이언트로 부터 넘어오는 json을 감지 한다. body-parser기능이 들어 있음
app.use(morgan('dev'));
app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/address', addressRouter);
app.use('/swagger-ui', express.static(path.join(__dirname, './node_modules/swagger-ui/dist')));

// app.use('/api-docs', swagger.swaggerUi.serve, swagger.swaggerUi.setup(swagger.swaggerSpec));

app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 대기중');
});