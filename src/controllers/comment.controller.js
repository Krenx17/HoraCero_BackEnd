'use strict'

const User = require('../models/user.model')
const Comentario = require('../models/comment.model')

function newCom(req, res){
    var commentModel = Comentario()
    var idNot = req.params.idNot
    var params = req.body;

    commentModel.noticia = idNot
    commentModel.user = req.user.sub
    commentModel.name = req.user.user
    commentModel.comentario = params.comentario
    commentModel.fecha = Date()

    commentModel.save((err, newcomentario)=>{
        if (newcomentario){
            return res.status(200).send({newcomentario})
        }
    })
}

function editCom(req, res){
    var idCom = req.params.idCom
    var params = req.body;

    Comentario.findById(idCom, (err, coment) =>{
        if(err) return res.status(500).send({mesaje: "Error al obtener usuarios"});
        if(!coment) return res.status(500).send({mesaje: "Error al consultar usuario"});
        if (req.user.sub === coment.user){
            Comentario.findByIdAndUpdate(idCom, params, {new:true}, (err, updateCom)=>{
                if(err) return res.status(500).send({mesaje: "Error en la petición al actualizar"});
                if(!updateCom) return res.status(500).send({mesaje: "No se pudo actualizar el comentario"});
                return res.status(200).send({updateCom});
            })
        }else{
            return res.status(500).send({mesaje: 'No posees los permisos necesarios'})
        }
    })
}

function deletCom(req, res){
    var idCom = req.params.idCom

    Comentario.findById(idCom, (err, coment) =>{
        if(err) return res.status(500).send({mesaje: "Error al obtener usuarios"});
        if(!coment) return res.status(500).send({mesaje: "Error al consultar usuario"});
        if (req.user.sub === coment.user || req.user.rol === 'Admin'){
            Comentario.findByIdAndDelete(idCom,(err, removedCom)=>{
                if(err) return res.status(500).send({mesaje:"Error en la petición al eliminar"});
                if(!removedCom) return res.status(500).send({mesaje:"Error al eliminar el comentario"});
                return res.status(200).send({mesaje: "Se a logrado eliminar con exito"});
            })
        }else{
            return res.status(500).send({mesaje: 'No posees los permisos necesarios'})
        }
    })
}

function allCom(req, res){
    var idNot = req.params.idNot

    Comentario.find({$or: [
        {noticia: idNot}
    ]}).exec((err, coments)=>{
        if(err) console.log("Error en la petición");
        if(!coments) return res.status(500).send({mesaje:"Error al encontrar los comentarios"});
        return res.status(200).send({coments});
    })
}

function oneCom(req, res){
    var idCom = req.params.idCom

    Comentario.findById(idCom, (err, coment) =>{
        if(err) return res.status(500).send({mesaje: "Error al obtener el comentario"});
        if(!coment) return res.status(500).send({mesaje: "Error al consultar el comentario"});
        return res.status(200).send({coment})
    })
}

module.exports = {
    newCom,
    editCom,
    deletCom,
    allCom,
    oneCom
}