'use strict'

//Variables globales
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

//Middleware
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//Cabeceras
app.use(cors());

//Importación de Rutas
const user_Routes = require('./src/routes/user.routes');
const news_Routes = require('./src/routes/noticia.routes');
const coment_Routes = require('./src/routes/comment.routes');
const theme_Routes = require('./src/routes/theme.routes');

//Carga de Rutas
app.use('/api', user_Routes);
app.use('/api', news_Routes)
app.use('/api', coment_Routes)
app.use('/api', theme_Routes)


//Exportación de Rutas
module.exports = app;