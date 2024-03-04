const mongoose = require('mongoose')

const Creds = new mongoose.Schema({
    name:{type:String},
    creds:{type:JSON, required:true},
    id:{type:String}
},{timestamps:true})
MyModel = mongoose.model('Creds',Creds);
module.exports = MyModel