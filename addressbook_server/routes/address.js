const express = require('express');
const router = express.Router();
const cors = require('cors');
const { Address } = require('../models');
const { verifyToken } = require('../middlewares/utils');

router.use(cors());

router.get('/members', verifyToken, async (req, res, next) => {
    try {
        const members = await Address.findAll({});
        res.status(200).json(members);
    } catch (e) {
        console.error(e);
        next(e);
    }
});

router.post('/members', (req, res, next) => {
    Address.create({
        name: req.body.name,
        address: req.body.address,
        cellphone: req.body.cellphone,
        phone: req.body.phone,
        zipcode: req.body.zipcode,
        userseq: 1  // <- 로그인 정보에서 가져옴 
    })
        .then((result) => {
            console.log("Address 저장 결과 :", result);
            res.status(201).json(result);
        })
        .catch((err) => {
            console.error(err);
            next(err);
        });
});

router.put('/members/:id', (req, res, next) => {
    Address.update({
        name: req.body.name,
        address: req.body.address,
        cellphone: req.body.cellphone,
        phone: req.body.phone,
        zipcode: req.body.zipcode
    }, { where: { id: req.params.id } })
        .then((result) => {
            res.json(result);
        })
        .catch((err) => {
            console.error(err);
            next(err);
        });
});

router.delete('/members/:id', (req, res, next) => {
    Address.destroy({ where: { id: req.params.id } })
        .then((result) => {
            console.log("삭제함");
            res.json(result);
        })
        .catch((err) => {
            console.error(err);
            next(err);
        });
});


module.exports = router;