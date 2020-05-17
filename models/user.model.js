var mongoose = require('mongoose');
 
var userSchame = new mongoose.Schema({
 name : String,
 pass : String
});

var User = mongoose.model('User',userSchame,'user');

module.exports = User;