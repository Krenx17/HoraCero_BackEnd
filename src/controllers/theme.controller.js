'use strict'

const Genero = require('../models/theme.model')
var themeModel = Genero()

function register(req, res){
    var params = req.body;
}

function edit(req, res){
    var idTheme = req.params.idTheme
    var params = req.body;

    Genero.findByIdAndUpdate(idTheme, params, {new:true}, (err, updateTheme)=>{
        if(err) return res.status(500).send({mesaje: "Error en la petición al actualizar"});
        if(!updateTheme) return res.status(500).send({mesaje: "No se pudo actualizar el genero"});
        return res.status(200).send({updateTheme});
    })
}

function delet(req, res){
    var idTheme = req.params.idTheme

    Genero.findByIdAndDelete(idTheme, (err, removedTheme)=>{
        if(err) return res.status(500).send({mesaje:"Error en la petición al eliminar"});
        if(!removedTheme) return res.status(500).send({mesaje:"Error al eliminar el genero"});
        return res.status(200).send({mesaje: "Se a logrado eliminar con exito"});
    })
}

function all(req, res){}

function one(req, res){
    var id = req.params.id
}

module.exports = {
    register,
    edit,
    delet,
    all,
    one
}