const mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ThemeSchema = Schema({
    name: String
});

module.exports = mongoose.model("themes", ThemeSchema)