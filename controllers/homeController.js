//Render home page with required data
let Projects = require('../models/projects');
module.exports.home = async function(req, res){
    try{
        let projects =await Projects.find({}, 'title');
        return res.render('home', {projects: projects});
    }catch(err){
        console.log("Error retriving data from DB "+err);
    }
    
    
}