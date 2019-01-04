const jwt = require('jsonwebtoken');


exports.isLoggedIn = (req, res, next) => {
    if (req.decoded) {  //decoded가 존재 한다면 로그인이 된걸로 판단 한다. 
        next();
    } else {
        res.status(403).json({
            message: '로그인 필요'
        });
    }
};

exports.verifyToken = (req, res, next) => {
    try {
        req.decoded = jwt.verify(req.headers.authorization, process.env.JWT_SECRET_KEY);
        return next();
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            res.status(419).json({
                message: '토큰이 만료되었습니다.'
            });
        }

        return res.status(401).json({
            message: '유효하지 않은 토큰입니다.'
        });
    }
};