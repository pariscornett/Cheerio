//dependency 
var mongoose = require ("mongoose");

//reference to Schema constructor
var Schema = mongoose.Schema;

//uses Schema constructor to make an ArticleSchema object
var ArticleSchema = new Schema ({
    title: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    note: {
        type: Schema.Types.ObjectId, 
        ref: "Note" 
    }
});

//This creates our model from the above schema, using mongoose's model
var Article = mongoose.model("Article", ArticleSchema);

//Export the Article Model
module.exports = Article;