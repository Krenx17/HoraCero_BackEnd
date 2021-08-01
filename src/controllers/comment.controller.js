'use strict'

const User = require('../models/user.model')
const Comentario = require('../models/comment.model')
var commentModel = Comentario()

function register(req, res){
    var params = req.body;
}

function edit(req, res){
    var idCom = req.params.idCom
    var params = req.body;

    if (req.user.sub){
        Comentario.findByIdAndUpdate(idCom, params, {new:true}, (err, updateCom)=>{
            if(err) return res.status(500).send({mesaje: "Error en la petición al actualizar"});
            if(!updateCom) return res.status(500).send({mesaje: "No se pudo actualizar el comentario"});
            return res.status(200).send({updateCom});
        })
    }
}

function delet(req, res){
    var idCom = req.params.idCom

    if (req.user.sub){
        Comentario.findByIdAndDelete(idCom,(err, removedCom)=>{
            if(err) return res.status(500).send({mesaje:"Error en la petición al eliminar"});
            if(!removedCom) return res.status(500).send({mesaje:"Error al eliminar el comentario"});
            return res.status(200).send({mesaje: "Se a logrado eliminar con exito"});
        })
    }
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