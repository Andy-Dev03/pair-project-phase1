const express = require('express')
const Controller = require('../controllers/controller')
const router = express.Router()

//Home, Register, Log in, dan Logut
router.get('/', Controller.home)
router.get('/register', Controller.X)
router.post('/register', Controller.X)
router.get('/login', Controller.X)
router.post('/login', Controller.X)
router.get('/logout', Controller.X)

//Games
router.get('/games', Controller.X)
router.get('/games/add', Controller.X)
router.post('/games/add', Controller.X)

//Categories
router.get('/categories', Controller.X)
router.get('/categories/add', Controller.X)
router.post('/categories/add', Controller.X)

//Purchases 
router.get('/store', Controller.X)
router.get('/store/:id/buy', Controller.X)
router.get('/purchases', Controller.X)

//Params
router.get('/games/:id/edit', Controller.X)
router.get('/games/:id/edit', Controller.X)
router.get('/games/:id/delete', Controller.X)

module.exports = router