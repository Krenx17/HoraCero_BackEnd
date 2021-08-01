const mongoose = require("mongoose");
var Schema = mongoose.Schema;

var UserSchema = Schema({
    name: String,
    usuario: String,
    password: String,
    rol: String,
    tajeta: String
});

module.exports = mongoose.model("users", UserSchema)