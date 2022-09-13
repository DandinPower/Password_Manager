require('dotenv').config()
const express = require('express')
const managerController = require('../controllers/manager')
const router = express.Router()
const JwtManager = require('../libs/jwt')

//查詢使用者資訊 /manager/
router.get('/', managerController.Search)

//新增使用者 /manager/register
router.post('/register', managerController.Register)

//登入 /manager/login
router.post('/login', managerController.Login)

//修改使用者 /manager/
router.put('/', JwtManager.CheckToken, managerController.Update)

//刪除使用者 /manager/
router.delete('/', JwtManager.CheckToken, managerController.Delete)

module.exports = router;