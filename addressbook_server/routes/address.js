const express = require('express');
const router = express.Router();
const cors = require('cors');
const { Address } = require('../models');
const { verifyToken } = require('../middlewares/utils');
const Sequelize = require('sequelize');
const Op = Sequelize.Op

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

router.get('/members/search', verifyToken, async (req, res, next) => {
    try {
        const type = (req.query.searchType === 'name') ? 'name' : 'address';
        const members = await Address.findAll({
            where: {
                [type]: {
                    [Op.like]: "%" + req.query.searchValue + "%"
                }
            }
        });
        res.status(200).json(members);
    } catch (e) {
        console.error(e);
        next(e);
    }
});

router.post('/members', verifyToken, (req, res, next) => {
    Address.create({
        name: req.body.member.name,
        address: req.body.member.address,
        cellphone: req.body.member.cellphone,
        phone: req.body.member.phone,
        zipcode: req.body.member.zipcode,
        userseq: req.decoded.seq
    })
        .then((result) => {
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

router.delete('/members/:id', verifyToken, (req, res, next) => {
    Address.destroy({ where: { id: req.params.id } })
        .then((result) => {
            res.json(result);
        })
        .catch((err) => {
            console.error(err);
            next(err);
        });
});

/**
 * 테스트용 API
 */
router.get('/members/get', verifyToken, (req, res, next) => {
    const ids = req.query.ids;

    Address.findAll({
        where: {
            id: {
                [Op.in]: ids
            }
        }
    })
        .then((result) => {
            res.status(200).json(result);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({
                "message": "error!!"
            })
        });
});

router.delete('/members', verifyToken, (req, res, next) => {
    const ids = req.query.ids;

    Address.destroy({
        where: {
            id: {
                [Op.in]: ids
            }
        }
    })
        .then((result) => {
            res.status(200).json(result);
        })
        .catch((err) => {
            console.error(err);
            next(err);
        });
});


module.exports = router;