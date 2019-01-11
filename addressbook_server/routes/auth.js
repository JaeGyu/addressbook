const express = require('express');
const router = express.Router();
const cors = require('cors');
const { User } = require('../models');
const jwt = require('jsonwebtoken');
const { verifyToken } = require('../middlewares/utils');

router.use(cors());

router.post('/login', (req, res, next) => {
    User.findOne({ where: { 'userId': req.body.id, 'password': req.body.password } })
        .then((data) => {
            if (!data) {
                throw new Error('아이디 또는 비밀번호를 다시 확인하세요. 시스템에 등록되지 않은 아이디이거나, 아이디 또는 비밀번호를 잘못 입력하셨습니다.');
            }
            const token = jwt.sign({
                seq: data.id,
                id: data.userId,
                grade: data.grade
            }, process.env.JWT_SECRET_KEY, {
                    expiresIn: '10m',
                    issuer: 'jaegyu'
                });
            res.status(200).json({
                token
            });
        })
        .catch((error) => {
            let status = (error.name === 'Error') ? 401 : 500;
            let message = (error.name === 'Error') ? error.message : '서버 에러가 발생 했습니다.';
            res.status(status).json({
                code: status,
                message
            });
        });
});

router.get('/me', verifyToken, (req, res, next) => {
    res.status(200).json({
        "info": req.decoded
    });
});

module.exports = router;