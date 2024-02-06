const {gpt} = require('gpti')
gpt({
	messages:[
		{role:"assistant", content:"Hi how can i help you?"}
	],
	prompt:"Hi can you tell me what is mathematics",
	model:"GPT-4",
	markdown:false
},(err,data)=>{
if(err!= null){
	console.log(err)
}
else {
	console.log(data)
}
})