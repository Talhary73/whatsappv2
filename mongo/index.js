const mongoose = require('mongoose')

const connect = async ()=>{
  try{
    
    await mongoose.connect('mongodb+srv://talhariaz23:xGDJ0VnVEjMd16td@nodeexpresspoject.aw8zg3z.mongodb.net/?retryWrites=true&w=majority')

  }catch(err){
    console.log(err)
    throw new Error('Unable to connect')
  }
}
module.exports = connect