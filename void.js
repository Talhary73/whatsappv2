const Model = require('./mongo/model/creds')
const Upload = async ()=>{
    try {
        await Model.create({name:'Talha',creds:''})
    } catch (error) {
        console.log(error)
    }
}
setTimeout(() => {
    Upload()
}, 5000);