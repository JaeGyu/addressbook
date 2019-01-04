const express = require('express');
const router = express.Router();
const cors = require('cors');
const { verifyToken } = require('../middlewares/utils');

router.use(cors());

router.get('/', (req, res) => {
    res.json({ "name": "bob" });
});

router.get('/token_test', verifyToken, (req, res, next) => {
    res.json(req.decoded);
});

module.exports = router;
