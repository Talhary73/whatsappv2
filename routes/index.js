const router = require('express').Router()
const activate = require('../activate-user')
const CredsModel = require('../mongo/model/creds')
router.route('/user').get(async(req,resp)=>{
    try {
         const res = await CredsModel.find({})
         resp.json(res.map(el=>{
            // console.log(el._id)
            return {id:el._id,number:el.creds.me.id,name:el.creds.me.name,userName:el.name }
         }))
    } catch (error) {
        console.log(error)
        resp.json({message:'Something gone wrong'}).status(500)
    }
})
router.route('/activate/:id').get(async(req,res)=>{
 
    try {
        const {id} = req.params
        // console.log(id)
        const user = await CredsModel.find({_id:id})
        console.log(user)
        await activate(user?.[0])
        res.json({message:'User Activated'}).status(200)
       
    } catch (error) {
        console.log(error)
        res.json({message:'Someting gone wrong'}).status(500)
    }
})
const credsRoute = router
module.exports = {credsRoute}
