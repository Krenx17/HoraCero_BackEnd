'use strict'

const Genero = require('../models/theme.model')
var themeModel = Genero()

function newTheme(req, res){
    var params = req.body;

    themeModel.name = params.name

    themeModel.save((err, theme)=>{
        if (theme){
            return res.status(200).send({theme})
        }
    })
}

function editTheme(req, res){
    var idTheme = req.params.idTheme
    var params = req.body;

    if (req.user.rol === 'Admin'){
        Genero.findByIdAndUpdate(idTheme, params, {new:true}, (err, updateTheme)=>{
            if(err) return res.status(500).send({mesaje: "Error en la petición al actualizar"});
            if(!updateTheme) return res.status(500).send({mesaje: "No se pudo actualizar el genero"});
            return res.status(200).send({updateTheme});
        })
    }else{
        return res.status(500).send({mesaje: 'No posees los permisos necesarios'})
    }
}

function deletTheme(req, res){
    var idTheme = req.params.idTheme

    if (req.user.rol === 'Admin'){
        Genero.findByIdAndDelete(idTheme, (err, removedTheme)=>{
            if(err) return res.status(500).send({mesaje:"Error en la petición al eliminar"});
            if(!removedTheme) return res.status(500).send({mesaje:"Error al eliminar el genero"});
            return res.status(200).send({mesaje: "Se a logrado eliminar con exito"});
        })
    }else{
        return res.status(500).send({mesaje: 'No posees los permisos necesarios'})
    }
}

function allTheme(req, res){
    Genero.find((err,generos)=>{
        if(err) return res.status(500).send({mesaje: "Error al obtener usuarios"});
        if(!generos) return res.status(500).send({mesaje: "Error al consultar usuarios"}); 
        return res.status(200).send({generos});
    })
}

function oneTheme(req, res){
    var idTheme = req.params.idTheme

    Genero.findById(idTheme, (err, onegenero) =>{
        if(err) return res.status(500).send({mesaje: "Error al obtener el género"});
        if(!onegenero) return res.status(500).send({mesaje: "Error al consultar el género"});
        return res.status(200).send({onegenero})
    })
}

module.exports = {
    newTheme,
    editTheme,
    deletTheme,
    allTheme,
    oneTheme
}