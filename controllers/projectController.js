//Render create new project page
let Projects = require('../models/projects');
module.exports.create = function(req, res){
    return res.render('newProject');
}


//Create new project in DB
module.exports.createNew = async function(req, res){
    try{
        let project = await Projects.create({
            title: req.body.title,
            description: req.body.description,
            author: req.body.author
        });
    }catch(err){
        console.log("Error creating new project "+err);
    }
    return res.redirect('/');
}

//render description page
module.exports.description = async function(req, res){
    let project;
    try{
        project = await Projects.findById(req.params.id);
    }catch(err){
        console.log("Error retriving data from DB "+err);
    }
    
    return res.render('projectDescription', {project:project});
}