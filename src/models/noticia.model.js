const mongoose = require("mongoose");
var Schema = mongoose.Schema;

var NewsSchema = Schema({
    creador: {type: Schema.Types.ObjectId, ref: "users"},
    name: {type: Schema.Types.ObjectId, ref: "users"},
    fecha: Date,
    genero: String,
    titulo: String,
    texto: String,
    imagen: String
});

module.exports = mongoose.model("news", NewsSchema)