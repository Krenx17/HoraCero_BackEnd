'use strict'

const express = require('express')
const Controller = require('../controllers/comment.controller')
var authentication = require("../middlewares/authenticated");

var api = express.Router()
api.post('/newcoment/:idNot', authentication.ensureAuth, Controller.newCom)
api.put('/editcoment/:idCom', authentication.ensureAuth, Controller.editCom)
api.delete('/deletcoment/:idCom', authentication.ensureAuth, Controller.deletCom)
api.get('/coments/:idNot', Controller.allCom)
api.get('/coment/:idCom', Controller.oneCom)

module.exports = api;