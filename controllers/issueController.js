let Issue = require('../models/issues');
let Project = require('../models/projects');

//Create a new isue in DB

module.exports.create = async function(req, res){
    try{
        //Create new issue in Issues schema
        let issue = await Issue.create({
            title: req.body.title,
            description: req.body.description,
            author: req.body.author,
            project : req.body.project
        });
        //Add all the labels in Issue
        let labs = req.body.labels.split(' ');
        for(let label of labs){
            issue.labels.push(label);
            await issue.save();
        }
        
        // Add issue in the project schema by finding id
        let thisproject =await Project.findById(req.body.project);
        thisproject.issues.push(issue._id);
        await thisproject.save();
    }catch(err){
        console.log("Error creating new issue in DB "+err);
    }
    
    return res.redirect('back');
}

//Return all issues for an id
module.exports.getAll = async function(req, res){
    try{
        let issueList = await Project.findById(req.params.id).populate('issues');
        return res.status(200).json({
            message:"Success",
            data : issueList
        });
    }catch(err){
        console.log("Error retriving data from DB "+err);
        return res.status(500).json({
            message:"Internal Server Error"
        })
    }
    
}