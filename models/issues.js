//Issues schema
const mongoose = require('mongoose');
let issueSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    description :{
        type: String,
        required: true
    },
    labels:[{
        type:String
    }],
    author:{
        type: String,
        required: true
    },
    project:{
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
},
{
    timestamps:true
});


let issue = mongoose.model('issues', issueSchema);
module.exports = issue;