const mongoose = require('mongoose');

const articleSchema = mongoose.Schema({
    titre: { type: String, required: true },
    resumer: { type: String, required: true },
    contenu:{ type : String , required : true},
    auteur:{ type : String , required : true},
    dateCreation:{ type : String , required : true},
    dateModif:{ type : String , required : true},



});

module.exports = mongoose.model('Article', articleSchema);










