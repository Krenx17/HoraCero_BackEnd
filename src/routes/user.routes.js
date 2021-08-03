'use strict'

const express = require('express')
const Controller = require('../controllers/user.controller')
var authentication = require("../middlewares/authenticated");

var api = express.Router()
api.post('/login', Controller.login)
api.post('/register', Controller.register)
api.post('/user', authentication.ensureAuth, Controller.user)
api.put('/edituser/:idUser', authentication.ensureAuth, Controller.edit)
api.delete('/deletuser/:idUser', authentication.ensureAuth, Controller.delet)
api.get('/users', authentication.ensureAuth, Controller.all)
api.get('/oneuser/:idUser', authentication.ensureAuth, Controller.one)

module.exports = api;