const axios = require('axios')
const fun = async ()=>{
    try {
         const res = await axios.get('https://random.imagecdn.app/1000/1000',{
       responseType: 'arraybuffer'
    })
   
   
    } catch (error) {
        console.log(error)
    }
}
fun()