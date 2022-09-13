require('dotenv').config()
const express = require('express')
const accountController = require('../controllers/account')
const router = express.Router()
const JwtManager = require('../libs/jwt')

//查詢使用者擁有的account /account/
router.post('/all', JwtManager.CheckToken, accountController.Search)

//新增account給Manager /account/
router.post('/', JwtManager.CheckToken, accountController.Create)

//修改account /account/
router.put('/', JwtManager.CheckToken, accountController.Update)

//刪除account /account/
router.delete('/', JwtManager.CheckToken, accountController.Delete)

module.exports = router;