

var db = require('../db');

module.exports.authz = function(req,res,next){
    if(!req.cookies.userId){
        res.redirect('/');
        return;
    }
    var user = db.get('user').find({id : req.cookies.userId}).value();
    if(!user){
        res.redirect('/');
        return;
    }
    next();

}