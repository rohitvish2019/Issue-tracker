const mongoose = require('mongoose');

//Project schema
let projectSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
    },
    description :{
        type: String,
        required: true,
    },
    status:{
        type: String,
        enum :['New', 'In progress', 'Completed',],
        default: 'New'
    },
    author:{
        type: String,
        required: true
    },

    issues:[{
        type: mongoose.Schema.Types.ObjectId,
        ref :'issues'
    }]
},
{
    timestamps: true
});

let projects = mongoose.model('projects', projectSchema);
module.exports = projects;