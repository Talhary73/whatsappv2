const mongoose = require('mongoose')

const Allowed = new mongoose.Schema({
   
    id:{type:String, required:true},
 
},{timestamps:true})
MyModel = mongoose.model('AllowedUsers',Allowed);
module.exports = MyModel