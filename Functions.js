const UserModel = require('./mongo/model/index')
const CheckUser = async (id)=>{
  try {
    const res = await UserModel.find({id:id})
    // console.log(res)
    return res
   

  } catch (error) {
    
    return false
  }
}
module.exports = { CheckUser }