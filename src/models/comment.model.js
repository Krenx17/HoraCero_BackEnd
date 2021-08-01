const mongoose = require("mongoose");
var Schema = mongoose.Schema;

var UserSchema = Schema({
    noticia: {type: Schema.Types.ObjectId, ref: "news"},
    user: {type: Schema.Types.ObjectId, ref: "users"},
    name: {type: Schema.Types.ObjectId, ref: "users"},
    comentario: String,
    fecha: Date
});

module.exports = mongoose.model("comments", UserSchema)