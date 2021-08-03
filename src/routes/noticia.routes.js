'use strict'

const express = require('express')
const Controller = require('../controllers/noticia.controller')
var authentication = require("../middlewares/authenticated");

var api = express.Router()
api.post('/newnews', authentication.ensureAuth, Controller.newNot)
api.put('/editnews/:idNot', authentication.ensureAuth, Controller.editNot)
api.delete('/deletnews/:idNot', authentication.ensureAuth, Controller.deletNot)
api.get('/news', Controller.allNot)
api.get('/onenews/:idNot', Controller.oneNot)

module.exports = api;