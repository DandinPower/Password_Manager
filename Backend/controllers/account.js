const aes256 = require('aes256');
const db = require('../models')
const { Account } = db

const accountController = {
    Search: async (req, res, next) => {
        const {managerId, key} = req.body
        if (!managerId || !key) {
            res.status(500).send('有遺漏的欄位或填寫錯誤')
        }
        Account.findAll({
            where: {
                managerId: managerId,
            },
        }).then((result) => {
            let accounts = []
            result.forEach((item, index)=>{
                let temp = {
                    "description": item.description,
                    "account": item.account,
                    "password": aes256.decrypt(key, item.password),
                    "note": item.note
                }
                accounts.push(temp)
            })            
            res.status(200).json(accounts)
        }).catch((err) => {
            res.status(500).send(err.toString())
        })
    },
    Create: async (req, res, next) => {
        const {managerId, key, description, account, password, note} = req.body 
        if (!managerId || !description || !account || !password || !key) {
            res.status(500).send('有遺漏的欄位或填寫錯誤')
        }
        var tempPassword = aes256.encrypt(key, password)
        Account.create({
            managerId: managerId,
            description: description,
            account: account,
            password: tempPassword,
            note: note
        }).then(() => {
            res.status(200).send('創建成功')
        }).catch((err) => {
            res.status(500).send(err.toString())
        })

    },
    Update: async (req, res, next) => {

    },
    Delete: async (req, res, next) => {

    },
};

module.exports = accountController;