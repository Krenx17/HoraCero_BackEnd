'use strict'

const Noticia = require('../models/noticia.model')

function newNot(req, res){
    var newModel = Noticia()
    var params = req.body;

    if(req.user.rol == 'Admin' || req.user.rol == 'Escritor'){
        newModel.creador = req.user.sub
        newModel.name = req.user.name
        newModel.fecha = Date()
        newModel.genero = params.genero
        newModel.titulo = params.titulo
        newModel.texto = params.texto

        newModel.save((err, newnot) =>{
            return res.status(200).send({newnot})
        })
    }else{
        return res.status(500).send({mesaje: 'No posees los permisos necesarios'})
    }
}

function editNot(req, res){
    var idNot = req.params.idNot
    var params = req.body;

    if (req.user.rol == 'Admin' || req.user.rol == 'Escritor'){
        Noticia.findByIdAndUpdate(idNot, params, {new:true}, (err, updateNot)=>{
            if(err) return res.status(500).send({mesaje: "Error en la petición al actualizar"});
            if(!updateNot) return res.status(500).send({mesaje: "No se pudo actualizar la noticia"});
            return res.status(200).send({updateNot});
        })
    }else{
        return res.status(500).send({mesaje: 'No posees los permisos necesarios'})
    }
}

function deletNot(req, res){
    var idNot = req.params.idNot

    if (req.user.rol == 'Admin' || req.user.rol == 'Escritor'){
        Noticia.findByIdAndDelete(idNot,(err, removedNot)=>{
            if(err) return res.status(500).send({mesaje:"Error en la petición al eliminar"});
            if(!removedNot) return res.status(500).send({mesaje:"Error al eliminar la noticia"});
            return res.status(200).send({mesaje: "Se a logrado eliminar con exito"});
        })
    }else{
        return res.status(500).send({mesaje: 'No posees los permisos necesarios'})
    }
}

function allNot(req, res){
    Noticia.find((err, noticias)=>{
        if(err) return res.status(500).send({mesaje: "Error al obtener las noticias"});
        if(!noticias) return res.status(500).send({mesaje: "Error al consultar las noticias"}); 
        return res.status(200).send({noticias});
    }).sort({_id: -1})
}

function oneNot(req, res){
    var idNot = req.params.idNot

    Noticia.findById(idNot, (err, noti) =>{
        if(err) return res.status(500).send({mesaje: "Error al obtener la notificación"});
        if(!noti) return res.status(500).send({mesaje: "Error al consultar la notificación"});
        return res.status(200).send({noti})
    })
}

module.exports = {
    newNot,
    editNot,
    deletNot,
    allNot,
    oneNot
}