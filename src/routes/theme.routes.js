'use strict'

const express = require('express')
const Controller = require('../controllers/theme.controller')
var authentication = require("../middlewares/authenticated");

var api = express.Router()
api.post('/newtheme', authentication.ensureAuth, Controller.newTheme)
api.put('/edittheme/:idTheme', authentication.ensureAuth, Controller.editTheme)
api.delete('/deletetheme/:idTheme', authentication.ensureAuth, Controller.deletTheme)
api.get('/allthemes', authentication.ensureAuth, Controller.allTheme)
api.get('/theme/:idTheme', authentication.ensureAuth, Controller.oneTheme)

module.exports = api;