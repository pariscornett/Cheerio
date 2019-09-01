//dependency
var mongoose = require("mongoose");

//reference to Schema constructor
var Schema = mongoose.Schema;

//uses Schema constructor to make a NoteSchema object
var NoteSchema = new Schema({
    title: String,
    body: String
});

//This creates our model from the above schema, using mongoose's model
var Note = mongoose.model("Note", NoteSchema);

//Export the Note model
module.exports = Note;