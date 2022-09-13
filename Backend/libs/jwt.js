require('dotenv').config()
const jwt = require("jsonwebtoken");
const JWT_SIGN_SECRET = process.env.JWT_SIGN_SECRET

const JwtManager = {
    //根據username取得token
    GetToken: (_username) => {
        return jwt.sign({ _username }, JWT_SIGN_SECRET, { expiresIn: 60 * 60 });
    },
    //檢查token的middleware
    CheckToken: async(req, res, next) => {
        const token = req.headers['authorization']
        if (!token) {
            res.status(500).send('沒有token')
        }
        jwt.verify(token, JWT_SIGN_SECRET, function (err, decoded) {
            if (err) {
                res.status(500).send('token錯誤')
            } else {
                next()
            }
        });
    },
}

module.exports = JwtManager