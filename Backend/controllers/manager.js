const bcrypt = require('bcrypt')
const saltRounds = 10
const db = require('../models')
const { Manager } = db
const JwtManager = require('../libs/jwt')

const managerController = {
    Search: async (req, res, next) => {

    },
    Register: async (req, res, next) => {
        const { username, password, password2 } = req.body;
        if (!username || !password || !password2) {
            res.status(500).send('有遺漏的欄位或填寫錯誤')
        }
        if (password !== password2) {
            res.status(500).send('輸入的密碼不一樣')
        }
        bcrypt.hash(password, saltRounds, (err, hash) => {
            if (err) {
                res.status(500).send(err.toString())
            }
            Manager.findOne({
                where: {
                    username,
                },
            }).then((manager) => {
                if (manager === null || manager.username !== username) {
                    Manager.create({
                        username,
                        password: hash,
                    }).then(() => {
                        res.status(200).send('註冊成功')
                    }).catch((err2) => {
                        res.status(500).send(err2.toString())
                    });
                } else {
                    res.status(500).send('使用者已存在')
                }
            });
        });
    },
    Login: async (req, res, next) => {
        const { username, password } = req.body;
        if (!username || !password) {
            res.status(500).send('有遺漏的欄位或填寫錯誤')
        }
        Manager.findOne({
            where: {
                username,
            },
        }).then((manager) => {
            if (!manager) {
                res.status(500).send('使用者帳號或密碼錯誤')
            }
            bcrypt.compare(password, manager.password, (err, result) => {
                if (err || !result) {
                    res.status(500).send('使用者帳號或密碼錯誤')
                }
                else {
                    let token = JwtManager.GetToken(username)
                    res.status(200).json({managerId:manager.id, token: token})
                }
            });
        }).catch((err) => {
            res.status(500).send(err.toString())
        });
    },
    Update: async (req, res, next) => {
        res.status(200).send('good')
    },
    Delete: async (req, res, next) => {

    },
};

module.exports = managerController;