const mongoose = require('mongoose')

const User = new mongoose.Schema({
    name:{type:String,required:true},
    id:{type:String, required:true},
    bot:{type:String ,enum:['gpt-4','bard','bard-only'], required:true},
    audio:{type:Boolean,default:true},
},{timestamps:true})
MyModel = mongoose.model('User', User);
module.exports = MyModel